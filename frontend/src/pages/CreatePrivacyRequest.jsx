import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { privacyRequestAPI } from "../services/api";

const requestTypeOptions = [
  { label: "Confirm Processing", value: "confirm_processing" },
  { label: "Access", value: "access" },
  { label: "Delete", value: "delete" },
  { label: "Correct", value: "correct" },
  { label: "Other", value: "other" },
  { label: "Myself", value: "myself" },
  { label: "Someone Else", value: "someone_else" },
];

const initialForm = {
  first_name: "",
  last_name: "",
  email: "",
  country: "",
  state: "",
  request_type: "",
  additional_information: "",
};

const CreatePrivacyRequest = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmed = Object.fromEntries(
      Object.entries(form).map(([key, value]) => [key, value.trim()])
    );

    if (!trimmed.first_name || !trimmed.last_name || !trimmed.email) {
      toast.error("First name, last name, and email are required.");
      return;
    }

    if (!trimmed.request_type) {
      toast.error("Please select a request type.");
      return;
    }

    try {
      setSubmitting(true);
      await privacyRequestAPI.createPrivacyRequest(trimmed);
      toast.success("Privacy request captured for testing.");
      navigate("/privacy-requests");
    } catch (error) {
      console.error("Failed to save privacy request", error);
      const message =
        error.response?.data?.message || "Failed to save privacy request";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Create Privacy Request (Test)
          </h2>
          <p className="text-gray-600 mt-2">
            Persist a privacy submission in the backend to support QA workflows.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Jane"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Doe"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="jane.doe@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={form.country}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="United States"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State/Region
              </label>
              <input
                type="text"
                name="state"
                value={form.state}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="California"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Request Type<span className="text-red-500">*</span>
              </label>
              <select
                name="request_type"
                value={form.request_type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              >
                <option value="">Select a request type</option>
                {requestTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Information
            </label>
            <textarea
              name="additional_information"
              value={form.additional_information}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Provide any additional details about the request..."
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate("/privacy-requests")}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Saving..." : "Save Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePrivacyRequest;
