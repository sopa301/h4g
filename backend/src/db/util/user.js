function makeNewUser(username, email, teleHandle, passwordHash, age) {
  return {
    username: username,
    email: email,
    teleHandle: teleHandle,
    availabilityDateFrom: "",
    availabilityDateTo: "",
    interests: "",
    skills: "",
    addInfo: "",
    isAdmin: false,
    volunteeringHours: 0,
    age: age,
    area: "",
    volunteeringType: "",
    volunteerHistory: [],
    passwordHash: passwordHash,
    token: "",
  };
}

function makeJsonUser(user) {
  userCopy = { ...user.toObject() };
  userCopy.userId = userCopy._id;
  delete userCopy._id;
  return userCopy;
}

function makeNewAttendee(user, responses) {
  return {
    userId: user._id,
    username: user.username,
    age: user.age,
    responses: responses,
    attendance: false,
    hours: 0,
    feedback: "",
  };
}

module.exports = { makeNewUser, makeJsonUser, makeNewAttendee };
