"use node";
import { v } from "convex/values";
import { action } from "./_generated/server";
import OpenAI from "openai";

export const chat = action({
  args: {
    messages: v.array(
      v.object({
        role: v.union(v.literal("user"), v.literal("assistant"), v.literal("system")),
        content: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.CEREBRAS_API_KEY;
    if (!apiKey) {
      // Return a helpful error message that the frontend can display
      // We don't want to crash the whole app if the key is missing during dev
      console.error("CEREBRAS_API_KEY is not set in environment variables");
      return "Error: AI service is not configured. Please set CEREBRAS_API_KEY.";
    }

    const client = new OpenAI({
      apiKey,
      baseURL: "https://api.cerebras.ai/v1",
    });

    try {
      const completion = await client.chat.completions.create({
        messages: args.messages,
        model: "zai-glm-4.7",
        temperature: 0.7,
        max_tokens: 4096,
      });

      return completion.choices[0].message.content ?? "";
    } catch (error) {
      console.error("Error calling Cerebras API:", error);
      return "Sorry, I encountered an error communicating with the AI service. Please try again later.";
    }
  },
});
