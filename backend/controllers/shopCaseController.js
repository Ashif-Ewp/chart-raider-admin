const ShopCase = require("../models/ShopCase");

const DEFAULT_CASES = [
  { name: "Carbon Case" },
  { name: "Steampunk Case" },
  { name: "Titanium Case" },
];

const ensureDefaults = async () => {
  const existing = await ShopCase.countDocuments();
  if (existing > 0) return;

  await ShopCase.insertMany(
    DEFAULT_CASES.map((item) => ({
      ...item,
      stock: 0,
      price: 0,
      discount: 0,
    }))
  );
};

// @desc    Get all shop cases
// @route   GET /api/shop/cases
// @access  Public
const getCases = async (req, res) => {
  try {
    await ensureDefaults();
    const cases = await ShopCase.find().sort({ name: 1 });
    res.json({
      success: true,
      count: cases.length,
      data: cases,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching case inventory",
      error: error.message,
    });
  }
};

// @desc    Update a case entry
// @route   PUT /api/shop/cases/:id
// @access  Public (testing/admin)
const updateCase = async (req, res) => {
  try {
    const updated = await ShopCase.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Case not found",
      });
    }

    res.json({
      success: true,
      message: "Case updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating case",
      error: error.message,
    });
  }
};

module.exports = {
  getCases,
  updateCase,
};
