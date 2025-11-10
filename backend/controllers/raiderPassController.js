const RaiderPass = require("../models/RaiderPass");

const DEFAULT_PASSES = [{ name: "Raider Pass" }];

const ensureDefaults = async () => {
  const existing = await RaiderPass.countDocuments();
  if (existing > 0) return;

  await RaiderPass.insertMany(
    DEFAULT_PASSES.map((item) => ({
      ...item,
      stock: 0,
      price: 0,
      discount: 0,
    }))
  );
};

const getRaiderPasses = async (req, res) => {
  try {
    await ensureDefaults();
    const passes = await RaiderPass.find().sort({ name: 1 });
    res.json({
      success: true,
      count: passes.length,
      data: passes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching raider pass inventory",
      error: error.message,
    });
  }
};

const updateRaiderPass = async (req, res) => {
  try {
    const updated = await RaiderPass.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Raider pass not found",
      });
    }

    res.json({
      success: true,
      message: "Raider pass updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating raider pass",
      error: error.message,
    });
  }
};

module.exports = {
  getRaiderPasses,
  updateRaiderPass,
};
