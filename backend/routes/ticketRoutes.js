const express = require("express");
const router = express.Router();
const {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
  getUserTickets,
} = require("../controllers/ticketController");

// Tickets
router.get("/", getAllTickets);
router.get("/user", getUserTickets);
router.get("/:id", getTicketById);
router.post("/", createTicket);
router.put("/:id", updateTicket);
router.delete("/:id", deleteTicket);

module.exports = router;
