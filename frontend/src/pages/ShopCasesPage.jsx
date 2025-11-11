import React from "react";
import ShopInventoryPage from "../components/ShopInventoryPage";
import { pgShopCaseAPI } from "../services/api";

const ShopCasesPage = () => {
  return (
    <ShopInventoryPage
      title="Shop Cases"
      subtitle="Manage availability and pricing for featured cases."
      // Use Postgres-backed API for shop cases (fetch rows from Postgres 'shop_cases')
      fetchItems={pgShopCaseAPI.getCases}
      updateItem={pgShopCaseAPI.updateCase}
    />
  );
};

export default ShopCasesPage;
