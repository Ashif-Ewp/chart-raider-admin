import React from "react";
import ShopInventoryPage from "../components/ShopInventoryPage";
import { shopTicketAPI } from "../services/api";

const ShopTicketsPage = () => {
  return (
    <ShopInventoryPage
      title="Shop Tickets"
      subtitle="Control ticket bundle availability and pricing."
      fetchItems={shopTicketAPI.getTickets}
      updateItem={shopTicketAPI.updateTicket}
    />
  );
};

export default ShopTicketsPage;
