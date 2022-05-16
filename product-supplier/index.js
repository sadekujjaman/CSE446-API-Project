var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
// var mongoose = require("mongoose");

var upload = multer();
var app = express();
const mongooseConFactory = require("./database/connection");
const mongooseCon = mongooseConFactory();

const product1 = new mongooseCon.models.Product({
  name: "Product xyz",
  category: "Category xyz",
  price: 130,
  description: "Description xyz",
});
console.log({ product1 });
product1.save(function (err) {
  if (err) {
    console.log("ERROR");
    return;
    // return handleError(err);
  }
  console.log("Product saved");
  // saved!
});

app.listen(3000);
