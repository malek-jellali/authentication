const express = require("express");

const dotenv = require("dotenv").config();

const errorHandler = require("./middleware/errorHandler");

const app = express();

const port = process.env.PORT || 5000;

const connectdb = require("./config/dbConnection");

//call the connectdb the connection i createed with the db
connectdb();

app.use(express.json()); //this one is the middleware that serves for parsin the data body when we execute a post command , without it the request body is undefined

app.use("/api/contacts", require("./routes/contactRoutes"));

app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
