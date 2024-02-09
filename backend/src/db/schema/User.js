const mongoose = require("mongoose");

// 2. Create a Schema corresponding to the document interface.
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  teleHandle: { type: String, required: false },
  availabilityDateFrom: { type: String, required: true },
  availabilityDateTo: { type: String, required: true },
  interests: { type: String, required: true },
  skills: { type: String, required: true },
  addInfo: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
  volunteeringHours: { type: Number, required: true },
  age: { type: Number, required: true },
  area: { type: String, required: true },
  volunteeringType: { type: String, required: true },
  volunteerHistory: { type: [String], required: true },
  passwordHash: { type: String, required: true },
  token: { type: String, required: true },
});

// 3. Create a Model.
module.exports = mongoose.model("User", userSchema);
