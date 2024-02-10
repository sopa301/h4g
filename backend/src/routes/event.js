const express = require("express");
const {
  PUTEvent,
  POSTEvent,
  PATCHEvent,
  DELETEEvent,
  POSTGetEvents,
  POSTGetMyEvents,
  POSTRegisterEvent,
  POSTLeaveEvent,
  POSTFeedback,
} = require("../controllers/eventController");

const router = express.Router();

router.put("/event", PUTEvent);

router.post("/event", POSTEvent);

router.patch("/event", PATCHEvent);

router.delete("/event", DELETEEvent);

router.post("/getEvents", POSTGetEvents);

router.post("/getMyEvents", POSTGetMyEvents);

router.post("/registerEvent", POSTRegisterEvent);

router.post("/leaveEvent", POSTLeaveEvent);

router.post("/feedback", POSTFeedback);

module.exports = router;
