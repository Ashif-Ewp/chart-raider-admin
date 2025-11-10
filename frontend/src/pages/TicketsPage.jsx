import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ticketAPI, ticketCategoryAPI } from "../services/api";
import TicketCard from "../components/TicketCard";
import { toast } from "react-toastify";
import { Filter, Search, Plus } from "lucide-react";

const TicketsPage = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    category_id: "",
    status: "",
    user_id: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [filters.category_id, filters.status, filters.user_id]);

  const fetchCategories = async () => {
    try {
      const response = await ticketCategoryAPI.getAllTicketCategories();
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filters.category_id) params.category_id = filters.category_id;
      if (filters.status) params.status = filters.status;
      if (filters.user_id) params.user_id = filters.user_id;
      if (filters.search) params.search = filters.search;

      const response = await ticketAPI.getAllTickets(params);
      setTickets(response.data.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
      toast.error("Failed to fetch tickets");
    } finally {
      setLoading(false);
    }
  };

  const filteredTickets = tickets.filter((ticket) => {
    if (!filters.search) return true;
    const searchLower = filters.search.toLowerCase();
    return (
      ticket.user_id.toLowerCase().includes(searchLower) ||
      ticket.username.toLowerCase().includes(searchLower) ||
      ticket.subject.toLowerCase().includes(searchLower) ||
      ticket.issues.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Tickets</h2>
          <p className="text-gray-600 mt-2">
            Manage support tickets (Testing: Create available)
          </p>
        </div>
        <button
          onClick={() => navigate("/tickets/create")}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          <Plus size={18} />
          <span>Create Ticket (Test)</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Filter size={20} className="text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <div className="relative">
              <input
                type="text"
                value={filters.search}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, search: e.target.value }))
                }
                placeholder="Search by user, subject, or issues..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={filters.category_id}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, category_id: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.category}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, status: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          {/* User ID Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              User ID
            </label>
            <input
              type="text"
              value={filters.user_id}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, user_id: e.target.value }))
              }
              placeholder="Filter by user ID..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Showing{" "}
          <span className="font-semibold">{filteredTickets.length}</span> of{" "}
          <span className="font-semibold">{tickets.length}</span> tickets
        </p>
        <button
          onClick={fetchTickets}
          className="px-4 py-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          Refresh
        </button>
      </div>

      {/* Tickets Grid */}
      {filteredTickets.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-500 text-lg">No tickets found</p>
          <p className="text-gray-400 text-sm mt-2">
            Try adjusting your filters or create a new ticket for testing
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTickets.map((ticket) => (
            <TicketCard key={ticket._id} ticket={ticket} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TicketsPage;
