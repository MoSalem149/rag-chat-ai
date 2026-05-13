import { ChatOpenAI } from "@langchain/openai";

let llmInstance = null;

export const getLLM = () => {
  if (!llmInstance) {
    llmInstance = new ChatOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      model: "gpt-4o-mini",
      temperature: 0.2,
    });
  }

  return llmInstance;
};
