// third-party libraries
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// monodb config
const connectDB = require("./config/db");

// sever instances
const app = express();
const port = process.env.PORT || 3000;

// initiate database connection
connectDB();

// parse json and form requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

// request routes
app.use("/api/inventory", require("./routes/productRoute"));
app.use("/api/transactions", require("./routes/transactionRoute"));
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/auth", require("./routes/authRoute"));

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
