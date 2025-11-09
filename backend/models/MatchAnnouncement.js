const mongoose = require("mongoose");

const matchAnnouncementSchema = new mongoose.Schema(
  {
    match_id: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
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
matchAnnouncementSchema.index({ match_id: 1 });
matchAnnouncementSchema.index({ createdAt: -1 });

module.exports = mongoose.model("MatchAnnouncement", matchAnnouncementSchema);
