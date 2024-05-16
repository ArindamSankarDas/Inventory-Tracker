const crypto = require("node:crypto");

const hashedPassword = async (algo, salt, pwd) =>
  crypto.createHmac(algo, salt).update(pwd).digest("hex");

module.exports = { hashedPassword };
