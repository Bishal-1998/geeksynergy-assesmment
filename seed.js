const mongoose = require("mongoose");

const seed = async () => {
  const empConn = await mongoose.createConnection(
    "mongodb://localhost:27017/employees_db"
  );
  const prodConn = await mongoose.createConnection(
    "mongodb://localhost:27017/products_db"
  );

  const employeeSchema = new mongoose.Schema({
    name: String,
    department: String,
    email: String,
  });
  const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    price: Number,
  });

  const Employee = empConn.model("Employee", employeeSchema);
  const Product = prodConn.model("Product", productSchema);

  await Employee.create({
    name: "Alice",
    department: "HR",
    email: "alice@example.com",
  });
  await Product.create({ name: "Widget", category: "Gadgets", price: 49.99 });

  console.log("Data inserted successfully!");
  process.exit();
};

seed();
