const models = require("./models");

const Account = models.Account;

async function deposit(accountNo, balance) {
  const account = await Account.findOne({ accountNo });
  if (!account) {
    throw new Error("Account not found! Please try with valid account no.");
  }
  const _balance = account.balance + balance;
  await Account.updateOne(
    { accountNo },
    { $set: { balance: _balance } },
    { upsert: true }
  );
}

async function withdraw(accountNo, balance) {
  const account = await Account.findOne({ accountNo });
  if (!account) {
    throw new Error("Account not found! Please try with valid account no.");
  }
  const _balance = account.balance - balance;
  if (_balance < 0) {
    throw new Error("Insufficient balance");
  }
  await Account.updateOne(
    { accountNo },
    { $set: { balance: _balance } },
    { upsert: true }
  );
}

async function makeTransaction(senderAccountNo, recieverAccountNo, balance) {
  const senderAccount = await Account.findOne({ accountNo: senderAccountNo });
  const recieverAccount = await Account.findOne({
    accountNo: recieverAccountNo,
  });
  if (!senderAccount || !recieverAccountNo) {
    const message = senderAccount
      ? "Sender account " + senderAccountNo + " not found"
      : "Receiver account " + recieverAccountNo + " not found";
    throw new Error(message);
  }
  const _senderBalance = senderAccount.balance - balance;
  const _recieverBalance = recieverAccount.balance + balance;
  if (_senderBalance < 0) {
    throw new Error("Insufficient balance to make this transaction");
  }
  await deposit(recieverAccount, balance);
  await deposit(recieverAccount, balance);
}

module.exports = {
  deposit,
  withdraw,
  makeTransaction,
};
