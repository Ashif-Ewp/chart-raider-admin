import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Package,
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
  ShieldCheck,
  Lock,
  UserX,
  ShoppingBag,
  Boxes,
  PackageOpen,
  Percent,
  Crown,
  Gamepad2,
  ListChecks,
} from "lucide-react";

const Layout = ({ children }) => {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState({
    allBonus: false,
    announcement: false,
    support: false,
    privacy: false,
    shop: false,
    settings: false,
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

  const isPrivacyRequestsActive = () => {
    return location.pathname.startsWith("/privacy-requests");
  };

  const isOptOutActive = () => {
    return location.pathname.startsWith("/opt-out-requests");
  };

  const isShopCasesActive = () => {
    return location.pathname.startsWith("/shop/cases");
  };

  const isShopItemsActive = () => {
    return location.pathname.startsWith("/shop/items");
  };

  const isShopTicketsActive = () => {
    return location.pathname.startsWith("/shop/tickets");
  };

  const isRaiderPassActive = () => {
    return location.pathname.startsWith("/shop/raider-pass");
  };

  const isSettingsActive = () => {
    return location.pathname.startsWith("/settings");
  };

  const isSettingsTicketQueueActive = () => {
    return location.pathname === "/settings/ticket-queue";
  };

  const isSettingsGamingToolsActive = () => {
    return location.pathname === "/settings/gaming-tools";
  };

  const isSettingsMatchRulesActive = () => {
    return location.pathname === "/settings/match-rules";
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

          {/* Privacy Center Section */}
          <div className="mt-6">
            <button
              onClick={() => toggleSection("privacy")}
              className="flex items-center justify-between w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                <ShieldCheck size={18} className="text-indigo-500" />
                <span className="font-semibold">Privacy Center</span>
              </div>
              {expandedSections.privacy ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </button>

            {expandedSections.privacy && (
              <div className="ml-6 mt-2 space-y-1">
                <Link
                  to="/privacy-requests"
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-sm ${
                    isPrivacyRequestsActive()
                      ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Lock size={16} />
                  <span>Privacy Requests</span>
                </Link>
                <Link
                  to="/opt-out-requests"
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-sm ${
                    isOptOutActive()
                      ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <UserX size={16} />
                  <span>Right to Opt Out</span>
                </Link>
              </div>
            )}
          </div>

          {/* Shop Section */}
          <div className="mt-6">
            <button
              onClick={() => toggleSection("shop")}
              className="flex items-center justify-between w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                <ShoppingBag size={18} className="text-amber-500" />
                <span className="font-semibold">Shop</span>
              </div>
              {expandedSections.shop ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </button>

            {expandedSections.shop && (
              <div className="ml-6 mt-2 space-y-1">
                <Link
                  to="/shop/cases"
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-sm ${
                    isShopCasesActive()
                      ? "bg-amber-50 text-amber-700 border border-amber-200"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Boxes size={16} />
                  <span>Cases</span>
                </Link>
                <Link
                  to="/shop/items"
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-sm ${
                    isShopItemsActive()
                      ? "bg-amber-50 text-amber-700 border border-amber-200"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <PackageOpen size={16} />
                  <span>Items</span>
                </Link>
                <Link
                  to="/shop/tickets"
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-sm ${
                    isShopTicketsActive()
                      ? "bg-amber-50 text-amber-700 border border-amber-200"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Percent size={16} />
                  <span>Tickets</span>
                </Link>
                <Link
                  to="/shop/raider-pass"
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-sm ${
                    isRaiderPassActive()
                      ? "bg-amber-50 text-amber-700 border border-amber-200"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Crown size={16} />
                  <span>Raider Pass</span>
                </Link>
              </div>
            )}
          </div>

          {/* Settings Section */}
          <div className="mt-6">
            <button
              onClick={() => toggleSection("settings")}
              className="flex items-center justify-between w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Shield size={18} className="text-slate-500" />
                <span className="font-semibold">Settings</span>
              </div>
              {expandedSections.settings ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </button>

            {expandedSections.settings && (
              <div className="ml-6 mt-2 space-y-1">
                <Link
                  to="/settings/ticket-queue"
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-sm ${
                    isSettingsTicketQueueActive()
                      ? "bg-slate-50 text-slate-700 border border-slate-200"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Ticket size={16} />
                  <span>Ticket Queue</span>
                </Link>
                <Link
                  to="/settings/gaming-tools"
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-sm ${
                    isSettingsGamingToolsActive()
                      ? "bg-slate-50 text-slate-700 border border-slate-200"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Gamepad2 size={16} />
                  <span>Gaming Tools</span>
                </Link>
                <Link
                  to="/settings/match-rules"
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-sm ${
                    isSettingsMatchRulesActive()
                      ? "bg-slate-50 text-slate-700 border border-slate-200"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <ListChecks size={16} />
                  <span>Match Rules</span>
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
                {location.pathname === "/privacy-requests" &&
                  "Privacy Requests"}
                {location.pathname === "/opt-out-requests" &&
                  "Right to Opt Out"}
                {location.pathname === "/privacy-requests/create" &&
                  "Create Privacy Request (Test)"}
                {location.pathname === "/opt-out-requests/create" &&
                  "Create Opt-Out Request (Test)"}
                {location.pathname === "/shop/cases" && "Shop Cases"}
                {location.pathname === "/shop/items" && "Shop Items"}
                {location.pathname === "/shop/tickets" && "Shop Tickets"}
                {location.pathname === "/shop/raider-pass" && "Raider Pass"}
                {location.pathname === "/settings/ticket-queue" &&
                  "Ticket Queue"}
                {location.pathname === "/settings/gaming-tools" &&
                  "Gaming Tools"}
                {location.pathname === "/settings/match-rules" && "Match Rules"}
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
                {location.pathname === "/privacy-requests" &&
                  "Collect, review, and manage privacy submissions (local-only testing)"}
                {location.pathname === "/opt-out-requests" &&
                  "Track opt-out requests captured locally for testing"}
                {location.pathname === "/privacy-requests/create" &&
                  "Use this form to create a local-only privacy request for testing"}
                {location.pathname === "/opt-out-requests/create" &&
                  "Use this form to create a local-only opt-out request for testing"}
                {location.pathname === "/shop/cases" &&
                  "Monitor and edit case inventory levels, pricing, and discounts."}
                {location.pathname === "/shop/items" &&
                  "Review and adjust item availability and pricing."}
                {location.pathname === "/shop/tickets" &&
                  "Manage ticket bundle stock and price points."}
                {location.pathname === "/shop/raider-pass" &&
                  "Fine-tune Raider Pass inventory and promotional pricing."}
                {location.pathname === "/settings/ticket-queue" &&
                  "Edit ticket queue configuration stored in Postgres."}
                {location.pathname === "/settings/gaming-tools" &&
                  "Manage user winning balances sourced from Postgres."}
                {location.pathname === "/settings/match-rules" &&
                  "Control the content of match rule cards and review recent edits."}
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
