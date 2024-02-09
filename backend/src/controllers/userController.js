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

module.exports = {
  POSTUser,
};
