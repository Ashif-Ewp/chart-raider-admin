const OptOutRequest = require("../models/OptOutRequest");

// @desc    Get opt-out requests with optional search
// @route   GET /api/opt-out-requests
// @access  Public
const getOptOutRequests = async (req, res) => {
  try {
    const { search } = req.query;

    const filter = {};

    if (search) {
      const regex = { $regex: search, $options: "i" };
      filter.$or = [
        { first_name: regex },
        { last_name: regex },
        { email: regex },
      ];
    }

    const [requests, total] = await Promise.all([
      OptOutRequest.find(filter).sort({ createdAt: -1 }),
      OptOutRequest.countDocuments(),
    ]);

    res.json({
      success: true,
      count: requests.length,
      total,
      data: requests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching opt-out requests",
      error: error.message,
    });
  }
};

// @desc    Create an opt-out request
// @route   POST /api/opt-out-requests
// @access  Public (testing)
const createOptOutRequest = async (req, res) => {
  try {
    const requiredFields = ["first_name", "last_name", "email"];
    const missing = requiredFields.filter((field) => !req.body[field]);

    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missing.join(", ")}`,
      });
    }

    const request = await OptOutRequest.create(req.body);

    res.status(201).json({
      success: true,
      message: "Opt-out request created successfully",
      data: request,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating opt-out request",
      error: error.message,
    });
  }
};

// @desc    Delete an opt-out request
// @route   DELETE /api/opt-out-requests/:id
// @access  Public (testing)
const deleteOptOutRequest = async (req, res) => {
  try {
    const request = await OptOutRequest.findByIdAndDelete(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Opt-out request not found",
      });
    }

    res.json({
      success: true,
      message: "Opt-out request deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting opt-out request",
      error: error.message,
    });
  }
};

module.exports = {
  getOptOutRequests,
  createOptOutRequest,
  deleteOptOutRequest,
};
