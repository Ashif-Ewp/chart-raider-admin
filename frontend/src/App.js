import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import BonusesPage from "./pages/BonusesPage";
import CreateBonus from "./pages/CreateBonus";
import EditBonus from "./pages/EditBonus";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/bonuses" element={<BonusesPage />} />
          <Route path="/bonuses/create" element={<CreateBonus />} />
          <Route path="/bonuses/edit/:id" element={<EditBonus />} />
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
