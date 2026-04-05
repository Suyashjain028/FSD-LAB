const Volunteer = require("../models/Volunteer");

// CREATE
const registerVolunteer = async (req, res) => {
  try {
    const { name, email, phone_no, dob, gender, father_name, father_contact_no } = req.body;
    if (!name || !email || !phone_no || !dob || !gender || !father_name || !father_contact_no)
      return res.status(400).json({ message: "All fields are required." });
    const doc = await Volunteer.create({ name, email, phone_no, dob, gender, father_name, father_contact_no });
    res.status(201).json({ message: "Volunteer registered!", data: doc });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// READ ALL
const getAllVolunteers = async (req, res) => {
  try {
    const docs = await Volunteer.find().sort({ createdAt: -1 });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// READ ONE
const getVolunteerById = async (req, res) => {
  try {
    const doc = await Volunteer.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// UPDATE
const updateVolunteer = async (req, res) => {
  try {
    const doc = await Volunteer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Volunteer updated!", data: doc });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// DELETE
const deleteVolunteer = async (req, res) => {
  try {
    const doc = await Volunteer.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Volunteer deleted!" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { registerVolunteer, getAllVolunteers, getVolunteerById, updateVolunteer, deleteVolunteer };
