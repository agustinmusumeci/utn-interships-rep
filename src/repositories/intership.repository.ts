import prisma from "../lib/prisma";
import { Scraper } from "../lib/scraper";
import utnParser from "../lib/utn.parser";

class IntershipRepository {
  url: string;

  constructor() {
    this.url = import.meta.env.SCRAPER_URL;
  }

  async scrapeInterships() {
    const scraper = new Scraper();

    await scraper.init(true);

    await scraper.navigate(this.url);

    const raw = await scraper.evaluate(() => {
      const container = document.getElementById("a60492");

      const content = container?.querySelector(".show-hide")?.textContent;

      return content;
    });

    await scraper.close();

    const res = utnParser.parseInternships(raw);

    return res;
  }

  async getInterships() {
    return await prisma.intership.findMany();
  }

  async createOrUpdateInterships(interships: any) {}
}

export default new IntershipRepository();
