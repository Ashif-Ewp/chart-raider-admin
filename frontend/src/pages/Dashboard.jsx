import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { actionBarAPI } from "../services/api";
import { getCategoryInfo } from "../constants/actionbar";
import { Package, TrendingUp, Activity, Zap } from "lucide-react";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    categories: [],
    totalBonuses: 0,
    activeBonuses: 0,
    actionBarBonuses: 0,
    multiplierBonuses: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [categoriesRes, bonusesRes] = await Promise.all([
        actionBarAPI.getCategories(),
        actionBarAPI.getAllBonuses(),
      ]);

      const categories = categoriesRes.data.data;
      const bonuses = bonusesRes.data.data;

      setStats({
        categories,
        totalBonuses: bonuses.length,
        activeBonuses: bonuses.filter((b) => b.isActive).length,
        actionBarBonuses: bonuses.filter((b) => b.bonus_type === "actionbar")
          .length,
        multiplierBonuses: bonuses.filter((b) => b.bonus_type === "multiplier")
          .length,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
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
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600 mt-2">
          Overview of your action bar bonus system
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Bonuses</p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.totalBonuses}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Package className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Bonuses</p>
              <p className="text-3xl font-bold text-green-600">
                {stats.activeBonuses}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Activity className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Action Bar</p>
              <p className="text-3xl font-bold text-blue-600">
                {stats.actionBarBonuses}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Zap className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Multipliers</p>
              <p className="text-3xl font-bold text-emerald-600">
                {stats.multiplierBonuses}
              </p>
            </div>
            <div className="bg-emerald-100 p-3 rounded-lg">
              <TrendingUp className="text-emerald-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.categories.map((category) => {
            const categoryInfo = getCategoryInfo(category.key);
            return (
              <div
                key={category.key}
                onClick={() => navigate(`/bonuses?category=${category.key}`)}
                className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{categoryInfo.icon}</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {categoryInfo.name}
                      </h4>
                      <p className="text-sm text-gray-500">{category.key}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Bonuses</span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${categoryInfo.color}`}
                  >
                    {category.count}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg shadow-md p-8 text-white">
        <h3 className="text-2xl font-bold mb-2">Quick Actions</h3>
        <p className="mb-6 opacity-90">
          Manage your action bar bonuses efficiently
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/bonuses/create")}
            className="px-6 py-3 bg-white text-primary-700 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
          >
            Create New Bonus
          </button>
          <button
            onClick={() => navigate("/bonuses")}
            className="px-6 py-3 bg-primary-800 text-white rounded-lg hover:bg-primary-900 transition-colors font-semibold"
          >
            View All Bonuses
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
