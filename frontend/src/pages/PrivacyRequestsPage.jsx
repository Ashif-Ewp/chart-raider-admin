import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Plus, Trash2, Filter, Search, RefreshCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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

const requestTypeMap = requestTypeOptions.reduce((map, option) => {
  map[option.value] = option.label;
  return map;
}, {});

const defaultFilters = {
  search: "",
  request_type: "",
  country: "",
};

const PrivacyRequestsPage = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [loading, setLoading] = useState(false);
  const [counts, setCounts] = useState({ filtered: 0, total: 0 });

  const buildQueryParams = useCallback((state) => {
    const query = {};
    Object.entries(state).forEach(([key, value]) => {
      if (value) {
        query[key] = value;
      }
    });
    return query;
  }, []);

  const fetchRequests = useCallback(
    async (state) => {
      setLoading(true);
      try {
        const params = buildQueryParams(state ?? defaultFilters);
        const response = await privacyRequestAPI.getPrivacyRequests(params);
        const data = response.data?.data ?? [];

        setRequests(data);
        setCounts({
          filtered: response.data?.count ?? data.length,
          total: response.data?.total ?? data.length,
        });
      } catch (error) {
        console.error("Failed to load privacy requests", error);
        toast.error("Failed to load privacy requests");
      } finally {
        setLoading(false);
      }
    },
    [buildQueryParams]
  );

  useEffect(() => {
    fetchRequests(filters);
  }, [filters, fetchRequests]);

  const handleFilterChange = (name) => (event) => {
    const { value } = event.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
  };

  const formattedRequests = useMemo(
    () =>
      requests.map((request) => {
        const createdAt = request.createdAt || request.created_at;
        return {
          ...request,
          createdLabel: createdAt
            ? new Intl.DateTimeFormat("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              }).format(new Date(createdAt))
            : "—",
          typeLabel:
            requestTypeMap[request.request_type] ??
            request.request_type?.replace("_", " "),
        };
      }),
    [requests]
  );

  const handleDelete = async (id) => {
    try {
      await privacyRequestAPI.deletePrivacyRequest(id);
      toast.info("Privacy request removed.");
      fetchRequests(filters);
    } catch (error) {
      console.error("Failed to delete privacy request", error);
      toast.error("Failed to delete privacy request");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Privacy Requests</h2>
          <p className="text-gray-600 mt-2">
            View submissions captured in the backend. Use Create (Test) to add
            entries.
          </p>
        </div>
        <button
          onClick={() => navigate("/privacy-requests/create")}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          <Plus size={18} />
          <span>Create (Test)</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Filter size={20} className="text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <div className="relative">
              <input
                type="text"
                value={filters.search}
                onChange={handleFilterChange("search")}
                placeholder="Search name, email, or notes..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Request Type
            </label>
            <select
              value={filters.request_type}
              onChange={handleFilterChange("request_type")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Types</option>
              {requestTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country
            </label>
            <input
              type="text"
              value={filters.country}
              onChange={handleFilterChange("country")}
              placeholder="Filter by country..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm text-gray-600">
            Showing <span className="font-semibold">{counts.filtered}</span> of{" "}
            <span className="font-semibold">{counts.total}</span> requests
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={clearFilters}
              type="button"
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Clear filters
            </button>
            <button
              onClick={() => fetchRequests(filters)}
              className="inline-flex items-center space-x-2 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              <RefreshCcw size={16} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          View & Delete Privacy Requests
        </h3>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : formattedRequests.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">
              No privacy requests match the filters.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Adjust filters or create a new request for testing.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Requester
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {formattedRequests.map((request) => (
                  <tr key={request._id}>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      <div className="font-medium">
                        {request.first_name} {request.last_name}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      <div>{request.email}</div>
                      {request.additional_information && (
                        <div className="text-xs text-gray-500 mt-1 whitespace-pre-wrap break-words">
                          {request.additional_information}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {[request.country, request.state]
                        .filter(Boolean)
                        .join(", ") || "—"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {request.typeLabel || "—"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {request.createdLabel}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleDelete(request._id)}
                        className="inline-flex items-center px-3 py-1 text-sm text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors"
                      >
                        <Trash2 size={16} className="mr-2" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrivacyRequestsPage;
