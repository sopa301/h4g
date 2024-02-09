require("dotenv").config();
const Event = require("../db/schema/Event");
const Form = require("../db/schema/Form");
const { isExistingUserById } = require("../util/db");

const PUTEvent = async (req, res, next) => {
  const { userId, eventName, eventDate, eventDesc, eventImg, prompts } =
    req.body;
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
    const eventId = event._id.toString();
    if (!prompts) {
      prompts = [];
    }
    await Form.create({ eventId: eventId, prompts: prompts, respondees: [] });
    return res.status(201).json({ eventId: eventId });
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
    const deleted = await Event.deleteOne({ _id: eventId });
    if (deleted.deletedCount === 0) {
      return res.status(404).json({ error: "event not found" });
    }
    await Form.deleteOne({ eventId: eventId });
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
    let events = await Event.find({}, { attendees: 0, __v: 0 });
    events = events.map((event) => {
      return {
        eventId: event._id.toString(),
        eventName: event.eventName,
        eventDate: event.eventDate,
        eventDesc: event.eventDesc,
        eventImg: event.eventImg,
      };
    });
    return res.status(201).json({ events: events });
  } catch (err) {
    return res.status(401).json({ error: err });
  }
};

const POSTGetMyEvents = async (req, res, next) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(403).json({
      error: "userId is required for getting my events",
    });
  }
  try {
    if (!isValidUser(userId)) {
      return res.status(403).json({ error: "not authorised" });
    }
    let events = await Event.find({}, { __v: 0 });
    events = events.filter((event) => event.attendees.includes(userId));
    events = events.map((event) => {
      return {
        eventId: event._id.toString(),
        eventName: event.eventName,
        eventDate: event.eventDate,
        eventDesc: event.eventDesc,
        eventImg: event.eventImg,
      };
    });
    return res.status(201).json({ events: events });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: err });
  }
};

const POSTRegisterEvent = async (req, res, next) => {
  const { userId, eventId, responses } = req.body;
  if (!(userId && eventId && responses)) {
    return res.status(403).json({
      error: "userId, eventId, responses are required for registering event",
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
    if (event.attendees.includes(userId)) {
      return res.status(403).json({ error: "user already registered" });
    }
    event.attendees.push(userId);
    await event.save();
    const form = await Form.findOne({ eventId: eventId });
    if (form === null) {
      return res
        .status(404)
        .json({ error: "form not found. please contact the admin" });
    }
    form.respondees.push({ userId: userId, responses: responses });
    return res.status(201).json({});
  } catch (err) {
    return res.status(401).json({ error: err });
  }
};

const POSTLeaveEvent = async (req, res, next) => {
  const { userId, eventId } = req.body;
  if (!(userId && eventId)) {
    return res.status(403).json({
      error: "userId, eventId is required for leaving event",
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
    if (!event.attendees.includes(userId)) {
      return res.status(403).json({ error: "user not registered" });
    }
    event.attendees = event.attendees.filter((id) => id !== userId);
    await event.save();
    await Form.updateOne(
      { eventId: eventId },
      { $pull: { respondees: { userId: userId } } }
    );
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
  POSTGetMyEvents,
  POSTRegisterEvent,
  POSTLeaveEvent,
};

function isValidUser(userId) {
  if (!userId) {
    throw new Error("userId is required for authentication");
  }
  return isExistingUserById(userId);
}
