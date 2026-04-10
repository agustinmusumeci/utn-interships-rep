import type { Company } from "../../prisma/zod";
import prisma from "../lib/prisma";

export class CompanyRepository {
  constructor() {}

  async uploadCompanies(companies: Array<Company>) {
    return await prisma.company.createMany({ data: companies, skipDuplicates: true });
  }
}
