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

  normalizeKey(name: string): string {
    return name
      .toUpperCase()
      .normalize("NFC")
      .replace(/[^A-Z0-9\s]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  normalizeName(name: string): string {
    return name
      .toUpperCase()
      .normalize("NFC")
      .replace(/[\u2013\u2014\u2212]/g, "-")
      .replace(/\s+/g, " ")
      .trim();
  }
}
