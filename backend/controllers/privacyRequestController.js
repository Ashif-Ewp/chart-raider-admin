const PrivacyRequest = require("../models/PrivacyRequest");

// @desc    Get privacy requests with optional filters
// @route   GET /api/privacy-requests
// @access  Public
const getPrivacyRequests = async (req, res) => {
  try {
    const { search, request_type, country } = req.query;

    const filter = {};

    if (request_type) {
      filter.request_type = request_type;
    }

    if (country) {
      filter.country = { $regex: country, $options: "i" };
    }

    if (search) {
      const regex = { $regex: search, $options: "i" };
      filter.$or = [
        { first_name: regex },
        { last_name: regex },
        { email: regex },
        { additional_information: regex },
      ];
    }

    const [requests, total] = await Promise.all([
      PrivacyRequest.find(filter).sort({ createdAt: -1 }),
      PrivacyRequest.countDocuments(),
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
      message: "Error fetching privacy requests",
      error: error.message,
    });
  }
};

// @desc    Create a privacy request
// @route   POST /api/privacy-requests
// @access  Public (testing)
const createPrivacyRequest = async (req, res) => {
  try {
    const requiredFields = ["first_name", "last_name", "email", "request_type"];
    const missing = requiredFields.filter((field) => !req.body[field]);

    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missing.join(", ")}`,
      });
    }

    const request = await PrivacyRequest.create(req.body);

    res.status(201).json({
      success: true,
      message: "Privacy request created successfully",
      data: request,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating privacy request",
      error: error.message,
    });
  }
};

// @desc    Delete a privacy request
// @route   DELETE /api/privacy-requests/:id
// @access  Public (testing)
const deletePrivacyRequest = async (req, res) => {
  try {
    const request = await PrivacyRequest.findByIdAndDelete(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Privacy request not found",
      });
    }

    res.json({
      success: true,
      message: "Privacy request deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting privacy request",
      error: error.message,
    });
  }
};

module.exports = {
  getPrivacyRequests,
  createPrivacyRequest,
  deletePrivacyRequest,
};
