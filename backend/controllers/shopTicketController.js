const ShopTicket = require("../models/ShopTicket");

const DEFAULT_TICKETS = [{ name: "10" }, { name: "100" }, { name: "1000" }];

const ensureDefaults = async () => {
  const existing = await ShopTicket.countDocuments();
  if (existing > 0) return;

  await ShopTicket.insertMany(
    DEFAULT_TICKETS.map((item) => ({
      ...item,
      stock: 0,
      price: 0,
      discount: 0,
    }))
  );
};

const getTickets = async (req, res) => {
  try {
    await ensureDefaults();
    const tickets = await ShopTicket.find().sort({ name: 1 });
    res.json({
      success: true,
      count: tickets.length,
      data: tickets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching ticket inventory",
      error: error.message,
    });
  }
};

const updateTicket = async (req, res) => {
  try {
    const updated = await ShopTicket.findByIdAndUpdate(
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
        message: "Ticket not found",
      });
    }

    res.json({
      success: true,
      message: "Ticket updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating ticket",
      error: error.message,
    });
  }
};

module.exports = {
  getTickets,
  updateTicket,
};
