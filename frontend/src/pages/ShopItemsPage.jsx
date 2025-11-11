import React from "react";
import ShopInventoryPage from "../components/ShopInventoryPage";
import { pgShopItemAPI } from "../services/api";

const ShopItemsPage = () => {
  return (
    <ShopInventoryPage
      title="Shop Items"
      subtitle="Update stock and pricing for in-game items."
      fetchItems={pgShopItemAPI.getItems}
      updateItem={pgShopItemAPI.updateItem}
    />
  );
};

export default ShopItemsPage;
