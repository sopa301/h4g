require("dotenv").config();
const Event = require("../db/schema/Event");
const { isExistingUserById } = require("../util/db");
const jwt = require("jsonwebtoken");

// QRCode generation
const codeDuration = "365d";
const jwtSecret = process.env.SECRET;

const POSTMakeQrCode = async (req, res, next) => {
  const { userId, eventId } = req.body;
  if (!(userId && eventId)) {
    return res
      .status(403)
      .json({ error: "userId, eventId is required for making qr" });
  }
  try {
    if (!(await isValidUser(userId))) {
      return res.status(403).json({ error: "not authorised" });
    }
    const event = await Event.findOne({ _id: eventId });
    if (event.qr !== null) {
      return res.status(403).json({ error: "qr already exists" });
    }
    event.qr = makeQRCode(eventId);
    await event.save();
    return res.status(201).json({ qr: event.qr });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: err });
  }
};

const POSTGetQrCode = async (req, res, next) => {
  const { userId, eventId } = req.body;
  if (!(userId && eventId)) {
    return res
      .status(403)
      .json({ error: "userId, eventId is required for getting qr" });
  }
  try {
    if (!(await isValidUser(userId))) {
      return res.status(403).json({ error: "not authorised" });
    }
    const event = await Event.findOne({ _id: eventId }, { qr: 1, _id: 1 });
    if (event === null) {
      return res.status(404).json({ error: "event not found" });
    }
    let qr = event.qr;
    if (event.qr == null) {
      qr = makeQRCode(eventId);
      event.qr = qr;
      await event.save();
    }
    return res.status(201).json({ qr: qr });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: err });
  }
};

const POSTAttend = async (req, res, next) => {
  const { userId, eventId, qr } = req.body;
  if (!(userId && eventId && qr)) {
    return res
      .status(403)
      .json({ error: "userId, eventId, qr is required for attending" });
  }
  try {
    if (!(await isValidUser(userId))) {
      return res.status(403).json({ error: "not authorised" });
    }
    const event = await Event.findOne(
      { _id: eventId },
      { _id: 1, qr: 1, attendees: 1 }
    );
    if (event.qr !== qr) {
      return res.status(403).json({ error: "invalid qr" });
    }
    event.attendees = event.attendees.map((attendee) => {
      if (attendee.userId === userId) {
        attendee.attendance = true;
      }
      return attendee;
    });
    await event.save();
    return res.status(201).json({});
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: err });
  }
};

const POSTGetAttendance = async (req, res, next) => {
  const { userId, eventId } = req.body;
  if (!(userId && eventId)) {
    return res
      .status(403)
      .json({ error: "userId, eventId is required for getting attendance" });
  }
  try {
    if (!(await isValidUser(userId))) {
      return res.status(403).json({ error: "not authorised" });
    }
    const event = await Event.findOne(
      { _id: eventId },
      { eventName: 1, attendees: 1, prompts: 1, _id: 0 }
    );
    if (event === null) {
      return res.status(404).json({ error: "event not found" });
    }
    return res.status(201).json(event.toObject());
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: err });
  }
};

const POSTUpdateHours = async (req, res, next) => {
  try {
    const { eventId, hourUpdate } = req.body;
    if (!(eventId && hourUpdate)) {
      return res
        .status(403)
        .json({ error: "eventId, hourUpdate is required for updating hours" });
    }
    const event = await Event.findOne(
      { _id: eventId },
      { attendees: 1, _id: 1 }
    );
    if (event === null) {
      return res.status(404).json({ error: "event not found" });
    }
    event.attendees = event.attendees.map((attendee) => {
      const user = hourUpdate.find((item) => item.userId === attendee.userId);
      if (user) {
        attendee.hours = user.hours;
      }
      return attendee;
    });
    event.save();
    return res.status(201).json({});
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: err });
  }
};

module.exports = {
  POSTMakeQrCode,
  POSTGetQrCode,
  POSTAttend,
  POSTGetAttendance,
  POSTUpdateHours,
};

async function isValidUser(userId) {
  return (await isExistingUserById(userId)) !== null;
}

function makeQRCode(eventId) {
  return createToken(eventId);
}

function createToken(id) {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: codeDuration,
  });
}

function verifyToken(token) {
  jwt.verify(token, jwtSecret);
}
