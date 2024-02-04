const User = require("../db/schema/User");

async function isExistingUser(username) {
  const existingUser = await getUserByName(username);
  return existingUser != null;
}

async function getUserByName(username) {
  return await User.findOne({ username: username }).exec();
}

module.exports = { isExistingUser, getUserByName };
