const express = require('express')
const app = express()
const bodyParser = require("body-parser");
require("dotenv").config();
require("./config/db").connect();
const PORT = process.env.PORT;
const cors = require('cors')
const apiRoutes=require('./routes')


app.use(bodyParser.json());
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use("/", apiRoutes());


app.listen(3555)

console.log(`app started at port : ${3555}`)