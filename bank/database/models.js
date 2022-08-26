const mongooseConFactory = require("./connection");
const mongooseCon = mongooseConFactory();

const Account = mongooseCon.models.Account;
const Transaction = mongooseCon.models.Transaction;

module.exports = {
  Account,
  Transaction,
};
