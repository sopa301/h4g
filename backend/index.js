// Imports
require("dotenv").config();
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// firebase imports
// const { onRequest } = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
// const functions = require("firebase-functions");

// import routes
const loginSignupRoutes = require("./src/routes/loginsignup");
// const myTasksRoutes = require("./src/routes/mytasks");
// const personAvailRoutes = require("./src/routes/personavail");
// const projManagementRoutes = require("./src/routes/projmanagement");
// const runAlgoRoutes = require("./src/routes/runalgo");
// const taskManagementRoutes = require("./src/routes/taskmanagement");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// use routes
app.use(loginSignupRoutes);
// app.use(myTasksRoutes);
// app.use(personAvailRoutes);
// app.use(projManagementRoutes);
// app.use(runAlgoRoutes);
// app.use(taskManagementRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Backend is running at port ${process.env.PORT}!`);
});

// for firebase
// exports.app = functions.https.onRequest(app);
