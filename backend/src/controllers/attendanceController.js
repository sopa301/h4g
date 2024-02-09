require("dotenv").config();
const Form = require("../db/schema/Form");
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
    const form = await Form.findOne({ eventId: eventId });
    if (form === null) {
      return res.status(404).json({ error: "form not found" });
    }
    if (form.qr !== null) {
      return res.status(403).json({ error: "qr already exists" });
    }
    form.qr = makeQRCode(eventId);
    await form.save();
    return res.status(201).json({ qr: form.qr });
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
    const form = await Form.findOne({ eventId: eventId });
    if (form === null) {
      return res.status(404).json({ error: "form not found" });
    }
    if (form.qr === null) {
      form.qr = makeQRCode(eventId);
      await form.save();
    }
    return res.status(201).json({ qr: form.qr });
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
    const form = await Form.findOne({ eventId: eventId });
    if (form === null) {
      return res.status(404).json({ error: "form not found" });
    }
    if (form.qr !== qr) {
      return res.status(403).json({ error: "invalid qr" });
    }
    form.attendees = form.attendees.map((attendee) => {
      if (attendee.userId === userId) {
        attendee.attendance = true;
      }
      return attendee;
    });
    await form.save();
    return res.status(201).json({ success: "success" });
  } catch (err) {
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
    const form = await Form.findOne({ eventId: eventId });
    if (form === null) {
      return res.status(404).json({ error: "form not found" });
    }
    return res.status(201).json({ attendees: form.attendees });
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
