const express = require("express");
const {
  signupUser,
  loginUser,
  validateUser,
} = require("../controllers/userSignupLoginController");

const router = express.Router();

router.post("/signup", signupUser);

router.post("/login", loginUser);

router.post("/validate", validateUser);

module.exports = router;
