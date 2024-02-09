require("dotenv").config();
const User = require("../db/schema/User");

const POSTUser = async (req, res, next) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(403).json({
      error: "userId is required for viewing form",
    });
  }
  try {
    const user = User.findOne({ _id: userId });
    return res.status(201).json({
      username: user.username,
      email: user.email,
      teleHandle: user.teleHandle,
      availability: user.availability,
    });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: err });
  }
};

const PATCHUser = async (req, res, next) => {
  const { userId, username, email, teleHandle, availability } = req.body;
  if (!userId) {
    return res.status(403).json({
      error: "userId is required for updating user",
    });
  }
  try {
    const user = User.findOne({ _id: userId });
    if (username) {
      user.username = username;
    }
    if (email) {
      user.email = email;
    }
    if (teleHandle) {
      user.teleHandle = teleHandle;
    }
    if (availability) {
      user.availability = availability;
    }
    await user.save();
    return res.status(201).json({});
  } catch (err) {
    return res.status(401).json({ error: err });
  }
};

module.exports = {
  POSTUser,
  PATCHUser,
};
