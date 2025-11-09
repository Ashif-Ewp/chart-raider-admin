import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ticketAPI } from "../services/api";
import TicketChat from "../components/TicketChat";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";

const TicketChatPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTicket();
  }, [id]);

  const fetchTicket = async () => {
    try {
      setLoading(true);
      const response = await ticketAPI.getTicketById(id);
      setTicket(response.data.data);
    } catch (error) {
      console.error("Error fetching ticket:", error);
      toast.error("Failed to fetch ticket");
      navigate("/tickets");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!ticket) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate("/tickets")}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Ticket Chat</h2>
          <p className="text-gray-600 mt-2">
            Communicate with {ticket.username} about this ticket
          </p>
        </div>
      </div>

      {/* Chat Component */}
      <div className="h-[calc(100vh-250px)] min-h-[600px]">
        <TicketChat ticket={ticket} onTicketUpdate={fetchTicket} />
      </div>
    </div>
  );
};

export default TicketChatPage;
