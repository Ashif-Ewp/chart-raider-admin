const express = require("express");
const { getCases, updateCase } = require("../controllers/shopCaseController");

const router = express.Router();

router.route("/").get(getCases);
router.route("/:id").put(updateCase);

module.exports = router;
