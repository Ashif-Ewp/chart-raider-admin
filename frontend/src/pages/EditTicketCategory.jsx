import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ticketCategoryAPI } from "../services/api";
import TicketCategoryForm from "../components/TicketCategoryForm";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";

const EditTicketCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    fetchCategory();
  }, [id]);

  const fetchCategory = async () => {
    try {
      setFetching(true);
      const response = await ticketCategoryAPI.getTicketCategoryById(id);
      setInitialData(response.data.data);
    } catch (error) {
      console.error("Error fetching ticket category:", error);
      toast.error("Failed to fetch ticket category");
      navigate("/ticket-categories");
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      await ticketCategoryAPI.updateTicketCategory(id, formData);
      toast.success("Ticket category updated successfully!");
      navigate("/ticket-categories");
    } catch (error) {
      console.error("Error updating ticket category:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to update ticket category";
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
            Edit Ticket Category
          </h2>
          <p className="text-gray-600 mt-2">Update ticket category details</p>
        </div>
      </div>

      {/* Form */}
      {initialData && (
        <TicketCategoryForm
          initialData={initialData}
          onSubmit={handleSubmit}
          isLoading={loading}
          isEdit={true}
        />
      )}
    </div>
  );
};

export default EditTicketCategory;
