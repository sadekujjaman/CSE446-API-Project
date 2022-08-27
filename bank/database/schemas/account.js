const mongoose = require("mongoose");
module.exports = new mongoose.Schema({
  name: "string",
  email: "string",
  address: "string",
  accountNo: "string",
  balance: "number",
});
