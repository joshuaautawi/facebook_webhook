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
const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 5432;
app.listen(port, () => console.log("Server listening on port " + port));
