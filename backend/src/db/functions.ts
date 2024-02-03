import mongoose from "mongoose";

import { ObjectId } from "mongodb";
import {} from "dotenv/config";

/**
 * Creates an ObjectId from a string according to the MongoDB documentation.
 *
 * @param id - id to be converted to ObjectId
 * @returns ObjectId
 */
function makeObjectId(id: string) {
  if (!ObjectId.isValid(id)) {
    throw new Error("Invalid project id: " + id);
  }
  return new ObjectId(id);
}

/**
 * Connects the app to the database server.
 */
export async function connectToDatabase() {
  const dbUri = process.env.MONGODB_URI;
  if (!dbUri) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }
  await mongoose.connect(dbUri).catch((error) => {
    console.error("Failed to connect to MongoDB", error);
  });
  console.log("Connected to database");
}
