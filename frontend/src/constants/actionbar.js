export const ACTIONBAR = {
  // ACTION BAR BONUSES
  PRIZE_BAG: "PRIZE_BAG",
  STOP_LOSS: "STOP_LOSS",
  DOUBLE_EDGED_TRADES: "DOUBLE_EDGED_TRADES",
  HEALTH_PUMPS: "HEALTH_PUMPS",
  TRADELIXER: "TRADELIXER",
  TRADE_RECOVERY: "TRADE_RECOVERY",
  ACTION_BAR: "ACTION_BAR",
  XP_STACK: "XP_STACK",
  PEEK_METER: "PEEK_METER",
  TRADE_DELAY: "TRADE_DELAY",

  // MULTIPLIER BONUSES
  PEEK_METER_MULTIPLIER: "PEEK_METER_MULTIPLIER",
  PEEK_METER_REFILL: "PEEK_METER_REFILL",
  TRADE_DELAY_MULTIPLIER: "TRADE_DELAY_MULTIPLIER",
  TRADE_DELAY_REFILL: "TRADE_DELAY_REFILL",
  PROFIT: "PROFIT",
  ACTION_BAR_MULTIPLIER: "ACTION_BAR_MULTIPLIER",
  TRADELIXER_DISCOUNT: "TRADELIXER_DISCOUNT",
};

export const ACTIONBAR_CATEGORIES = [
  // ACTION BAR BONUSES
  {
    key: ACTIONBAR.PRIZE_BAG,
    name: "Prize Bag",
    icon: "🎁",
    color: "bg-yellow-500",
    type: "actionbar",
  },
  {
    key: ACTIONBAR.STOP_LOSS,
    name: "Stop Loss",
    icon: "🛡️",
    color: "bg-blue-500",
    type: "actionbar",
  },
  {
    key: ACTIONBAR.DOUBLE_EDGED_TRADES,
    name: "Double Edged Trades",
    icon: "⚔️",
    color: "bg-red-500",
    type: "actionbar",
  },
  {
    key: ACTIONBAR.HEALTH_PUMPS,
    name: "Health Pumps",
    icon: "❤️",
    color: "bg-pink-500",
    type: "actionbar",
  },
  {
    key: ACTIONBAR.TRADELIXER,
    name: "TradeliXer",
    icon: "🧪",
    color: "bg-purple-500",
    type: "actionbar",
  },
  {
    key: ACTIONBAR.TRADE_RECOVERY,
    name: "Trade Recovery",
    icon: "♻️",
    color: "bg-green-500",
    type: "actionbar",
  },
  {
    key: ACTIONBAR.ACTION_BAR,
    name: "Action Bar",
    icon: "⚡",
    color: "bg-indigo-500",
    type: "actionbar",
  },
  {
    key: ACTIONBAR.XP_STACK,
    name: "XP Stack",
    icon: "⭐",
    color: "bg-orange-500",
    type: "actionbar",
  },
  {
    key: ACTIONBAR.PEEK_METER,
    name: "Peek Meter",
    icon: "👁️",
    color: "bg-teal-500",
    type: "actionbar",
  },
  {
    key: ACTIONBAR.TRADE_DELAY,
    name: "Trade Delay",
    icon: "⏱️",
    color: "bg-cyan-500",
    type: "actionbar",
  },

  // MULTIPLIER BONUSES
  {
    key: ACTIONBAR.PEEK_METER_MULTIPLIER,
    name: "Peek Meter Multiplier",
    icon: "📈",
    color: "bg-emerald-500",
    type: "multiplier",
  },
  {
    key: ACTIONBAR.PEEK_METER_REFILL,
    name: "Peek Meter Refill",
    icon: "🔄",
    color: "bg-lime-500",
    type: "multiplier",
  },
  {
    key: ACTIONBAR.TRADE_DELAY_MULTIPLIER,
    name: "Trade Delay Multiplier",
    icon: "⏰",
    color: "bg-amber-500",
    type: "multiplier",
  },
  {
    key: ACTIONBAR.TRADE_DELAY_REFILL,
    name: "Trade Delay Refill",
    icon: "🔄",
    color: "bg-yellow-600",
    type: "multiplier",
  },
  {
    key: ACTIONBAR.PROFIT,
    name: "Profit Bonus",
    icon: "💰",
    color: "bg-green-600",
    type: "multiplier",
  },
  {
    key: ACTIONBAR.ACTION_BAR_MULTIPLIER,
    name: "Action Bar Multiplier",
    icon: "⚡",
    color: "bg-blue-600",
    type: "multiplier",
  },
  {
    key: ACTIONBAR.TRADELIXER_DISCOUNT,
    name: "TradeliXer Discount",
    icon: "💸",
    color: "bg-red-600",
    type: "multiplier",
  },
];

export const RARITY_OPTIONS = [
  { value: "common", label: "Common", color: "text-gray-600" },
  { value: "rare", label: "Rare", color: "text-blue-600" },
  { value: "epic", label: "Epic", color: "text-purple-600" },
  { value: "legendary", label: "Legendary", color: "text-yellow-600" },
];

export const getCategoryInfo = (categoryKey) => {
  return ACTIONBAR_CATEGORIES.find((cat) => cat.key === categoryKey) || {};
};
