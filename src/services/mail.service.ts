import type { Internship } from "../../prisma/zod";
import type { Notificator } from "../interfaces/interface.notificator";

export class MailService implements Notificator {
  constructor() {}

  async notify(domain: string, internships: Array<Internship>): Promise<boolean> {
    console.log(`Enviando mail a: ${domain}`);
    return true;
  }
}
