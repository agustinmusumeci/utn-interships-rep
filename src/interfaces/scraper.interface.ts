import type { Internship } from "prisma/zod";

export interface Scraper {
  university?: string;

  scrapeInternships(): Promise<Array<Internship>>;
  getUniversity(): string;
}
