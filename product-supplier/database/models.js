const mongooseConFactory = require("./connection");
const mongooseCon = mongooseConFactory();
const Product = mongooseCon.models.Product;
const Order = mongooseCon.models.Order;

module.exports = {
  Product,
  Order,
};
