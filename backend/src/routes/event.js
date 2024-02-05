const express = require("express");
const {
  PUTEvent,
  POSTEvent,
  PATCHEvent,
  DELETEEvent,
  POSTGetEvents,
  POSTRegisterEvent,
  POSTLeaveEvent,
} = require("../controllers/eventController");

const router = express.Router();

router.put("/event", PUTEvent);

router.post("/event", POSTEvent);

router.patch("/event", PATCHEvent);

router.delete("/event", DELETEEvent);

router.post("/getEvents", POSTGetEvents);

router.post("/registerEvent", POSTRegisterEvent);

router.post("/leaveEvent", POSTLeaveEvent);

module.exports = router;
