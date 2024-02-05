const express = require("express");
const {
  PUTEvent,
  POSTEvent,
  PATCHEvent,
  DELETEEvent,
  POSTGetEvents,
  POSTRegisterEvent,
} = require("../controllers/eventController");

const router = express.Router();

router.put("/event", PUTEvent);

router.post("/event", POSTEvent);

router.patch("/event", PATCHEvent);

router.delete("/event", DELETEEvent);

router.post("/getEvents", POSTGetEvents);

router.post("/registerEvent", POSTRegisterEvent);

module.exports = router;
