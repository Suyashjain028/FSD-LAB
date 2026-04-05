const express = require("express");
const router  = express.Router();
const { submitContact, getAllMessages, getMessageById, updateMessage, deleteMessage } = require("../controllers/contactController");
const { protect } = require("../middleware/authMiddleware");

router.post("/",      submitContact);                  // Public  — user sends message
router.get("/",       protect, getAllMessages);         // Private — admin only
router.get("/:id",    protect, getMessageById);        // Private — admin only
router.put("/:id",    protect, updateMessage);         // Private — admin only
router.delete("/:id", protect, deleteMessage);         // Private — admin only

module.exports = router;
