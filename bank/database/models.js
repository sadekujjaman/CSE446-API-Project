const mongooseConFactory = require("./connection");
const mongooseCon = mongooseConFactory();

const Account = mongooseCon.models.Account;
module.exports = {
  Account,
};
