const mongoose = require("mongoose");
module.exports = new mongoose.Schema({
  name: "string",
  category: "string",
  price: "number",
  description: "string",
});
