const express = require("express");
const conversationRoutes = require("./conversation");
const messageRoutes = require("./messages");
const userRoutes = require("./user")
const router = express.Router();


// get allproducts
module.exports = () => {
  router.use("/api",messageRoutes(),conversationRoutes(),userRoutes());
  return router;
};
