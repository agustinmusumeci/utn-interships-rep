import { CompanyRepository } from "@/repositories/company.repository";
import type { Company } from "../../prisma/zod";

export class CompanyService {
  private companyRepository: CompanyRepository;

  constructor() {
    this.companyRepository = new CompanyRepository();
  }

  async uploadCompanies(companies: Array<Company>) {
    return await this.companyRepository.uploadCompanies(companies);
  }
}
