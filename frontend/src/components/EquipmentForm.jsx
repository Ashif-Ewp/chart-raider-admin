import React, { useState } from "react";
import {
  CASE_TYPES,
  BONUS_TYPES,
  EQUIPMENT_ITEM_SUMMARY,
} from "../constants/equipment";

const EquipmentForm = ({
  initialData,
  onSubmit,
  isLoading,
  isEdit = false,
}) => {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      key: "",
      summary: "",
      bonus: "",
      case_type: "",
      profit: "",
      loss: "",
      value: "",
      max_value: "",
      max_stack: "",
      duration: "",
      cooldown: "",
      percentage: "",
      count: "",
      half1: "",
      half2: "",
      isActive: true,
    }
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Auto-fill from EQUIPMENT_ITEM_SUMMARY if key is selected
    if (name === "key" && value && EQUIPMENT_ITEM_SUMMARY[value]) {
      const summaryData = EQUIPMENT_ITEM_SUMMARY[value];
      setFormData((prev) => ({
        ...prev,
        key: value,
        summary: summaryData.summary || prev.summary,
        bonus: summaryData.bonus || prev.bonus,
        case_type: summaryData.case_type || prev.case_type,
        profit: summaryData.profit ?? prev.profit,
        loss: summaryData.loss ?? prev.loss,
        value: summaryData.value ?? prev.value,
        max_value: summaryData.max_value ?? prev.max_value,
        max_stack: summaryData.max_stack ?? prev.max_stack,
        duration: summaryData.duration ?? prev.duration,
        cooldown: summaryData.cooldown ?? prev.cooldown,
        percentage: summaryData.percentage ?? prev.percentage,
        count: summaryData.count ?? prev.count,
        half1: summaryData.half1 || prev.half1,
        half2: summaryData.half2 || prev.half2,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clean up the data
    const submitData = {
      ...formData,
      profit: formData.profit === "" ? null : Number(formData.profit),
      loss: formData.loss === "" ? null : Number(formData.loss),
      value: formData.value === "" ? null : formData.value,
      max_value: formData.max_value === "" ? null : Number(formData.max_value),
      max_stack: formData.max_stack === "" ? null : Number(formData.max_stack),
      duration: formData.duration === "" ? null : Number(formData.duration),
      cooldown: formData.cooldown === "" ? null : Number(formData.cooldown),
      percentage:
        formData.percentage === "" ? null : Number(formData.percentage),
      count: formData.count === "" ? null : Number(formData.count),
      half1: formData.half1 === "" ? null : formData.half1,
      half2: formData.half2 === "" ? null : formData.half2,
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="e.g., Titanium Right Pink Lens"
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
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                isEdit ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
            >
              <option value="">Select a key</option>
              {Object.entries(EQUIPMENT_ITEM_SUMMARY).map(([key, data]) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Case Type *
            </label>
            <select
              name="case_type"
              value={formData.case_type}
              onChange={handleChange}
              required
              disabled={isEdit}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                isEdit ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
            >
              <option value="">Select a case type</option>
              {CASE_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.icon} {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bonus Type *
            </label>
            <select
              name="bonus"
              value={formData.bonus}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Select a bonus type</option>
              {BONUS_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.icon} {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Summary *
          </label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            required
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Enter equipment summary..."
          />
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">
          Stats & Values
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profit (%)
            </label>
            <input
              type="number"
              name="profit"
              value={formData.profit}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="e.g., 10"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loss Recovery (%)
            </label>
            <input
              type="number"
              name="loss"
              value={formData.loss}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="e.g., 5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Value
            </label>
            <input
              type="text"
              name="value"
              value={formData.value}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="e.g., 20, 1, 15"
            />
            <p className="text-xs text-gray-500 mt-1">
              Can be number or string
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Value (%)
            </label>
            <input
              type="number"
              name="max_value"
              value={formData.max_value}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="e.g., 30"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Stack
            </label>
            <input
              type="number"
              name="max_stack"
              value={formData.max_stack}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="e.g., 5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration
            </label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="e.g., 16 (minutes or seconds)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cooldown (hours)
            </label>
            <input
              type="number"
              name="cooldown"
              value={formData.cooldown}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="e.g., 6"
            />
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="e.g., 0.1, 1, 25"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Count
            </label>
            <input
              type="number"
              name="count"
              value={formData.count}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="e.g., 1, 2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Half 1
            </label>
            <input
              type="text"
              name="half1"
              value={formData.half1}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="e.g., 0.5PM"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Half 2
            </label>
            <input
              type="text"
              name="half2"
              value={formData.half2}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="e.g., 0.5TD"
            />
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
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">
            Active (Equipment is available for use)
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
          className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Saving..." : "Save Equipment"}
        </button>
      </div>
    </form>
  );
};

export default EquipmentForm;
