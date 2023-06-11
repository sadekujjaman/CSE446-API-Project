require("dotenv").config({ path: ".env" });
var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
const path = require("path");
const { Product, Order } = require("./database/models");

var upload = multer();
var app = express();
const apiUrl = "/api/v1";
const port = 4000;

// for parsing application/json
app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(upload.array());

app.get("", (req, res) => {
  return res.send(`Your product-supplier server is running on port ${port}!`);
});

app.get(`${apiUrl}`, (req, res) => {
  return res.send(`Your product-supplier server is running on port ${port}!`);
});

app.get(`${apiUrl}/products`, (req, res) => {
  Product.find({}, (err, products) => {
    if (err) {
      return res.json({ error: "Error occurred during fetching products" });
    }
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    return res.json({ products });
  });
});

app.get(`${apiUrl}/product/:id`, (req, res) => {
  Product.findOne({ _id: req.params.id }, (err, product) => {
    if (err) {
      return res.json({ error: "Error occurred during fetching products" });
    }
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    return res.json({ product });
  });
});

app.post(`${apiUrl}/addProduct`, urlencodedParser, (req, res) => {
  const { name, category, description, price } = req.body;

  const product = new Product({
    name,
    category,
    price,
    description,
  });
  product.save(function (err) {
    if (err) {
      return res.send("Error occurred, product saved failed. try again!");
    }
    res.send("Product saved successfully!");
  });
});

app.post(`${apiUrl}/createOrder`, urlencodedParser, (req, res) => {
  const { products, address, transactionId, amount } = req.body;
  const max = 10;
  const randomNumber = parseInt(Math.floor(Math.random() * max));
  const dateStr = String(Date.now());
  const pref = dateStr.substring(7);
  const orderId = `${pref}${randomNumber}`;

  const order = new Order({
    products,
    address,
    transactionId,
    amount,
    status: "pending",
    orderAt: new Date().toISOString(),
    orderId,
  });
  order.save(function (err) {
    if (err) {
      return res.send("Error occurred, order creation failed. try again!");
    }
    res.send("Order created successfully!");
  });
});

app.post(
  `${apiUrl}/order/updateOrderStatus`,
  urlencodedParser,
  async (req, res) => {
    try {
      const { orderId, updatedStatus } = req.body;
      console.log({ orderId });
      const order = await Order.find({ orderId });
      console.log({ order });
      const newOrderData = { ...order, status: updatedStatus };
      console.log({ newOrderData });
      if (updatedStatus === "delivered") {
        newOrderData["deliveredAt"] = new Date().toISOString();
      }
      await Order.updateOne(
        { orderId },
        { $set: { ...newOrderData } },
        { upsert: true }
      );
      return res.status(200).json({ status: "Ok" });
    } catch (err) {
      return res.status(500).json({ error: "Error Occurred!" });
    }
  }
);

app.get(`${apiUrl}/orders`, urlencodedParser, (req, res) => {
  Order.find({}, (err, orders) => {
    if (err) {
      return res.json({ error: "Error occurred during fetching orders" });
    }
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    return res.json({ orders });
  });
});

app.listen(port);
