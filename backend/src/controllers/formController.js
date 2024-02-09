require("dotenv").config();
const Event = require("../db/schema/Event");
const { isExistingUserById } = require("../util/db");

const POSTForm = async (req, res, next) => {
  const { userId, eventId } = req.body;
  if (!(userId && eventId)) {
    return res.status(403).json({
      error: "userId, eventId is required for viewing form",
    });
  }
  try {
    if (!isValidUser(userId)) {
      return res.status(403).json({ error: "not authorised" });
    }
    if (!(await isExistingEvent(eventId))) {
      return res.status(404).json({ error: "event not found" });
    }
    const form = await Event.findOne({ _id: eventId }, { _id: 0, prompts: 1 });
    return res.status(201).json(form);
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: err });
  }
};

const PATCHForm = async (req, res, next) => {
  const { userId, eventId, prompts } = req.body;
  if (!(userId && eventId && prompts)) {
    return res.status(403).json({
      error: "userId, eventId, prompts is required for updating form",
    });
  }
  try {
    if (!isValidUser(userId)) {
      return res.status(403).json({ error: "not authorised" });
    }
    if (!(await isExistingEvent(eventId))) {
      return res.status(404).json({ error: "event not found" });
    }
    const event = await Event.findOne({ _id: eventId });
    event.prompts = prompts;
    await event.save();
    return res.status(201).json({});
  } catch (err) {
    return res.status(401).json({ error: err });
  }
};

module.exports = {
  POSTForm,
  PATCHForm,
};

async function isExistingEvent(eventId) {
  const event = await Event.findOne({ _id: eventId });
  return event !== null;
}

function isValidUser(userId) {
  if (!userId) {
    throw new Error("userId is required for authentication");
  }
  return isExistingUserById(userId);
}
