import type { Internship } from "../../prisma/zod";
import type { Notificator } from "../interfaces/interface.notificator";
import { MailService } from "./mail.service";

export class NotificationService {
  private notificators: Array<Notificator> = [];

  constructor() {
    this.notificators.push(new MailService());
  }

  async notify(domain: string, internships: Array<Internship>) {
    for (const n of this.notificators) {
      const response = await n.notify(domain, internships);
    }
  }
}
