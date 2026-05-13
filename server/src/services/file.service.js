import fs from "fs";
import pdf from "pdf-parse-fork";
import mammoth from "mammoth";

export const readFileContent = async (file) => {
  const filePath = file.path;

  // PDF
  if (file.mimetype === "application/pdf") {
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdf(dataBuffer);
    return pdfData.text;
  }

  // DOCX
  if (
    file.mimetype ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({
      path: filePath,
    });

    return result.value;
  }

  throw new Error("Unsupported file type");
};