const mongoose = require("mongoose");

// 2. Create a Schema corresponding to the document interface.
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  teleHandle: { type: String, required: false },
  availability: { type: [[String]], required: true },
  isAdmin: { type: Boolean, required: true },
  passwordHash: { type: String, required: true },
  token: { type: String, required: true },
});

// 3. Create a Model.
module.exports = mongoose.model("User", userSchema);
