const express = require("express");
const router = express.Router();
const MessageController = require("../controllers/Message");


module.exports = () => {
    router.post("/message/new", MessageController.addMessage);
    router.get("/messages/:conversationId", MessageController.getMessages);
    return router;
};