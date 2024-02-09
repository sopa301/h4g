require("dotenv").config();
const User = require("../db/schema/User");
const { makeJsonUser } = require("../db/util/user");

const POSTUser = async (req, res, next) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(403).json({
      error: "userId is required for viewing form",
    });
  }
  try {
    const user = await User.findOne(
      { _id: userId },
      {
        isAdmin: 0,
        passwordHash: 0,
        token: 0,
        __v: 0,
      }
    );
    if (user === null) {
      return res.status(404).json({ error: "user not found" });
    }
    return res.status(201).json(makeJsonUser(user));
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: err });
  }
};

const PATCHUser = async (req, res, next) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(403).json({
      error: "userId is required for updating user",
    });
  }
  try {
    const user = await User.findOne({ _id: userId });
    if (user === null) {
      return res.status(404).json({ error: "user not found" });
    }
    for (let key in req.body) {
      if (
        key === "userId" ||
        key === "passwordHash" ||
        key === "token" ||
        key === "isAdmin" ||
        key === "__v" ||
        key === "_id" ||
        !req.body[key]
      ) {
        continue;
      }
      user[key] = req.body[key];
    }
    await user.save();
    return res.status(201).json({});
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: err });
  }
};

module.exports = {
  POSTUser,
  PATCHUser,
};
