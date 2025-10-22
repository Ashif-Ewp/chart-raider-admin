const ActionBarBonus = require("../models/ActionBarBonus");
const { ACTIONBAR_CATEGORIES } = require("../constants/actionbar");

// @desc    Get all bonuses
// @route   GET /api/actionbar/bonuses
// @access  Public
const getAllBonuses = async (req, res) => {
  try {
    const { category, isActive, bonus_type } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (isActive !== undefined) filter.isActive = isActive === "true";
    if (bonus_type) filter.bonus_type = bonus_type;

    const bonuses = await ActionBarBonus.find(filter).sort({
      bonus_type: 1,
      category: 1,
      createdAt: 1,
    });

    res.json({
      success: true,
      count: bonuses.length,
      data: bonuses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching bonuses",
      error: error.message,
    });
  }
};

// @desc    Get bonuses grouped by category
// @route   GET /api/actionbar/bonuses/grouped
// @access  Public
const getBonusesGrouped = async (req, res) => {
  try {
    const { bonus_type } = req.query;
    const filter = { isActive: true };
    if (bonus_type) filter.bonus_type = bonus_type;

    const bonuses = await ActionBarBonus.find(filter).sort({
      bonus_type: 1,
      category: 1,
      createdAt: 1,
    });

    const grouped = {};
    bonuses.forEach((bonus) => {
      if (!grouped[bonus.category]) {
        grouped[bonus.category] = [];
      }
      grouped[bonus.category].push(bonus);
    });

    res.json({
      success: true,
      data: grouped,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching grouped bonuses",
      error: error.message,
    });
  }
};

// @desc    Get single bonus by ID
// @route   GET /api/actionbar/bonuses/:id
// @access  Public
const getBonusById = async (req, res) => {
  try {
    const bonus = await ActionBarBonus.findById(req.params.id);

    if (!bonus) {
      return res.status(404).json({
        success: false,
        message: "Bonus not found",
      });
    }

    res.json({
      success: true,
      data: bonus,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching bonus",
      error: error.message,
    });
  }
};

// @desc    Create new bonus
// @route   POST /api/actionbar/bonuses
// @access  Public
const createBonus = async (req, res) => {
  try {
    const bonus = await ActionBarBonus.create(req.body);

    res.status(201).json({
      success: true,
      message: "Bonus created successfully",
      data: bonus,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Bonus key already exists",
      });
    }

    res.status(400).json({
      success: false,
      message: "Error creating bonus",
      error: error.message,
    });
  }
};

// @desc    Update bonus
// @route   PUT /api/actionbar/bonuses/:id
// @access  Public
const updateBonus = async (req, res) => {
  try {
    const bonus = await ActionBarBonus.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!bonus) {
      return res.status(404).json({
        success: false,
        message: "Bonus not found",
      });
    }

    res.json({
      success: true,
      message: "Bonus updated successfully",
      data: bonus,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating bonus",
      error: error.message,
    });
  }
};

// @desc    Delete bonus
// @route   DELETE /api/actionbar/bonuses/:id
// @access  Public
const deleteBonus = async (req, res) => {
  try {
    const bonus = await ActionBarBonus.findByIdAndDelete(req.params.id);

    if (!bonus) {
      return res.status(404).json({
        success: false,
        message: "Bonus not found",
      });
    }

    res.json({
      success: true,
      message: "Bonus deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting bonus",
      error: error.message,
    });
  }
};

// @desc    Get all categories
// @route   GET /api/actionbar/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const stats = await ActionBarBonus.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    const categoriesWithStats = ACTIONBAR_CATEGORIES.map((cat) => {
      const stat = stats.find((s) => s._id === cat.key);
      return {
        ...cat,
        count: stat ? stat.count : 0,
      };
    });

    res.json({
      success: true,
      data: categoriesWithStats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching categories",
      error: error.message,
    });
  }
};

// @desc    Toggle bonus active status
// @route   PATCH /api/actionbar/bonuses/:id/toggle
// @access  Public
const toggleBonusStatus = async (req, res) => {
  try {
    const bonus = await ActionBarBonus.findById(req.params.id);

    if (!bonus) {
      return res.status(404).json({
        success: false,
        message: "Bonus not found",
      });
    }

    bonus.isActive = !bonus.isActive;
    await bonus.save();

    res.json({
      success: true,
      message: `Bonus ${
        bonus.isActive ? "activated" : "deactivated"
      } successfully`,
      data: bonus,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error toggling bonus status",
      error: error.message,
    });
  }
};

module.exports = {
  getAllBonuses,
  getBonusesGrouped,
  getBonusById,
  createBonus,
  updateBonus,
  deleteBonus,
  getCategories,
  toggleBonusStatus,
};
