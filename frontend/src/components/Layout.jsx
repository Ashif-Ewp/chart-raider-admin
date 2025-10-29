import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Package,
  Plus,
  ChevronDown,
  ChevronRight,
  Zap,
  TrendingUp,
} from "lucide-react";

const Layout = ({ children }) => {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState({
    actionbar: true,
    multiplier: true,
  });

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col fixed inset-y-0 left-0 top-0 h-screen overflow-y-auto z-50">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="text-3xl">⚡</div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
              <p className="text-xs text-gray-500">Bonus Management</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {/* Dashboard */}
          <Link
            to="/"
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              isActive("/")
                ? "bg-primary-100 text-primary-700 border border-primary-200"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Home size={18} />
            <span className="font-medium">Dashboard</span>
          </Link>

          {/* Action Bar Section */}
          <div className="mt-6">
            <button
              onClick={() => toggleSection("actionbar")}
              className="flex items-center justify-between w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Zap size={18} className="text-blue-500" />
                <span className="font-semibold">Action Bar</span>
              </div>
              {expandedSections.actionbar ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </button>

            {expandedSections.actionbar && (
              <div className="ml-6 mt-2 space-y-1">
                <Link
                  to="/bonuses?type=actionbar"
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-sm ${
                    location.search.includes("type=actionbar")
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Package size={16} />
                  <span>All Action Bar</span>
                </Link>
                <Link
                  to="/bonuses/create?type=actionbar"
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-sm text-gray-600 hover:bg-gray-100"
                >
                  <Plus size={16} />
                  <span>Create Action Bar</span>
                </Link>
              </div>
            )}
          </div>

          {/* Multiplier Section */}
          <div className="mt-4">
            <button
              onClick={() => toggleSection("multiplier")}
              className="flex items-center justify-between w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                <TrendingUp size={18} className="text-green-500" />
                <span className="font-semibold">Multiplier</span>
              </div>
              {expandedSections.multiplier ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </button>

            {expandedSections.multiplier && (
              <div className="ml-6 mt-2 space-y-1">
                <Link
                  to="/bonuses?type=multiplier"
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-sm ${
                    location.search.includes("type=multiplier")
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Package size={16} />
                  <span>All Multipliers</span>
                </Link>
                <Link
                  to="/bonuses/create?type=multiplier"
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-sm text-gray-600 hover:bg-gray-100"
                >
                  <Plus size={16} />
                  <span>Create Multiplier</span>
                </Link>
              </div>
            )}
          </div>

          {/* All Bonuses */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <Link
              to="/bonuses"
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                isActive("/bonuses") && !location.search
                  ? "bg-gray-100 text-gray-700 border border-gray-200"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Package size={18} />
              <span className="font-medium">All Bonuses</span>
            </Link>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            © 2025 Chart Raider
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full ml-64 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {location.pathname === "/" && "Dashboard"}
                {location.pathname === "/bonuses" && "All Bonuses"}
                {location.pathname === "/bonuses/create" && "Create Bonus"}
                {location.pathname.includes("/bonuses/edit") && "Edit Bonus"}
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                {location.pathname === "/" && "Overview of your bonus system"}
                {location.pathname === "/bonuses" && "Manage all bonuses"}
                {location.pathname === "/bonuses/create" && "Add a new bonus"}
                {location.pathname.includes("/bonuses/edit") &&
                  "Update bonus details"}
              </p>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
