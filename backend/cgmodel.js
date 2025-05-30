const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  RollNo: String, // Match JSON field names
  Name: String,
  SGPA: String,
  CGPA: Number,
  Branch: String,
  Year: Number,
});

module.exports = mongoose.model("Student", studentSchema);
