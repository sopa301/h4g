import { Schema, model } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface User {
  userId: number;
  username: string;
  email: string;
  teleHandle: string;
  availability: string[][];
  isAdmin: boolean;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<User>({
  userId: { type: Number, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  teleHandle: { type: String, required: true },
  availability: { type: [[String]], required: true },
  isAdmin: { type: Boolean, required: true },
});

// 3. Create a Model.
export const User = model<User>("User", userSchema);
