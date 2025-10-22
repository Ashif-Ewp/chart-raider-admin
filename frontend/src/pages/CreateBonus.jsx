import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { actionBarAPI } from "../services/api";
import BonusForm from "../components/BonusForm";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";

const CreateBonus = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      await actionBarAPI.createBonus(formData);
      toast.success("Bonus created successfully!");
      navigate("/bonuses");
    } catch (error) {
      console.error("Error creating bonus:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to create bonus";
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
          <h2 className="text-3xl font-bold text-gray-900">Create New Bonus</h2>
          <p className="text-gray-600 mt-2">
            Add a new action bar bonus to the system
          </p>
        </div>
      </div>

      {/* Form */}
      <BonusForm onSubmit={handleSubmit} isLoading={loading} />
    </div>
  );
};

export default CreateBonus;
