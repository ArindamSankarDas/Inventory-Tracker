const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  userId: { type: String, required: true },
  price: Number,
  itemCount: Number,
  isSeasonal: { type: Boolean, default: false },
});

module.exports = mongoose.model("product", productSchema);
