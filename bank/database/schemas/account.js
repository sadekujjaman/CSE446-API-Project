const mongoose = require("mongoose");
module.exports = new mongoose.Schema({
  name: "string",
  address: "string",
  accountNo: "string",
  balance: "number",
});
