import * as dotenv from "dotenv";
import express from "express";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import { connectToDatabase } from "./db/functions";

// Load environment variables
dotenv.config();

const app = express();

// Connect to MongoDB
connectToDatabase();

// Define routes
// TODO: Add your routes here

// Start the server
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res, next) => {
  console.log("This always runs!");
  res.send("Backend is running at port 4000!");
});
