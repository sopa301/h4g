const mongoose = require("mongoose");

// 2. Create a Schema corresponding to the document interface.
const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  eventDate: { type: Date, required: true },
  eventDesc: { type: String, required: true },
  eventImg: { type: String, required: true },
  prompts: { type: [String], required: true },
  attendees: {
    type: [{ userId: String, responses: [String], attendance: Boolean }],
    required: true,
  },
  qr: { type: String, required: false },
});

// 3. Create a Model.
module.exports = mongoose.model("Event", eventSchema);
