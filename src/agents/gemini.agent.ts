import { GoogleGenAI } from "@google/genai";
import type { GoogleGenAI as GoogleGenAIType } from "@google/genai";
import { INTERSHIP_RESPONSE_SCHEMA } from "../schemas/intership.response.schema";
import { Agent } from "./agents";

export class GeminiAgent extends Agent {
  #ai: GoogleGenAIType;

  constructor() {
    super();
    this.#ai = new GoogleGenAI({ apiKey: import.meta.env.GEMINI_API_KEY });
  }

  async sumbitContent(content: string): Promise<Array<string>> {
    const response = await this.#ai.models.generateContent({
      model: "gemini-2.5-flash",
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
