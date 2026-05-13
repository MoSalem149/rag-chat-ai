import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { getEmbeddings } from "./embedding.service.js";

export const createVectorStore = (collection) => {
  const embeddings = getEmbeddings();

  return new MongoDBAtlasVectorSearch(embeddings, {
    collection,
    indexName: "vector_index",
    textKey: "text",
    embeddingKey: "embedding",
  });
};
