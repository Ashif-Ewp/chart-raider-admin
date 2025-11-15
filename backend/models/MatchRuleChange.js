const mongoose = require("mongoose");

const matchRuleChangeSchema = new mongoose.Schema(
  {
    ruleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MatchRule",
      required: true,
    },
    ruleTitle: {
      type: String,
      required: true,
      trim: true,
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    itemLabel: {
      type: String,
      default: "",
      trim: true,
    },
    oldValue: {
      type: String,
      default: null,
      trim: true,
    },
    newValue: {
      type: String,
      default: null,
      trim: true,
    },
    changeType: {
      type: String,
      enum: ["created", "updated", "deleted", "title"],
      default: "updated",
    },
    changedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: false,
  }
);

matchRuleChangeSchema.index({ ruleId: 1, changedAt: -1 });

module.exports = mongoose.model("MatchRuleChange", matchRuleChangeSchema);
