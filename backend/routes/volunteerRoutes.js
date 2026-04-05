const express = require("express");
const router  = express.Router();
const { registerVolunteer, getAllVolunteers, getVolunteerById, updateVolunteer, deleteVolunteer } = require("../controllers/volunteerController");
const { protect } = require("../middleware/authMiddleware");

router.post("/",      registerVolunteer);              // Public  — user registers
router.get("/",       protect, getAllVolunteers);       // Private — admin only
router.get("/:id",    protect, getVolunteerById);      // Private — admin only
router.put("/:id",    protect, updateVolunteer);       // Private — admin only
router.delete("/:id", protect, deleteVolunteer);       // Private — admin only

module.exports = router;
