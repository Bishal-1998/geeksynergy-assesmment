const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
});

module.exports = (conn) => conn.model("Product", productSchema);
