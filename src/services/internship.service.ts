import type { Internship } from "../../prisma/zod";
import { INTERNSHIPS_PER_PAGE } from "../constants/paginations";
import internshipRepository from "../repositories/internship.repository";

class InternshipService {
  constructor() {}

  async scrapeInternships(): Promise<{ internships: Array<Internship> }> {
    return await internshipRepository.scrapeInternships();
  }

  async getInternships(careers: Array<string> = [], text: string = "", time: string = "", page: number = 0) {
    const { data, count } = await internshipRepository.getInternships(careers, text, time, page);

    const internships = data.map((internship) => {
      return this.mapInternship(internship);
    });

    const response = {
      data: internships,
      pages: Math.ceil(count / INTERNSHIPS_PER_PAGE),
    };

    return response;
  }

  async getInternship(id: number | undefined = undefined, arm: string = "") {
    const internshipData = await internshipRepository.getInternship(id, arm);
    const internship = this.mapInternship(internshipData);

    return internship;
  }

  async uploadInternships(internships: Array<Internship & { careers: Array<string> }>) {
    return await internshipRepository.uploadInternships(internships);
  }

  mapInternship(internship: Internship & { Company: { name: string; id: string }; internshipCareers: Array<{ career_id: string; Career: { name: string; color: string } }> }) {
    const newInternship = {
      id: internship?.id,
      arm: internship?.arm,
      city: internship?.city,
      rrhh: !internship?.rrhh ? "No especificado" : internship?.rrhh,
      interview_timetable: internship?.interview_timetable,
      knowledge: internship?.knowledge,
      requirements: internship?.requirements ? "No especificado" : internship?.requirements,
      payment: !internship?.payment ? "No especificado" : internship?.payment,
      timetable: internship?.timetable,
      position: !internship?.position ? "No especificado" : internship?.position,
      benefits: internship?.benefits ?? "No especificado",
      interns: !internship?.interns || internship?.interns === 0 ? "No especificado" : internship?.interns,
      workplace: internship?.workplace,
      modality: internship?.modality,
      link: !internship?.link ? "Sin link" : internship?.link,
      mail: !internship?.mail ? "Sin mail" : internship?.mail,
      observations: !internship?.observations ? "-" : internship?.observations,
      company: { id: internship?.Company?.id, name: internship?.Company?.name },
      careers: internship?.internshipCareers?.map((career) => ({
        id: career?.career_id,
        name: career?.Career?.name,
        color: career?.Career?.color,
      })),
      created_at: internship?.created_at,
    };

    return newInternship;
  }
}

export default new InternshipService();
