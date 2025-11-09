const Equipment = require("../models/Equipment");
const { CASE_TYPES, BONUS_TYPES } = require("../constants/equipment");

// @desc    Get all equipment
// @route   GET /api/equipment/items
// @access  Public
const getAllEquipment = async (req, res) => {
  try {
    const { case_type, isActive, bonus } = req.query;
    const filter = {};

    if (case_type) filter.case_type = case_type;
    if (isActive !== undefined) filter.isActive = isActive === "true";
    if (bonus) filter.bonus = bonus;

    const equipment = await Equipment.find(filter).sort({
      case_type: 1,
      bonus: 1,
      createdAt: 1,
    });

    res.json({
      success: true,
      count: equipment.length,
      data: equipment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching equipment",
      error: error.message,
    });
  }
};

// @desc    Get equipment grouped by case type
// @route   GET /api/equipment/items/grouped
// @access  Public
const getEquipmentGrouped = async (req, res) => {
  try {
    const { bonus } = req.query;
    const filter = { isActive: true };
    if (bonus) filter.bonus = bonus;

    const equipment = await Equipment.find(filter).sort({
      case_type: 1,
      bonus: 1,
      createdAt: 1,
    });

    const grouped = {};
    equipment.forEach((item) => {
      if (!grouped[item.case_type]) {
        grouped[item.case_type] = [];
      }
      grouped[item.case_type].push(item);
    });

    res.json({
      success: true,
      data: grouped,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching grouped equipment",
      error: error.message,
    });
  }
};

// @desc    Get single equipment by ID
// @route   GET /api/equipment/items/:id
// @access  Public
const getEquipmentById = async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);

    if (!equipment) {
      return res.status(404).json({
        success: false,
        message: "Equipment not found",
      });
    }

    res.json({
      success: true,
      data: equipment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching equipment",
      error: error.message,
    });
  }
};

// @desc    Create new equipment
// @route   POST /api/equipment/items
// @access  Public
const createEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.create(req.body);

    res.status(201).json({
      success: true,
      message: "Equipment created successfully",
      data: equipment,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Equipment key already exists",
      });
    }

    res.status(400).json({
      success: false,
      message: "Error creating equipment",
      error: error.message,
    });
  }
};

// @desc    Update equipment
// @route   PUT /api/equipment/items/:id
// @access  Public
const updateEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!equipment) {
      return res.status(404).json({
        success: false,
        message: "Equipment not found",
      });
    }

    res.json({
      success: true,
      message: "Equipment updated successfully",
      data: equipment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating equipment",
      error: error.message,
    });
  }
};

// @desc    Delete equipment
// @route   DELETE /api/equipment/items/:id
// @access  Public
const deleteEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findByIdAndDelete(req.params.id);

    if (!equipment) {
      return res.status(404).json({
        success: false,
        message: "Equipment not found",
      });
    }

    res.json({
      success: true,
      message: "Equipment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting equipment",
      error: error.message,
    });
  }
};

// @desc    Get all case types
// @route   GET /api/equipment/case-types
// @access  Public
const getCaseTypes = async (req, res) => {
  try {
    const stats = await Equipment.aggregate([
      { $group: { _id: "$case_type", count: { $sum: 1 } } },
    ]);

    const caseTypesWithStats = CASE_TYPES.map((type) => {
      const stat = stats.find((s) => s._id === type.value);
      return {
        ...type,
        count: stat ? stat.count : 0,
      };
    });

    res.json({
      success: true,
      data: caseTypesWithStats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching case types",
      error: error.message,
    });
  }
};

// @desc    Toggle equipment active status
// @route   PATCH /api/equipment/items/:id/toggle
// @access  Public
const toggleEquipmentStatus = async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);

    if (!equipment) {
      return res.status(404).json({
        success: false,
        message: "Equipment not found",
      });
    }

    equipment.isActive = !equipment.isActive;
    await equipment.save();

    res.json({
      success: true,
      message: `Equipment ${
        equipment.isActive ? "activated" : "deactivated"
      } successfully`,
      data: equipment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error toggling equipment status",
      error: error.message,
    });
  }
};

module.exports = {
  getAllEquipment,
  getEquipmentGrouped,
  getEquipmentById,
  createEquipment,
  updateEquipment,
  deleteEquipment,
  getCaseTypes,
  toggleEquipmentStatus,
};
