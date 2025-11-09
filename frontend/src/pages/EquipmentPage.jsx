import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { equipmentAPI } from "../services/api";
import EquipmentCard from "../components/EquipmentCard";
import { CASE_TYPES, BONUS_TYPES } from "../constants/equipment";
import { toast } from "react-toastify";
import { Filter, Search, Plus } from "lucide-react";

const EquipmentPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    case_type: searchParams.get("case_type") || "",
    search: "",
    isActive: "",
    bonus: searchParams.get("bonus") || "",
  });

  useEffect(() => {
    fetchEquipment();
  }, [filters.case_type, filters.isActive, filters.bonus]);

  const fetchEquipment = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filters.case_type) params.case_type = filters.case_type;
      if (filters.isActive !== "") params.isActive = filters.isActive;
      if (filters.bonus) params.bonus = filters.bonus;

      const response = await equipmentAPI.getAllEquipment(params);
      setEquipment(response.data.data);
    } catch (error) {
      console.error("Error fetching equipment:", error);
      toast.error("Failed to fetch equipment");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await equipmentAPI.deleteEquipment(id);
        toast.success("Equipment deleted successfully");
        fetchEquipment();
      } catch (error) {
        console.error("Error deleting equipment:", error);
        toast.error("Failed to delete equipment");
      }
    }
  };

  const handleToggle = async (id) => {
    try {
      await equipmentAPI.toggleEquipmentStatus(id);
      toast.success("Equipment status updated");
      fetchEquipment();
    } catch (error) {
      console.error("Error toggling equipment status:", error);
      toast.error("Failed to update equipment status");
    }
  };

  const handleCaseTypeChange = (case_type) => {
    setFilters((prev) => ({ ...prev, case_type }));
    const newParams = new URLSearchParams(searchParams);
    if (case_type) {
      newParams.set("case_type", case_type);
    } else {
      newParams.delete("case_type");
    }
    setSearchParams(newParams);
  };

  const handleBonusChange = (bonus) => {
    setFilters((prev) => ({ ...prev, bonus }));
    const newParams = new URLSearchParams(searchParams);
    if (bonus) {
      newParams.set("bonus", bonus);
    } else {
      newParams.delete("bonus");
    }
    setSearchParams(newParams);
  };

  const filteredEquipment = equipment.filter((item) => {
    if (!filters.search) return true;
    const searchLower = filters.search.toLowerCase();
    return (
      item.name.toLowerCase().includes(searchLower) ||
      item.key.toLowerCase().includes(searchLower) ||
      item.summary?.toLowerCase().includes(searchLower)
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
          <h2 className="text-3xl font-bold text-gray-900">All Equipment</h2>
          <p className="text-gray-600 mt-2">
            Manage and configure all equipment items
          </p>
        </div>
        <Link
          to="/equipment/create"
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus size={20} />
          <span>Create Equipment</span>
        </Link>
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
                placeholder="Search by name, key, or summary..."
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
              value={filters.bonus}
              onChange={(e) => handleBonusChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Types</option>
              {BONUS_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.icon} {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Case Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Case Type
            </label>
            <select
              value={filters.case_type}
              onChange={(e) => handleCaseTypeChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Case Types</option>
              {CASE_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.icon} {type.label}
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
          <span className="font-semibold">{filteredEquipment.length}</span> of{" "}
          <span className="font-semibold">{equipment.length}</span> equipment
        </p>
        <button
          onClick={fetchEquipment}
          className="px-4 py-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          Refresh
        </button>
      </div>

      {/* Equipment Grid */}
      {filteredEquipment.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-500 text-lg">No equipment found</p>
          <p className="text-gray-400 text-sm mt-2">
            Try adjusting your filters or create a new equipment
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipment.map((item) => (
            <EquipmentCard
              key={item._id}
              equipment={item}
              onDelete={handleDelete}
              onToggle={handleToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EquipmentPage;
