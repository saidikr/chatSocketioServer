const express = require("express");
const router = express.Router();
const UserController = require("../controllers/User");


module.exports = () => {
    router.post("/user/register", UserController.register);
    router.get("/user/:userId", UserController.getUser);
    router.post("/user/login", UserController.login);
    router.get("/user/friends/:userId", UserController.getFriends);
    return router;
};
