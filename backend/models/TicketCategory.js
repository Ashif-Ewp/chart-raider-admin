const mongoose = require("mongoose");

const ticketCategorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
ticketCategorySchema.index({ category: 1 });

module.exports = mongoose.model("TicketCategory", ticketCategorySchema);
