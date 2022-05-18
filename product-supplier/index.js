var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
// var mongoose = require("mongoose");

var upload = multer();
var app = express();
// for parsing application/json
app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: true });

const mongooseConFactory = require("./database/connection");
const mongooseCon = mongooseConFactory();

const Product = mongooseCon.models.Product;

app.get("/products", (req, res) => {
  Product.find({}, (err, products) => {
    if (err) {
      return res.json({ error: "Error occurred during fetching products" });
    }
    return res.json({ products });
  });
});

app.post("/addProduct", urlencodedParser, (req, res) => {
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

app.listen(3000);
