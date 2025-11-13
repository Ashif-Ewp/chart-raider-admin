import React from "react";
import { Edit, History, Trash2 } from "lucide-react";

const formatTimestamp = (timestamp) => {
  if (!timestamp) return null;
  try {
    const date = new Date(timestamp);
    if (Number.isNaN(date.getTime())) return null;
    return date.toLocaleString();
  } catch (err) {
    return null;
  }
};

const MatchRuleCard = ({ rule, onEdit, onDelete }) => {
  const sortedItems = [...(rule.items || [])].sort((a, b) => {
    const orderA = typeof a.order === "number" ? a.order : 0;
    const orderB = typeof b.order === "number" ? b.order : 0;
    if (orderA !== orderB) return orderA - orderB;
    return (a.label || "").localeCompare(b.label || "");
  });

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {rule.title}
            </h3>
            {rule.description && (
              <p className="text-sm text-gray-600 mt-1">{rule.description}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(rule)}
              className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-primary-600 border border-primary-200 rounded-md bg-white hover:bg-primary-50 transition-colors"
            >
              <Edit size={14} className="mr-1" />
              Edit
            </button>
            <button
              onClick={() => onDelete(rule)}
              className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-red-600 border border-red-200 rounded-md bg-white hover:bg-red-50 transition-colors"
            >
              <Trash2 size={14} className="mr-1" />
              Delete
            </button>
          </div>
        </div>
      </div>

      <div className="px-5 py-4">
        <div className="divide-y divide-gray-200">
          {sortedItems.length === 0 ? (
            <p className="text-sm text-gray-500 py-4">No entries added yet.</p>
          ) : (
            sortedItems.map((item) => {
              const lastUpdate = formatTimestamp(item.lastChangedAt);
              const hasPrevious =
                item.previousValue &&
                item.previousValue.trim() &&
                item.previousValue.trim() !== item.value.trim();

              return (
                <div
                  key={item._id || item.label}
                  className="py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
                >
                  <div className="flex-1">
                    <span className="text-xs font-semibold text-gray-500 block uppercase tracking-wide">
                      {item.label}
                    </span>
                    <span className="text-base text-gray-900 font-medium">
                      {item.value}
                    </span>
                    {hasPrevious && (
                      <div className="flex items-center gap-2 text-xs text-amber-600 mt-1">
                        <History size={12} />
                        <span>Previous: {item.previousValue}</span>
                      </div>
                    )}
                  </div>
                  {lastUpdate && (
                    <span className="text-xs text-gray-500">
                      Updated {lastUpdate}
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchRuleCard;
