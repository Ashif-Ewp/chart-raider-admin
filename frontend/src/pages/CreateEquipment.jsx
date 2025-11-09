import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { equipmentAPI } from "../services/api";
import EquipmentForm from "../components/EquipmentForm";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";

const CreateEquipment = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      await equipmentAPI.createEquipment(formData);
      toast.success("Equipment created successfully!");
      navigate("/equipment");
    } catch (error) {
      console.error("Error creating equipment:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to create equipment";
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
            Create New Equipment
          </h2>
          <p className="text-gray-600 mt-2">
            Add a new equipment item to the system
          </p>
        </div>
      </div>

      {/* Form */}
      <EquipmentForm onSubmit={handleSubmit} isLoading={loading} />
    </div>
  );
};

export default CreateEquipment;
