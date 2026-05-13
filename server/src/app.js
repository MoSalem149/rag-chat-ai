import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import chatRoutes from "./routes/chat.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 3000;

//  START SERVER FIRST (Cloud Run requirement)
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on ${PORT}`);
});

// CONNECT DB AFTER (non-blocking)
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 30000, // helps prevent hanging
  })
  .then(() => console.log("Mongo Connected"))
  .catch((err) => console.error("Mongo Error:", err));
