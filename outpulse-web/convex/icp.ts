import { v } from "convex/values";
import { action, mutation, query } from "./_generated/server";
import OpenAI from "openai";

export const generateICP = action({
  args: {
    domain: v.string(),
    openaiKey: v.string(),
  },
  handler: async (ctx, args) => {
    const openai = new OpenAI({
      apiKey: args.openaiKey,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert sales strategist. Analyze the given company domain and define their Ideal Customer Profile (ICP). Output ONLY a JSON object with the following fields: targetIndustry (array of strings), companySizeRange (string), jobTitles (array of strings), region (array of strings)."
        },
        {
          role: "user",
          content: `Analyze the company domain: ${args.domain}`
        }
      ],
      response_format: { type: "json_object" }
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("Failed to generate ICP");
    }

    return JSON.parse(content);
  },
});
