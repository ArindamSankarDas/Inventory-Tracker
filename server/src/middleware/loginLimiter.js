const { rateLimit } = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 6,
  message: {
    message:
      "Too many login attempts from this IP, please try again after a 60 seconds pause",
  },
  handler(req, res, next, options) {
    res.status(options.statusCode).send(options.message);
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = limiter;
