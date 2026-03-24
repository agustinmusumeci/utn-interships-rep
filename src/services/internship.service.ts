import type { Internship } from "../../prisma/zod";
import internshipRepository from "../repositories/internship.repository";

class InternshipService {
  constructor() {}

  async scrapeInternships(): Promise<{ internships: Array<Internship> }> {
    return await internshipRepository.scrapeInternships();
  }

  async getInternships(careers: Array<string> = [], text: string = "", time: string = "") {
    const internshipsData = await internshipRepository.getInternships(careers, text, time);

    const internships = internshipsData.map((internship) => {
      return this.mapInternship(internship);
    });

    return internships;
  }

  async getInternship(id: number) {
    const internshipData = await internshipRepository.getInternship(id);
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
      requirements: internship?.requirements,
      payment: !internship?.payment ? "No especificado" : internship?.payment,
      timetable: internship?.timetable,
      position: internship?.position,
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
