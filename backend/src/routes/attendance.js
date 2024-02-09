const express = require("express");
const { POSTForm, PATCHForm } = require("../controllers/formController");

const router = express.Router();

router.post("/form", POSTForm);

router.patch("/form", PATCHForm);

module.exports = router;
