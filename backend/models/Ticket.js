const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TicketCategory",
      required: true,
      index: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    issues: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "resolved"],
      default: "pending",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
ticketSchema.index({ user_id: 1, status: 1 });
ticketSchema.index({ category_id: 1, status: 1 });
ticketSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Ticket", ticketSchema);
