import type { Internship } from "../../prisma/zod";
import { INTERSHIP_RESPONSE_SCHEMA } from "../schemas/intership.response.schema";
import { CONTEXT } from "./context";

export abstract class Agent {
  context: string = CONTEXT;
  schema: typeof INTERSHIP_RESPONSE_SCHEMA = INTERSHIP_RESPONSE_SCHEMA;
  abstract sumbitContent(content: string): Promise<{ internships: Array<Internship & { careers: Array<string> }> }>;
}
