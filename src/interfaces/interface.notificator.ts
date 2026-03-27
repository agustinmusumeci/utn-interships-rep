import type { Internship } from "../../prisma/zod";

export interface Notificator {
  notify(domain: string, internships: Array<Internship>): Promise<boolean>;
}
