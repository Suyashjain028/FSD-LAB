const express = require("express");
const router  = express.Router();
const { loginAdmin, getProfile, seedAdmin } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

router.post("/login",   loginAdmin);          // Public  — login
router.get("/profile",  protect, getProfile); // Private — get logged-in admin info
router.post("/seed",    seedAdmin);           // Run once to create default admin

module.exports = router;
