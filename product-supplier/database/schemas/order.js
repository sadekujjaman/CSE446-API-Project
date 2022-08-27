const mongoose = require("mongoose");
const productSchema = require("./product");

module.exports = new mongoose.Schema({
  products: [{ product: productSchema, count: Number }],
  address: {
    city: String,
    area: String,
    houseNo: String,
    phone: String,
  },
  transactionId: String,
  amount: Number,
});
