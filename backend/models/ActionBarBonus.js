const mongoose = require("mongoose");

const actionBarBonusSchema = new mongoose.Schema(
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
    category: {
      type: String,
      required: true,
      enum: [
        "PRIZE_BAG",
        "STOP_LOSS",
        "DOUBLE_EDGED_TRADES",
        "HEALTH_PUMPS",
        "TRADELIXER",
        "TRADE_RECOVERY",
        "ACTION_BAR",
        "XP_STACK",
        "PEEK_METER",
        "TRADE_DELAY",
        "PEEK_METER_MULTIPLIER",
        "PEEK_METER_REFILL",
        "TRADE_DELAY_MULTIPLIER",
        "TRADE_DELAY_REFILL",
        "PROFIT",
        "ACTION_BAR_MULTIPLIER",
        "TRADELIXER_DISCOUNT",
      ],
    },
    description: {
      type: String,
      default: "",
    },
    value: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    count: {
      type: Number,
      default: null,
    },
    max: {
      type: Number,
      default: null,
    },
    multiplier_type: {
      type: String,
      default: null,
    },
    bonus_type: {
      type: String,
      enum: ["actionbar", "multiplier"],
      default: "actionbar",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    rarity: {
      type: String,
      enum: ["common", "rare", "epic", "legendary"],
      default: "common",
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
actionBarBonusSchema.index({ category: 1, isActive: 1 });
actionBarBonusSchema.index({ key: 1 });
actionBarBonusSchema.index({ bonus_type: 1, isActive: 1 });

module.exports = mongoose.model("ActionBarBonus", actionBarBonusSchema);
