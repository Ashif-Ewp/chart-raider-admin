import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { matchAnnouncementAPI } from "../services/api";
import MatchAnnouncementCard from "../components/MatchAnnouncementCard";
import { toast } from "react-toastify";
import { Filter, Search, Plus } from "lucide-react";

const MatchAnnouncementsPage = () => {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    match_id: "",
  });

  useEffect(() => {
    fetchAnnouncements();
  }, [filters.match_id]);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filters.match_id) params.match_id = filters.match_id;
      if (filters.search) params.search = filters.search;

      const response = await matchAnnouncementAPI.getAllMatchAnnouncements(
        params
      );
      setAnnouncements(response.data.data);
    } catch (error) {
      console.error("Error fetching match announcements:", error);
      toast.error("Failed to fetch match announcements");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, match_id) => {
    if (
      window.confirm(
        `Are you sure you want to delete announcement for match "${match_id}"?`
      )
    ) {
      try {
        await matchAnnouncementAPI.deleteMatchAnnouncement(id);
        toast.success("Match announcement deleted successfully");
        fetchAnnouncements();
      } catch (error) {
        console.error("Error deleting match announcement:", error);
        toast.error("Failed to delete match announcement");
      }
    }
  };

  const filteredAnnouncements = announcements.filter((announcement) => {
    if (!filters.search) return true;
    const searchLower = filters.search.toLowerCase();
    return (
      announcement.match_id.toLowerCase().includes(searchLower) ||
      announcement.title.toLowerCase().includes(searchLower) ||
      announcement.message.toLowerCase().includes(searchLower)
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
          <h2 className="text-3xl font-bold text-gray-900">
            Match Announcements
          </h2>
          <p className="text-gray-600 mt-2">
            Manage match announcements and their results
          </p>
        </div>
        <button
          onClick={() => navigate("/match-announcements/create")}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          <Plus size={18} />
          <span>Create Announcement</span>
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
                placeholder="Search by match ID, title, or message..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
            </div>
          </div>

          {/* Match ID Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Match ID
            </label>
            <input
              type="text"
              value={filters.match_id}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, match_id: e.target.value }))
              }
              placeholder="Filter by specific match ID..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Showing{" "}
          <span className="font-semibold">{filteredAnnouncements.length}</span>{" "}
          of <span className="font-semibold">{announcements.length}</span>{" "}
          announcements
        </p>
        <button
          onClick={fetchAnnouncements}
          className="px-4 py-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          Refresh
        </button>
      </div>

      {/* Announcements Grid */}
      {filteredAnnouncements.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-500 text-lg">No announcements found</p>
          <p className="text-gray-400 text-sm mt-2">
            Try adjusting your filters or create a new announcement
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAnnouncements.map((announcement) => (
            <MatchAnnouncementCard
              key={announcement._id}
              announcement={announcement}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MatchAnnouncementsPage;
