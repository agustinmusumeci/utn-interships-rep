import type { Internship } from "../../prisma/zod";
import type { Notificator } from "../interfaces/interface.notificator";
import { MailService } from "./mail.service";

export class NotificationService {
  private notificators: Array<Notificator> = [];

  constructor() {
    this.notificators.push(new MailService());
  }

  async notify(data: Array<{ userId: string; domain: string; username: string; internships: Array<string> }>) {
    for (const notificator of this.notificators) {
      for (const el of data) {
        const domain = el.domain;
        const username = el.username;
        const internships = el.internships;

        await notificator.notify(domain, username, internships);
      }
    }
  }
}
