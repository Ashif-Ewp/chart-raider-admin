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

// Match Rule API
export const matchRuleAPI = {
  getAll: (params) => api.get("/match-rules", { params }),
  getById: (id) => api.get(`/match-rules/${id}`),
  create: (data) => api.post("/match-rules", data),
  update: (id, data) => api.put(`/match-rules/${id}`, data),
  remove: (id) => api.delete(`/match-rules/${id}`),
  getChanges: (params) => api.get("/match-rules/changes/timeline", { params }),
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

// Postgres foreign table API
export const postgresAPI = {
  // fetch rows from a table: /api/foreign/rows?table=your_table
  getTableRows: (table, params = {}) =>
    api.get(`/foreign/rows`, { params: { table, ...params } }),
  // update a row in a table: PUT /api/foreign/rows with body { table, id_column, id_value, data }
  updateTableRow: (payload) => api.put(`/foreign/rows`, payload),
};

// Ticket Message API
export const ticketMessageAPI = {
  getTicketMessages: (ticketId) => api.get(`/ticket-messages/${ticketId}`),
  createTicketMessage: (data) => api.post("/ticket-messages", data),
  deleteTicketMessage: (id) => api.delete(`/ticket-messages/${id}`),
};

// Privacy Requests API
export const privacyRequestAPI = {
  getPrivacyRequests: (params) => api.get("/privacy-requests", { params }),
  createPrivacyRequest: (data) => api.post("/privacy-requests", data),
  deletePrivacyRequest: (id) => api.delete(`/privacy-requests/${id}`),
};

// Opt-Out Requests API
export const optOutRequestAPI = {
  getOptOutRequests: (params) => api.get("/opt-out-requests", { params }),
  createOptOutRequest: (data) => api.post("/opt-out-requests", data),
  deleteOptOutRequest: (id) => api.delete(`/opt-out-requests/${id}`),
};

// Shop API
export const shopCaseAPI = {
  getCases: () => api.get("/shop/cases"),
  updateCase: (id, data) => api.put(`/shop/cases/${id}`, data),
};

export const shopItemAPI = {
  getItems: () => api.get("/shop/items"),
  updateItem: (id, data) => api.put(`/shop/items/${id}`, data),
};

export const shopTicketAPI = {
  getTickets: () => api.get("/shop/tickets"),
  updateTicket: (id, data) => api.put(`/shop/tickets/${id}`, data),
};

export const raiderPassAPI = {
  getPasses: () => api.get("/shop/raider-pass"),
  updatePass: (id, data) => api.put(`/shop/raider-pass/${id}`, data),
};

// Postgres-backed shop wrappers. These adapt the postgresAPI responses into the shape
// expected by ShopInventoryPage (response.data.data = array)
export const pgShopCaseAPI = {
  getCases: async () => {
    const resp = await postgresAPI.getTableRows("shop_cases", { limit: 500 });
    const rows = resp.data?.rows ?? [];
    // map Postgres columns to ShopInventoryPage shape
    const mapped = rows.map((r) => ({
      _id: r.id ?? r._id ?? r.shop_case_id,
      name: r.name ?? r.title ?? r.case_name ?? "",
      quantity: r.quantity ?? r.stock ?? "",
      amount: r.price ?? r.amount ?? "",
      discount: r.discount ?? 0,
      // keep original for reference
      __raw: r,
    }));
    return { data: { data: mapped } };
  },
  updateCase: async (id, data) => {
    // translate UI payload to DB columns (quantity, amount, discount)
    const payload = {
      quantity:
        typeof data.quantity !== "undefined"
          ? Number(data.quantity)
          : Number(data.stock) || 0,
      price:
        typeof data.amount !== "undefined"
          ? Number(data.amount)
          : Number(data.price) || 0,
      discount: Number(data.discount) || 0,
    };
    return await postgresAPI.updateTableRow({
      table: "shop_cases",
      id_column: "id",
      id_value: id,
      data: payload,
    });
  },
};

export const pgShopItemAPI = {
  getItems: async () => {
    const resp = await postgresAPI.getTableRows("shop_items", { limit: 500 });
    const rows = resp.data?.rows ?? [];
    const mapped = rows.map((r) => ({
      _id: r.id ?? r._id ?? r.shop_item_id,
      name: r.name ?? r.title ?? r.item_name ?? "",
      quantity: r.quantity ?? r.stock ?? "",
      amount: r.price ?? r.amount ?? "",
      discount: r.discount ?? 0,
      __raw: r,
    }));
    return { data: { data: mapped } };
  },
  updateItem: async (id, data) => {
    const payload = {
      quantity:
        typeof data.quantity !== "undefined"
          ? Number(data.quantity)
          : Number(data.stock) || 0,
      price:
        typeof data.amount !== "undefined"
          ? Number(data.amount)
          : Number(data.price) || 0,
      discount: Number(data.discount) || 0,
    };
    return await postgresAPI.updateTableRow({
      table: "shop_items",
      id_column: "id",
      id_value: id,
      data: payload,
    });
  },
};

export const pgRaiderPassAPI = {
  getPasses: async () => {
    const resp = await postgresAPI.getTableRows("shop_raider_pass", {
      limit: 500,
    });
    const rows = resp.data?.rows ?? [];
    const mapped = rows.map((r) => ({
      _id: r.id ?? r._id ?? r.pass_id,
      name: r.name ?? r.title ?? "Raider Pass",
      quantity: r.quantity ?? r.stock ?? "",
      amount: r.price ?? r.amount ?? "",
      discount: r.discount ?? 0,
      __raw: r,
    }));
    return { data: { data: mapped } };
  },
  updatePass: async (id, data) => {
    const payload = {
      quantity:
        typeof data.quantity !== "undefined"
          ? Number(data.quantity)
          : Number(data.stock) || 0,
      price:
        typeof data.amount !== "undefined"
          ? Number(data.amount)
          : Number(data.price) || 0,
      discount: Number(data.discount) || 0,
    };
    return await postgresAPI.updateTableRow({
      table: "shop_raider_pass",
      id_column: "id",
      id_value: id,
      data: payload,
    });
  },
};

export const pgShopTicketAPI = {
  getTickets: async () => {
    const resp = await postgresAPI.getTableRows("tickets", { limit: 500 });
    const rows = resp.data?.rows ?? [];
    const mapped = rows
      .map((r) => ({
        _id: r.id ?? r._id ?? r.ticket_id,
        name: r.name ?? r.title ?? r.subject ?? "",
        quantity: r.quantity ?? r.stock ?? "",
        amount: r.amount ?? r.amount ?? "",
        discount: r.discount ?? 0,
        __raw: r,
      }))
      .sort((a, b) => a.amount - b.amount);
    return { data: { data: mapped } };
  },
  updateTicket: async (id, data) => {
    const payload = {
      quantity:
        typeof data.quantity !== "undefined"
          ? Number(data.quantity)
          : Number(data.stock) || 0,
      amount:
        typeof data.amount !== "undefined"
          ? Number(data.amount)
          : Number(data.price) || 0,
      discount: Number(data.discount) || 0,
    };
    return await postgresAPI.updateTableRow({
      table: "tickets",
      id_column: "id",
      id_value: id,
      data: payload,
    });
  },
};

export default api;
