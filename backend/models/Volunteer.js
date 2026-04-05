const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema({
  name:             { type: String, required: true },
  email:            { type: String, required: true },
  phone_no:         { type: String, required: true },
  dob:              { type: String, required: true },
  gender:           { type: String, enum: ["Male", "Female"], required: true },
  father_name:      { type: String, required: true },
  father_contact_no:{ type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Volunteer", volunteerSchema);
