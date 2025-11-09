import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ticketCategoryAPI } from "../services/api";
import TicketCategoryForm from "../components/TicketCategoryForm";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";

const CreateTicketCategory = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      await ticketCategoryAPI.createTicketCategory(formData);
      toast.success("Ticket category created successfully!");
      navigate("/ticket-categories");
    } catch (error) {
      console.error("Error creating ticket category:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to create ticket category";
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
            Create New Ticket Category
          </h2>
          <p className="text-gray-600 mt-2">
            Add a new ticket category to the system
          </p>
        </div>
      </div>

      {/* Form */}
      <TicketCategoryForm onSubmit={handleSubmit} isLoading={loading} />
    </div>
  );
};

export default CreateTicketCategory;
