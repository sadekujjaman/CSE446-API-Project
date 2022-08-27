/**
 * Resources
 * 1. MongoDB: https://www.mongodb.com/docs/drivers/node/current/quick-start/
 * 2. Mongoose: https://mongoosejs.com/docs/connections.html
 * 3. Mongoose + MongoDB atlas: https://stackoverflow.com/questions/43394019/how-to-connect-to-mongodb-atlas-using-mongoose
 * 4. Mongoose model: https://mongoosejs.com/docs/models.html
 */

const mongoose = require("mongoose");
const productSchema = require("./schemas/product");
const orderSchema = require("./schemas/order");

module.exports = function connectionFactory() {
  const conn = mongoose.createConnection(process.env.MONGODB_URI);
  conn.model("Product", productSchema);
  conn.model("Order", orderSchema);
  return conn;
};
