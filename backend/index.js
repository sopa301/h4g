// Imports
require("dotenv").config();
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectToDatabase } = require("./src/db/functions");

// import routes
const loginSignupRoutes = require("./src/routes/loginsignup");
const eventRoutes = require("./src/routes/event");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// use routes
app.use(loginSignupRoutes);
app.use(eventRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Backend is running at port ${process.env.PORT}!`);
});

connectToDatabase();
