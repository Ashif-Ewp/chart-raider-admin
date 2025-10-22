import React from "react";
import { Edit, Trash2, Power, PowerOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getCategoryInfo } from "../constants/actionbar";

const BonusCard = ({ bonus, onDelete, onToggle }) => {
  const navigate = useNavigate();
  const categoryInfo = getCategoryInfo(bonus.category);

  const getRarityColor = (rarity) => {
    const colors = {
      common: "bg-gray-100 text-gray-700 border-gray-300",
      rare: "bg-blue-100 text-blue-700 border-blue-300",
      epic: "bg-purple-100 text-purple-700 border-purple-300",
      legendary: "bg-yellow-100 text-yellow-700 border-yellow-300",
    };
    return colors[rarity] || colors.common;
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md border-2 transition-all hover:shadow-lg ${
        bonus.isActive ? "border-gray-200" : "border-red-200 opacity-60"
      }`}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{categoryInfo.icon}</span>
            <div>
              <h3 className="font-bold text-lg text-gray-900">{bonus.name}</h3>
              <p className="text-xs text-gray-500">{bonus.key}</p>
            </div>
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold border ${getRarityColor(
              bonus.rarity
            )}`}
          >
            {bonus.rarity}
          </span>
        </div>

        {/* Description */}
        {bonus.description && (
          <p className="text-sm text-gray-600 mb-3">{bonus.description}</p>
        )}

        {/* Stats */}
        <div className="flex flex-wrap gap-2 mb-4">
          {bonus.value !== null && bonus.value !== undefined && (
            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
              Value: {bonus.value}
            </span>
          )}
          {bonus.count !== null && bonus.count !== undefined && (
            <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
              Count: {bonus.count}
            </span>
          )}
          {bonus.max !== null && bonus.max !== undefined && (
            <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium">
              Max: {bonus.max}%
            </span>
          )}
          {bonus.multiplier_type && (
            <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs font-medium">
              {bonus.multiplier_type}
            </span>
          )}
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              bonus.isActive
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {bonus.isActive ? "Active" : "Inactive"}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              bonus.bonus_type === "multiplier"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-blue-50 text-blue-700"
            }`}
          >
            {bonus.bonus_type === "multiplier" ? "Multiplier" : "Action Bar"}
          </span>
        </div>

        {/* Category Badge */}
        <div className="mb-4">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium text-white ${categoryInfo.color}`}
          >
            {categoryInfo.name}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/bonuses/edit/${bonus._id}`)}
            className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            <Edit size={14} />
            <span>Edit</span>
          </button>
          <button
            onClick={() => onToggle(bonus._id)}
            className={`flex-1 flex items-center justify-center space-x-1 px-3 py-2 rounded-md transition-colors text-sm ${
              bonus.isActive
                ? "bg-yellow-600 text-white hover:bg-yellow-700"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {bonus.isActive ? <PowerOff size={14} /> : <Power size={14} />}
            <span>{bonus.isActive ? "Disable" : "Enable"}</span>
          </button>
          <button
            onClick={() => onDelete(bonus._id, bonus.name)}
            className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BonusCard;
