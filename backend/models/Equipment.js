const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    summary: {
      type: String,
      required: true,
      trim: true,
    },
    bonus: {
      type: String,
      required: true,
      trim: true,
    },
    case_type: {
      type: String,
      required: true,
      enum: ["titanium", "carbon", "steampunk"],
    },
    profit: {
      type: Number,
      default: null,
    },
    loss: {
      type: Number,
      default: null,
    },
    value: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    max_value: {
      type: Number,
      default: null,
    },
    max_stack: {
      type: Number,
      default: null,
    },
    duration: {
      type: Number,
      default: null,
    },
    cooldown: {
      type: Number,
      default: null,
    },
    percentage: {
      type: Number,
      default: null,
    },
    count: {
      type: Number,
      default: null,
    },
    half1: {
      type: String,
      default: null,
    },
    half2: {
      type: String,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
equipmentSchema.index({ case_type: 1, isActive: 1 });
equipmentSchema.index({ key: 1 });
equipmentSchema.index({ bonus: 1, isActive: 1 });

module.exports = mongoose.model("Equipment", equipmentSchema);
