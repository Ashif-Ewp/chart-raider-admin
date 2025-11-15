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
import ClassBonusPage from "./pages/ClassBonusPage";
import CreateClassBonus from "./pages/CreateClassBonus";
import EditClassBonus from "./pages/EditClassBonus";
import MatchAnnouncementsPage from "./pages/MatchAnnouncementsPage";
import CreateMatchAnnouncement from "./pages/CreateMatchAnnouncement";
import EditMatchAnnouncement from "./pages/EditMatchAnnouncement";
import TicketCategoriesPage from "./pages/TicketCategoriesPage";
import CreateTicketCategory from "./pages/CreateTicketCategory";
import EditTicketCategory from "./pages/EditTicketCategory";
import TicketsPage from "./pages/TicketsPage";
import CreateTicket from "./pages/CreateTicket";
import TicketChatPage from "./pages/TicketChatPage";
import PrivacyRequestsPage from "./pages/PrivacyRequestsPage";
import OptOutRequestsPage from "./pages/OptOutRequestsPage";
import CreatePrivacyRequest from "./pages/CreatePrivacyRequest";
import CreateOptOutRequest from "./pages/CreateOptOutRequest";
import ShopCasesPage from "./pages/ShopCasesPage";
import ShopItemsPage from "./pages/ShopItemsPage";
import ShopTicketsPage from "./pages/ShopTicketsPage";
import RaiderPassPage from "./pages/RaiderPassPage";
import SettingsTicketQueue from "./pages/SettingsTicketQueue";
import SettingsGamingTools from "./pages/SettingsGamingTools";
import SettingsMatchRules from "./pages/SettingsMatchRules";

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
          <Route path="/class-bonus" element={<ClassBonusPage />} />
          <Route path="/class-bonus/create" element={<CreateClassBonus />} />
          <Route path="/class-bonus/edit/:id" element={<EditClassBonus />} />
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
          <Route path="/privacy-requests" element={<PrivacyRequestsPage />} />
          <Route path="/opt-out-requests" element={<OptOutRequestsPage />} />
          <Route
            path="/privacy-requests/create"
            element={<CreatePrivacyRequest />}
          />
          <Route
            path="/opt-out-requests/create"
            element={<CreateOptOutRequest />}
          />
          <Route path="/shop/cases" element={<ShopCasesPage />} />
          <Route path="/shop/items" element={<ShopItemsPage />} />
          <Route path="/shop/tickets" element={<ShopTicketsPage />} />
          <Route path="/shop/raider-pass" element={<RaiderPassPage />} />
          <Route
            path="/settings/ticket-queue"
            element={<SettingsTicketQueue />}
          />
          <Route
            path="/settings/gaming-tools"
            element={<SettingsGamingTools />}
          />
          <Route
            path="/settings/match-rules"
            element={<SettingsMatchRules />}
          />
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
