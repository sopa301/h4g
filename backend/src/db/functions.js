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
  const conn = await mongoose.createConnection(dbUri).catch((error) => {
    console.error("Failed to connect to MongoDB", error);
  });

  conn.on("connected", () => console.log("connected"));
  conn.on("open", () => console.log("open"));
  conn.on("disconnected", () => console.log("disconnected"));
  conn.on("reconnected", () => console.log("reconnected"));
  conn.on("disconnecting", () => console.log("disconnecting"));
  conn.on("close", () => console.log("close"));
}

module.exports = { connectToDatabase };
