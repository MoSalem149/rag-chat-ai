import { readFileContent } from "../services/file.service.js";
import { splitText } from "../services/chunk.service.js";
import { getEmbeddings } from "../services/embedding.service.js";
import Document from "../models/document.model.js";
import { searchSimilarChunks } from "../services/search.service.js";
import { getLLM } from "../services/gpt.service.js";

export const uploadFile = async (req, res) => {
  try {
    const content = await readFileContent(req.file);

    const chunks = await splitText(content);

    const embeddings = getEmbeddings();
    const vectors = await embeddings.embedDocuments(chunks);

    await Document.insertMany(
      chunks.map((chunk, i) => ({
        text: chunk,
        embedding: vectors[i],
        filename: req.file.originalname,
      })),
    );

    res.json({
      success: true,
      chunks: chunks.length,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const askQuestion = async (req, res) => {
  try {
    const { question } = req.body;

    const docs = await searchSimilarChunks(question);

    const context = docs.map((d) => d.text).join("\n\n");

    const prompt = `
If answer is not in context, say "I don't know based on the provided document."
Be concise and accurate.

${context}

Question:
${question}
`;

    const llm = getLLM();

    const response = await llm.invoke(prompt);

    res.json({
      answer: response.content,
      sources: docs,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
