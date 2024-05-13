// third-party libraries
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

// monodb config
const connectDB = require("./config/db");

// sever instances
const app = express();
const port = process.env.PORT || 3000;

// initiate database connection
connectDB();

// parse json requests
app.use(express.json());

// request routes
app.use("/api/inventory", require("./routes/productRoute"));
app.use("/api/transactions", require("./routes/transactionRoute"));

// establishing database connection
mongoose.connection.once("open", () => {
  console.log("Database connection established");

  app.listen(port, () => {
    console.log("Server is running in " + port);
  });
});

// database errors
mongoose.connection.on("error", (error) => {
  console.log(error.message);
});
