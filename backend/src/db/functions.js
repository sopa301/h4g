const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

/**
 * Connects the app to the database server.
 */
async function connectToDatabase() {
  const dbUri = process.env.MONGODB_URI;
  if (!dbUri) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }
  await mongoose.connect(dbUri).catch((error) => {
    console.error("Failed to connect to MongoDB", error);
  });
  console.log("Connected to database");
}

module.exports = { connectToDatabase };
