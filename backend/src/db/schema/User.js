const mongoose = require("mongoose");

// 2. Create a Schema corresponding to the document interface.
const userSchema = new mongoose.Schema({
  userId: { type: Number, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  teleHandle: { type: String, required: true },
  availability: { type: [[String]], required: true },
  isAdmin: { type: Boolean, required: true },
  passwordHash: { type: String, required: true },
  token: { type: String, required: true },
});

// 3. Create a Model.
export default User = mongoose.model("User", userSchema);
