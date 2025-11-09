const express = require("express");
const router = express.Router();
const {
  getAllMatchAnnouncements,
  getMatchAnnouncementById,
  createMatchAnnouncement,
  updateMatchAnnouncement,
  deleteMatchAnnouncement,
} = require("../controllers/matchAnnouncementController");

// Match Announcements
router.get("/", getAllMatchAnnouncements);
router.get("/:id", getMatchAnnouncementById);
router.post("/", createMatchAnnouncement);
router.put("/:id", updateMatchAnnouncement);
router.delete("/:id", deleteMatchAnnouncement);

module.exports = router;
