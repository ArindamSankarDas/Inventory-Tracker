const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_details: {
    username: String,
    emailId: String,
    password: String,
  },
  shop_details: {
    shopname: String,
    address: String,
  },
});

module.exports = mongoose.model("user", userSchema);
