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
      userId: userId,
      eventName: eventName,
      eventDate: eventDate,
      eventDesc: eventDesc,
      eventImg: eventImg,
    });
    return res
      .status(201)
      .json({ success: "success", eventId: event._id.toString() });
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
    const event = await Event.findOne({ _id: makeObjectId(eventId) });
    if (event === null) {
      return res.status(404).json({ error: "event not found" });
    }
    return res.status(201).json({
      success: "success",
      eventId: eventId,
      eventName: event.eventName,
      eventDate: event.eventDate,
      eventDesc: event.eventDesc,
      eventImg: event.eventImg,
    });
  } catch (err) {
    return res.status(401).json({ error: err });
  }
};

const PATCHEvent = async (req, res, next) => {
  const { userId, eventId, eventName, eventDate, eventDesc, eventImg } =
    req.body;
  if (!(userId && eventId)) {
    return res.status(403).json({
      error: "userId, eventId is required for updating event",
    });
  }
  try {
    if (!isValidUser(userId)) {
      return res.status(403).json({ error: "not authorised" });
    }
    const event = await Event.findOne({ _id: makeObjectId(eventId) });
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
    const event = await Event.findOne({ _id: makeObjectId(eventId) });
    if (event === null) {
      return res.status(404).json({ error: "event not found" });
    }
    await event.delete();
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
};

function isValidUser(userId) {
  if (!userId) {
    throw new Error("userId is required for authentication");
  }
  return isExistingUser(userId);
}
