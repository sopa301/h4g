const User = require("../db/schema/User");

async function isExistingUserByName(username) {
  const existingUser = await getUserByName(username);
  return existingUser != null;
}

async function isExistingUserById(userId) {
  const existingUser = await getUserById(userId);
  return existingUser != null;
}

async function getUserByName(username) {
  return await User.findOne({ username: username }).exec();
}

async function getUserById(userId) {
  return await User.findOne({ _id: userId }).exec();
}

module.exports = {
  isExistingUserByName,
  getUserByName,
  isExistingUserById,
  getUserById,
};
