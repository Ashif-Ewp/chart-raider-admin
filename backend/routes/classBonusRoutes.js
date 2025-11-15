const express = require("express");
const router = express.Router();
const {
  getAllClassBonuses,
  getClassBonusById,
  createClassBonus,
  updateClassBonus,
  deleteClassBonus,
  toggleClassBonusStatus,
} = require("../controllers/classBonusController");

// Class Bonus Items
router.get("/items", getAllClassBonuses);
router.get("/items/:id", getClassBonusById);
router.post("/items", createClassBonus);
router.put("/items/:id", updateClassBonus);
router.delete("/items/:id", deleteClassBonus);
router.patch("/items/:id/toggle", toggleClassBonusStatus);

module.exports = router;
