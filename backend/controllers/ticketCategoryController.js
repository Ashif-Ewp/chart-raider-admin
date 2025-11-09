const TicketCategory = require("../models/TicketCategory");

// @desc    Get all ticket categories
// @route   GET /api/ticket-categories
// @access  Public
const getAllTicketCategories = async (req, res) => {
  try {
    const { search } = req.query;
    const filter = {};

    if (search) {
      filter.$or = [
        { category: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const categories = await TicketCategory.find(filter).sort({
      category: 1,
    });

    res.json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching ticket categories",
      error: error.message,
    });
  }
};

// @desc    Get single ticket category by ID
// @route   GET /api/ticket-categories/:id
// @access  Public
const getTicketCategoryById = async (req, res) => {
  try {
    const category = await TicketCategory.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Ticket category not found",
      });
    }

    res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching ticket category",
      error: error.message,
    });
  }
};

// @desc    Create new ticket category
// @route   POST /api/ticket-categories
// @access  Public
const createTicketCategory = async (req, res) => {
  try {
    const category = await TicketCategory.create(req.body);

    res.status(201).json({
      success: true,
      message: "Ticket category created successfully",
      data: category,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Ticket category already exists",
      });
    }

    res.status(400).json({
      success: false,
      message: "Error creating ticket category",
      error: error.message,
    });
  }
};

// @desc    Update ticket category
// @route   PUT /api/ticket-categories/:id
// @access  Public
const updateTicketCategory = async (req, res) => {
  try {
    const category = await TicketCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Ticket category not found",
      });
    }

    res.json({
      success: true,
      message: "Ticket category updated successfully",
      data: category,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Ticket category already exists",
      });
    }

    res.status(400).json({
      success: false,
      message: "Error updating ticket category",
      error: error.message,
    });
  }
};

// @desc    Delete ticket category
// @route   DELETE /api/ticket-categories/:id
// @access  Public
const deleteTicketCategory = async (req, res) => {
  try {
    const category = await TicketCategory.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Ticket category not found",
      });
    }

    res.json({
      success: true,
      message: "Ticket category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting ticket category",
      error: error.message,
    });
  }
};

module.exports = {
  getAllTicketCategories,
  getTicketCategoryById,
  createTicketCategory,
  updateTicketCategory,
  deleteTicketCategory,
};
