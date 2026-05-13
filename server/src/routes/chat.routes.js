import express from "express";
import multer from "multer";
import { uploadFile, askQuestion } from "../controllers/chat.controller.js";

const router = express.Router();

const upload = multer({ dest: "src/uploads/" });

router.post("/upload", upload.single("file"), uploadFile);
router.post("/ask", askQuestion);

export default router;
