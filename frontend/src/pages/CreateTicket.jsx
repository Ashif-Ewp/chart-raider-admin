import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ticketAPI } from "../services/api";
import TicketForm from "../components/TicketForm";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";

const CreateTicket = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      await ticketAPI.createTicket(formData);
      toast.success("Ticket created successfully!");
      navigate("/tickets");
    } catch (error) {
      console.error("Error creating ticket:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to create ticket";
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
            Create New Ticket (Testing)
          </h2>
          <p className="text-gray-600 mt-2">
            Create a test ticket. In production, tickets are created by users.
          </p>
        </div>
      </div>

      {/* Form */}
      <TicketForm onSubmit={handleSubmit} isLoading={loading} />
    </div>
  );
};

export default CreateTicket;
