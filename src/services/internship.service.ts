import type { Internship } from "../../prisma/zod";
import internshipRepository from "../repositories/internship.repository";

class InternshipService {
  constructor() {}

  async scrapeInternships(): Promise<{ internships: Array<Internship> }> {
    return await internshipRepository.scrapeInternships();
  }

  async uploadInternships(internships: Array<Internship>) {
    return await internshipRepository.uploadInterships(internships);
  }

  async getInternships() {
    return await internshipRepository.getInternships();
  }
}

export default new InternshipService();
