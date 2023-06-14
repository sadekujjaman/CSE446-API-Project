require("dotenv").config({ path: ".env" });
var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
const path = require("path");
const models = require("./database/models");
const { deposit, withdraw, makeTransaction } = require("./database/utils");

var upload = multer();
var app = express();
const apiUrl = "/api/v1";
const port = 4002;

// for parsing application/json
app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(upload.array());

const Account = models.Account;

app.get("", (req, res) => {
  return res.send(`Your bank server is running on port ${port}!`);
});

app.get(`${apiUrl}`, (req, res) => {
  return res.send(`Your bank server is running on port ${port}!`);
});

app.get(`${apiUrl}/account/email/:email`, (req, res) => {
  Account.findOne({ email: req.params.email }, (err, account) => {
    if (err) {
      console.log(err);
      return res.json({ error: "Error occurred during fetching account" });
    }
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    return res.json({ account });
  });
});

app.get(`${apiUrl}/account/:accountNo`, (req, res) => {
  Account.findOne({ accountNo: req.params.accountNo }, (err, account) => {
    if (err) {
      console.log(err);
      return res.json({ error: "Error occurred during fetching account" });
    }
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    return res.json({ account });
  });
});

app.post(`${apiUrl}/account/createAccount`, urlencodedParser, (req, res) => {
  const { name, address, accountNo, balance, email, secret } = req.body;

  const account = new Account({
    name,
    address,
    accountNo,
    balance,
    email,
  });
  account.save(function (err) {
    if (err) {
      return res.send("Error occurred, account creation failed. try again!");
    }
    res.send("Account created successfully!");
  });
});

app.post(
  `${apiUrl}/transaction/deposit`,
  urlencodedParser,
  async (req, res) => {
    try {
      const { accountNo, balance } = req.body;

      const dep = await deposit(accountNo, balance);
      res.send("Successfully deposit " + balance + " to account " + accountNo);
    } catch (err) {
      res.send("Error occurred! " + err.message);
    }
  }
);

app.post(
  `${apiUrl}/transaction/withdraw`,
  urlencodedParser,
  async (req, res) => {
    try {
      const { accountNo, balance } = req.body;

      const dep = await withdraw(accountNo, balance);
      res.send(
        "Successfully withdraw " + balance + " from account " + accountNo
      );
    } catch (err) {
      res.send("Error occurred! " + err.message);
    }
  }
);

app.post(
  `${apiUrl}/transaction/make-transaction`,
  urlencodedParser,
  async (req, res) => {
    try {
      const { senderAccountNo, receiverAccountNo, balance } = req.body;

      const transactionId = await makeTransaction(
        senderAccountNo,
        receiverAccountNo,
        parseFloat(balance)
      );
      res.json({
        transactionId,
        message:
          "Transaction success " +
          balance +
          ", from account " +
          senderAccountNo +
          " to account " +
          receiverAccountNo,
      });
    } catch (err) {
      res.send("Error occurred! " + err.message);
    }
  }
);

app.listen(port);
