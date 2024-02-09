function makeNewUser(
  username,
  email,
  teleHandle,
  availability,
  passwordHash,
  age
) {
  return {
    username: username,
    email: email,
    teleHandle: teleHandle,
    availability: availability,
    isAdmin: false,
    passwordHash: passwordHash,
    age: age,
  };
}

module.exports = { makeNewUser };
