const mongoose = require("mongoose");

// 2. Create a Schema corresponding to the document interface.
const formSchema = new mongoose.Schema({
  eventId: { type: String, required: true },
  prompts: { type: [String], required: false },
  respondees: {
    type: [{ userId: String, responses: [String] }],
    required: true,
  },
  qr: { type: String, required: false },
  attendances: {
    type: [{ userId: String, attendance: Boolean }],
    required: true,
  },
});

// 3. Create a Model.
module.exports = mongoose.model("Form", formSchema);
