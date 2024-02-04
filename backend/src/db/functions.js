const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

/**
 * Creates an ObjectId from a string according to the MongoDB documentation.
 *
 * @param id - id to be converted to ObjectId
 * @returns ObjectId
 */
function makeObjectId(id) {
  if (!ObjectId.isValid(id)) {
    throw new Error("Invalid Object id: " + id);
  }
  return ObjectId.createFromTime(id);
}

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

module.exports = { connectToDatabase, makeObjectId };
