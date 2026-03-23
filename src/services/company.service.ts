import type { Company } from "../../prisma/zod";
import companyRepository from "../repositories/company.repository";

class CompanyService {
  constructor() {}

  async uploadCompanies(companies: Array<Company>) {
    return await companyRepository.uploadCompanies(companies);
  }
}

export default new CompanyService();
