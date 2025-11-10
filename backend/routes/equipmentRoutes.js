const express = require("express");
const router = express.Router();
const {
  getAllEquipment,
  getEquipmentGrouped,
  getEquipmentById,
  createEquipment,
  updateEquipment,
  deleteEquipment,
  getCaseTypes,
  toggleEquipmentStatus,
} = require("../controllers/equipmentController");

// Case Types
router.get("/case-types", getCaseTypes);

// Equipment Items
router.get("/items", getAllEquipment);
router.get("/items/grouped", getEquipmentGrouped);
router.get("/items/:id", getEquipmentById);
router.post("/items", createEquipment);
router.put("/items/:id", updateEquipment);
router.delete("/items/:id", deleteEquipment);
router.patch("/items/:id/toggle", toggleEquipmentStatus);

module.exports = router;
