import { OpenAIEmbeddings } from "@langchain/openai";

let embeddingsInstance = null;

export const getEmbeddings = () => {
  if (!embeddingsInstance) {
    embeddingsInstance = new OpenAIEmbeddings({
      apiKey: process.env.OPENAI_API_KEY,
      model: "text-embedding-3-small",
    });
  }

  return embeddingsInstance;
};
