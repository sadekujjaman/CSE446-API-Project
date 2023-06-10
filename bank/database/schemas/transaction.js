const mongoose = require("mongoose");
module.exports = new mongoose.Schema({
  senderAccountNo: "string",
  receiverAccountNo: "string",
  transactionAmount: "string",
  transactionId: "string",
  transactionAt: "date",
});
