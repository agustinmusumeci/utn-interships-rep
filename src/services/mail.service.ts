import type { Internship } from "../../prisma/zod";
import type { Notificator } from "../interfaces/interface.notificator";
import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config({ path: "/.env" });

export class MailService implements Notificator {
  private mailer;

  constructor() {
    this.mailer = new Resend((typeof process !== "undefined" && process.env.RESEND_API_KEY) || (import.meta as any).env?.RESEND_API_KEY);
  }

  async notify(domain: string, internships: Array<string>): Promise<boolean> {
    console.log(`Enviando mail a: ${domain}`, internships);
    let mail = "hola probando";

    await this.sendEmail(domain, "test", mail);
    return true;
  }

  async sendEmail(domain: string, subject: string, mail: string) {
    await this.mailer.emails.send({
      from: "UTN Hub <onboarding@resend.dev>",
      to: [domain],
      subject: subject,
      html: mail,
    });
  }
}
