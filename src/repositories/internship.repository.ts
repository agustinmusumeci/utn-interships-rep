import type { Internship } from "../../prisma/zod";
import { GeminiAgent } from "../agents/gemini.agent";
import { INTERNSHIPS_PER_PAGE } from "../constants/paginations";
import prisma from "../lib/prisma";
import { Scraper } from "../lib/scraper";
import dotenv from "dotenv";
dotenv.config({ path: "/.env" });

class InternshipRepository {
  url: string;

  constructor() {
    this.url = (typeof process !== "undefined" && process.env.SCRAPER_URL) || (import.meta as any).env?.SCRAPER_URL;
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

  async getInternships(careers: Array<string>, text: string, time: string, page: number) {
    let where = {};
    let order = {};

    if (text) {
      where["OR"] = [
        { knowledge: { contains: text, mode: "insensitive" } },
        { modality: { contains: text, mode: "insensitive" } },
        { position: { contains: text, mode: "insensitive" } },
        { requirements: { contains: text, mode: "insensitive" } },
      ];
    }

    if (careers && careers?.length > 0 && !careers.includes("*")) {
      where["internshipCareers"] = {
        some: {
          career_id: {
            in: careers,
          },
        },
      };
    }

    if (time) {
      order = {
        created_at: time?.toLocaleLowerCase(),
      };
    } else {
      order = {
        created_at: "desc",
      };
    }

    const count = await prisma.internship.count({
      where: where,
      orderBy: order,
    });

    const response = await prisma.internship.findMany({
      where: where,
      orderBy: order,
      take: INTERNSHIPS_PER_PAGE,
      skip: page * INTERNSHIPS_PER_PAGE,
      include: {
        Company: true,
        internshipCareers: {
          include: {
            Career: true,
          },
        },
      },
    });

    return { data: response, count: count };
  }

  async getInternship(id: number | undefined = undefined, arm: string = "") {
    let where = {};
    if (id) {
      where["id"] = id;
    }

    if (arm) {
      where["arm"] = arm;
    }

    return await prisma.internship.findFirst({
      where: where,
      include: {
        Company: true,
        internshipCareers: {
          include: {
            Career: true,
          },
        },
      },
    });
  }

  async uploadInternships(
    internships: Array<
      Internship & {
        careers: Array<string>;
      }
    >,
  ) {
    const updatedInternships = await prisma.$transaction(async (tx) => {
      const preExisting = await tx.internship.findMany({
        where: {
          arm: { in: internships.map((i) => i["arm"]) },
        },
        select: { ["arm"]: true },
      });

      const preExistingARMS = new Set(preExisting.map((r) => r["arm"]));

      await tx.internship.createMany({
        data: internships.map(({ careers, ...rest }) => rest),
        skipDuplicates: true,
      });

      const created = await tx.internship.findMany({
        where: { arm: { in: internships.map((i) => i.arm) } },
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

      // const newInternships = created.flatMap((internship) => {
      //   const original = internships.find((i) => i.arm === internship.arm);
      //   const careers = original.careers.map((career_id) => ({
      //     internship_id: internship.id,
      //     career_id,
      //   }));

      //   return { ...original, careers: careers };
      // });

      const newInternships = internships.filter((i) => !preExistingARMS.has(i["arm"]));

      return newInternships;
    });

    return updatedInternships;
  }
}

export default new InternshipRepository();
