import type { Internship } from "../../prisma/zod";

export interface Notificator {
  notify(domain: string, internships: Array<string>): Promise<boolean>;
}
