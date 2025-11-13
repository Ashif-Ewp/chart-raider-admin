import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { actionBarAPI } from "../services/api";
import BonusForm from "../components/BonusForm";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";

const EditBonus = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [bonus, setBonus] = useState(null);

  useEffect(() => {
    fetchBonus();
  }, [id]);

  const fetchBonus = async () => {
    try {
      setFetchLoading(true);
      const response = await actionBarAPI.getBonusById(id);
      setBonus(response.data.data);
    } catch (error) {
      console.error("Error fetching bonus:", error);
      toast.error("Failed to fetch bonus details");
      navigate("/bonuses");
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      await actionBarAPI.updateBonus(id, formData);
      toast.success("Bonus updated successfully!");
      // Refresh the bonus data to show updated values without navigating away
      await fetchBonus();
    } catch (error) {
      console.error("Error updating bonus:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to update bonus";
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

  if (!bonus) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Bonus not found</p>
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
          <h2 className="text-3xl font-bold text-gray-900">Edit Bonus</h2>
          <p className="text-gray-600 mt-2">
            Update bonus: <span className="font-semibold">{bonus.name}</span>
          </p>
        </div>
      </div>

      {/* Form */}
      <BonusForm
        initialData={{
          name: bonus.name,
          key: bonus.key,
          category: bonus.category,
          description: bonus.description || "",
          value: bonus.value || "",
          count: bonus.count || "",
          max: bonus.max || "",
          multiplier_type: bonus.multiplier_type || "",
          bonus_type: bonus.bonus_type,
          rarity: bonus.rarity,
          isActive: bonus.isActive,
          min_value: bonus.min_value || "",
          max_value: bonus.max_value || "",
          duration: bonus.duration || "",
          min_duration: bonus.min_duration || "",
          max_duration: bonus.max_duration || "",
        }}
        onSubmit={handleSubmit}
        isLoading={loading}
        isEdit={true}
      />
    </div>
  );
};

export default EditBonus;

