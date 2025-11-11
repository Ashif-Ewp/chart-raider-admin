import React from "react";
import ShopInventoryPage from "../components/ShopInventoryPage";
import { pgShopTicketAPI } from "../services/api";

const ShopTicketsPage = () => {
  return (
    <ShopInventoryPage
      title="Shop Tickets"
      subtitle="Control ticket bundle availability and pricing."
      fetchItems={pgShopTicketAPI.getTickets}
      updateItem={pgShopTicketAPI.updateTicket}
      type="tickets"
    />
  );
};

export default ShopTicketsPage;
