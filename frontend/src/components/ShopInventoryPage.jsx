import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { RefreshCcw, Save } from "lucide-react";

const formatNumber = (value) => {
  if (value === null || value === undefined) return "";
  if (Number.isNaN(Number(value))) return value;
  return Number(value);
};

const ShopInventoryPage = ({
  title,
  subtitle,
  fetchItems,
  updateItem,
  type = "items",
  refreshLabel = "Refresh",
}) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);

  const loadItems = async () => {
    setLoading(true);
    try {
      const response = await fetchItems();
      const data = response.data?.data ?? [];
      setItems(
        data.map((item) => ({
          ...item,
          // Use Postgres column names: quantity and amount
          quantity: formatNumber(item.quantity ?? item.stock),
          amount: formatNumber(item.amount ?? item.price),
          discount: formatNumber(item.discount),
        }))
      );
    } catch (error) {
      console.error("Failed to load shop inventory", error);
      toast.error("Failed to load inventory");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFieldChange = (id, field, value) => {
    setItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  };

  const handleSave = async (item) => {
    setSavingId(item._id);
    try {
      const payload = {
        quantity: Number(item.quantity) || 0,
        amount: Number(item.amount) || 0,
        discount: Number(item.discount) || 0,
      };
      console.log({ payload });
      await updateItem(item._id, payload);
      toast.success("Inventory updated");
      // Update local state to keep current order instead of re-fetching from server
      setItems((prev) =>
        prev.map((it) =>
          it._id === item._id
            ? {
                ...it,
                quantity: formatNumber(payload.quantity),
                amount: formatNumber(payload.amount),
                discount: formatNumber(payload.discount),
              }
            : it
        )
      );
    } catch (error) {
      console.error("Failed to update inventory", error);
      const message =
        error.response?.data?.message || "Failed to update inventory";
      toast.error(message);
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          <p className="text-gray-600 mt-2">{subtitle}</p>
        </div>
        <button
          onClick={loadItems}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <RefreshCcw size={16} />
          <span>{refreshLabel}</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Discount
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {items.map((item) => (
                  <tr key={item._id}>
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                      {item?.name?.split("_").join(" ") || "Unnamed Item"}
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        min="0"
                        value={item.quantity}
                        onChange={(e) =>
                          handleFieldChange(
                            item._id,
                            "quantity",
                            e.target.value
                          )
                        }
                        className="w-24 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.amount}
                        onChange={(e) =>
                          handleFieldChange(item._id, "amount", e.target.value)
                        }
                        className="w-24 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.discount}
                        onChange={(e) =>
                          handleFieldChange(
                            item._id,
                            "discount",
                            e.target.value
                          )
                        }
                        className="w-24 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                      />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleSave(item)}
                        disabled={savingId === item._id}
                        className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        <Save size={16} className="mr-2" />
                        {savingId === item._id ? "Saving..." : "Save"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopInventoryPage;
