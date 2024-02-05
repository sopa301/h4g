require("dotenv").config();
const { makeObjectId } = require("../db/functions");
const Event = require("../db/schema/Event");
const { isExistingUser } = require("../util/db");

const PUTEvent = async (req, res, next) => {
  const { userId, eventName, eventDate, eventDesc, eventImg } = req.body;
  if (!(userId && eventName && eventDate && eventDesc && eventImg)) {
    return res.status(403).json({
      error:
        "userId, eventName, eventDate, eventDesc, eventImg is required for adding event",
    });
  }
  try {
    if (!isValidUser(userId)) {
      return res.status(403).json({ error: "not authorised" });
    }
    const event = await Event.create({
      eventName: eventName,
      eventDate: eventDate,
      eventDesc: eventDesc,
      eventImg: eventImg,
      attendees: [],
    });
    return res.status(201).json({ eventId: event._id.toString() });
  } catch (err) {
    return res.status(401).json({ error: err });
  }
};

const POSTEvent = async (req, res, next) => {
  const { userId, eventId } = req.body;
  if (!(userId && eventId)) {
    return res.status(403).json({
      error: "userId, eventId is required for viewing event",
    });
  }
  try {
    if (!isValidUser(userId)) {
      return res.status(403).json({ error: "not authorised" });
    }
    const event = await Event.findOne({ _id: eventId });
    if (event === null) {
      return res.status(404).json({ error: "event not found" });
    }
    return res.status(201).json({
      eventId: eventId,
      eventName: event.eventName,
      eventDate: event.eventDate,
      eventDesc: event.eventDesc,
      eventImg: event.eventImg,
      attendees: event.attendees,
    });
  } catch (err) {
    return res.status(401).json({ error: err });
  }
};

const PATCHEvent = async (req, res, next) => {
  const {
    userId,
    eventId,
    eventName,
    eventDate,
    eventDesc,
    eventImg,
    attendees,
  } = req.body;
  if (!(userId && eventId)) {
    return res.status(403).json({
      error: "userId, eventId is required for updating event",
    });
  }
  try {
    if (!isValidUser(userId)) {
      return res.status(403).json({ error: "not authorised" });
    }
    const event = await Event.findOne({ _id: eventId });
    if (event === null) {
      return res.status(404).json({ error: "event not found" });
    }
    if (eventName) {
      event.eventName = eventName;
    }
    if (eventDate) {
      event.eventDate = eventDate;
    }
    if (eventDesc) {
      event.eventDesc = eventDesc;
    }
    if (eventImg) {
      event.eventImg = eventImg;
    }
    if (attendees) {
      event.attendees = attendees;
    }
    await event.save();
    return res.status(201).json({ success: "success" });
  } catch (err) {
    return res.status(401).json({ error: err });
  }
};

const DELETEEvent = async (req, res, next) => {
  const { userId, eventId } = req.body;
  if (!(userId && eventId)) {
    return res.status(403).json({
      error: "userId, eventId is required for deleting event",
    });
  }
  try {
    if (!isValidUser(userId)) {
      return res.status(403).json({ error: "not authorised" });
    }
    await Event.deleteOne({ _id: eventId });
    return res.status(201).json({ success: "success" });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: err });
  }
};

const POSTGetEvents = async (req, res, next) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(403).json({
      error: "userId is required for getting events",
    });
  }
  try {
    if (!isValidUser(userId)) {
      return res.status(403).json({ error: "not authorised" });
    }
    const events = await Event.find({}, { attendees: 0 });
    events.forEach((event) => {
      event.eventId = event._id.toString();
    });
    return res.status(201).json({ events: events });
  } catch (err) {
    return res.status(401).json({ error: err });
  }
};

const POSTRegisterEvent = async (req, res, next) => {
  const { userId, eventId } = req.body;
  if (!(userId && eventId)) {
    return res.status(403).json({
      error: "userId, eventId is required for registering event",
    });
  }
  try {
    if (!isValidUser(userId)) {
      return res.status(403).json({ error: "not authorised" });
    }
    const event = await Event.findOne({ _id: eventId });
    if (event === null) {
      return res.status(404).json({ error: "event not found" });
    }
    event.attendees.push(userId);
    await event.save();
    return res.status(201).json({ success: "success" });
  } catch (err) {
    return res.status(401).json({ error: err });
  }
};

module.exports = {
  PUTEvent,
  POSTEvent,
  DELETEEvent,
  PATCHEvent,
  POSTGetEvents,
  POSTRegisterEvent,
};

function isValidUser(userId) {
  if (!userId) {
    throw new Error("userId is required for authentication");
  }
  return isExistingUser(userId);
}
