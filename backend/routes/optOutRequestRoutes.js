const express = require("express");
const {
  getOptOutRequests,
  createOptOutRequest,
  deleteOptOutRequest,
} = require("../controllers/optOutRequestController");

const router = express.Router();

router.route("/").get(getOptOutRequests).post(createOptOutRequest);
router.route("/:id").delete(deleteOptOutRequest);

module.exports = router;
