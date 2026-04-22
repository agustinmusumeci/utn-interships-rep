import type { Internship } from "prisma/zod";

export interface Scraper {
  scrapeInternships(): Promise<Array<Internship>>;
}
