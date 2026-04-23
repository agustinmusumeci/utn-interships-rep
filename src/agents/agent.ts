import type { Internship } from "../../prisma/zod";

export abstract class Agent {
  abstract sumbitContent(content: string, university: string): Promise<{ internships: Array<Internship & { careers: Array<string> }> }>;
}
