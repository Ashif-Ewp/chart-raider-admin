const mongoose = require("mongoose");

const PrivacyRequestSchema = new mongoose.Schema(
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
    country: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    request_type: {
      type: String,
      required: true,
      enum: [
        "confirm_processing",
        "access",
        "delete",
        "correct",
        "other",
        "myself",
        "someone_else",
      ],
    },
    additional_information: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

PrivacyRequestSchema.index({
  first_name: "text",
  last_name: "text",
  email: "text",
  additional_information: "text",
});

module.exports = mongoose.model("PrivacyRequest", PrivacyRequestSchema);
