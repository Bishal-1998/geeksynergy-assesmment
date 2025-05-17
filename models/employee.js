const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: String,
  department: String,
  email: String,
});

module.exports = (conn) => conn.model("Employee", employeeSchema);
