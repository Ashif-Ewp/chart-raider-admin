const LEGENDRY_TYPE_EQUIPED = {
  TITANIUM_R_PINK_LENSE: "titanium_r_pink_lense",
  TITANIUM_L_PINK_LENSE: "titanium_l_pink_lense",
  TITANIUM_R_BLUE_LENSE: "titanium_r_blue_lense",
  TITANIUM_L_BLUE_LENSE: "titanium_l_blue_lense",
  TITANIUM_R_YELLOW_LENSE: "titanium_r_yellow_lense",
  TITANIUM_L_YELLOW_LENSE: "titanium_l_yellow_lense",
  TITANIUM_BRIDGE: "titanium_bridge",
  TITANIUM_SCAPL_FRAME: "titanium_scalp_frame",
  TITANIUM_LEFT_TEMPLE_ARM: "titanium_left_temple_arm",
  TITANIUM_RIGHT_TEMPLE_ARM: "titanium_right_temple_arm",

  // # CARBON CASE
  CARBON_CASE_R_PINK_LENSE: "carbon_case_r_pink_lense",
  CARBON_CASE_L_PINK_LENSE: "carbon_case_l_pink_lense",
  CARBON_CASE_R_TEAL_LENSE: "carbon_case_r_teal_lense",
  CARBON_CASE_L_TEAL_LENSE: "carbon_case_l_teal_lense",
  CARBON_CASE_R_BLACK_LENSE: "carbon_case_r_black_lense",
  CARBON_CASE_L_BLACK_LENSE: "carbon_case_l_black_lense",
  CARBON_CASE_BRIDGE: "carbon_case_bridge",
  CARBON_CASE_SWING_FRAME: "carbon_case_swing_frame",
  CARBON_CASE_LEFT_TEMPLE_ARM: "carbon_case_left_temple_arm",
  CARBON_CASE_RIGHT_TEMPLE_ARM: "carbon_case_right_temple_arm",

  //#STEAMPUNK
  STEAMPUNK_R_PINK_LENSE: "steampunk_r_pink_lense",
  STEAMPUNK_L_PINK_LENSE: "steampunk_l_pink_lense",
  STEAMPUNK_R_GREEN_LENSE: "steampunk_r_green_lense",
  STEAMPUNK_L_GREEN_LENSE: "steampunk_l_green_lense",
  STEAMPUNK_R_BLUE_LENSE: "steampunk_r_blue_lense",
  STEAMPUNK_L_BLUE_LENSE: "steampunk_l_blue_lense",
  STEAMPUNK_BRIDGE: "steampunk_bridge",
  STEAMPUNK_POSITION_FRAME: "steampunk_position_frame",
  STEAMPUNK_LEFT_TEMPLE_ARM: "steampunk_left_temple_arm",
  STEAMPUNK_RIGHT_TEMPLE_ARM: "steampunk_right_temple_arm",
};

const EQUIPMENT_ITEM_SUMMARY = {
  // -------------------- TITANIUM --------------------
  [LEGENDRY_TYPE_EQUIPED.TITANIUM_R_PINK_LENSE]: {
    summary:
      "Get +10% profits if your Peek meter is full when you enter a trade.",
    bonus: "1PM",
    profit: 10,
    case_type: "titanium",
    key: LEGENDRY_TYPE_EQUIPED.TITANIUM_R_PINK_LENSE,
  },

  [LEGENDRY_TYPE_EQUIPED.TITANIUM_L_PINK_LENSE]: {
    summary:
      "Get +1% profits for each successful trade you take this game. (max 30%)",
    bonus: "1MX",
    profit: 1,
    max_value: 30,
    case_type: "titanium",
    key: LEGENDRY_TYPE_EQUIPED.TITANIUM_L_PINK_LENSE,
  },

  [LEGENDRY_TYPE_EQUIPED.TITANIUM_R_BLUE_LENSE]: {
    summary:
      "Get +10% profits if your Peek meter is full when you exit a trade.",
    bonus: "1PM",
    profit: 10,
    case_type: "titanium",
    key: LEGENDRY_TYPE_EQUIPED.TITANIUM_R_BLUE_LENSE,
  },

  [LEGENDRY_TYPE_EQUIPED.TITANIUM_L_BLUE_LENSE]: {
    summary:
      "Get +2% bonus profits for each minute that goes by without entering a trade (max 30%).",
    bonus: "1MX",
    profit: 2,
    max_value: 30,
    case_type: "titanium",
    key: LEGENDRY_TYPE_EQUIPED.TITANIUM_L_BLUE_LENSE,
  },

  [LEGENDRY_TYPE_EQUIPED.TITANIUM_R_YELLOW_LENSE]: {
    summary:
      "Your team recovers 5% losses every 16 minutes if your Peek meter is full.",
    bonus: "1PM",
    loss: 5,
    duration: 16,
    case_type: "titanium",
    key: LEGENDRY_TYPE_EQUIPED.TITANIUM_R_YELLOW_LENSE,
  },

  [LEGENDRY_TYPE_EQUIPED.TITANIUM_L_YELLOW_LENSE]: {
    summary:
      "Get an extra +4% stop loss for every time you filled your Action Bar this game.",
    bonus: "1AB",
    value: 4,
    case_type: "titanium",
    key: LEGENDRY_TYPE_EQUIPED.TITANIUM_L_YELLOW_LENSE,
  },

  [LEGENDRY_TYPE_EQUIPED.TITANIUM_BRIDGE]: {
    summary: "BRIDGE: Get +20% Action Bar when your class benefit triggers.",
    bonus: "1AB",
    value: 20,
    case_type: "titanium",
    key: LEGENDRY_TYPE_EQUIPED.TITANIUM_BRIDGE,
  },

  [LEGENDRY_TYPE_EQUIPED.TITANIUM_SCAPL_FRAME]: {
    summary:
      "Use any Bridge from other glasses type +10% Action Bar for every 15% profits when you complete a trade.",
    bonus: "1AB",
    value: 10,
    profit: 15,
    case_type: "titanium",
    key: LEGENDRY_TYPE_EQUIPED.TITANIUM_SCAPL_FRAME,
  },

  [LEGENDRY_TYPE_EQUIPED.TITANIUM_LEFT_TEMPLE_ARM]: {
    summary:
      "LEFT TEMPLE ARM: Multipliers have a 12% chance to not be removed.",
    bonus: "1MX",
    value: 12,
    case_type: "titanium",
    key: LEGENDRY_TYPE_EQUIPED.TITANIUM_LEFT_TEMPLE_ARM,
  },

  [LEGENDRY_TYPE_EQUIPED.TITANIUM_RIGHT_TEMPLE_ARM]: {
    summary:
      "RIGHT TEMPLE ARM: Sometimes get 2 bonuses upon filling the Action Bar. (30 minute cooldown)",
    bonus: "1AB",
    value: 2,
    duration: 30,
    case_type: "titanium",
    key: LEGENDRY_TYPE_EQUIPED.TITANIUM_RIGHT_TEMPLE_ARM,
  },

  // -------------------- CARBON CASE --------------------
  [LEGENDRY_TYPE_EQUIPED.CARBON_CASE_R_PINK_LENSE]: {
    summary:
      "For every 1 second of Trade Delay left, exchange it for +4% profits.",
    bonus: "1TD",
    profit: 4,
    duration: 1,
    case_type: "carbon",
    key: LEGENDRY_TYPE_EQUIPED.CARBON_CASE_R_PINK_LENSE,
  },

  [LEGENDRY_TYPE_EQUIPED.CARBON_CASE_L_PINK_LENSE]: {
    summary:
      "Get +2% profits for every 1% your Trade Delay executes in the negative.",
    bonus: "1TD",
    profit: 2,
    percentage: 1,
    case_type: "carbon",
    key: LEGENDRY_TYPE_EQUIPED.CARBON_CASE_L_PINK_LENSE,
  },

  [LEGENDRY_TYPE_EQUIPED.CARBON_CASE_R_TEAL_LENSE]: {
    summary:
      "Add +1 second to your active Trade Delay for every 0.1% price drop.",
    bonus: "1TD",
    value: 1,
    percentage: 0.1,
    case_type: "carbon",
    key: LEGENDRY_TYPE_EQUIPED.CARBON_CASE_R_TEAL_LENSE,
  },

  [LEGENDRY_TYPE_EQUIPED.CARBON_CASE_L_TEAL_LENSE]: {
    summary:
      "Ending Trade Delay in negative freezes your Peek Meter for 15 minutes and you recover +30% of the trade.",
    bonus: "1TD",
    profit: 30,
    duration: 15,
    case_type: "carbon",
    key: LEGENDRY_TYPE_EQUIPED.CARBON_CASE_L_TEAL_LENSE,
  },

  [LEGENDRY_TYPE_EQUIPED.CARBON_CASE_R_BLACK_LENSE]: {
    summary:
      "Your Trade Delay takes from your Peek Meter first at a rate of 1:1.",
    bonus: "1PM",
    half1: "0.5PM",
    half2: "0.5TD",
    value: 1,
    case_type: "carbon",
    key: LEGENDRY_TYPE_EQUIPED.CARBON_CASE_R_BLACK_LENSE,
  },

  [LEGENDRY_TYPE_EQUIPED.CARBON_CASE_L_BLACK_LENSE]: {
    summary:
      "Your team recovers 2% losses for every 1 second of Trade Delay used when you copied a trade that ends negative.",
    bonus: "1TE",
    loss: 2,
    duration: 1,
    case_type: "carbon",
    key: LEGENDRY_TYPE_EQUIPED.CARBON_CASE_L_BLACK_LENSE,
  },

  [LEGENDRY_TYPE_EQUIPED.CARBON_CASE_BRIDGE]: {
    summary: "BRIDGE: +20% Action Bar when your class benefit triggers.",
    bonus: "1AB",
    value: 20,
    case_type: "carbon",
    key: LEGENDRY_TYPE_EQUIPED.CARBON_CASE_BRIDGE,
  },

  [LEGENDRY_TYPE_EQUIPED.CARBON_CASE_SWING_FRAME]: {
    summary:
      "Use any 1 lens + get an extra +20% Action Bar fill upon trade completion.",
    bonus: "1AB",
    value: 20,
    case_type: "carbon",
    key: LEGENDRY_TYPE_EQUIPED.CARBON_CASE_SWING_FRAME,
  },

  [LEGENDRY_TYPE_EQUIPED.CARBON_CASE_LEFT_TEMPLE_ARM]: {
    summary: "LEFT TEMPLE ARM: Multipliers give an extra 10% effect.",
    bonus: "1MX",
    value: 10,
    case_type: "carbon",
    key: LEGENDRY_TYPE_EQUIPED.CARBON_CASE_LEFT_TEMPLE_ARM,
  },

  [LEGENDRY_TYPE_EQUIPED.CARBON_CASE_RIGHT_TEMPLE_ARM]: {
    summary:
      "RIGHT TEMPLE ARM: Recover 10% of your health at random during a match (6 hour cooldown).",
    bonus: "1TE",
    value: 10,
    cooldown: 6,
    case_type: "carbon",
    key: LEGENDRY_TYPE_EQUIPED.CARBON_CASE_RIGHT_TEMPLE_ARM,
  },

  // -------------------- STEAMPUNK --------------------
  [LEGENDRY_TYPE_EQUIPED.STEAMPUNK_R_PINK_LENSE]: {
    summary:
      "Successful trades give you a stack that adds 15% to your Peek and Delay. Lose stacks if you trade at a loss. (Max 5 stacks)",
    bonus: "1PM",
    half1: "0.5PM",
    half2: "0.5TD",
    value: 15,
    max_value: 75,
    max_stack: 5,
    case_type: "steampunk",
    key: LEGENDRY_TYPE_EQUIPED.STEAMPUNK_R_PINK_LENSE,
  },

  [LEGENDRY_TYPE_EQUIPED.STEAMPUNK_L_PINK_LENSE]: {
    summary:
      "Activate your Trade Delay to convert stacks to a bonus 5% profits or recover 5% losses for the team per stack.",
    bonus: "1TD",
    loss: 5,
    profit: 5,
    case_type: "steampunk",
    key: LEGENDRY_TYPE_EQUIPED.STEAMPUNK_L_PINK_LENSE,
  },

  [LEGENDRY_TYPE_EQUIPED.STEAMPUNK_R_BLUE_LENSE]: {
    summary: "Start the match with an extra Health Potion slot.",
    bonus: "1TE",
    percentage: 25,
    case_type: "steampunk",
    key: LEGENDRY_TYPE_EQUIPED.STEAMPUNK_R_BLUE_LENSE,
  },

  [LEGENDRY_TYPE_EQUIPED.STEAMPUNK_L_BLUE_LENSE]: {
    summary:
      "If your Trade Delay ends in losses, recover 1% health for your team for every 2% losses (max 30%).",
    bonus: "1TE",
    loss: 2,
    percentage: 1,
    max_value: 30,
    case_type: "steampunk",
    key: LEGENDRY_TYPE_EQUIPED.STEAMPUNK_L_BLUE_LENSE,
  },

  [LEGENDRY_TYPE_EQUIPED.STEAMPUNK_R_GREEN_LENSE]: {
    summary:
      "Recover 2% losses or get 2% bonus profits for every second Trade Delay is active during that trade.",
    bonus: "1TD",
    loss: 2,
    profit: 2,
    case_type: "steampunk",
    key: LEGENDRY_TYPE_EQUIPED.STEAMPUNK_R_GREEN_LENSE,
  },

  [LEGENDRY_TYPE_EQUIPED.STEAMPUNK_L_GREEN_LENSE]: {
    summary:
      "When you use a potion, grant 2 bonus Trade Delay seconds and 30% more Peek Meter for 20 minutes.",
    bonus: "1PM",
    value: 2,
    percentage: 30,
    duration: 20 * 60, // in second
    case_type: "steampunk",
    key: LEGENDRY_TYPE_EQUIPED.STEAMPUNK_L_GREEN_LENSE,
  },

  [LEGENDRY_TYPE_EQUIPED.STEAMPUNK_BRIDGE]: {
    summary:
      "BRIDGE: There's a 50% chance you only lose 1 multiplier when exiting a trade in a loss.",
    bonus: "1MX",
    value: 50,
    count: 1,
    case_type: "steampunk",
    key: LEGENDRY_TYPE_EQUIPED.STEAMPUNK_BRIDGE,
  },

  [LEGENDRY_TYPE_EQUIPED.STEAMPUNK_POSITION_FRAME]: {
    summary: "Use any 1 Temple Arm + Trade Delay fills 15% faster.",
    bonus: "1TD",
    value: 15,
    case_type: "steampunk",
    key: LEGENDRY_TYPE_EQUIPED.STEAMPUNK_POSITION_FRAME,
  },

  [LEGENDRY_TYPE_EQUIPED.STEAMPUNK_LEFT_TEMPLE_ARM]: {
    summary: "LEFT TEMPLE ARM: Your default multiplier is set to 1.",
    bonus: "1MX",
    value: 1,
    case_type: "steampunk",
    key: LEGENDRY_TYPE_EQUIPED.STEAMPUNK_LEFT_TEMPLE_ARM,
  },

  [LEGENDRY_TYPE_EQUIPED.STEAMPUNK_RIGHT_TEMPLE_ARM]: {
    summary:
      "RIGHT TEMPLE ARM: Sometimes get an additional 35% Peek Meter (6 hour cooldown).",
    bonus: "1PM",
    value: 35,
    cooldown: 6,
    count: 1,
    case_type: "steampunk",
    key: LEGENDRY_TYPE_EQUIPED.STEAMPUNK_RIGHT_TEMPLE_ARM,
  },
};

const CASE_TYPES = [
  { value: "titanium", label: "Titanium", icon: "🔷", color: "bg-gray-600" },
  { value: "carbon", label: "Carbon Case", icon: "⚫", color: "bg-gray-800" },
  {
    value: "steampunk",
    label: "Steampunk",
    icon: "⚙️",
    color: "bg-amber-600",
  },
];

const BONUS_TYPES = [
  { value: "1PM", label: "Peek Meter", icon: "👁️" },
  { value: "1MX", label: "Multiplier", icon: "📈" },
  { value: "1TD", label: "Trade Delay", icon: "⏱️" },
  { value: "1AB", label: "Action Bar", icon: "⚡" },
  { value: "1TE", label: "Team Effect", icon: "👥" },
];

module.exports = {
  LEGENDRY_TYPE_EQUIPED,
  EQUIPMENT_ITEM_SUMMARY,
  CASE_TYPES,
  BONUS_TYPES,
};
