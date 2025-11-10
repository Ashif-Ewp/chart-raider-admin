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
  Shield,
  Megaphone,
  Trophy,
  HelpCircle,
  Tag,
  Ticket,
} from "lucide-react";

const Layout = ({ children }) => {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState({
    allBonus: false,
    announcement: false,
    support: false,
  });

  const isActive = (path) => {
    return location.pathname === path;
  };

  const isEquipmentActive = () => {
    return location.pathname.startsWith("/equipment");
  };

  const isMatchAnnouncementActive = () => {
    return location.pathname.startsWith("/match-announcements");
  };

  const isTicketCategoryActive = () => {
    return location.pathname.startsWith("/ticket-categories");
  };

  const isTicketActive = () => {
    return location.pathname.startsWith("/tickets");
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

          {/* All Bonus Section */}
          <div className="mt-6">
            <button
              onClick={() => toggleSection("allBonus")}
              className="flex items-center justify-between w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Package size={18} className="text-blue-500" />
                <span className="font-semibold">All bonus</span>
              </div>
              {expandedSections.allBonus ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </button>

            {expandedSections.allBonus && (
              <div className="ml-6 mt-2 space-y-1">
                <Link
                  to="/bonuses?type=actionbar"
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-sm ${
                    location.search.includes("type=actionbar")
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Zap size={16} />
                  <span>Action bar</span>
                </Link>
                <Link
                  to="/bonuses?type=multiplier"
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-sm ${
                    location.search.includes("type=multiplier")
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <TrendingUp size={16} />
                  <span>Multiplier</span>
                </Link>
              </div>
            )}
          </div>

          {/* Equipment Items */}
          <div className="mt-6">
            <Link
              to="/equipment"
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                isEquipmentActive()
                  ? "bg-purple-50 text-purple-700 border border-purple-200"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Shield size={18} className="text-purple-500" />
              <span className="font-medium">Equipment items</span>
            </Link>
          </div>

          {/* Announcement Section */}
          <div className="mt-6">
            <button
              onClick={() => toggleSection("announcement")}
              className="flex items-center justify-between w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Megaphone size={18} className="text-orange-500" />
                <span className="font-semibold">Announcement</span>
              </div>
              {expandedSections.announcement ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </button>

            {expandedSections.announcement && (
              <div className="ml-6 mt-2 space-y-1">
                <Link
                  to="/match-announcements"
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-sm ${
                    isMatchAnnouncementActive()
                      ? "bg-orange-50 text-orange-700 border border-orange-200"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Trophy size={16} />
                  <span>Match</span>
                </Link>
              </div>
            )}
          </div>

          {/* Support Section */}
          <div className="mt-6">
            <button
              onClick={() => toggleSection("support")}
              className="flex items-center justify-between w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                <HelpCircle size={18} className="text-green-500" />
                <span className="font-semibold">Support</span>
              </div>
              {expandedSections.support ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </button>

            {expandedSections.support && (
              <div className="ml-6 mt-2 space-y-1">
                <Link
                  to="/ticket-categories"
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-sm ${
                    isTicketCategoryActive()
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Tag size={16} />
                  <span>Ticket Categories</span>
                </Link>
                <Link
                  to="/tickets"
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-sm ${
                    isTicketActive()
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Ticket size={16} />
                  <span>Tickets</span>
                </Link>
              </div>
            )}
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
                {location.pathname === "/equipment" && "All Equipment"}
                {location.pathname === "/equipment/create" &&
                  "Create Equipment"}
                {location.pathname.includes("/equipment/edit") &&
                  "Edit Equipment"}
                {location.pathname === "/match-announcements" &&
                  "Match Announcements"}
                {location.pathname === "/match-announcements/create" &&
                  "Create Match Announcement"}
                {location.pathname.includes("/match-announcements/edit") &&
                  "Edit Match Announcement"}
                {location.pathname === "/ticket-categories" &&
                  "Ticket Categories"}
                {location.pathname === "/ticket-categories/create" &&
                  "Create Ticket Category"}
                {location.pathname.includes("/ticket-categories/edit") &&
                  "Edit Ticket Category"}
                {location.pathname === "/tickets" && "Tickets"}
                {location.pathname === "/tickets/create" && "Create Ticket"}
                {location.pathname.includes("/tickets/chat") && "Ticket Chat"}
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                {location.pathname === "/" && "Overview of your bonus system"}
                {location.pathname === "/bonuses" && "Manage all bonuses"}
                {location.pathname === "/bonuses/create" && "Add a new bonus"}
                {location.pathname.includes("/bonuses/edit") &&
                  "Update bonus details"}
                {location.pathname === "/equipment" && "Manage all equipment"}
                {location.pathname === "/equipment/create" &&
                  "Add a new equipment"}
                {location.pathname.includes("/equipment/edit") &&
                  "Update equipment details"}
                {location.pathname === "/match-announcements" &&
                  "Manage match announcements"}
                {location.pathname === "/match-announcements/create" &&
                  "Add a new match announcement"}
                {location.pathname.includes("/match-announcements/edit") &&
                  "Update match announcement details"}
                {location.pathname === "/ticket-categories" &&
                  "Manage ticket categories"}
                {location.pathname === "/ticket-categories/create" &&
                  "Add a new ticket category"}
                {location.pathname.includes("/ticket-categories/edit") &&
                  "Update ticket category details"}
                {location.pathname === "/tickets" &&
                  "Manage support tickets (Testing: Create available)"}
                {location.pathname === "/tickets/create" &&
                  "Create a test ticket"}
                {location.pathname.includes("/tickets/chat") &&
                  "Chat with user about this ticket"}
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
