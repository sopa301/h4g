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
  mongoose.connection.on("connected", () => console.log("connected"));
  mongoose.connection.on("open", () => console.log("open"));
  mongoose.connection.on("disconnected", () => console.log("disconnected"));
  mongoose.connection.on("reconnected", () => console.log("reconnected"));
  mongoose.connection.on("disconnecting", () => console.log("disconnecting"));
  mongoose.connection.on("close", () => console.log("close"));

  mongoose.connect(dbUri);
}

module.exports = { connectToDatabase };
