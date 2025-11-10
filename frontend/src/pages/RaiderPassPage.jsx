import React from "react";
import ShopInventoryPage from "../components/ShopInventoryPage";
import { raiderPassAPI } from "../services/api";

const RaiderPassPage = () => {
  return (
    <ShopInventoryPage
      title="Raider Pass"
      subtitle="Adjust inventory and pricing for the Raider Pass."
      fetchItems={raiderPassAPI.getPasses}
      updateItem={raiderPassAPI.updatePass}
      refreshLabel="Reload"
    />
  );
};

export default RaiderPassPage;
