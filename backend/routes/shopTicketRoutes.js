const express = require("express");
const {
  getTickets,
  updateTicket,
} = require("../controllers/shopTicketController");

const router = express.Router();

router.route("/").get(getTickets);
router.route("/:id").put(updateTicket);

module.exports = router;
