const models = require("./models");
const Account = models.Account;
const Transaction = models.Transaction;

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

async function postTransaction(senderAccount, receiverAccount, balance) {
  const senderAccountNo = senderAccount.accountNo;
  const receiverAccountNo = receiverAccount.accountNo;
  const max = 100;
  const randomNumber = parseInt(Math.floor(Math.random() * max));
  const transactionId = `${Date.now()}${randomNumber}`;
  const transaction = new Transaction({
    senderAccountNo,
    receiverAccountNo,
    transactionAmount: balance,
    transactionId,
    transactionAt: new Date().toISOString(),
  });
  await transaction.save();
  return transactionId;
}

async function makeTransaction(senderAccountNo, receiverAccountNo, balance) {
  if (senderAccountNo === receiverAccountNo) {
    throw new Error("Can't possible to make transaction in same account.");
  }
  const senderAccount = await Account.findOne({ accountNo: senderAccountNo });

  const receiverAccount = await Account.findOne({
    accountNo: receiverAccountNo,
  });

  if (!senderAccount || !receiverAccount) {
    const message = !senderAccount
      ? "Sender account " + senderAccountNo + " not found"
      : "Receiver account " + receiverAccountNo + " not found";
    throw new Error(message);
  }
  const _senderBalance = senderAccount.balance - balance;
  const _recieverBalance = receiverAccount.balance + balance;
  if (_senderBalance < 0) {
    throw new Error("Insufficient balance to make this transaction");
  }
  console.log(
    { senderAccount },
    { receiverAccount },
    { _senderBalance },
    { _recieverBalance }
  );

  await Account.updateOne(
    { accountNo: senderAccountNo },
    { $set: { balance: _senderBalance } },
    { upsert: true }
  );
  await Account.updateOne(
    { accountNo: receiverAccountNo },
    { $set: { balance: _recieverBalance } },
    { upsert: true }
  );
  const transactionId = await postTransaction(
    senderAccount,
    receiverAccount,
    balance
  );
  return transactionId;
}

module.exports = {
  deposit,
  withdraw,
  makeTransaction,
};
