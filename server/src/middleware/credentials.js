const allowedOrigins = require("../config/allowedOrigins");

const credentials = (req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    req.header("Access-Control-Allow-Credentials", true);
  }

  next();
};

module.exports = credentials;
