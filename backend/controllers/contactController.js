const Contact = require("../models/Contact");

// CREATE
const submitContact = async (req, res) => {
  try {
    const { name, subject, email, phone, message } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({ message: "Name, email and message required." });
    const doc = await Contact.create({ name, subject, email, phone, message });
    res.status(201).json({ message: "Message sent!", data: doc });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// READ ALL
const getAllMessages = async (req, res) => {
  try {
    const docs = await Contact.find().sort({ createdAt: -1 });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// READ ONE
const getMessageById = async (req, res) => {
  try {
    const doc = await Contact.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// UPDATE
const updateMessage = async (req, res) => {
  try {
    const doc = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Message updated!", data: doc });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// DELETE
const deleteMessage = async (req, res) => {
  try {
    const doc = await Contact.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Message deleted!" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { submitContact, getAllMessages, getMessageById, updateMessage, deleteMessage };
