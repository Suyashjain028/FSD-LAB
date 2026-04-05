const Donation = require("../models/Donation");

// CREATE
const createDonation = async (req, res) => {
  try {
    const { donation, name, email, phone, dob, gender, fname, fphone } = req.body;
    if (!donation || !name || !email || !phone || !dob || !gender || !fname || !fphone)
      return res.status(400).json({ message: "All fields are required." });
    const doc = await Donation.create({ donation, name, email, phone, dob, gender, fname, fphone });
    res.status(201).json({ message: "Donation submitted!", data: doc });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// READ ALL
const getAllDonations = async (req, res) => {
  try {
    const docs = await Donation.find().sort({ createdAt: -1 });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// READ ONE
const getDonationById = async (req, res) => {
  try {
    const doc = await Donation.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// UPDATE
const updateDonation = async (req, res) => {
  try {
    const doc = await Donation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Donation updated!", data: doc });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// DELETE
const deleteDonation = async (req, res) => {
  try {
    const doc = await Donation.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Donation deleted!" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { createDonation, getAllDonations, getDonationById, updateDonation, deleteDonation };
