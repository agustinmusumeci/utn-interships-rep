import type { Company } from "../../prisma/zod";
import prisma from "../lib/prisma";

class CompanyRepository {
  constructor() {}

  async uploadCompanies(companies: Array<Company>) {
    return await prisma.company.createMany({ data: companies, skipDuplicates: true });
  }
}

export default new CompanyRepository();
