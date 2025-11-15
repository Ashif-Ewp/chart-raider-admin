import React from "react";
import { Edit, Trash2, Power, PowerOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CLASS_BONUS_ICON } from "../constants/classBonus";

const ClassBonusCard = ({ classBonus, onDelete, onToggle }) => {
  const navigate = useNavigate();
  const Icon = CLASS_BONUS_ICON;

  return (
    <div
      className={`bg-white rounded-lg shadow-md border-2 transition-all hover:shadow-lg ${
        classBonus.isActive ? "border-gray-200" : "border-red-200 opacity-60"
      }`}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon className="text-emerald-600" size={28} />
            <div>
              <h3 className="font-bold text-lg text-gray-900">
                {classBonus.name}
              </h3>
              <p className="text-xs text-gray-500">{classBonus.key}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        {classBonus.description && (
          <p className="text-sm text-gray-600 mb-3">
            {classBonus.description}
          </p>
        )}

        {/* Stats */}
        <div className="flex flex-wrap gap-2 mb-4">
          {classBonus.value !== null &&
            classBonus.value !== undefined &&
            classBonus.value !== 0 && (
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium">
                Value: {classBonus.value}
              </span>
            )}
          {classBonus.percentage !== null &&
            classBonus.percentage !== undefined &&
            classBonus.percentage !== 0 && (
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                Chance: {classBonus.percentage}%
              </span>
            )}
          {classBonus.profit !== null &&
            classBonus.profit !== undefined &&
            classBonus.profit !== 0 && (
              <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                Profit Threshold: +{classBonus.profit}%
              </span>
            )}
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              classBonus.isActive
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {classBonus.isActive ? "Active" : "Inactive"}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/class-bonus/edit/${classBonus._id}`)}
            className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            <Edit size={14} />
            <span>Edit</span>
          </button>
          <button
            onClick={() => onToggle(classBonus._id)}
            className={`flex-1 flex items-center justify-center space-x-1 px-3 py-2 rounded-md transition-colors text-sm ${
              classBonus.isActive
                ? "bg-yellow-600 text-white hover:bg-yellow-700"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {classBonus.isActive ? <PowerOff size={14} /> : <Power size={14} />}
            <span>{classBonus.isActive ? "Disable" : "Enable"}</span>
          </button>
          <button
            onClick={() => onDelete(classBonus._id, classBonus.name)}
            className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassBonusCard;
