import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import chatRoutes from "./routes/chat.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo Connected"))
  .catch((err) => console.log(err));

app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
