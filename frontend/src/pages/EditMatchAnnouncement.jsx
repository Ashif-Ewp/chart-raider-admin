import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { matchAnnouncementAPI } from "../services/api";
import MatchAnnouncementForm from "../components/MatchAnnouncementForm";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";

const EditMatchAnnouncement = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    fetchAnnouncement();
  }, [id]);

  const fetchAnnouncement = async () => {
    try {
      setFetching(true);
      const response = await matchAnnouncementAPI.getMatchAnnouncementById(id);
      setInitialData(response.data.data);
    } catch (error) {
      console.error("Error fetching match announcement:", error);
      toast.error("Failed to fetch match announcement");
      navigate("/match-announcements");
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      await matchAnnouncementAPI.updateMatchAnnouncement(id, formData);
      toast.success("Match announcement updated successfully!");
      navigate("/match-announcements");
    } catch (error) {
      console.error("Error updating match announcement:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to update match announcement";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Edit Match Announcement
          </h2>
          <p className="text-gray-600 mt-2">
            Update match announcement details
          </p>
        </div>
      </div>

      {/* Form */}
      {initialData && (
        <MatchAnnouncementForm
          initialData={initialData}
          onSubmit={handleSubmit}
          isLoading={loading}
          isEdit={true}
        />
      )}
    </div>
  );
};

export default EditMatchAnnouncement;
