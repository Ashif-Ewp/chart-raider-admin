import React, { useState } from "react";

const MatchAnnouncementForm = ({
  initialData,
  onSubmit,
  isLoading,
  isEdit = false,
}) => {
  const [formData, setFormData] = useState(
    initialData || {
      match_id: "",
      title: "",
      message: "",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">
          Match Announcement Information
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Match ID *
            </label>
            <input
              type="text"
              name="match_id"
              value={formData.match_id}
              onChange={handleChange}
              required
              disabled={isEdit}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                isEdit ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
              placeholder="e.g., 171223"
            />
            <p className="text-xs text-gray-500 mt-1">
              Unique identifier for the match
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="e.g., A cheater in the match has been found"
            />
            <p className="text-xs text-gray-500 mt-1">
              Brief description of the announcement
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message (Result) *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="e.g., Banned players winnings have been redistributed to match participants."
            />
            <p className="text-xs text-gray-500 mt-1">
              Detailed message explaining the result or outcome
            </p>
          </div>
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
          {isLoading
            ? "Saving..."
            : isEdit
            ? "Update Announcement"
            : "Create Announcement"}
        </button>
      </div>
    </form>
  );
};

export default MatchAnnouncementForm;
