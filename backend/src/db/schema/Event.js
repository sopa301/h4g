const mongoose = require("mongoose");

// 2. Create a Schema corresponding to the document interface.
const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  eventDate: { type: Date, required: true },
  eventDesc: { type: String, required: true },
  eventImg: { type: String, required: true },
  attendees: { type: [String], required: true },
});

// 3. Create a Model.
module.exports = mongoose.model("Event", eventSchema);
