import { GoogleGenAI } from "@google/genai";
import type { GoogleGenAI as GoogleGenAIType } from "@google/genai";
import { Agent } from "./agent";
import type { Internship } from "../../prisma/zod";
import dotenv from "dotenv";
import getContext from "./context";
import getInternshipResponseSchema from "@/schemas/intership.response.schema";
dotenv.config({ path: "/.env" });

export class GeminiAgent extends Agent {
  private ai: GoogleGenAIType;

  constructor() {
    super();
    this.ai = new GoogleGenAI({ apiKey: (typeof process !== "undefined" && process.env.GEMINI_API_KEY) || (import.meta as any).env?.GEMINI_API_KEY });
  }

  async sumbitContent(content: string, university: string): Promise<{ internships: Array<Internship & { careers: Array<string> }> }> {
    const response = await this.ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `${getContext(university)} Content:${content}`,
      config: {
        responseMimeType: "application/json",
        responseJsonSchema: getInternshipResponseSchema(university),
      },
    });

    const raw = JSON.parse(response.text || "{}");

    return raw;
  }
}
