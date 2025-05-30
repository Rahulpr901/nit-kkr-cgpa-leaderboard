const mongoose = require("mongoose");
const cgpamodel = require("./cgmodel");
const studentsData = require("./students1.json"); // Load JSON file
// Insert all students
async function importData() {
  try {
    await mongoose.connect("mongodb://localhost:27017/studentDB");
    console.log("Connected to MongoDB successfully");
    // Optional: Delete old data
    await cgpamodel.deleteMany({});

    // Insert new data
    await cgpamodel.insertMany(
      studentsData.map((student) => ({
        RollNo: student["Roll No"], // Map JSON fields to schema
        Name: student.Name,
        SGPA: student.SGPA,
        CGPA: student.CGPA,
        Branch: student.Branch,
        Year: student.Year
      }))
    );

    console.log("Data imported successfully!");
  } catch (error) {
    console.error("Error importing data:", error);
  } finally {
    mongoose.disconnect();
  }
}
importData();
