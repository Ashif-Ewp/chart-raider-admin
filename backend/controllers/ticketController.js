const Ticket = require("../models/Ticket");
const TicketCategory = require("../models/TicketCategory");

// @desc    Get all tickets
// @route   GET /api/tickets
// @access  Public
const getAllTickets = async (req, res) => {
  try {
    const { user_id, category_id, status, search } = req.query;
    const filter = {};

    if (user_id) filter.user_id = user_id;
    if (category_id) filter.category_id = category_id;
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { username: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
        { issues: { $regex: search, $options: "i" } },
        { user_id: { $regex: search, $options: "i" } },
      ];
    }

    const tickets = await Ticket.find(filter)
      .populate("category_id", "category description")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: tickets.length,
      data: tickets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching tickets",
      error: error.message,
    });
  }
};

// @desc    Get single ticket by ID
// @route   GET /api/tickets/:id
// @access  Public
const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id).populate(
      "category_id",
      "category description"
    );

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    res.json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching ticket",
      error: error.message,
    });
  }
};

// @desc    Create new ticket (for testing purposes)
// @route   POST /api/tickets
// @access  Public
const createTicket = async (req, res) => {
  try {
    // Verify category exists
    const category = await TicketCategory.findById(req.body.category_id);
    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }

    const ticket = await Ticket.create(req.body);

    const populatedTicket = await Ticket.findById(ticket._id).populate(
      "category_id",
      "category description"
    );

    res.status(201).json({
      success: true,
      message: "Ticket created successfully",
      data: populatedTicket,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating ticket",
      error: error.message,
    });
  }
};

// @desc    Update ticket
// @route   PUT /api/tickets/:id
// @access  Public
const updateTicket = async (req, res) => {
  try {
    // If category_id is being updated, verify it exists
    if (req.body.category_id) {
      const category = await TicketCategory.findById(req.body.category_id);
      if (!category) {
        return res.status(400).json({
          success: false,
          message: "Invalid category ID",
        });
      }
    }

    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("category_id", "category description");

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    res.json({
      success: true,
      message: "Ticket updated successfully",
      data: ticket,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating ticket",
      error: error.message,
    });
  }
};

// @desc    Delete ticket
// @route   DELETE /api/tickets/:id
// @access  Public
const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    res.json({
      success: true,
      message: "Ticket deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting ticket",
      error: error.message,
    });
  }
};

module.exports = {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
};
