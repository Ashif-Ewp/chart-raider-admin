import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { matchAnnouncementAPI } from "../services/api";
import MatchAnnouncementForm from "../components/MatchAnnouncementForm";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";

const CreateMatchAnnouncement = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      await matchAnnouncementAPI.createMatchAnnouncement(formData);
      toast.success("Match announcement created successfully!");
      navigate("/match-announcements");
    } catch (error) {
      console.error("Error creating match announcement:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to create match announcement";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

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
            Create New Match Announcement
          </h2>
          <p className="text-gray-600 mt-2">
            Add a new match announcement to the system
          </p>
        </div>
      </div>

      {/* Form */}
      <MatchAnnouncementForm onSubmit={handleSubmit} isLoading={loading} />
    </div>
  );
};

export default CreateMatchAnnouncement;
