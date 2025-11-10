import React from "react";
import ShopInventoryPage from "../components/ShopInventoryPage";
import { shopCaseAPI } from "../services/api";

const ShopCasesPage = () => {
  return (
    <ShopInventoryPage
      title="Shop Cases"
      subtitle="Manage availability and pricing for featured cases."
      fetchItems={shopCaseAPI.getCases}
      updateItem={shopCaseAPI.updateCase}
    />
  );
};

export default ShopCasesPage;
