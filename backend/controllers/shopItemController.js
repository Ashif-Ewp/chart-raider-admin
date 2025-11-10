const ShopItem = require("../models/ShopItem");

const DEFAULT_ITEMS = [
  { name: "Name Change" },
  { name: "Stat Reset" },
  { name: "Gift a Friend" },
  { name: "Tradelixer" },
];

const ensureDefaults = async () => {
  const existing = await ShopItem.countDocuments();
  if (existing > 0) return;

  await ShopItem.insertMany(
    DEFAULT_ITEMS.map((item) => ({
      ...item,
      stock: 0,
      price: 0,
      discount: 0,
    }))
  );
};

const getItems = async (req, res) => {
  try {
    await ensureDefaults();
    const items = await ShopItem.find().sort({ name: 1 });
    res.json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching shop items",
      error: error.message,
    });
  }
};

const updateItem = async (req, res) => {
  try {
    const updated = await ShopItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    res.json({
      success: true,
      message: "Item updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating item",
      error: error.message,
    });
  }
};

module.exports = {
  getItems,
  updateItem,
};
