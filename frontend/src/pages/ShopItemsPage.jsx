import React from "react";
import ShopInventoryPage from "../components/ShopInventoryPage";
import { shopItemAPI } from "../services/api";

const ShopItemsPage = () => {
  return (
    <ShopInventoryPage
      title="Shop Items"
      subtitle="Update stock and pricing for in-game items."
      fetchItems={shopItemAPI.getItems}
      updateItem={shopItemAPI.updateItem}
    />
  );
};

export default ShopItemsPage;
