const express = require("express");
const router = express.Router();
const {
  getTableRows,
  updateTableRow,
} = require("../controllers/postgresController");

// GET /api/foreign/rows?table=your_table_name
router.get("/rows", getTableRows);
router.put("/rows", updateTableRow);

module.exports = router;
