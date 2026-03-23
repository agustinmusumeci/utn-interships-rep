import type { Internship } from "../../prisma/zod";
import { GeminiAgent } from "../agents/gemini.agent";
import prisma from "../lib/prisma";
import { Scraper } from "../lib/scraper";
import { POPULATED_MOCK } from "../mock/populated";
import dotenv from "dotenv";
dotenv.config({ path: "/.env" });

class InternshipRepository {
  url: string;

  constructor() {
    this.url = process.env.SCRAPER_URL;
  }

  async scrapeInternships(): Promise<{ internships: Array<Internship> }> {
    const scraper = new Scraper();

    await scraper.init(true);

    await scraper.navigate(this.url);

    const raw: Promise<{ interships: Array<Internship> }> = await scraper.evaluate(() => {
      const container = document.getElementById("a60492");

      const content = container?.querySelector(".show-hide")?.textContent;

      return content;
    });

    await scraper.close();

    const agent = new GeminiAgent();

    const res = await agent.sumbitContent(raw);

    return res;
  }

  async getInternships() {
    return await prisma.internship.findMany();
  }

  async uploadInterships(
    internships: Array<
      Internship & {
        careers: Array<string>;
      }
    >,
  ) {
    await prisma.$transaction(async (tx) => {
      await tx.internship.createMany({
        data: internships.map(({ careers, ...rest }) => rest),
        skipDuplicates: true,
      });

      const created = await tx.internship.findMany({
        where: { arm: { in: internships.map((i) => i.arm) } },
        select: { id: true, arm: true },
      });

      const internshipCareerData = created.flatMap((internship) => {
        const original = internships.find((i) => i.arm === internship.arm);
        return original.careers.map((career_id) => ({
          internship_id: internship.id,
          career_id,
        }));
      });

      await tx.internshipCareer.createMany({
        data: internshipCareerData,
        skipDuplicates: true,
      });
    });
  }
}

export default new InternshipRepository();
