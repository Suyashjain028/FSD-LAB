const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  donation: { type: String, enum: ["Education", "Healthcare", "Food Security", "Disaster Relief"], required: true },
  name:     { type: String, required: true },
  email:    { type: String, required: true },
  phone:    { type: String, required: true },
  dob:      { type: String, required: true },
  gender:   { type: String, enum: ["Male", "Female"], required: true },
  fname:    { type: String, required: true },
  fphone:   { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Donation", donationSchema);
