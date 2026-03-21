import puppeteer, { Browser as PBrowser, Page } from "puppeteer";

export class Scraper {
  #browser: undefined | PBrowser;
  #page: undefined | Page;

  async init(headless: boolean = false) {
    const browser = await puppeteer.launch({ headless: headless });
    const page = await browser.newPage();

    // await page.setViewport({ width: 1080, height: 1024 });

    this.#browser = browser;
    this.#page = page;
  }

  async navigate(url: string, selector?: string) {
    if (!this.#page || !this.#browser) {
      throw new Error("Page or Browser should be initialized first");
    }

    await this.#page.goto(url, { waitUntil: "networkidle0" });

    if (selector) {
      await this.#page.waitForSelector(selector);
    }
  }

  async click(selector: string) {
    await this.#page?.waitForSelector(selector, { timeout: 5000 });

    await this.#page?.click(selector);
  }

  async fill(selector: string, text: string) {
    await this.#page?.waitForSelector(selector, { timeout: 5000 });

    await this.#page?.type(selector, text);
  }

  async refresh() {
    await this.#page?.reload();
  }

  async evaluate(callback: () => any, ...args: any[]) {
    if (!callback) {
      throw new Error("extract() must be implemented");
    }

    const data = await this.#page?.evaluate(callback, ...args);

    return data;
  }

  async catchPetition() {
    const response = await this.#page?.waitForResponse((res) => res.url().includes("/4/transacciones/inscripcion/cursado/comisiones") && res.status() === 200);

    const data = await response?.json();
    return data;
  }

  async waitForNewPage() {
    return new Promise<Page>((resolve) => {
      this.#browser!.once("targetcreated", async (target) => {
        const newPage = await target.page();
        if (newPage) resolve(newPage);
      });
    });
  }

  async wait() {
    await this.#page?.waitForNavigation({ waitUntil: "networkidle2" });
  }

  async close() {
    await this.#browser?.close();
  }

  getBrowser() {
    return this.#browser;
  }

  getPage() {
    return this.#page;
  }

  getUrl(): string | undefined {
    return this.#page?.url();
  }
}
