import express from "express";
import { getChatPartners, getContacts, getMessagesByUserId, sendMessage } from "../controllers/message.controller";
import { protectRoute } from "../middlewares/auth.middleware";

const router = express.Router();
router.use(protectRoute);

router.get("/contacts", getContacts);

router.get("/chats", getChatPartners);

router.get("/messages/:id", getMessagesByUserId);

router.post("/send/:id", sendMessage);

export default router;