const express = require("express");
const router = express.Router();
const ConversationController = require("../controllers/Conversation");


module.exports = () => {
    router.post("/newconversation", ConversationController.createConversation);
    router.get("/conversation/:userId",ConversationController.getConversation);
    return router;
};

