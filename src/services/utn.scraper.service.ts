import type { Scraper } from "@/interfaces/scraper.interface";
import { WebScraper } from "@/lib/scraper";
import type { Internship } from "prisma/zod";
import dotenv from "dotenv";
import { GeminiAgent } from "@/agents/gemini.agent";
dotenv.config({ path: "/.env" });

export class UTNScraper implements Scraper {
  private url: string;

  constructor() {
    this.url = (typeof process !== "undefined" && process.env.UTN_SCRAPER_URL) || (import.meta as any).env?.UTN_SCRAPER_URL;
  }

  async scrapeInternships(): Promise<Array<Internship>> {
    const scraper = new WebScraper();

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

    return res.internships;
  }
}
