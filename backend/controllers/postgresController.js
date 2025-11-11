const { query } = require("../config/postgres");

// Read rows from a given table (very small helper). Validates table name to avoid SQL injection.
exports.getTableRows = async (req, res) => {
  const table = req.query.table;
  if (!table || typeof table !== "string" || !/^[a-zA-Z0-9_]+$/.test(table)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid or missing table name" });
  }

  const limit = parseInt(req.query.limit, 10) || 100;
  try {
    // Note: we validate the table name (only letters, numbers, underscore). Still be cautious with production usage.
    const q = `SELECT * FROM ${table} LIMIT $1`;
    const result = await query(q, [limit]);
    res.json({ success: true, rows: result.rows });
  } catch (err) {
    console.error("Error querying Postgres table:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update a row in a table. Expects body: { table, id_column, id_value, data }
exports.updateTableRow = async (req, res) => {
  const { table, id_column, id_value, data } = req.body || {};

  if (!table || typeof table !== "string" || !/^[a-zA-Z0-9_]+$/.test(table)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid or missing table name" });
  }
  if (
    !id_column ||
    typeof id_column !== "string" ||
    !/^[a-zA-Z0-9_]+$/.test(id_column)
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid or missing id_column" });
  }
  if (typeof id_value === "undefined" || id_value === null) {
    return res
      .status(400)
      .json({ success: false, message: "Missing id_value" });
  }
  if (!data || typeof data !== "object") {
    return res
      .status(400)
      .json({ success: false, message: "Missing data to update" });
  }

  try {
    // Validate column names in data
    const keys = Object.keys(data).filter((k) => /^[a-zA-Z0-9_]+$/.test(k));
    if (keys.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No valid columns to update" });
    }

    const setClauses = keys.map((col, idx) => `${col} = $${idx + 1}`);
    const values = keys.map((k) => data[k]);

    // id value parameter is last
    const idParamIndex = values.length + 1;
    const q = `UPDATE ${table} SET ${setClauses.join(
      ", "
    )} WHERE ${id_column} = $${idParamIndex} RETURNING *`;

    const result = await query(q, [...values, id_value]);
    res.json({ success: true, row: result.rows[0] });
  } catch (err) {
    console.error("Error updating Postgres table row:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};
