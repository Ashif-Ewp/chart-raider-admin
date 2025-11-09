import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { equipmentAPI } from "../services/api";
import EquipmentForm from "../components/EquipmentForm";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";

const EditEquipment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [equipment, setEquipment] = useState(null);

  useEffect(() => {
    fetchEquipment();
  }, [id]);

  const fetchEquipment = async () => {
    try {
      setFetchLoading(true);
      const response = await equipmentAPI.getEquipmentById(id);
      setEquipment(response.data.data);
    } catch (error) {
      console.error("Error fetching equipment:", error);
      toast.error("Failed to fetch equipment details");
      navigate("/equipment");
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      await equipmentAPI.updateEquipment(id, formData);
      toast.success("Equipment updated successfully!");
      // Refresh the equipment data to show updated values without navigating away
      await fetchEquipment();
    } catch (error) {
      console.error("Error updating equipment:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to update equipment";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!equipment) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Equipment not found</p>
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
          <h2 className="text-3xl font-bold text-gray-900">Edit Equipment</h2>
          <p className="text-gray-600 mt-2">
            Update equipment:{" "}
            <span className="font-semibold">{equipment.name}</span>
          </p>
        </div>
      </div>

      {/* Form */}
      <EquipmentForm
        initialData={{
          name: equipment.name,
          key: equipment.key,
          summary: equipment.summary || "",
          bonus: equipment.bonus || "",
          case_type: equipment.case_type || "",
          profit: equipment.profit ?? "",
          loss: equipment.loss ?? "",
          value: equipment.value ?? "",
          max_value: equipment.max_value ?? "",
          max_stack: equipment.max_stack ?? "",
          duration: equipment.duration ?? "",
          cooldown: equipment.cooldown ?? "",
          percentage: equipment.percentage ?? "",
          count: equipment.count ?? "",
          half1: equipment.half1 || "",
          half2: equipment.half2 || "",
          isActive: equipment.isActive,
        }}
        onSubmit={handleSubmit}
        isLoading={loading}
        isEdit={true}
      />
    </div>
  );
};

export default EditEquipment;
