import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { classBonusAPI } from "../services/api";
import ClassBonusCard from "../components/ClassBonusCard";
import { toast } from "react-toastify";
import { Filter, Search, Plus } from "lucide-react";

const ClassBonusPage = () => {
  const [classBonuses, setClassBonuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    isActive: "",
  });

  useEffect(() => {
    fetchClassBonuses();
  }, [filters.isActive]);

  const fetchClassBonuses = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filters.isActive !== "") params.isActive = filters.isActive;

      const response = await classBonusAPI.getAllClassBonuses(params);
      setClassBonuses(response.data.data);
    } catch (error) {
      console.error("Error fetching class bonuses:", error);
      toast.error("Failed to fetch class bonuses");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await classBonusAPI.deleteClassBonus(id);
        toast.success("Class bonus deleted successfully");
        fetchClassBonuses();
      } catch (error) {
        console.error("Error deleting class bonus:", error);
        toast.error("Failed to delete class bonus");
      }
    }
  };

  const handleToggle = async (id) => {
    try {
      await classBonusAPI.toggleClassBonusStatus(id);
      toast.success("Class bonus status updated");
      fetchClassBonuses();
    } catch (error) {
      console.error("Error toggling class bonus status:", error);
      toast.error("Failed to update class bonus status");
    }
  };

  const filteredClassBonuses = classBonuses.filter((item) => {
    if (!filters.search) return true;
    const searchLower = filters.search.toLowerCase();
    return (
      item.name.toLowerCase().includes(searchLower) ||
      item.key.toLowerCase().includes(searchLower) ||
      item.description?.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Class Bonuses</h2>
          <p className="text-gray-600 mt-2">
            Manage and configure all class bonus items
          </p>
        </div>
        <Link
          to="/class-bonus/create"
          className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <Plus size={20} />
          <span>Create Class Bonus</span>
        </Link>
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
                placeholder="Search by name, key, or description..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
            </div>
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
          <span className="font-semibold">{filteredClassBonuses.length}</span>{" "}
          of <span className="font-semibold">{classBonuses.length}</span> class
          bonuses
        </p>
        <button
          onClick={fetchClassBonuses}
          className="px-4 py-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium"
        >
          Refresh
        </button>
      </div>

      {/* Class Bonus Grid */}
      {filteredClassBonuses.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-500 text-lg">No class bonuses found</p>
          <p className="text-gray-400 text-sm mt-2">
            Try adjusting your filters or create a new class bonus
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClassBonuses.map((item) => (
            <ClassBonusCard
              key={item._id}
              classBonus={item}
              onDelete={handleDelete}
              onToggle={handleToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ClassBonusPage;
