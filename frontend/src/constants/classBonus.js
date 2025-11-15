import { Award } from "lucide-react";

// Class Bonus Types
export const CLASS_BONUS_TYPE = {
  SWING: "swing",
  SCALP: "scalp",
  POSITION: "position",
};

// Class Bonus Keys Array
export const CLASS_BONUS_KEYS = [
  CLASS_BONUS_TYPE.SWING,
  CLASS_BONUS_TYPE.SCALP,
  CLASS_BONUS_TYPE.POSITION,
];

// Class Bonus Summary Data
export const CLASS_BONUS_SUMMARY = {
  [CLASS_BONUS_TYPE.SWING]: {
    name: "Swing",
    description: "Get a multiplier when you recover funds",
    value: 1,
  },
  [CLASS_BONUS_TYPE.SCALP]: {
    name: "Scalp",
    description:
      "There's a 25% chance you get a bonus multiplier on trades above +15% profits",
    percentage: 25,
    profit: 15,
  },
  [CLASS_BONUS_TYPE.POSITION]: {
    name: "Position",
    description: "you only lose 1 multiplier when you have a negative trade",
    value: 1,
  },
};

// Helper function to get class bonus info by key
export const getClassBonusInfo = (key) => {
  return CLASS_BONUS_SUMMARY[key] || null;
};

// Icon configuration
export const CLASS_BONUS_ICON = Award;

// Color scheme for class bonus
export const CLASS_BONUS_COLORS = {
  primary: "text-emerald-600",
  bg: "bg-emerald-50",
  border: "border-emerald-200",
  hover: "hover:bg-emerald-100",
  badge: "bg-emerald-100 text-emerald-800",
};
