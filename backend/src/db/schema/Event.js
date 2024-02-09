const mongoose = require("mongoose");

// 2. Create a Schema corresponding to the document interface.
const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  eventDate: { type: Date, required: true },
  eventDesc: { type: String, required: true },
  eventImg: { type: String, required: true },
  prompts: { type: [String], required: true },
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
module.exports = mongoose.model("Event", eventSchema);
