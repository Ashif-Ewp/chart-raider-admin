import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { classBonusAPI } from "../services/api";
import ClassBonusForm from "../components/ClassBonusForm";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";

const EditClassBonus = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [classBonus, setClassBonus] = useState(null);

  useEffect(() => {
    fetchClassBonus();
  }, [id]);

  const fetchClassBonus = async () => {
    try {
      setFetchLoading(true);
      const response = await classBonusAPI.getClassBonusById(id);
      setClassBonus(response.data.data);
    } catch (error) {
      console.error("Error fetching class bonus:", error);
      toast.error("Failed to fetch class bonus details");
      navigate("/class-bonus");
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      await classBonusAPI.updateClassBonus(id, formData);
      toast.success("Class bonus updated successfully!");
      // Refresh the class bonus data to show updated values without navigating away
      await fetchClassBonus();
    } catch (error) {
      console.error("Error updating class bonus:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to update class bonus";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!classBonus) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Class bonus not found</p>
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
            Edit Class Bonus
          </h2>
          <p className="text-gray-600 mt-2">
            Update class bonus:{" "}
            <span className="font-semibold">{classBonus.name}</span>
          </p>
        </div>
      </div>

      {/* Form */}
      <ClassBonusForm
        initialData={{
          name: classBonus.name,
          key: classBonus.key,
          description: classBonus.description || "",
          value: classBonus.value ?? "",
          percentage: classBonus.percentage ?? "",
          profit: classBonus.profit ?? "",
          isActive: classBonus.isActive,
        }}
        onSubmit={handleSubmit}
        isLoading={loading}
        isEdit={true}
      />
    </div>
  );
};

export default EditClassBonus;
