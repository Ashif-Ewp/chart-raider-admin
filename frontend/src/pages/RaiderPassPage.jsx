import React from "react";
import ShopInventoryPage from "../components/ShopInventoryPage";
import { pgRaiderPassAPI } from "../services/api";

const RaiderPassPage = () => {
  return (
    <ShopInventoryPage
      title="Raider Pass"
      subtitle="Adjust inventory and pricing for the Raider Pass."
      fetchItems={pgRaiderPassAPI.getPasses}
      updateItem={pgRaiderPassAPI.updatePass}
      refreshLabel="Reload"
    />
  );
};

export default RaiderPassPage;
