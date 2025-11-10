const express = require("express");
const router = express.Router();
const {
  getTicketMessages,
  createTicketMessage,
  deleteTicketMessage,
} = require("../controllers/ticketMessageController");

// Ticket Messages
router.get("/:ticketId", getTicketMessages);
router.post("/", createTicketMessage);
router.delete("/:id", deleteTicketMessage);

module.exports = router;
