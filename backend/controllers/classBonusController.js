const ClassBonus = require("../models/ClassBonus");

// @desc    Get all class bonuses
// @route   GET /api/class-bonus/items
// @access  Public
const getAllClassBonuses = async (req, res) => {
  try {
    const { isActive, search } = req.query;
    const filter = {};

    if (isActive !== undefined) filter.isActive = isActive === "true";

    // Search by name, key, or description
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { key: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const classBonuses = await ClassBonus.find(filter).sort({
      createdAt: 1,
    });

    res.json({
      success: true,
      count: classBonuses.length,
      data: classBonuses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching class bonuses",
      error: error.message,
    });
  }
};

// @desc    Get single class bonus by ID
// @route   GET /api/class-bonus/items/:id
// @access  Public
const getClassBonusById = async (req, res) => {
  try {
    const classBonus = await ClassBonus.findById(req.params.id);

    if (!classBonus) {
      return res.status(404).json({
        success: false,
        message: "Class bonus not found",
      });
    }

    res.json({
      success: true,
      data: classBonus,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching class bonus",
      error: error.message,
    });
  }
};

// @desc    Create new class bonus
// @route   POST /api/class-bonus/items
// @access  Public
const createClassBonus = async (req, res) => {
  try {
    const classBonus = await ClassBonus.create(req.body);

    res.status(201).json({
      success: true,
      message: "Class bonus created successfully",
      data: classBonus,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Class bonus key already exists",
      });
    }

    res.status(400).json({
      success: false,
      message: "Error creating class bonus",
      error: error.message,
    });
  }
};

// @desc    Update class bonus
// @route   PUT /api/class-bonus/items/:id
// @access  Public
const updateClassBonus = async (req, res) => {
  try {
    const classBonus = await ClassBonus.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!classBonus) {
      return res.status(404).json({
        success: false,
        message: "Class bonus not found",
      });
    }

    res.json({
      success: true,
      message: "Class bonus updated successfully",
      data: classBonus,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating class bonus",
      error: error.message,
    });
  }
};

// @desc    Delete class bonus
// @route   DELETE /api/class-bonus/items/:id
// @access  Public
const deleteClassBonus = async (req, res) => {
  try {
    const classBonus = await ClassBonus.findByIdAndDelete(req.params.id);

    if (!classBonus) {
      return res.status(404).json({
        success: false,
        message: "Class bonus not found",
      });
    }

    res.json({
      success: true,
      message: "Class bonus deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting class bonus",
      error: error.message,
    });
  }
};

// @desc    Toggle class bonus active status
// @route   PATCH /api/class-bonus/items/:id/toggle
// @access  Public
const toggleClassBonusStatus = async (req, res) => {
  try {
    const classBonus = await ClassBonus.findById(req.params.id);

    if (!classBonus) {
      return res.status(404).json({
        success: false,
        message: "Class bonus not found",
      });
    }

    classBonus.isActive = !classBonus.isActive;
    await classBonus.save();

    res.json({
      success: true,
      message: `Class bonus ${
        classBonus.isActive ? "activated" : "deactivated"
      } successfully`,
      data: classBonus,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error toggling class bonus status",
      error: error.message,
    });
  }
};

module.exports = {
  getAllClassBonuses,
  getClassBonusById,
  createClassBonus,
  updateClassBonus,
  deleteClassBonus,
  toggleClassBonusStatus,
};
