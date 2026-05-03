import type { Scraper } from "@/interfaces/scraper.interface";
import { WebScraper } from "@/lib/webScraper";
import type { Internship } from "prisma/zod";
import dotenv from "dotenv";
import { GeminiAgent } from "@/agents/gemini.agent";
import { Universities } from "@/constants/universities";
dotenv.config({ path: "/.env" });

export class UTNScraper implements Scraper {
  private url: string;
  university: string = Universities.UTNFRC;

  constructor() {
    this.url = (typeof process !== "undefined" && process.env.UTN_SCRAPER_URL) || (import.meta as any).env?.UTN_SCRAPER_URL;
  }

  async scrapeInternships(): Promise<Array<Internship>> {
    const webScraper = new WebScraper();

    await webScraper.init(true);

    await webScraper.navigate(this.url);

    const raw: string = await webScraper.evaluate(() => {
      const container = document.getElementById("a60492");

      const content = container?.querySelector(".show-hide")?.textContent;

      return content;
    });

    await webScraper.close();

    const agent = new GeminiAgent();

    const res = await agent.sumbitContent(raw, this.university);

    return res.internships;
  }

  getUniversity(): string {
    return this.university;
  }
}
