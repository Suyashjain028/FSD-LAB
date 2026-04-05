const express = require("express");
const router  = express.Router();
const { createDonation, getAllDonations, getDonationById, updateDonation, deleteDonation } = require("../controllers/donationController");
const { protect } = require("../middleware/authMiddleware");

router.post("/",      createDonation);               // Public  — user submits donation
router.get("/",       protect, getAllDonations);      // Private — admin only
router.get("/:id",    protect, getDonationById);     // Private — admin only
router.put("/:id",    protect, updateDonation);      // Private — admin only
router.delete("/:id", protect, deleteDonation);      // Private — admin only

module.exports = router;
