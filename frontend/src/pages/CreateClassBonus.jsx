import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { classBonusAPI } from "../services/api";
import ClassBonusForm from "../components/ClassBonusForm";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";

const CreateClassBonus = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      await classBonusAPI.createClassBonus(formData);
      toast.success("Class bonus created successfully!");
      navigate("/class-bonus");
    } catch (error) {
      console.error("Error creating class bonus:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to create class bonus";
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
            Create New Class Bonus
          </h2>
          <p className="text-gray-600 mt-2">
            Add a new class bonus item to the system
          </p>
        </div>
      </div>

      {/* Form */}
      <ClassBonusForm onSubmit={handleSubmit} isLoading={loading} />
    </div>
  );
};

export default CreateClassBonus;
