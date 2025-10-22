import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { actionBarAPI } from "../services/api";
import BonusCard from "../components/BonusCard";
import { ACTIONBAR_CATEGORIES } from "../constants/actionbar";
import { toast } from "react-toastify";
import { Filter, Search } from "lucide-react";

const BonusesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [bonuses, setBonuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "",
    search: "",
    isActive: "",
    bonus_type: searchParams.get("type") || "",
  });

  useEffect(() => {
    fetchBonuses();
  }, [filters.category, filters.isActive, filters.bonus_type]);

  const fetchBonuses = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filters.category) params.category = filters.category;
      if (filters.isActive !== "") params.isActive = filters.isActive;
      if (filters.bonus_type) params.bonus_type = filters.bonus_type;

      const response = await actionBarAPI.getAllBonuses(params);
      setBonuses(response.data.data);
    } catch (error) {
      console.error("Error fetching bonuses:", error);
      toast.error("Failed to fetch bonuses");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await actionBarAPI.deleteBonus(id);
        toast.success("Bonus deleted successfully");
        fetchBonuses();
      } catch (error) {
        console.error("Error deleting bonus:", error);
        toast.error("Failed to delete bonus");
      }
    }
  };

  const handleToggle = async (id) => {
    try {
      await actionBarAPI.toggleBonusStatus(id);
      toast.success("Bonus status updated");
      fetchBonuses();
    } catch (error) {
      console.error("Error toggling bonus:", error);
      toast.error("Failed to update bonus status");
    }
  };

  const handleCategoryChange = (category) => {
    setFilters((prev) => ({ ...prev, category }));
    const newParams = new URLSearchParams(searchParams);
    if (category) {
      newParams.set("category", category);
    } else {
      newParams.delete("category");
    }
    setSearchParams(newParams);
  };

  const handleBonusTypeChange = (bonus_type) => {
    setFilters((prev) => ({ ...prev, bonus_type }));
    const newParams = new URLSearchParams(searchParams);
    if (bonus_type) {
      newParams.set("type", bonus_type);
    } else {
      newParams.delete("type");
    }
    setSearchParams(newParams);
  };

  const filteredBonuses = bonuses.filter((bonus) => {
    if (!filters.search) return true;
    const searchLower = filters.search.toLowerCase();
    return (
      bonus.name.toLowerCase().includes(searchLower) ||
      bonus.key.toLowerCase().includes(searchLower) ||
      bonus.description?.toLowerCase().includes(searchLower)
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
      <div>
        <h2 className="text-3xl font-bold text-gray-900">All Bonuses</h2>
        <p className="text-gray-600 mt-2">
          Manage and configure all action bar bonuses
        </p>
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
                placeholder="Search by name, key, or description..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
            </div>
          </div>

          {/* Bonus Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bonus Type
            </label>
            <select
              value={filters.bonus_type}
              onChange={(e) => handleBonusTypeChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Types</option>
              <option value="actionbar">Action Bar</option>
              <option value="multiplier">Multiplier</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Categories</option>
              {ACTIONBAR_CATEGORIES.filter(
                (cat) => !filters.bonus_type || cat.type === filters.bonus_type
              ).map((cat) => (
                <option key={cat.key} value={cat.key}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={filters.isActive}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, isActive: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Status</option>
              <option value="true">Active Only</option>
              <option value="false">Inactive Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Showing{" "}
          <span className="font-semibold">{filteredBonuses.length}</span> of{" "}
          <span className="font-semibold">{bonuses.length}</span> bonuses
        </p>
        <button
          onClick={fetchBonuses}
          className="px-4 py-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          Refresh
        </button>
      </div>

      {/* Bonuses Grid */}
      {filteredBonuses.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-500 text-lg">No bonuses found</p>
          <p className="text-gray-400 text-sm mt-2">
            Try adjusting your filters or create a new bonus
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBonuses.map((bonus) => (
            <BonusCard
              key={bonus._id}
              bonus={bonus}
              onDelete={handleDelete}
              onToggle={handleToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BonusesPage;
