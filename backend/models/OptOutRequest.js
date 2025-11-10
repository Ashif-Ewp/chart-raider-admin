const mongoose = require("mongoose");

const OptOutRequestSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

OptOutRequestSchema.index({
  first_name: "text",
  last_name: "text",
  email: "text",
});

module.exports = mongoose.model("OptOutRequest", OptOutRequestSchema);
