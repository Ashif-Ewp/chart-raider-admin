import React, { useEffect, useMemo, useState } from "react";
import { RefreshCcw, Save } from "lucide-react";
import { toast } from "react-toastify";
import { postgresAPI } from "../services/api";

const TABLE_NAME = "user_game_tools";
const DEFAULT_LIMIT = 200;

const readOnlyColumns = new Set([
  "id",
  "user_id",
  "user_name",
  "username",
  "uid",
  "uuid",
  "createdon",
  "updatedon",
  "created_on",
  "updated_on",
  "inserted_at",
  "modified_at",
]);

const numericHintRegex =
  /(amount|balance|total|count|value|score|win|loss|credit|debit)$/i;

const fieldConfig = {
  deposit_limit: {
    kind: "number",
    step: "0.01",
    min: 0,
    label: "Deposit Limit",
  },
  match_limit: {
    kind: "json-array",
    label: "Match Limit",
    placeholder: `10, 100, 1000 (max 3 values)`,
    maxItems: 3,
  },
  time_limit: {
    kind: "number",
    step: "1",
    min: 0,
    integer: true,
    label: "Time Limit",
  },
  profit_loss_limit: {
    kind: "number",
    step: "0.01",
    min: 0,
    label: "Profit/Loss Limit",
  },
  is_user_locked: {
    kind: "boolean",
    label: "Is User Locked",
  },
  locked_duration: {
    kind: "number",
    step: "1",
    min: 0,
    max: 700,
    integer: true,
    label: "Locked Duration (days)",
  },
};

const columnPriority = [
  "user_name",
  "id",
  "user_id",
  ...Object.keys(fieldConfig),
  "created_at",
  "updated_at",
];

const hiddenColumns = new Set([
  "id",
  "created_at",
  "updated_at",
  "createdon",
  "updatedon",
  "created_on",
  "updated_on",
  "createdAt",
  "updatedAt",
  "winning_balance",
  "winning_balances",
  "user_wining_balance",
  "user_wining_balances",
]);

const SettingsGamingTools = () => {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [columnTypes, setColumnTypes] = useState({});
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const load = async () => {
    setLoading(true);
    try {
      const resp = await postgresAPI.getTableRows(TABLE_NAME, {
        limit: DEFAULT_LIMIT,
      });
      const data = (resp.data?.rows ?? []).map(normalizeRow);
      setRows(data);

      const columnOrder = [];
      const typeLookup = {};

      data.forEach((row) => {
        Object.entries(row).forEach(([key, value]) => {
          if (!columnOrder.includes(key)) {
            columnOrder.push(key);
          }
          if (
            typeof typeLookup[key] === "undefined" &&
            value !== null &&
            typeof value !== "undefined"
          ) {
            typeLookup[key] = typeof value;
          }
        });
      });

      columnOrder.sort((a, b) => {
        const aIdx = columnPriority.indexOf(a);
        const bIdx = columnPriority.indexOf(b);
        if (aIdx !== -1 || bIdx !== -1) {
          return (
            (aIdx === -1 ? Number.POSITIVE_INFINITY : aIdx) -
            (bIdx === -1 ? Number.POSITIVE_INFINITY : bIdx)
          );
        }
        return a.localeCompare(b);
      });

      const filteredColumns = columnOrder.filter(
        (column) => !hiddenColumns.has(column)
      );

      setColumns(filteredColumns);
      setColumnTypes(typeLookup);
    } catch (err) {
      console.error("Failed to load gaming tools balances", err);
      toast.error("Failed to load gaming tools balances");
      setRows([]);
      setColumns([]);
    } finally {
      setLoading(false);
    }
  };

  const editableColumns = useMemo(() => {
    return columns.filter((column) => !readOnlyColumns.has(column));
  }, [columns]);

  const normalizeRow = (row) => {
    const next = { ...row };
    Object.entries(fieldConfig).forEach(([field, config]) => {
      if (!(field in next)) return;
      const value = next[field];
      if (config.kind === "boolean") {
        next[field] = toBoolean(value);
      } else if (config.kind === "json") {
        if (typeof value === "string") {
          next[field] = value;
        } else if (value === null || typeof value === "undefined") {
          next[field] = "";
        } else {
          try {
            next[field] = JSON.stringify(value, null, 2);
          } catch {
            next[field] = String(value);
          }
        }
      } else if (config.kind === "json-array") {
        if (Array.isArray(value)) {
          next[field] = value.join(", ");
        } else if (typeof value === "string") {
          const trimmed = value.trim();
          if (!trimmed) {
            next[field] = "";
          } else if (trimmed.startsWith("[") || trimmed.startsWith("{")) {
            try {
              const parsed = JSON.parse(trimmed);
              next[field] = Array.isArray(parsed) ? parsed.join(", ") : trimmed;
            } catch {
              next[field] = trimmed;
            }
          } else {
            next[field] = trimmed;
          }
        } else if (value === null || typeof value === "undefined") {
          next[field] = "";
        } else {
          try {
            const parsed = JSON.parse(value);
            next[field] = Array.isArray(parsed)
              ? parsed.join(", ")
              : String(value);
          } catch {
            next[field] = String(value);
          }
        }
      }
    });
    return next;
  };

  const resolveIdColumn = (row) => {
    if (row.id !== undefined) return "id";
    if (row.user_id !== undefined) return "user_id";
    if (row.balance_id !== undefined) return "balance_id";
    if (row.profile_id !== undefined) return "profile_id";
    if (row.account_id !== undefined) return "account_id";
    if (row.uid !== undefined) return "uid";
    if (row.uuid !== undefined) return "uuid";
    return columns.find((column) => readOnlyColumns.has(column)) ?? columns[0];
  };

  const handleChange = (idValue, field, value) => {
    setRows((prev) =>
      prev.map((row) => {
        const idColumn = resolveIdColumn(row);
        if (row[idColumn] === idValue) {
          return {
            ...row,
            [field]: value,
          };
        }
        return row;
      })
    );
  };

  const coerceValue = (field, rawValue) => {
    if (
      rawValue === "" ||
      rawValue === null ||
      typeof rawValue === "undefined"
    ) {
      return null;
    }

    const config = fieldConfig[field];
    if (config?.kind === "boolean") {
      return toBoolean(rawValue);
    }
    if (config?.kind === "json") {
      if (typeof rawValue === "string") {
        const trimmed = rawValue.trim();
        if (!trimmed) return null;
        try {
          const parsed = JSON.parse(trimmed);
          return JSON.stringify(parsed);
        } catch (err) {
          throw new Error(
            `Invalid JSON for ${field}. Please provide valid JSON.`
          );
        }
      }
      return JSON.stringify(rawValue);
    }
    if (config?.kind === "json-array") {
      if (Array.isArray(rawValue)) {
        if (config?.maxItems && rawValue.length > config.maxItems) {
          throw new Error(
            `${field} can contain at most ${config.maxItems} entries.`
          );
        }
        return JSON.stringify(rawValue);
      }

      const trimmed = typeof rawValue === "string" ? rawValue.trim() : "";
      if (!trimmed) return JSON.stringify([]);

      let parsedArray;
      if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
        try {
          const parsed = JSON.parse(trimmed);
          if (!Array.isArray(parsed)) {
            throw new Error(`${field} must be a JSON array.`);
          }
          parsedArray = parsed;
        } catch (err) {
          throw new Error(
            `Invalid JSON array for ${field}. Please provide valid JSON.`
          );
        }
      } else {
        parsedArray = trimmed
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item.length > 0)
          .map((item) => {
            const maybeNumber = Number(item);
            return Number.isFinite(maybeNumber) ? maybeNumber : item;
          });
      }

      if (config?.maxItems && parsedArray.length > config.maxItems) {
        throw new Error(
          `${field} can contain at most ${config.maxItems} entries.`
        );
      }

      return JSON.stringify(parsedArray);
    }

    const fieldType = columnTypes[field];
    const shouldTreatAsNumber =
      config?.kind === "number" ||
      fieldType === "number" ||
      numericHintRegex.test(field);

    if (shouldTreatAsNumber) {
      const parsed = Number(rawValue);
      if (!Number.isFinite(parsed)) {
        throw new Error(`${field} must be a numeric value.`);
      }
      if (config?.integer && !Number.isInteger(parsed)) {
        throw new Error(`${field} must be an integer value.`);
      }
      if (typeof config?.min === "number" && parsed < config.min) {
        throw new Error(`${field} must be ≥ ${config.min}.`);
      }
      if (typeof config?.max === "number" && parsed > config.max) {
        throw new Error(`${field} must be ≤ ${config.max}.`);
      }
      return parsed;
    }
    if (fieldType === "boolean") {
      if (rawValue === true || rawValue === false) return rawValue;
      const lowered = String(rawValue).toLowerCase().trim();
      if (["true", "1", "yes"].includes(lowered)) return true;
      if (["false", "0", "no"].includes(lowered)) return false;
      return null;
    }

    return rawValue;
  };

  const handleSave = async (row) => {
    const idColumn = resolveIdColumn(row);
    if (!idColumn) {
      toast.error("Cannot determine primary key for this row.");
      return;
    }

    const idValue = row[idColumn];
    if (typeof idValue === "undefined" || idValue === null) {
      toast.error("Row is missing a primary key value.");
      return;
    }

    const updatePayload = {};
    try {
      editableColumns.forEach((column) => {
        if (column in row) {
          updatePayload[column] = coerceValue(column, row[column]);
        }
      });
    } catch (err) {
      toast.error(
        err.message || "Invalid input detected. Please review your changes."
      );
      return;
    }

    if (Object.keys(updatePayload).length === 0) {
      toast.info("No editable fields to update for this row.");
      return;
    }

    setSavingId(idValue);
    try {
      await postgresAPI.updateTableRow({
        table: TABLE_NAME,
        id_column: idColumn,
        id_value: idValue,
        data: updatePayload,
      });
      toast.success("Saved changes");
      await load();
    } catch (err) {
      console.error("Failed to save balance row", err);
      const message = err.response?.data?.message || "Failed to save changes";
      toast.error(message);
    } finally {
      setSavingId(null);
    }
  };

  const renderCellInput = (row, column) => {
    const value = row[column] ?? "";
    const typeHint = columnTypes[column];
    const config = fieldConfig[column];

    if (readOnlyColumns.has(column)) {
      const displayValue =
        value === null || typeof value === "undefined" ? "-" : String(value);
      return (
        <span className="text-sm text-gray-900 font-medium break-all">
          {displayValue}
        </span>
      );
    }

    const idValue = row[resolveIdColumn(row)];

    if (config?.kind === "boolean") {
      return (
        <label className="inline-flex items-center space-x-2">
          <input
            type="checkbox"
            checked={!!value}
            onChange={(e) => handleChange(idValue, column, e.target.checked)}
            className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <span className="text-sm text-gray-700">
            {value ? "Locked" : "Unlocked"}
          </span>
        </label>
      );
    }

    if (config?.kind === "json") {
      return (
        <textarea
          value={typeof value === "string" ? value : ""}
          onChange={(e) => handleChange(idValue, column, e.target.value)}
          placeholder={config.placeholder}
          rows={4}
          className="w-40 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm font-mono"
        />
      );
    }
    if (config?.kind === "json-array") {
      const displayValue =
        typeof value === "string"
          ? value
          : Array.isArray(value)
          ? value.join(", ")
          : "";
      return (
        <textarea
          value={displayValue}
          onChange={(e) => handleChange(idValue, column, e.target.value)}
          placeholder={config.placeholder}
          rows={1}
          className="w-50 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm font-mono"
        />
      );
    }

    const inputType =
      config?.kind === "number"
        ? "number"
        : typeHint === "number"
        ? "number"
        : typeHint === "boolean"
        ? "text"
        : "text";

    const inputClassName =
      config?.kind === "number"
        ? "w-40 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
        : "w-44 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm";

    return (
      <input
        type={inputType}
        value={value === null || typeof value === "undefined" ? "" : value}
        onChange={(e) => handleChange(idValue, column, e.target.value)}
        min={config?.min}
        max={config?.max}
        step={config?.step}
        className={inputClassName}
      />
    );
  };

  const toBoolean = (value) => {
    if (typeof value === "boolean") return value;
    if (typeof value === "number") return value !== 0;
    if (typeof value === "string") {
      const lowered = value.trim().toLowerCase();
      if (["true", "1", "yes", "y", "t"].includes(lowered)) return true;
      if (["false", "0", "no", "n", "f"].includes(lowered)) return false;
    }
    return Boolean(value);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Gaming Tools (Settings)
          </h2>
          <p className="text-gray-600 mt-2">
            Review and update balances from Postgres `{TABLE_NAME}` table.
          </p>
        </div>
        <button
          onClick={load}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <RefreshCcw size={16} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : rows.length === 0 ? (
          <div className="py-12 text-center text-gray-500">
            No rows found in `{TABLE_NAME}` table.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column}
                      className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                    >
                      {(fieldConfig[column]?.label || column).replace(
                        /_/g,
                        " "
                      )}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rows.map((row) => {
                  const idColumn = resolveIdColumn(row);
                  const idValue = row[idColumn];
                  return (
                    <tr key={`${idColumn}-${idValue}`}>
                      {columns.map((column) => (
                        <td key={column} className="px-4 py-3 align-top">
                          {renderCellInput(row, column)}
                        </td>
                      ))}
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => handleSave(row)}
                          disabled={savingId === idValue}
                          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          <Save size={16} className="mr-2" />
                          {savingId === idValue ? "Updating..." : "Update"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsGamingTools;
