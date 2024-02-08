// Imports
require("dotenv").config();
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectToDatabase } = require("./db/functions");

/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// firebase imports
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");

// import routes
const loginSignupRoutes = require("./routes/loginsignup");
const eventRoutes = require("./routes/event");
const formRoutes = require("./routes/form");

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res, next) => {
  console.log("This always runs!");
  res.send("Backend is running at port 4000!");
});

// use routes
app.use(loginSignupRoutes);
app.use(eventRoutes);
app.use(formRoutes);

// Creating connection to listen for HTTP requests
app.listen(process.env.PORT, () => {
  console.log(`Backend is running at port ${process.env.PORT}!`);
});
connectToDatabase();

exports.app = functions.https.onRequest(app);
