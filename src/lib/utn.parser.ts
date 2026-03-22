import type { Intership } from "../../prisma/generated/client";
import { careers } from "../constants/careers";

class UTNParser {
  fieldMap: Array<{ key: string; labels: Array<string> }>;
  ignorePatterns: Array<RegExp>;

  constructor() {
    this.fieldMap = [
      { key: "company_id", labels: ["NOMBRE DE LA EMPRESA/ORGANISMO", "NOMBRE DE LA EMPRESA"] },
      { key: "city", labels: ["CIUDAD"] },
      { key: "rrhh", labels: ["REFERENTE DE RRHH", "FUNCIONARIO ACTUANTE"] },
      { key: "interview_timetable", labels: ["HORARIO PARA ENTREVISTA"] },
      { key: "careers_id", labels: ["ESTUDIANTE DE LA CARRERA", "ESTUDIANTE"] },
      { key: "knowledge", labels: ["CONOCIMIENTOS"] },
      { key: "requirements", labels: ["OTROS REQUISITOS"] },
      { key: "raw_payment", labels: ["ASIGNACIÓN ESTÍMULO", "ASIGNACION ESTIMULO"] },
      { key: "timetable", labels: ["HORARIO DE TRABAJO"] },
      { key: "position", labels: ["PUESTO/ÁREA A CUBRIR", "CARGO A CUBRIR"] },
      { key: "benefits", labels: ["BENEFICIOS"] },
      { key: "raw_interns", labels: ["CANTIDAD DE PASANTES"] },
      { key: "workplace", labels: ["LUGAR DE TRABAJO"] },
      { key: "modality", labels: ["MODALIDAD (PRESENCIAL, HÍBRIDA O REMOTO)", "MODALIDAD"] },
      { key: "duration", labels: ["DURACIÓN", "DURACION"] },
      { key: "validity", labels: ["VIGENCIA DE LA CONVOCATORIA"] },
      { key: "address", labels: ["DIRECCIÓN", "DIRECCION"] },
      { key: "phone", labels: ["TELÉFONO", "TELEFONO"] },
      { key: "sex", labels: ["SEXO"] },
    ];

    this.ignorePatterns = [/^solicita\s*$/i, /^formulario de solicitud de servicio\s*$/i];
  }

  normalize(str: string) {
    return str
      .toUpperCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  detectLabel(line: string) {
    const normLine = this.normalize(line);

    for (const { key, labels } of this.fieldMap) {
      for (const label of labels) {
        const normLabel = this.normalize(label);
        if (normLine.startsWith(normLabel)) {
          // El valor es el texto tras la etiqueta, separado por ":" o "-" opcionales
          const rest = line.slice(label.length).replace(/^\s*[:\-]?\s*/, "");
          return { key, value: rest.trim() };
        }
      }
    }
    return null;
  }

  detectARM(line: string) {
    const m = line.match(/A\.R\.M\.\s*([\d]+\/[\d]+)/i);
    return m ? m[1] : null;
  }

  /**
   * Parsea un bloque de texto de una sola pasantía línea a línea.
   * @param {string} block
   * @returns {object} Objeto con todos los campos crudos.
   */
  parseBlock(block: string) {
    const lines = block.split("\n");

    const raw = {
      arm: "",
      company_id: "",
      city: "",
      rrhh: "",
      interview_timetable: "",
      careers_id: "",
      knowledge: "",
      requirements: "",
      raw_payment: "",
      timetable: "",
      position: "",
      benefits: "",
      raw_interns: "",
      workplace: "",
      modality: "",
      send_cv: "",
      link_raw: "",
    };

    let currentField = null;

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      // ¿Línea ARM?
      const armCode = this.detectARM(trimmed);
      if (armCode) {
        raw.arm = armCode;
        currentField = null;
        continue;
      }

      // ¿Línea ignorable?
      if (this.ignorePatterns.some((p) => p.test(trimmed))) {
        currentField = null;
        continue;
      }

      // ¿"Enviar CV a:"?
      if (/^enviar cv a\s*[:\-]?\s*/i.test(trimmed)) {
        currentField = "send_cv";
        raw.send_cv = trimmed.replace(/^enviar cv a\s*[:\-]?\s*/i, "").trim();
        continue;
      }

      // ¿"Link:"?
      if (/^link\s*[:\-]?\s*/i.test(trimmed)) {
        const val = trimmed.replace(/^link\s*[:\-]?\s*/i, "").trim();
        raw.link_raw = val;
        currentField = "link_raw";
        continue;
      }

      // ¿Inicio de etiqueta conocida?
      const detected = this.detectLabel(trimmed);
      if (detected) {
        currentField = detected.key;
        if (currentField in raw) {
          raw[currentField] = detected.value;
        }
        continue;
      }

      // Continuación multilínea del campo actual
      if (currentField && currentField in raw) {
        const sep = raw[currentField] ? " " : "";
        raw[currentField] += sep + trimmed;
      }
    }

    return raw;
  }

  parsePayment(raw: string) {
    const match = raw.match(/\$?\s*([\d]{1,3}(?:\.\d{3})*(?:,\d+)?|\d+(?:,\d+)?)/);

    if (!match) return "";

    return match?.input;
  }

  parseInterns(raw: string) {
    const m = raw.match(/\d+/);
    return m ? parseInt(m[0], 10) : 0;
  }

  extractContact(sendCv: string, linkRaw: string) {
    const emailRegex = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/;
    const urlRegex = /https?:\/\/[^\s]+/;

    const mailMatch = sendCv.match(emailRegex);
    const mail = mailMatch ? mailMatch[0] : null;

    const urlFromLink = linkRaw.match(urlRegex);
    const urlFromSendCv = sendCv.match(urlRegex);
    const link = (urlFromLink?.[0] || urlFromSendCv?.[0] || "").replace(/\/+$/, "");
    return { mail, link: link ? link + "/" : "" };
  }

  splitIntoBlocks(rawText: string) {
    const parts = rawText.split(/(?=A\.R\.M\.\s*\d+\/\d+)/i);
    return parts.map((b) => b.trim()).filter(Boolean);
  }

  checkCareers(raw: string) {
    const text = this.normalize(raw);
    const matchCareers = [];

    for (let i = 0; i < careers.length; i++) {
      const career = careers[i];

      const regexCareer = new RegExp(`\\b${career}\\b`);

      if (regexCareer.test(text)) {
        matchCareers.push(career);
      }
    }

    return matchCareers;
  }

  parseInternships(rawText: string) {
    const blocks = this.splitIntoBlocks(rawText);

    return blocks.map((block) => {
      const raw = this.parseBlock(block);
      const { mail, link } = this.extractContact(raw.send_cv, raw.link_raw);

      return {
        arm: raw.arm,
        // company_id:
        city: raw.city,
        rrhh: raw.rrhh,
        interview_timetable: raw.interview_timetable,
        knowledge: raw.knowledge,
        requirements: raw.requirements,
        payment: this.parsePayment(raw.raw_payment),
        timetable: raw.timetable,
        position: raw.position,
        benefits: raw.benefits,
        interns: this.parseInterns(raw.raw_interns),
        workplace: raw.workplace,
        modality: raw.modality,
        link,
        mail,

        // Relaciones
        company_id: this.normalize(raw.company_id),
        careers_id: this.checkCareers(raw.careers_id),
      };
    });
  }
}

export default new UTNParser();
