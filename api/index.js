const express = require("express");
const mongoose = require("mongoose");
const serverless = require("serverless-http");
const createEmployeeModel = require("../models/employee");
const createProductModel = require("../models/product");

const app = express();

const EMP_URI = process.env.EMPLOYEES_DB_URI;
const PROD_URI = process.env.PRODUCTS_DB_URI;

let Employee, Product;

mongoose
  .createConnection(EMP_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((conn) => {
    Employee = createEmployeeModel(conn);
  });

mongoose
  .createConnection(PROD_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((conn) => {
    Product = createProductModel(conn);
  });

app.get("/api/combined-data", async (req, res) => {
  try {
    const employees = await Employee.find({});
    const products = await Product.find({});
    res.json({ employees, products });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

module.exports = app;
module.exports.handler = serverless(app);
