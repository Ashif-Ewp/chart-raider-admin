const MatchAnnouncement = require("../models/MatchAnnouncement");

// @desc    Get all match announcements
// @route   GET /api/match-announcements
// @access  Public
const getAllMatchAnnouncements = async (req, res) => {
  try {
    const { match_id, search } = req.query;
    const filter = {};

    if (match_id) filter.match_id = match_id;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { message: { $regex: search, $options: "i" } },
        { match_id: { $regex: search, $options: "i" } },
      ];
    }

    const announcements = await MatchAnnouncement.find(filter).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      count: announcements.length,
      data: announcements,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching match announcements",
      error: error.message,
    });
  }
};

// @desc    Get single match announcement by ID
// @route   GET /api/match-announcements/:id
// @access  Public
const getMatchAnnouncementById = async (req, res) => {
  try {
    const announcement = await MatchAnnouncement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: "Match announcement not found",
      });
    }

    res.json({
      success: true,
      data: announcement,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching match announcement",
      error: error.message,
    });
  }
};

// @desc    Create new match announcement
// @route   POST /api/match-announcements
// @access  Public
const createMatchAnnouncement = async (req, res) => {
  try {
    const announcement = await MatchAnnouncement.create(req.body);

    res.status(201).json({
      success: true,
      message: "Match announcement created successfully",
      data: announcement,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating match announcement",
      error: error.message,
    });
  }
};

// @desc    Update match announcement
// @route   PUT /api/match-announcements/:id
// @access  Public
const updateMatchAnnouncement = async (req, res) => {
  try {
    const announcement = await MatchAnnouncement.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: "Match announcement not found",
      });
    }

    res.json({
      success: true,
      message: "Match announcement updated successfully",
      data: announcement,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating match announcement",
      error: error.message,
    });
  }
};

// @desc    Delete match announcement
// @route   DELETE /api/match-announcements/:id
// @access  Public
const deleteMatchAnnouncement = async (req, res) => {
  try {
    const announcement = await MatchAnnouncement.findByIdAndDelete(
      req.params.id
    );

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: "Match announcement not found",
      });
    }

    res.json({
      success: true,
      message: "Match announcement deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting match announcement",
      error: error.message,
    });
  }
};

module.exports = {
  getAllMatchAnnouncements,
  getMatchAnnouncementById,
  createMatchAnnouncement,
  updateMatchAnnouncement,
  deleteMatchAnnouncement,
};
