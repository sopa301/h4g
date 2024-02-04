const express = require("express");
const {
  PUTEvent,
  POSTEvent,
  PATCHEvent,
  DELETEEvent,
} = require("../controllers/eventController");

const router = express.Router();

router.put("/event", PUTEvent);

router.post("/event", POSTEvent);

router.patch("/event", PATCHEvent);

router.delete("/event", DELETEEvent);

module.exports = router;
