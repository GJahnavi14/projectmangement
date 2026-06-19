// config/db.js
// Handles MongoDB connection using Mongoose

const mongoose = require("mongoose");

/**
 * Connect to MongoDB using the URI from environment variables.
 * Exits the process on failure to prevent the server from running without a DB.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1); // Exit with failure code
  }
};

module.exports = connectDB;
