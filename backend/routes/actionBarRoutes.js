const express = require("express");
const router = express.Router();
const {
  getAllBonuses,
  getBonusesGrouped,
  getBonusById,
  createBonus,
  updateBonus,
  deleteBonus,
  getCategories,
  toggleBonusStatus,
} = require("../controllers/actionBarController");

// Categories
router.get("/categories", getCategories);

// Bonuses
router.get("/bonuses", getAllBonuses);
router.get("/bonuses/grouped", getBonusesGrouped);
router.get("/bonuses/:id", getBonusById);
router.post("/bonuses", createBonus);
router.put("/bonuses/:id", updateBonus);
router.delete("/bonuses/:id", deleteBonus);
router.patch("/bonuses/:id/toggle", toggleBonusStatus);

module.exports = router;

