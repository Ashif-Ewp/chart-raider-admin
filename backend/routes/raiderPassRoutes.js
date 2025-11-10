const express = require("express");
const {
  getRaiderPasses,
  updateRaiderPass,
} = require("../controllers/raiderPassController");

const router = express.Router();

router.route("/").get(getRaiderPasses);
router.route("/:id").put(updateRaiderPass);

module.exports = router;
