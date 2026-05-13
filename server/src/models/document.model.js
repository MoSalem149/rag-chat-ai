import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema({
  text: String,
  embedding: [Number],
  filename: String,
});

export default mongoose.model("Document", DocumentSchema);
