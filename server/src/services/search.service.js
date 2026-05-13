import Document from "../models/document.model.js";
import { getEmbeddings } from "./embedding.service.js";

export const searchSimilarChunks = async (question) => {
  // 1. get embeddings instance
  const embeddings = getEmbeddings();

  // 2. embed question
  const queryEmbedding = await embeddings.embedQuery(question);

  // 3. vector search in MongoDB
  const results = await Document.aggregate([
    {
      $vectorSearch: {
        index: "vector_index",
        path: "embedding",
        queryVector: queryEmbedding,
        numCandidates: 50,
        limit: 5,
      },
    },
    {
      $project: {
        text: 1,
        filename: 1,
        score: { $meta: "vectorSearchScore" },
      },
    },
  ]);

  return results;
};
