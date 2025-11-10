import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ticketCategoryAPI } from "../services/api";
import TicketCategoryCard from "../components/TicketCategoryCard";
import { toast } from "react-toastify";
import { Filter, Search, Plus } from "lucide-react";

const TicketCategoriesPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
  });

  useEffect(() => {
    fetchCategories();
  }, [filters.search]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filters.search) params.search = filters.search;

      const response = await ticketCategoryAPI.getAllTicketCategories(params);
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching ticket categories:", error);
      toast.error("Failed to fetch ticket categories");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, categoryName) => {
    if (
      window.confirm(
        `Are you sure you want to delete category "${categoryName}"?`
      )
    ) {
      try {
        await ticketCategoryAPI.deleteTicketCategory(id);
        toast.success("Ticket category deleted successfully");
        fetchCategories();
      } catch (error) {
        console.error("Error deleting ticket category:", error);
        toast.error("Failed to delete ticket category");
      }
    }
  };

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
          <h2 className="text-3xl font-bold text-gray-900">
            Ticket Categories
          </h2>
          <p className="text-gray-600 mt-2">
            Manage ticket categories for support system
          </p>
        </div>
        <button
          onClick={() => navigate("/ticket-categories/create")}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          <Plus size={18} />
          <span>Create Category</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Filter size={20} className="text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                placeholder="Search by category or description..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Showing <span className="font-semibold">{categories.length}</span>{" "}
          categories
        </p>
        <button
          onClick={fetchCategories}
          className="px-4 py-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          Refresh
        </button>
      </div>

      {/* Categories Grid */}
      {categories.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-500 text-lg">No categories found</p>
          <p className="text-gray-400 text-sm mt-2">
            Try adjusting your filters or create a new category
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <TicketCategoryCard
              key={category._id}
              category={category}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TicketCategoriesPage;
