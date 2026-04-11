import { GoogleGenAI } from "@google/genai";
import type { GoogleGenAI as GoogleGenAIType } from "@google/genai";
import { INTERSHIP_RESPONSE_SCHEMA } from "../schemas/intership.response.schema";
import { Agent } from "./agent";
import type { Internship } from "../../prisma/zod";
import dotenv from "dotenv";
dotenv.config({ path: "/.env" });

export class GeminiAgent extends Agent {
  #ai: GoogleGenAIType;

  constructor() {
    super();
    this.#ai = new GoogleGenAI({ apiKey: (typeof process !== "undefined" && process.env.GEMINI_API_KEY) || (import.meta as any).env?.GEMINI_API_KEY });
  }

  async sumbitContent(content: string): Promise<{ internships: Array<Internship & { careers: Array<string> }> }> {
    const response = await this.#ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `${this.context} Content:${content}`,
      config: {
        responseMimeType: "application/json",
        responseJsonSchema: INTERSHIP_RESPONSE_SCHEMA,
      },
    });

    const raw = JSON.parse(response.text);

    return raw;
  }
}
