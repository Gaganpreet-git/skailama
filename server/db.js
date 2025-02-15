const mongoose = require("mongoose");
const config = require("./config");

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoose.url);
    console.log("Connected to database");
  } catch (err) {
    console.error("Error connecting to database:", err);
  }
};

module.exports = connectDB;
