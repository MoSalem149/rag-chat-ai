import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import chatRoutes from "./routes/chat.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// routes FIRST (important)
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

// START SERVER IMMEDIATELY
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on ${PORT}`);
});

// CONNECT DB AFTER
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo Connected"))
  .catch((err) => console.error("Mongo Error:", err));
