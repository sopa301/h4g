async function isExistingUser(username) {
  const existingUser = await getUser(username);
  return existingUser != null;
}

async function getUser(userId) {
  return await User.findOne({ _id: makeObjectId(userId) }).exec();
}

module.exports = { isExistingUser, getUser };
