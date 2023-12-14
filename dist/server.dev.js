"use strict";

var express = require("express");

var dotenv = require("dotenv").config();

var errorHandler = require("./middleware/errorHandler");

var app = express();
var port = process.env.PORT || 5000;

var connectdb = require("./config/dbConnection"); //call the connectdb the connection i createed with the db


connectdb();
app.use(express.json()); //this one is the middleware that serves for parsin the data body when we execute a post command , without it the request body is undefined

app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);
app.listen(port, function () {
  console.log("server running on port ".concat(port));
});