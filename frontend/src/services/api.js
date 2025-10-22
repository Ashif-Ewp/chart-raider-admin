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

export default api;
