import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import BonusesPage from "./pages/BonusesPage";
import CreateBonus from "./pages/CreateBonus";
import EditBonus from "./pages/EditBonus";
import EquipmentPage from "./pages/EquipmentPage";
import CreateEquipment from "./pages/CreateEquipment";
import EditEquipment from "./pages/EditEquipment";
import MatchAnnouncementsPage from "./pages/MatchAnnouncementsPage";
import CreateMatchAnnouncement from "./pages/CreateMatchAnnouncement";
import EditMatchAnnouncement from "./pages/EditMatchAnnouncement";
import TicketCategoriesPage from "./pages/TicketCategoriesPage";
import CreateTicketCategory from "./pages/CreateTicketCategory";
import EditTicketCategory from "./pages/EditTicketCategory";
import TicketsPage from "./pages/TicketsPage";
import CreateTicket from "./pages/CreateTicket";
import TicketChatPage from "./pages/TicketChatPage";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/bonuses" element={<BonusesPage />} />
          <Route path="/bonuses/create" element={<CreateBonus />} />
          <Route path="/bonuses/edit/:id" element={<EditBonus />} />
          <Route path="/equipment" element={<EquipmentPage />} />
          <Route path="/equipment/create" element={<CreateEquipment />} />
          <Route path="/equipment/edit/:id" element={<EditEquipment />} />
          <Route
            path="/match-announcements"
            element={<MatchAnnouncementsPage />}
          />
          <Route
            path="/match-announcements/create"
            element={<CreateMatchAnnouncement />}
          />
          <Route
            path="/match-announcements/edit/:id"
            element={<EditMatchAnnouncement />}
          />
          <Route path="/ticket-categories" element={<TicketCategoriesPage />} />
          <Route
            path="/ticket-categories/create"
            element={<CreateTicketCategory />}
          />
          <Route
            path="/ticket-categories/edit/:id"
            element={<EditTicketCategory />}
          />
          <Route path="/tickets" element={<TicketsPage />} />
          <Route path="/tickets/create" element={<CreateTicket />} />
          <Route path="/tickets/chat/:id" element={<TicketChatPage />} />
        </Routes>
      </Layout>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default App;
