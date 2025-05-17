require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const createEmployeeModel = require("./models/employee");
const createProductModel = require("./models/product");

const app = express();
const port = process.env.PORT || 3000;

const employeeConn = mongoose.createConnection(process.env.EMPLOYEES_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const productConn = mongoose.createConnection(process.env.PRODUCTS_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Employee = createEmployeeModel(employeeConn);
const Product = createProductModel(productConn);

app.get("/combined-data", async (req, res) => {
  try {
    const employees = await Employee.find({});
    const products = await Product.find({});

    res.json({
      employees,
      products,
    });
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
