require("dotenv").config();
const Event = require("../db/schema/Event");
const {
  makeNewEvent,
  replaceIdWithEventId,
  eventHasPerson,
  removePersonFromEvent,
  addPersonToEvent,
} = require("../db/util/event");
const { isExistingUserById, getUserById } = require("../util/db");

const PUTEvent = async (req, res, next) => {
  try {
    const { userId, eventName, eventDate, eventDesc, eventImg, prompts } =
      req.body;
    if (
      !(userId && eventName && eventDate && eventDesc && eventImg && prompts)
    ) {
      return res.status(403).json({
        error:
          "userId, eventName, eventDate, eventDesc, eventImg is required for adding event",
      });
    }
    if (!(await isValidUser(userId))) {
      return res.status(403).json({ error: "not authorised" });
    }
    const event = await Event.create(
      makeNewEvent(eventName, eventDate, eventDesc, eventImg, prompts)
    );
    const eventId = event._id.toString();
    return res.status(201).json({ eventId: eventId });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: err });
  }
};

const POSTEvent = async (req, res, next) => {
  try {
    const { userId, eventId } = req.body;
    if (!(userId && eventId)) {
      return res.status(403).json({
        error: "userId, eventId is required for getting event",
      });
    }
    if (!(await isValidUser(userId))) {
      return res.status(403).json({ error: "not authorised" });
    }
    const event = await Event.findOne(
      { _id: eventId },
      { eventName: 1, attendees: 1 }
    );
    return res
      .status(201)
      .json({ eventName: event.eventName, attendees: event.attendees });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: err });
  }
};

const PATCHEvent = async (req, res, next) => {
  const { userId, eventId } = req.body;
  if (!(userId && eventId)) {
    return res.status(403).json({
      error: "userId, eventId is required for updating event",
    });
  }
  try {
    if (!(await isValidUser(userId))) {
      return res.status(403).json({ error: "not authorised" });
    }
    const event = await Event.findOne({ _id: eventId });
    if (event === null) {
      return res.status(404).json({ error: "event not found" });
    }
    for (let key in req.body) {
      if (
        key === "eventId" ||
        key === "__v" ||
        key === "_id" ||
        key === "attendees" || // attendees should not be messed with like this for simplicity
        !req.body[key]
      ) {
        continue;
      }
      event[key] = req.body[key];
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
    if (!(await isValidUser(userId))) {
      return res.status(403).json({ error: "not authorised" });
    }
    const deleted = await Event.deleteOne({ _id: eventId });
    if (deleted.deletedCount === 0) {
      return res.status(404).json({ error: "event not found" });
    }
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
    if (!(await isValidUser(userId))) {
      return res.status(403).json({ error: "not authorised" });
    }
    let events = await Event.find(
      {},
      { eventName: 1, eventDate: 1, eventImg: 1, eventDesc: 1, _id: 1 }
    );
    events = events.map(replaceIdWithEventId);
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
    if (!(await isValidUser(userId))) {
      return res.status(403).json({ error: "not authorised" });
    }
    let events = await Event.find(
      {},
      {
        eventName: 1,
        eventDate: 1,
        eventImg: 1,
        eventDesc: 1,
        attendees: 1,
        _id: 1,
      }
    );
    events = events.filter((event) => eventHasPerson(event, userId));
    events = events.map((event) => {
      event = replaceIdWithEventId(event);
      delete event.attendees;
      return event;
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
    const user = await getUserById(userId);
    if (user === null) {
      return res.status(404).json({ error: "user not found" });
    }
    const event = await Event.findOne({ _id: eventId });
    if (event === null) {
      return res.status(404).json({ error: "event not found" });
    }
    if (eventHasPerson(event, userId)) {
      return res.status(403).json({ error: "user already registered" });
    }
    addPersonToEvent(event, user, responses);
    await event.save();
    return res.status(201).json({});
  } catch (err) {
    console.log(err);
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
    if (!(await isValidUser(userId))) {
      return res.status(403).json({ error: "not authorised" });
    }
    const event = await Event.findOne({ _id: eventId });
    if (event === null) {
      return res.status(404).json({ error: "event not found" });
    }
    if (!eventHasPerson(event, userId)) {
      return res.status(403).json({ error: "user not registered" });
    }
    removePersonFromEvent(event, userId);
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
  POSTGetMyEvents,
  POSTRegisterEvent,
  POSTLeaveEvent,
};

async function isValidUser(userId) {
  if (!userId) {
    throw new Error("userId is required for authentication");
  }
  return await isExistingUserById(userId);
}
