const mongoose = require("mongoose");

const classBonusSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    value: {
      type: Number,
      default: 0,
    },
    percentage: {
      type: Number,
      default: 0,
    },
    profit: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

// Compound indexes for better query performance
classBonusSchema.index({ key: 1, isActive: 1 });
classBonusSchema.index({ name: 1, isActive: 1 });

const ClassBonus = mongoose.model("ClassBonus", classBonusSchema);

module.exports = ClassBonus;
