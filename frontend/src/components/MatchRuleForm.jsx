import React, { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Plus, Save, Trash2, X } from "lucide-react";

const emptyItem = (order = 0) => ({
  _id: null,
  clientId: `tmp-${Date.now()}-${Math.random()}`,
  label: "",
  value: "",
  previousValue: null,
  lastChangedAt: null,
  order,
});

const formatInitialItems = (items = []) => {
  return [...items]
    .sort((a, b) => {
      const orderA = typeof a.order === "number" ? a.order : 0;
      const orderB = typeof b.order === "number" ? b.order : 0;
      if (orderA !== orderB) return orderA - orderB;
      return (a.label || "").localeCompare(b.label || "");
    })
    .map((item, index) => ({
      ...item,
      clientId: `existing-${item._id || index}-${Math.random()}`,
      order: typeof item.order === "number" ? item.order : index,
    }));
};

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

const MatchRuleForm = ({ initialData, onSubmit, onCancel, saving }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [items, setItems] = useState(
    initialData?.items?.length
      ? formatInitialItems(initialData.items)
      : [emptyItem(0)]
  );
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setItems(
        initialData.items?.length
          ? formatInitialItems(initialData.items)
          : [emptyItem(0)]
      );
    } else {
      setTitle("");
      setDescription("");
      setItems([emptyItem(0)]);
    }
    setErrors({});
  }, [initialData]);

  const activeItems = useMemo(() => {
    return items.filter(
      (item) => (item.label || "").trim() || (item.value || "").trim()
    );
  }, [items]);

  const handleItemChange = (clientId, field, value) => {
    setItems((prev) =>
      prev.map((item) =>
        item.clientId === clientId
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  };

  const handleAddItem = () => {
    setItems((prev) => {
      const nextOrder =
        prev.reduce((acc, curr) => Math.max(acc, curr.order || 0), 0) + 1;
      return [...prev, emptyItem(nextOrder)];
    });
  };

  const handleRemoveItem = (clientId) => {
    setItems((prev) => {
      if (prev.length === 1) {
        return [emptyItem(0)];
      }
      return prev.filter((item) => item.clientId !== clientId);
    });
  };

  const handleMoveItem = (clientId, direction) => {
    setItems((prev) => {
      const index = prev.findIndex((item) => item.clientId === clientId);
      if (index === -1) return prev;
      const newIndex = index + direction;
      if (newIndex < 0 || newIndex >= prev.length) return prev;
      const next = [...prev];
      const [moved] = next.splice(index, 1);
      next.splice(newIndex, 0, moved);
      return next.map((item, idx) => ({
        ...item,
        order: idx,
      }));
    });
  };

  const validate = () => {
    const nextErrors = {};
    if (!title.trim()) {
      nextErrors.title = "Title is required.";
    }

    const filledItems = items.filter(
      (item) => item.label.trim() !== "" && item.value.trim() !== ""
    );

    if (filledItems.length === 0) {
      nextErrors.items = "Please add at least one key/value pair.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    const sanitizedItems = items
      .map((item, index) => {
        const trimmedLabel = item.label.trim();
        const trimmedValue = item.value.trim();
        if (!trimmedLabel || !trimmedValue) return null;
        return {
          _id: item._id || undefined,
          label: trimmedLabel,
          value: trimmedValue,
          previousValue: item.previousValue ?? null,
          lastChangedAt: item.lastChangedAt ?? null,
          order: index,
        };
      })
      .filter(Boolean);

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      items: sanitizedItems,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-md border border-gray-200"
    >
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {initialData ? "Edit Rule Group" : "Create Rule Group"}
          </h3>
          <p className="text-sm text-gray-500">
            Define a title and add as many key/value entries as your in-game
            rules require.
          </p>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-800"
        >
          <X size={16} className="mr-1.5" />
          Cancel
        </button>
      </div>

      <div className="px-6 py-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Section Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. IN GAME MATCH RULES"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.title ? "border-red-400" : "border-gray-300"
            }`}
          />
          {errors.title && (
            <p className="text-sm text-red-500 mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description <span className="text-gray-400">(optional)</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide extra context that appears under the title."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-md font-semibold text-gray-900">
              Rule Entries
            </h4>
            <button
              type="button"
              onClick={handleAddItem}
              className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-primary-600 bg-primary-50 rounded-md hover:bg-primary-100"
            >
              <Plus size={16} className="mr-1.5" />
              Add entry
            </button>
          </div>

          {errors.items && (
            <p className="text-sm text-red-500">{errors.items}</p>
          )}

          <div className="space-y-4">
            {items.map((item, index) => {
              const timestamp = formatTimestamp(item.lastChangedAt);
              const showPrevious =
                item.previousValue &&
                item.previousValue.trim() &&
                item.previousValue.trim() !== item.value.trim();

              return (
                <div
                  key={item.clientId}
                  className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col gap-1">
                      <button
                        type="button"
                        onClick={() => handleMoveItem(item.clientId, -1)}
                        disabled={index === 0}
                        className="p-1 rounded-md border border-gray-200 bg-white text-gray-500 hover:text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveItem(item.clientId, 1)}
                        disabled={index === items.length - 1}
                        className="p-1 rounded-md border border-gray-200 bg-white text-gray-500 hover:text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <ArrowDown size={14} />
                      </button>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 mb-1">
                            Key
                          </label>
                          <input
                            type="text"
                            value={item.label}
                            onChange={(e) =>
                              handleItemChange(
                                item.clientId,
                                "label",
                                e.target.value
                              )
                            }
                            placeholder="e.g. MATCH LENGTH"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 uppercase tracking-wide text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 mb-1">
                            Value
                          </label>
                          <input
                            type="text"
                            value={item.value}
                            onChange={(e) =>
                              handleItemChange(
                                item.clientId,
                                "value",
                                e.target.value
                              )
                            }
                            placeholder="e.g. 60 minutes"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                          />
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between text-xs text-gray-500">
                        <div className="flex flex-col gap-1">
                          {showPrevious && (
                            <span className="text-amber-600 font-medium">
                              Previous: {item.previousValue}
                            </span>
                          )}
                          {timestamp && (
                            <span className="text-gray-500">
                              Last updated: {timestamp}
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.clientId)}
                          className="inline-flex items-center px-2 py-1 text-xs font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100"
                        >
                          <Trash2 size={12} className="mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
          disabled={saving}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={saving}
        >
          <Save size={16} className="mr-2" />
          {saving ? "Saving..." : initialData ? "Update Rules" : "Create Rules"}
        </button>
      </div>
    </form>
  );
};

export default MatchRuleForm;
