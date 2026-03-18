import express from "express";
import { getContacts } from "../controllers/message.controller";
import { protectRoute } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/contacts", protectRoute, getContacts);

// router.get("/chats", getChatPartners);

// router.get("/messages/:id", getMessagesByUserId);

// router.post("/send/:id", sendMessage);

export default router;