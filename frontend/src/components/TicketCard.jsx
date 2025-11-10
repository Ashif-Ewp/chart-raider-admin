import React from "react";
import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TicketCard = ({ ticket }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    return status === "resolved"
      ? "bg-green-100 text-green-700 border-green-300"
      : "bg-yellow-100 text-yellow-700 border-yellow-300";
  };

  return (
    <div className="bg-white rounded-lg shadow-md border-2 border-gray-200 transition-all hover:shadow-lg">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-900">
              {ticket.subject}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              User: {ticket.username} (ID: {ticket.user_id})
            </p>
            <p className="text-xs text-gray-500">
              Created: {new Date(ticket.createdAt).toLocaleDateString()}
            </p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
              ticket.status
            )}`}
          >
            {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
          </span>
        </div>

        {/* Category */}
        {ticket.category_id && (
          <div className="mb-3">
            <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-700">
              {ticket.category_id.category || "N/A"}
            </span>
          </div>
        )}

        {/* Issues */}
        <div className="mb-4">
          <p className="text-xs text-gray-600 font-semibold mb-1">Issues:</p>
          <p className="text-sm text-gray-600 line-clamp-3">{ticket.issues}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/tickets/chat/${ticket._id}`)}
            className="w-full flex items-center justify-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            <MessageCircle size={14} />
            <span>Chat</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
