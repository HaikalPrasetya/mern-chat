import express from "express";
import {
  sendMessage,
  getConversation,
  getConversationById,
} from "../controllers/message.controller.js";
import protectedRoute from "../middleware/protectedRoute.js";

const router = express.Router();

router.get("/:id", protectedRoute, getConversation);
router.get("/conversation/:id", protectedRoute, getConversationById);
router.post("/send/:id", protectedRoute, sendMessage);

export default router;
