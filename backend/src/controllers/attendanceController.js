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
    const event = await Event.findOne({ _id: eventId }, { qr: 1, _id: 0 });
    return res.status(201).json(event);
  } catch (err) {
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
    return res.status(201).json({ success: "success" });
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
    const event = await Event.findOne({ _id: eventId }, { attendees: 1 });
    const attendees = event.attendees.map((attendee) => {
      return {
        userId: attendee.userId,
        attendance: attendee.attendance,
      };
    });
    return res.status(201).json({ attendees: attendees });
  } catch (err) {
    return res.status(401).json({ error: err });
  }
};

module.exports = {
  POSTMakeQrCode,
  POSTGetQrCode,
  POSTAttend,
  POSTGetAttendance,
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
