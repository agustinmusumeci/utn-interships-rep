import type { Internship } from "../../prisma/zod";
import internshipRepository from "../repositories/internship.repository";

class InternshipService {
  constructor() {}

  async scrapeInternships(): Promise<{ internships: Array<Internship> }> {
    return await internshipRepository.scrapeInternships();
  }

  async getInternships() {
    const internshipsData = await internshipRepository.getInternships();

    const internships = internshipsData.map((internship) => ({
      id: internship?.id,
      arm: internship?.arm,
      city: internship?.city,
      rrhh: internship?.rrhh,
      interview_timetable: internship?.interview_timetable,
      knowledge: internship?.knowledge,
      requirements: internship?.requirements,
      payment: internship?.payment ?? "No especificado",
      timetable: internship?.timetable,
      position: internship?.position,
      benefits: internship?.benefits ?? "No especificado",
      interns: internship?.interns ?? "No especificado",
      workplace: internship?.workplace,
      modality: internship?.modality,
      link: internship?.link,
      mail: internship?.mail,
      observations: internship?.observations ?? "-",
      company: { id: internship?.Company?.id, name: internship?.Company?.name },
      careers: internship?.internshipCareers?.map((career) => ({
        id: career?.career_id,
        name: career?.Career?.name,
        color: career?.Career?.color,
      })),
    }));

    return internships;
  }

  async getInternship(id: number) {
    return await internshipRepository.getInternship(id);
  }

  async uploadInternships(internships: Array<Internship & { careers: Array<string> }>) {
    return await internshipRepository.uploadInternships(internships);
  }
}

export default new InternshipService();
