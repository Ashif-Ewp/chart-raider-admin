import React, { useState, useEffect, useRef } from "react";
import { Send, Trash2, CheckCircle } from "lucide-react";
import { ticketMessageAPI, ticketAPI } from "../services/api";
import { toast } from "react-toastify";

const TicketChat = ({ ticket, onTicketUpdate }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);
  const adminUsername = "Admin"; // You can make this dynamic later

  useEffect(() => {
    fetchMessages();
    // Set up polling to refresh messages every 3 seconds
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [ticket._id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMessages = async () => {
    try {
      const response = await ticketMessageAPI.getTicketMessages(ticket._id);
      setMessages(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching messages:", error);
      if (loading) {
        toast.error("Failed to load messages");
        setLoading(false);
      }
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      setSending(true);
      await ticketMessageAPI.createTicketMessage({
        ticket_id: ticket._id,
        user_id: ticket.user_id,
        username: adminUsername,
        message: newMessage.trim(),
        is_admin: true,
      });

      setNewMessage("");
      await fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await ticketMessageAPI.deleteTicketMessage(messageId);
        toast.success("Message deleted");
        fetchMessages();
      } catch (error) {
        console.error("Error deleting message:", error);
        toast.error("Failed to delete message");
      }
    }
  };

  const handleResolveTicket = async () => {
    if (
      window.confirm("Are you sure you want to mark this ticket as resolved?")
    ) {
      try {
        await ticketAPI.updateTicket(ticket._id, { status: "resolved" });
        toast.success("Ticket marked as resolved");
        if (onTicketUpdate) {
          onTicketUpdate();
        }
      } catch (error) {
        console.error("Error resolving ticket:", error);
        toast.error("Failed to resolve ticket");
      }
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg border border-gray-200">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg text-gray-900">
              {ticket.subject}
            </h3>
            <p className="text-sm text-gray-600">
              {ticket.username} • {ticket.category_id?.category || "N/A"}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                ticket.status === "resolved"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
            </span>
            {ticket.status !== "resolved" && (
              <button
                onClick={handleResolveTicket}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                <CheckCircle size={16} />
                <span>Resolve</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {/* Initial Ticket Issue */}
        <div className="flex justify-start">
          <div className="max-w-[70%] bg-white rounded-lg p-3 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-gray-700">
                {ticket.username}
              </span>
              <span className="text-xs text-gray-500">
                {formatTime(ticket.createdAt)}
              </span>
            </div>
            <p className="text-sm text-gray-800">{ticket.issues}</p>
          </div>
        </div>

        {/* Chat Messages */}
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex ${
              message.is_admin ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 shadow-sm ${
                message.is_admin
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-gray-200"
              }`}
            >
              <div
                className={`flex items-center justify-between mb-1 ${
                  message.is_admin ? "text-blue-100" : "text-gray-700"
                }`}
              >
                <span className="text-xs font-semibold">
                  {message.username}
                  {message.is_admin && " (Admin)"}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="text-xs opacity-75">
                    {formatTime(message.createdAt)}
                  </span>
                  {message.is_admin && (
                    <button
                      onClick={() => handleDeleteMessage(message._id)}
                      className="opacity-75 hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>
              </div>
              <p
                className={`text-sm ${
                  message.is_admin ? "text-white" : "text-gray-800"
                }`}
              >
                {message.message}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            disabled={sending}
          />
          <button
            type="submit"
            disabled={sending || !newMessage.trim()}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <Send size={18} />
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default TicketChat;
