const express = require("express");
const { POSTUser, PATCHUser } = require("../controllers/userController");

const router = express.Router();

router.post("/user", POSTUser);

router.patch("/user", PATCHUser);

module.exports = router;
