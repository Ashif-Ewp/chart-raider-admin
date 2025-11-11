import React, { useEffect, useState } from "react";
import { postgresAPI } from "../services/api";
import { toast } from "react-toastify";
import { RefreshCcw, Save } from "lucide-react";

const SettingsTicketQueue = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const resp = await postgresAPI.getTableRows("tickets", { limit: 200 });
      const data = resp.data?.rows ?? [];
      const mapped = data.map((r) => ({
        ...r,
        amount: r.amount ?? "",
        max_queue_size: r.max_queue_size ?? "",
        prize_pool: r.prize_pool ?? "",
      }));

      // sort by numeric amount ascending (sanitize commas/whitespace)
      const parseNum = (v) => {
        const raw =
          v === null || typeof v === "undefined"
            ? ""
            : String(v).replace(/,/g, "").trim();
        if (raw === "") return Number.POSITIVE_INFINITY;
        const n = Number(raw);
        return Number.isFinite(n) ? n : Number.POSITIVE_INFINITY;
      };

      mapped.sort((a, b) => {
        return parseNum(a.amount) - parseNum(b.amount);
      });

      setRows(mapped);
    } catch (err) {
      console.error("Failed to load ticket queue rows", err);
      toast.error("Failed to load ticket queue");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleChange = (id, field, value) => {
    setRows((prev) =>
      prev.map((r) => {
        const rowId = r.id ?? r.ticket_id ?? r.id;
        if (rowId === id) {
          return { ...r, [field]: value };
        }
        return r;
      })
    );
    // Note: some Postgres tables use 'id' or 'ticket_id' primary key.
  };

  const handleSave = async (row) => {
    // determine id column name; try 'id' or 'ticket_id' or 'id' fallback
    const idColumn =
      row.id !== undefined
        ? "id"
        : row.ticket_id !== undefined
        ? "ticket_id"
        : null;
    if (!idColumn) {
      toast.error("Cannot determine primary key for this row");
      return;
    }

    const idValue = row[idColumn];
    const payload = {
      table: "tickets",
      id_column: idColumn,
      id_value: idValue,
      data: {
        name: row.name,
        amount: Number(row.amount) || 0,
        max_queue_size: Number(row.max_queue_size) || 0,
        prize_pool: parseFloat(row.prize_pool) || 0,
      },
    };

    setSavingId(idValue);
    try {
      await postgresAPI.updateTableRow(payload);
      toast.success("Saved");
      await load();
    } catch (err) {
      console.error("Failed to save row", err);
      const msg = err.response?.data?.message || "Failed to save";
      toast.error(msg);
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Ticket Queue (Settings)
          </h2>
          <p className="text-gray-600 mt-2">
            Edit ticket queue configuration stored in Postgres 'tickets' table.
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
            No rows found in tickets table
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Max Queue Size
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Prize Pool
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rows.map((r) => {
                  const idVal = r.id ?? r.ticket_id ?? r.id;
                  return (
                    <tr key={idVal}>
                      <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                        {idVal}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                        <input
                          type="text"
                          value={r.name ?? ""}
                          onChange={(e) =>
                            handleChange(idVal, "name", e.target.value)
                          }
                          className="w-48 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          min="0"
                          value={r.amount ?? ""}
                          onChange={(e) =>
                            handleChange(idVal, "amount", e.target.value)
                          }
                          className="w-28 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          min="0"
                          value={r.max_queue_size ?? ""}
                          onChange={(e) =>
                            handleChange(
                              idVal,
                              "max_queue_size",
                              e.target.value
                            )
                          }
                          className="w-28 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          step="0.01"
                          value={r.prize_pool ?? ""}
                          onChange={(e) =>
                            handleChange(idVal, "prize_pool", e.target.value)
                          }
                          className="w-32 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                        />
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => handleSave(r)}
                          disabled={savingId === idVal}
                          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          <Save size={16} className="mr-2" />
                          {savingId === idVal ? "Saving..." : "Save"}
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

export default SettingsTicketQueue;
