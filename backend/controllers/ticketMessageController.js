const TicketMessage = require("../models/TicketMessage");
const Ticket = require("../models/Ticket");

// @desc    Get all messages for a ticket
// @route   GET /api/ticket-messages/:ticketId
// @access  Public
const getTicketMessages = async (req, res) => {
  try {
    const { ticketId } = req.params;

    // Verify ticket exists
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    const messages = await TicketMessage.find({ ticket_id: ticketId }).sort({
      createdAt: 1,
    });

    res.json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching ticket messages",
      error: error.message,
    });
  }
};

// @desc    Create new message
// @route   POST /api/ticket-messages
// @access  Public
const createTicketMessage = async (req, res) => {
  try {
    const { ticket_id, user_id, username, message, is_admin } = req.body;

    // Verify ticket exists
    const ticket = await Ticket.findById(ticket_id);
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    const ticketMessage = await TicketMessage.create({
      ticket_id,
      user_id,
      username,
      message,
      is_admin: is_admin || false,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: ticketMessage,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating message",
      error: error.message,
    });
  }
};

// @desc    Delete message
// @route   DELETE /api/ticket-messages/:id
// @access  Public
const deleteTicketMessage = async (req, res) => {
  try {
    const message = await TicketMessage.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting message",
      error: error.message,
    });
  }
};

module.exports = {
  getTicketMessages,
  createTicketMessage,
  deleteTicketMessage,
};
