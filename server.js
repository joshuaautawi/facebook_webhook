const express = require("express");
const app = express();
require("dotenv").config();
const router = require("./routers/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

// api routes
// app.use('/users', require('./users/users.controller'));

// start server

app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
