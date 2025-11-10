import React from "react";
import { Edit, Trash2, Power, PowerOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getCaseTypeInfo, getBonusTypeInfo } from "../constants/equipment";

const EquipmentCard = ({ equipment, onDelete, onToggle }) => {
  const navigate = useNavigate();
  const caseTypeInfo = getCaseTypeInfo(equipment.case_type);
  const bonusTypeInfo = getBonusTypeInfo(equipment.bonus);

  const getCaseTypeColor = (caseType) => {
    const colors = {
      titanium: "bg-gray-100 text-gray-700 border-gray-300",
      carbon: "bg-gray-800 text-white border-gray-900",
      steampunk: "bg-amber-100 text-amber-700 border-amber-300",
    };
    return colors[caseType] || colors.titanium;
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md border-2 transition-all hover:shadow-lg ${
        equipment.isActive ? "border-gray-200" : "border-red-200 opacity-60"
      }`}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{caseTypeInfo.icon}</span>
            <div>
              <h3 className="font-bold text-lg text-gray-900">
                {equipment.name}
              </h3>
              <p className="text-xs text-gray-500">{equipment.key}</p>
            </div>
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold border ${getCaseTypeColor(
              equipment.case_type
            )}`}
          >
            {caseTypeInfo.label}
          </span>
        </div>

        {/* Summary */}
        {equipment.summary && (
          <p className="text-sm text-gray-600 mb-3">{equipment.summary}</p>
        )}

        {/* Stats */}
        <div className="flex flex-wrap gap-2 mb-4">
          {equipment.bonus && (
            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
              {bonusTypeInfo.icon} {bonusTypeInfo.label}
            </span>
          )}
          {equipment.profit !== null && equipment.profit !== undefined && (
            <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
              Profit: +{equipment.profit}%
            </span>
          )}
          {equipment.loss !== null && equipment.loss !== undefined && (
            <span className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-medium">
              Loss Recovery: {equipment.loss}%
            </span>
          )}
          {equipment.value !== null && equipment.value !== undefined && (
            <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium">
              Value: {equipment.value}
            </span>
          )}
          {equipment.max_value !== null &&
            equipment.max_value !== undefined && (
              <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium">
                Max: {equipment.max_value}%
              </span>
            )}
          {equipment.max_stack !== null &&
            equipment.max_stack !== undefined && (
              <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs font-medium">
                Max Stack: {equipment.max_stack}
              </span>
            )}
          {equipment.duration !== null && equipment.duration !== undefined && (
            <span className="px-3 py-1 bg-cyan-50 text-cyan-700 rounded-full text-xs font-medium">
              Duration: {equipment.duration}
              {equipment.duration > 60 ? "s" : "m"}
            </span>
          )}
          {equipment.cooldown !== null && equipment.cooldown !== undefined && (
            <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-medium">
              Cooldown: {equipment.cooldown}h
            </span>
          )}
          {equipment.percentage !== null &&
            equipment.percentage !== undefined && (
              <span className="px-3 py-1 bg-pink-50 text-pink-700 rounded-full text-xs font-medium">
                {equipment.percentage}%
              </span>
            )}
          {equipment.count !== null && equipment.count !== undefined && (
            <span className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-xs font-medium">
              Count: {equipment.count}
            </span>
          )}
          {equipment.half1 && equipment.half2 && (
            <span className="px-3 py-1 bg-violet-50 text-violet-700 rounded-full text-xs font-medium">
              {equipment.half1} / {equipment.half2}
            </span>
          )}
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              equipment.isActive
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {equipment.isActive ? "Active" : "Inactive"}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/equipment/edit/${equipment._id}`)}
            className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            <Edit size={14} />
            <span>Edit</span>
          </button>
          <button
            onClick={() => onToggle(equipment._id)}
            className={`flex-1 flex items-center justify-center space-x-1 px-3 py-2 rounded-md transition-colors text-sm ${
              equipment.isActive
                ? "bg-yellow-600 text-white hover:bg-yellow-700"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {equipment.isActive ? <PowerOff size={14} /> : <Power size={14} />}
            <span>{equipment.isActive ? "Disable" : "Enable"}</span>
          </button>
          <button
            onClick={() => onDelete(equipment._id, equipment.name)}
            className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EquipmentCard;
