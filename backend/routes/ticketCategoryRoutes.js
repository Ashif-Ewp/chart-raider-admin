const express = require("express");
const router = express.Router();
const {
  getAllTicketCategories,
  getTicketCategoryById,
  createTicketCategory,
  updateTicketCategory,
  deleteTicketCategory,
} = require("../controllers/ticketCategoryController");

// Ticket Categories
router.get("/", getAllTicketCategories);
router.get("/:id", getTicketCategoryById);
router.post("/", createTicketCategory);
router.put("/:id", updateTicketCategory);
router.delete("/:id", deleteTicketCategory);

module.exports = router;
