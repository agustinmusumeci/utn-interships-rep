import type { Notificator } from "../interfaces/notificator.interface";
import dotenv from "dotenv";
dotenv.config({ path: "/.env" });

export class MailService implements Notificator {
  private serviceId;
  private templateId;
  private publicEmailKey;
  private privateEmailKey;

  constructor() {
    this.serviceId = (typeof process !== "undefined" && process.env.EMAILJS_SERVICE_ID) || (import.meta as any).env?.EMAILJS_SERVICE_ID;
    this.templateId = (typeof process !== "undefined" && process.env.EMAILJS_TEMPLATE_ID) || (import.meta as any).env?.EMAILJS_TEMPLATE_ID;
    this.publicEmailKey = (typeof process !== "undefined" && process.env.EMAILJS_PUBLIC_KEY) || (import.meta as any).env?.EMAILJS_PUBLIC_KEY;
    this.privateEmailKey = (typeof process !== "undefined" && process.env.EMAILJS_PRIVATE_KEY) || (import.meta as any).env?.EMAILJS_PRIVATE_KEY;
  }

  async notify(domain: string, username: string, internships: Array<string>) {
    const count = internships.length;

    await this.sendEmail(domain, username, count);
  }

  async sendEmail(domain: string, username: string, count: number) {
    const data = {
      service_id: this.serviceId,
      template_id: this.templateId,
      user_id: this.publicEmailKey,
      accessToken: this.privateEmailKey,
      template_params: {
        name: username,
        count: count,
        domain: domain,
      },
    };

    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`EmailJS error ${res.status}: ${errorText}`);
      }

      console.log("Email enviado correctamente");
    } catch (e) {
      console.error("Error al enviar email:", e);
    }
  }
}
