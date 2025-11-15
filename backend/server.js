require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const { connectPostgres } = require("./config/postgres");
const actionBarRoutes = require("./routes/actionBarRoutes");
const equipmentRoutes = require("./routes/equipmentRoutes");
const classBonusRoutes = require("./routes/classBonusRoutes");
const matchAnnouncementRoutes = require("./routes/matchAnnouncementRoutes");
const matchRuleRoutes = require("./routes/matchRuleRoutes");
const ticketCategoryRoutes = require("./routes/ticketCategoryRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const ticketMessageRoutes = require("./routes/ticketMessageRoutes");
const privacyRequestRoutes = require("./routes/privacyRequestRoutes");
const optOutRequestRoutes = require("./routes/optOutRequestRoutes");
const shopCaseRoutes = require("./routes/shopCaseRoutes");
const shopItemRoutes = require("./routes/shopItemRoutes");
const shopTicketRoutes = require("./routes/shopTicketRoutes");
const raiderPassRoutes = require("./routes/raiderPassRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/actionbar", actionBarRoutes);
app.use("/api/equipment", equipmentRoutes);
app.use("/api/class-bonus", classBonusRoutes);
app.use("/api/match-announcements", matchAnnouncementRoutes);
app.use("/api/match-rules", matchRuleRoutes);
app.use("/api/ticket-categories", ticketCategoryRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/ticket-messages", ticketMessageRoutes);
app.use("/api/privacy-requests", privacyRequestRoutes);
app.use("/api/opt-out-requests", optOutRequestRoutes);
app.use("/api/shop/cases", shopCaseRoutes);
app.use("/api/shop/items", shopItemRoutes);
app.use("/api/shop/tickets", shopTicketRoutes);
app.use("/api/shop/raider-pass", raiderPassRoutes);
const foreignRoutes = require("./routes/postgresRoutes");
app.use("/api/foreign", foreignRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Action Bar Admin API is running",
    timestamp: new Date().toISOString(),
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  // Connect to databases depending on DB_TYPE
  // DB_TYPE can be: 'mongo' (default), 'postgres', or 'both'
  const DB_TYPE = process.env.DB_TYPE || "mongo";
  if (DB_TYPE === "mongo" || DB_TYPE === "both") {
    await connectDB();
  }
  if (DB_TYPE === "postgres" || DB_TYPE === "both") {
    await connectPostgres();
  }

  console.log(
    `Server running in ${
      process.env.NODE_ENV || "development"
    } mode on port ${PORT}`
  );
});
