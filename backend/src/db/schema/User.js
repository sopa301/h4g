const mongoose = require("mongoose");

// 2. Create a Schema corresponding to the document interface.
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  teleHandle: { type: String, required: false },
  availabilityDateFrom: { type: String, required: false },
  availabilityDateTo: { type: String, required: false },
  interests: { type: String, required: false },
  skills: { type: String, required: false },
  addInfo: { type: String, required: false },
  isAdmin: { type: Boolean, required: true },
  volunteeringHours: { type: Number, required: false },
  age: { type: Number, required: false },
  area: { type: String, required: false },
  volunteeringType: { type: String, required: false },
  volunteerHistory: { type: [String], required: true },
  passwordHash: { type: String, required: true },
  token: { type: String, required: false },
});

// 3. Create a Model.
module.exports = mongoose.model("User", userSchema);
