require("dotenv").config();
const Event = require("../db/schema/Event");
const Form = require("../db/schema/Form");

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
    const form = await Form.findOne({ eventId: eventId });
    if (form === null) {
      return res.status(404).json({ error: "form not found" });
    }
    return res.status(201).json({
      eventId: eventId,
      prompts: form.prompts,
    });
  } catch (err) {
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
    const form = await Form.findOne({ eventId: eventId });
    if (form === null) {
      return res.status(404).json({ error: "form not found" });
    }
    form.prompts = prompts;
    await form.save();
    return res.status(201).json({});
  } catch (err) {
    return res.status(401).json({ error: err });
  }
};

module.exports = {
  PUTForm,
  POSTForm,
  PATCHForm,
  DELETEForm,
};

async function isExistingEvent(eventId) {
  const event = await Event.findOne({ _id: eventId });
  return event !== null;
}
