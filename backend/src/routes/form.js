const express = require("express");
const {
  PUTForm,
  POSTForm,
  PATCHForm,
  DELETEForm,
} = require("../controllers/formController");

const router = express.Router();

router.put("/form", PUTForm);

router.post("/form", POSTForm);

router.patch("/form", PATCHForm);

router.delete("/form", DELETEForm);

module.exports = router;
