// third-party libraries
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// monodb config
const connectDB = require("./config/db");

// sever instances
const app = express();
const port = process.env.PORT || 3000;

// server config
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");
const { logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorLogger");

// initiate database connection
connectDB();

app.use(logger);

// check if the credentials can be passed
app.use(credentials);
// to check if the request of origin in allowed
app.use(cors(corsOptions));
// parse json requests
app.use(express.json());
// parse http cookies
app.use(cookieParser());

// request routes
app.use("/api/inventory", require("./routes/productRoute"));
app.use("/api/transactions", require("./routes/transactionRoute"));
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/auth", require("./routes/authRoute"));

app.use(errorHandler);

// establishing database connection
mongoose.connection.once("open", () => {
  console.log("Database connection established");

  app.listen(port, () => {
    console.log("Server is running in " + port);
  });
});

// database errors
mongoose.connection.on("error", (err) => {
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
