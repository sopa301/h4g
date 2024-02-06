const mongoose = require("mongoose");

// 2. Create a Schema corresponding to the document interface.
const formSchema = new mongoose.Schema({
  eventId: { type: String, required: true },
  prompts: { type: [String], required: false },
});

// 3. Create a Model.
module.exports = mongoose.model("Form", formSchema);
