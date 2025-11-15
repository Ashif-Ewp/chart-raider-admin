import React, { useState } from "react";
import {
  CLASS_BONUS_KEYS,
  CLASS_BONUS_SUMMARY,
} from "../constants/classBonus";

const ClassBonusForm = ({
  initialData,
  onSubmit,
  isLoading,
  isEdit = false,
}) => {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      key: "",
      description: "",
      value: "",
      percentage: "",
      profit: "",
      isActive: true,
    }
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Auto-fill from CLASS_BONUS_SUMMARY if key is selected
    if (name === "key" && value && CLASS_BONUS_SUMMARY[value]) {
      const summaryData = CLASS_BONUS_SUMMARY[value];
      setFormData((prev) => ({
        ...prev,
        key: value,
        name: summaryData.name || prev.name,
        description: summaryData.description || prev.description,
        value: summaryData.value ?? prev.value,
        percentage: summaryData.percentage ?? prev.percentage,
        profit: summaryData.profit ?? prev.profit,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clean up the data
    const submitData = {
      ...formData,
      value: formData.value === "" ? 0 : Number(formData.value),
      percentage: formData.percentage === "" ? 0 : Number(formData.percentage),
      profit: formData.profit === "" ? 0 : Number(formData.profit),
    };

    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">
          Basic Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="e.g., Swing"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Key *
            </label>
            <select
              name="key"
              value={formData.key}
              onChange={handleChange}
              required
              disabled={isEdit}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                isEdit ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
            >
              <option value="">Select a key</option>
              {CLASS_BONUS_KEYS.map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
            {isEdit && (
              <p className="text-xs text-gray-500 mt-1">
                Key cannot be changed after creation
              </p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Enter class bonus description..."
          />
        </div>
      </div>

      {/* Stats & Values */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">
          Stats & Values
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Value
            </label>
            <input
              type="number"
              name="value"
              value={formData.value}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="e.g., 1"
            />
            <p className="text-xs text-gray-500 mt-1">
              Multiplier value for bonus
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Percentage (%)
            </label>
            <input
              type="number"
              name="percentage"
              value={formData.percentage}
              onChange={handleChange}
              step="0.1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="e.g., 25"
            />
            <p className="text-xs text-gray-500 mt-1">
              Chance percentage for bonus trigger
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profit Threshold (%)
            </label>
            <input
              type="number"
              name="profit"
              value={formData.profit}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="e.g., 15"
            />
            <p className="text-xs text-gray-500 mt-1">
              Minimum profit % to activate bonus
            </p>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Settings</h3>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">
            Active (Class bonus is available for use)
          </label>
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Saving..." : "Save Class Bonus"}
        </button>
      </div>
    </form>
  );
};

export default ClassBonusForm;
