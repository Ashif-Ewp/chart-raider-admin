const express = require("express");
const {
  getPrivacyRequests,
  createPrivacyRequest,
  deletePrivacyRequest,
} = require("../controllers/privacyRequestController");

const router = express.Router();

router.route("/").get(getPrivacyRequests).post(createPrivacyRequest);
router.route("/:id").delete(deletePrivacyRequest);

module.exports = router;
