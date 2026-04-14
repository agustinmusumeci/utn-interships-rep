import type { InternshipWhereUniqueInput } from "prisma/generated/models";
import type { Internship } from "../../prisma/zod";
import { GeminiAgent } from "../agents/gemini.agent";
import { INTERNSHIPS_PER_PAGE } from "../constants/paginations";
import prisma from "../lib/prisma";
import { Scraper } from "../lib/scraper";
import dotenv from "dotenv";
dotenv.config({ path: "/.env" });

export class InternshipRepository {
  url: string;

  constructor() {
    this.url = (typeof process !== "undefined" && process.env.SCRAPER_URL) || (import.meta as any).env?.SCRAPER_URL;
  }

  async scrapeInternships(): Promise<{ internships: Array<Internship & { careers: Array<string> }> }> {
    const scraper = new Scraper();

    await scraper.init(true);

    await scraper.navigate(this.url);

    const raw: string = await scraper.evaluate(() => {
      const container = document.getElementById("a60492");

      const content = container?.querySelector(".show-hide")?.textContent;

      return content;
    });

    await scraper.close();

    const agent = new GeminiAgent();

    const res = await agent.sumbitContent(raw);

    console.log("agent: ", res);

    return res;
  }

  async getInternships(filter: { careers: Array<string> | undefined; text?: string; time?: string; date?: string; page: number }) {
    let where = {} as { OR: Array<any>; internshipCareers: any; created_at: any };
    let order = {};

    if (filter.text) {
      where["OR"] = [
        { knowledge: { contains: filter.text, mode: "insensitive" } },
        { modality: { contains: filter.text, mode: "insensitive" } },
        { position: { contains: filter.text, mode: "insensitive" } },
        { requirements: { contains: filter.text, mode: "insensitive" } },
      ];
    }

    if (filter.careers && filter.careers?.length > 0 && !filter.careers.includes("*")) {
      where["internshipCareers"] = {
        some: {
          career_id: {
            in: filter.careers,
          },
        },
      };
    }

    if (filter.time) {
      order = {
        created_at: filter.time?.toLocaleLowerCase(),
      };
    } else {
      order = {
        created_at: "desc",
      };
    }

    if (filter.date && filter.date !== "*") {
      const currentDate = new Date();

      const dateToFilter = new Date(currentDate.getTime() - Number(filter.date) * 24 * 60 * 60 * 1000);

      where["created_at"] = { gte: dateToFilter };
    }

    const count = await prisma.internship.count({
      where: where,
      orderBy: order,
    });

    const response = await prisma.internship.findMany({
      where: where,
      orderBy: order,
      take: INTERNSHIPS_PER_PAGE,
      skip: (filter?.page ?? 0) * INTERNSHIPS_PER_PAGE,
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
    let where = {} as InternshipWhereUniqueInput;
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
    try {
      console.log("uploadInternships: ", internships);

      const updatedInternships = await prisma.$transaction(async (tx) => {
        // Select all the internships that already exists before the upload
        const preExisting = await tx.internship.findMany({
          where: {
            arm: { in: internships.map((i) => i["arm"]) },
          },
          select: { ["arm"]: true },
        });

        const preExistingARMS = new Set(preExisting.map((r) => r["arm"]));

        // Create the internships and skip if already exists
        await tx.internship.createMany({
          data: internships.map(({ careers, ...rest }) => rest),
          skipDuplicates: true,
        });

        // Select only the ones that were created
        const created = await tx.internship.findMany({
          where: { arm: { notIn: Array.from(preExistingARMS) } },
        });

        // Create relation between internships and careers
        const internshipCareerData = created.flatMap((internship) => {
          const original = internships.find((i) => i.arm === internship.arm);
          return (
            original?.careers?.map((career_id) => ({
              internship_id: internship.id,
              career_id,
            })) ?? []
          );
        });

        await tx.internshipCareer.createMany({
          data: internshipCareerData,
          skipDuplicates: true,
        });

        // Associate the created internships with its careers
        const careersHash: Record<string, Array<string>> = {};

        for (let internship of internships) {
          careersHash[internship.arm] = internship?.careers;
        }

        const updatedInternships = created.map((i) => ({
          ...i,
          careers: careersHash[i.arm] ?? [],
        }));

        // console.log(updatedInternships);

        return updatedInternships;
      });
      return updatedInternships;
    } catch (e) {
      console.log(e);
      return [];
    }
  }
}
