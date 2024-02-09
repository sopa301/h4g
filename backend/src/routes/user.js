const express = require("express");
const { POSTUser } = require("../controllers/userController");

const router = express.Router();

router.post("/user", POSTUser);

module.exports = router;
