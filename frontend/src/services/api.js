import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Action Bar API
export const actionBarAPI = {
  // Categories
  getCategories: () => api.get("/actionbar/categories"),

  // Bonuses
  getAllBonuses: (params) => api.get("/actionbar/bonuses", { params }),
  getBonusesGrouped: () => api.get("/actionbar/bonuses/grouped"),
  getBonusById: (id) => api.get(`/actionbar/bonuses/${id}`),
  createBonus: (data) => api.post("/actionbar/bonuses", data),
  updateBonus: (id, data) => api.put(`/actionbar/bonuses/${id}`, data),
  deleteBonus: (id) => api.delete(`/actionbar/bonuses/${id}`),
  toggleBonusStatus: (id) => api.patch(`/actionbar/bonuses/${id}/toggle`),
};

// Equipment API
export const equipmentAPI = {
  // Case Types
  getCaseTypes: () => api.get("/equipment/case-types"),

  // Equipment Items
  getAllEquipment: (params) => api.get("/equipment/items", { params }),
  getEquipmentGrouped: () => api.get("/equipment/items/grouped"),
  getEquipmentById: (id) => api.get(`/equipment/items/${id}`),
  createEquipment: (data) => api.post("/equipment/items", data),
  updateEquipment: (id, data) => api.put(`/equipment/items/${id}`, data),
  deleteEquipment: (id) => api.delete(`/equipment/items/${id}`),
  toggleEquipmentStatus: (id) => api.patch(`/equipment/items/${id}/toggle`),
};

// Match Announcement API
export const matchAnnouncementAPI = {
  getAllMatchAnnouncements: (params) =>
    api.get("/match-announcements", { params }),
  getMatchAnnouncementById: (id) => api.get(`/match-announcements/${id}`),
  createMatchAnnouncement: (data) => api.post("/match-announcements", data),
  updateMatchAnnouncement: (id, data) =>
    api.put(`/match-announcements/${id}`, data),
  deleteMatchAnnouncement: (id) => api.delete(`/match-announcements/${id}`),
};

// Ticket Category API
export const ticketCategoryAPI = {
  getAllTicketCategories: (params) => api.get("/ticket-categories", { params }),
  getTicketCategoryById: (id) => api.get(`/ticket-categories/${id}`),
  createTicketCategory: (data) => api.post("/ticket-categories", data),
  updateTicketCategory: (id, data) => api.put(`/ticket-categories/${id}`, data),
  deleteTicketCategory: (id) => api.delete(`/ticket-categories/${id}`),
};

// Ticket API
export const ticketAPI = {
  getAllTickets: (params) => api.get("/tickets", { params }),
  getTicketById: (id) => api.get(`/tickets/${id}`),
  createTicket: (data) => api.post("/tickets", data),
  updateTicket: (id, data) => api.put(`/tickets/${id}`, data),
  deleteTicket: (id) => api.delete(`/tickets/${id}`),
};

// Ticket Message API
export const ticketMessageAPI = {
  getTicketMessages: (ticketId) => api.get(`/ticket-messages/${ticketId}`),
  createTicketMessage: (data) => api.post("/ticket-messages", data),
  deleteTicketMessage: (id) => api.delete(`/ticket-messages/${id}`),
};

export default api;
