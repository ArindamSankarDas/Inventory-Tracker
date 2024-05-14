const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  transactionType: String,
  customer_details: {
    name: String,
    phone: Number,
    address: String,
  },
  product_details: {
    name: String,
    price: Number,
    itemCount: Number,
  },
});

module.exports = mongoose.model("transaction", transactionSchema);
