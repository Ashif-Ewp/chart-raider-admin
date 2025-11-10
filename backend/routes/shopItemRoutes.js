const express = require("express");
const { getItems, updateItem } = require("../controllers/shopItemController");

const router = express.Router();

router.route("/").get(getItems);
router.route("/:id").put(updateItem);

module.exports = router;
