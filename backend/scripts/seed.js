// require("dotenv").config();
// const mongoose = require("mongoose");
// const ActionBarBonus = require("../models/ActionBarBonus");
// const { ACTIONBAR, MULTIPLIER_CATEGORIES } = require("../constants/actionbar");

// const ACTIONBAR_BONUS_MATCH = {
//   [ACTIONBAR.PRIZE_BAG]: [
//     { name: "PB 1", key: "PB_1", value: 1 },
//     { name: "PB 2", key: "PB_2", value: 2 },
//     { name: "PB 3", key: "PB_3", value: 3 },
//   ],
//   [ACTIONBAR.STOP_LOSS]: [
//     {
//       name: "SL 10x1",
//       key: "SL_10x1",
//       description: "Extend your next 10 stop losses 1% (This match)",
//       count: 10,
//       value: 1,
//     },
//     {
//       name: "SL 3x3",
//       key: "SL_3x3",
//       description: "Extend your next 3 stop losses 3% (This match)",
//       count: 3,
//       value: 3,
//     },
//     {
//       name: "SL 1x10",
//       key: "SL_1x10",
//       description: "Extend your next stop loss 10% (This match)",
//       count: 1,
//       value: 10,
//     },
//   ],
//   [ACTIONBAR.DOUBLE_EDGED_TRADES]: [
//     {
//       name: "DET +3-5",
//       key: "DET_3_5",
//       description: "Your next trade will have a bonus 3-5%",
//     },
//     {
//       name: "DET +6-8",
//       key: "DET_6_8",
//       description: "Your next trade will have a bonus 6-8%",
//     },
//     {
//       name: "DET +10",
//       key: "DET_10",
//       description: "Your next trade will have a bonus 10%",
//     },
//     {
//       name: "DET +/- 25-35",
//       key: "DET_25_35",
//       description: "Your next profitable trade will give 25% more or 35% less",
//     },
//     {
//       name: "DET2x +/- 20-30",
//       key: "DET2x_20_30",
//       description: "Your next 2 profitable trades give 20% more or 30% less",
//     },
//     {
//       name: "DET +/- 20-30",
//       key: "DET_20_30",
//       description: "Your next trade gives you 20% more or 30% less",
//     },
//     {
//       name: "DET2x +/- 15-20",
//       key: "DET2x_15_20",
//       description: "Your next 2 trades gives you 15% more or 20% less",
//     },
//   ],
//   [ACTIONBAR.HEALTH_PUMPS]: [
//     {
//       name: "HP TM3-7",
//       key: "HP_TM3_7",
//       description: "A team mate gets 3-7% of their health total",
//     },
//     {
//       name: "HP T1-3",
//       key: "HP_T1_3",
//       description: "Your team gets 1-3% of their health total",
//     },
//     {
//       name: "HP 2TM3-5",
//       key: "HP_2TM3_5",
//       description: "Two random team members gets 3-5%",
//     },
//     {
//       name: "HP 1-25",
//       key: "HP_1_25",
//       description: "Get a 1-25% boost to your health",
//     },
//     {
//       name: "HP TM1-25",
//       key: "HP_TM1_25",
//       description: "Give a team mate 1-25% boost to their health",
//     },
//     {
//       name: "HP T1-10",
//       key: "HP_T1_10",
//       description: "Give your team mates 1-10% boost to their health",
//     },
//   ],
//   [ACTIONBAR.TRADELIXER]: [
//     { name: "+1 TE", key: "TE_1", description: "Get an additional TradeliXer" },
//     {
//       name: "RFRSH TE",
//       key: "RFRSH_TE",
//       description: "Refresh your TradeliXers",
//     },
//     {
//       name: "RFRSH TM TE",
//       key: "RFRSH_TM_TE",
//       description: "Refresh Your teams TradeliXers randomly",
//     },
//     {
//       name: "+1 TM TE",
//       key: "1_TM_TE",
//       description: "At random team mates get an extra TradeliXer",
//     },
//     {
//       name: "TE -30%",
//       key: "TE_30",
//       description: "Your next TradeliXer costs 30% less",
//     },
//     {
//       name: "TE T-20%",
//       key: "TE_T_20",
//       description: "Your team gets a 20% discount on TradeliXers this match",
//     },
//   ],
//   [ACTIONBAR.TRADE_RECOVERY]: [
//     {
//       name: "TR RDNM",
//       key: "TR_RDNM",
//       description: "Recover a random amount on your next bad trade",
//     },
//     {
//       name: "TR HALFRANDOM",
//       key: "TR_HALFRANDOM",
//       description: "Recover half the losses from a random trade this match",
//     },
//     {
//       name: "TR T6-8",
//       key: "TR_T6_8",
//       description: "Team recovers 6-8% of trade losses",
//     },
//     {
//       name: "TR TM1-30",
//       key: "TR_TM1_30",
//       description:
//         "A team mate recovers a random amount from a lost trade (1-30%)",
//     },
//   ],
//   [ACTIONBAR.ACTION_BAR]: [
//     { name: "AB 50", key: "AB_50", value: 50 },
//     { name: "AB 65", key: "AB_65", value: 65 },
//     { name: "AB 80", key: "AB_80", value: 80 },
//     {
//       name: "AB DBL",
//       key: "AB_DBL",
//       description: "Get two random bonuses next time your action bar fills.",
//     },
//     {
//       name: "AB +100%SPD T 5m",
//       key: "AB_100_SPD_T_5m",
//       description:
//         "Action bar fills twice as fast for your entire team (5 Minutes)",
//     },
//     {
//       name: "AB +100%SPD 10m",
//       key: "AB_100_SPD_10m",
//       description: "Your action bar fills twice as fast (10 Minutes)",
//     },
//     {
//       name: "AB +25%SPD",
//       key: "AB_25_SPD",
//       description: "Your action bar fills 25% faster (Rest of the match)",
//     },
//   ],
//   [ACTIONBAR.XP_STACK]: [
//     {
//       name: "XP 10",
//       key: "XP_10",
//       value: 10,
//     },
//     {
//       name: "XP 20",
//       key: "XP_20",
//       value: 20,
//     },
//   ],
//   [ACTIONBAR.PEEK_METER]: [
//     { name: "PM 20", key: "PM_20", value: "+20%" },
//     { name: "PM 30", key: "PM_30", value: "+30%" },
//     { name: "PM 100 5m", key: "PM_100_5M", value: "+100%" },
//     { name: "PM 100 10m", key: "PM_100_10M", value: "+100%" },
//     { name: "PM 2xFill 10m", key: "PM_2XFILL_10M", value: "2xFill" },
//     { name: "PM 2xFill 15m", key: "PM_2XFILL_15M", value: "2xFill" },
//     { name: "PM 3xFill 5m", key: "PM_3XFILL_5M", value: "3xFill" },
//   ],
//   [ACTIONBAR.TRADE_DELAY]: [
//     { name: "TD 25 15m", key: "TD_25_15M", value: "+25%" },
//     { name: "TD 10", key: "TD_10", value: "+10%" },
//     { name: "TD 50 5-7m", key: "TD_50_5_7M", value: "+50%" },
//     { name: "TD TM 10 30m", key: "TD_TM_10_30M", value: "+10% TM" },
//     { name: "TD TM 20 15m", key: "TD_TM_20_15M", value: "+20% TM" },
//     { name: "TD SL FILL", key: "TD_SL_FILL", value: "SL Fill" },
//     { name: "TD 25SPD 10m", key: "TD_25SPD_10M", value: "+25%SPD" },
//     { name: "TD 15SPD 15m", key: "TD_15SPD_15M", value: "+15%SPD" },
//   ],
// };

// const seedDatabase = async () => {
//   try {
//     // Connect to MongoDB
//     await mongoose.connect(process.env.MONGODB_URI);
//     console.log("MongoDB Connected...");

//     // Clear existing data
//     await ActionBarBonus.deleteMany({});
//     console.log("Existing bonuses cleared");

//     // Prepare bonuses for insertion
//     const bonuses = [];

//     // Add Action Bar bonuses
//     Object.keys(ACTIONBAR_BONUS_MATCH).forEach((category) => {
//       ACTIONBAR_BONUS_MATCH[category].forEach((bonus) => {
//         bonuses.push({
//           name: bonus.name,
//           key: bonus.key,
//           category: category,
//           description: bonus.description || "",
//           value: bonus.value || null,
//           count: bonus.count || null,
//           bonus_type: "actionbar",
//           isActive: true,
//           rarity: "common",
//         });
//       });
//     });

//     // Add Multiplier bonuses
//     Object.keys(MULTIPLIER_CATEGORIES).forEach((category) => {
//       MULTIPLIER_CATEGORIES[category].forEach((bonus) => {
//         bonuses.push({
//           name: bonus.name,
//           key: bonus.key,
//           category: category,
//           description: `+${bonus.value}% ${category
//             .toLowerCase()
//             .replace(/_/g, " ")} (Max ${bonus.max}%)`,
//           value: bonus.value,
//           max: bonus.max,
//           multiplier_type: bonus.multiplier_type,
//           bonus_type: "multiplier",
//           isActive: true,
//           rarity: "common",
//         });
//       });
//     });

//     // Insert bonuses
//     await ActionBarBonus.insertMany(bonuses);
//     console.log(`✓ Seeded ${bonuses.length} bonuses (Action Bar + Multiplier)`);

//     // Display summary
//     const summary = await ActionBarBonus.aggregate([
//       { $group: { _id: "$category", count: { $sum: 1 } } },
//       { $sort: { _id: 1 } },
//     ]);

//     console.log("\n=== Seed Summary ===");
//     summary.forEach((item) => {
//       console.log(`${item._id}: ${item.count} bonuses`);
//     });

//     console.log("\nDatabase seeding completed successfully!");
//     process.exit(0);
//   } catch (error) {
//     console.error("Error seeding database:", error);
//     process.exit(1);
//   }
// };

// seedDatabase();

require("dotenv").config();
const mongoose = require("mongoose");
const ActionBarBonus = require("../models/ActionBarBonus");
const { ACTIONBAR, MULTIPLIER_CATEGORIES } = require("../constants/actionbar");

const ACTIONBAR_BONUS_MATCH = {
  [ACTIONBAR.PRIZE_BAG]: [
    {
      name: "PB 1",
      key: "PB_1",
      value: 1,
      description: "Get a 1% bonus to your prize bag",
    },
    {
      name: "PB 2",
      key: "PB_2",
      value: 2,
      description: "Get a 2% bonus to your prize bag",
    },
    {
      name: "PB 3",
      key: "PB_3",
      value: 3,
      description: "Get a 3% bonus to your prize bag",
    },
  ],
  [ACTIONBAR.STOP_LOSS]: [
    {
      name: "SL 10x1",
      key: "SL_10x1",
      count: 10,
      value: 1,
      description: "Extend your next 10 stop losses 1% (This match)",
    },
    {
      name: "SL 3x3",
      key: "SL_3x3",
      count: 3,
      value: 3,
      description: "Extend your next 3 stop losses 3% (This match)",
    },
    {
      name: "SL 1x10",
      key: "SL_1x10",
      count: 1,
      value: 10,
      description: "Extend your next stop loss 10% (This match)",
    },
  ],
  [ACTIONBAR.DOUBLE_EDGED_TRADES]: [
    {
      name: "DET +3-5",
      key: "DET_3_5",
      min_value: 3,
      max_value: 5,
      count: 1,
      description: "Your next trade will have a bonus 3-5%",
    },
    {
      name: "DET +6-8",
      key: "DET_6_8",
      min_value: 6,
      max_value: 8,
      count: 1,
      description: "Your next trade will have a bonus 6-8%",
    },
    {
      name: "DET +10",
      key: "DET_10",
      min_value: 10,
      max_value: 10,
      count: 1,
      description: "Your next trade will have a bonus 10%",
    },
    {
      name: "DET +/- 25-35",
      key: "DET_25_35",
      min_value: 25,
      max_value: 35,
      count: 1,
      description: "Your next profitable trade will give 25% more or 35% less",
    },
    {
      name: "DET2x +/- 20-30",
      key: "DET2x_20_30",
      min_value: 20,
      max_value: 30,
      count: 2,
      description: "Your next 2 profitable trades give 20% more or 30% less",
    },
    {
      name: "DET +/- 20-30",
      key: "DET_20_30",
      min_value: 20,
      max_value: 30,
      count: 1,
      description: "Your next trade gives you 20% more or 30% less",
    },
    {
      name: "DET2x +/- 15-20",
      key: "DET2x_15_20",
      min_value: 15,
      max_value: 20,
      count: 2,
      description: "Your next 2 trades gives you 15% more or 20% less",
    },
  ],
  [ACTIONBAR.HEALTH_PUMPS]: [
    {
      name: "HP TM3-7",
      key: "HP_TM3_7",
      min_value: 3,
      max_value: 7,
      count: 1,
      description: "A team mate gets 3-7% of their health total",
    },
    {
      name: "HP T1-3",
      key: "HP_T1_3",
      min_value: 1,
      max_value: 3,
      count: 1,
      description: "Your team gets 1-3% of their health total",
    },
    {
      name: "HP 2TM3-5",
      key: "HP_2TM3_5",
      min_value: 3,
      max_value: 5,
      count: 2,
      description: "Two random team members gets 3-5%",
    },
    {
      name: "HP 1-25",
      key: "HP_1_25",
      min_value: 1,
      max_value: 25,
      count: 1,
      description: "Get a 1-25% boost to your health",
    },
    {
      name: "HP TM1-25",
      key: "HP_TM1_25",
      description: "Give a team mate 1-25% boost to their health",
      min_value: 1,
      max_value: 25,
      count: 1,
    },
    {
      name: "HP T1-10",
      key: "HP_T1_10",
      description: "Give your team mates 1-10% boost to their health",
      min_value: 1,
      max_value: 10,
      count: 1,
    },
  ],
  [ACTIONBAR.TRADELIXER]: [
    {
      name: "+1 TE",
      key: "TE_1",
      description: "Get an additional TradeliXer",
      count: 1,
    },
    {
      name: "RFRSH TE",
      key: "RFRSH_TE",
      description: "Refresh your TradeliXers",
      count: 1,
    },
    {
      name: "RFRSH TM TE",
      key: "RFRSH_TM_TE",
      description: "Refresh Your teams TradeliXers randomly",
      count: 1,
    },
    {
      name: "+1 TM TE",
      key: "1_TM_TE",
      description: "At random team mates get an extra TradeliXer",
      count: 1,
      value: 1,
    },
    {
      name: "TE -30%",
      key: "TE_30",
      description: "Your next TradeliXer costs 30% less",
      count: 1,
      value: 30,
    },
    {
      name: "TE T-20%",
      key: "TE_T_20",
      description: "Your team gets a 20% discount on TradeliXers this match",
      count: 1,
      value: 20,
    },
  ],
  [ACTIONBAR.TRADE_RECOVERY]: [
    {
      name: "TR RDNM",
      key: "TR_RDNM",
      description: "Recover a random amount on your next bad trade",
      count: 1,
      value: 4,
    },
    {
      name: "TR HALFRANDOM",
      key: "TR_HALFRANDOM",
      description: "Recover half the losses from a random trade this match",
      count: 1,
      value: 50,
    },
    {
      name: "TR T6-8",
      key: "TR_T6_8",
      description: "Team recovers 6-8% of trade losses",
      min_value: 6,
      max_value: 8,
      count: 1,
    },
    {
      name: "TR TM1-30",
      key: "TR_TM1_30",
      description:
        "A team mate recovers a random amount from a lost trade (1-30%)",
      min_value: 1,
      max_value: 30,
      count: 1,
    },
  ],
  [ACTIONBAR.ACTION_BAR]: [
    {
      name: "AB 50",
      key: "AB_50",
      value: 50,
      description: "Get a 50% bonus to your action bar",
      count: 1,
    },
    {
      name: "AB 65",
      key: "AB_65",
      value: 65,
      description: "Get a 65% bonus to your action bar",
      count: 1,
    },
    {
      name: "AB 80",
      key: "AB_80",
      value: 80,
      description: "Get a 80% bonus to your action bar",
      count: 1,
    },
    {
      name: "AB DBL",
      key: "AB_DBL",
      description: "Get two random bonuses next time your action bar fills.",
      count: 2,
    },
    {
      name: "AB +100%SPD T 5m",
      key: "AB_100_SPD_T_5m",
      description:
        "Action bar fills twice as fast for your entire team (5 Minutes)",
      count: 2,
      duration: 5,
    },
    {
      name: "AB +100%SPD 10m",
      key: "AB_100_SPD_10m",
      description: "Your action bar fills twice as fast (10 Minutes)",
      count: 2,
      duration: 10,
    },
    {
      name: "AB +25%SPD",
      key: "AB_25_SPD",
      description: "Your action bar fills 25% faster (Rest of the match)",
      count: 1,
      value: 25,
    },
  ],
  [ACTIONBAR.XP_STACK]: [
    {
      name: "XP 10",
      key: "XP_10",
      description: "Get a 10% bonus to your XP stack",
      count: 1,
      value: 10,
    },
    {
      name: "XP 20",
      key: "XP_20",
      description: "Get a 20% bonus to your XP stack",
      count: 1,
      value: 20,
    },
  ],
  [ACTIONBAR.PEEK_METER]: [
    {
      name: "PM 20",
      key: "PM_20",
      description:
        "PM +20%: Get an extra 20% Peek Meter for the rest of the match",
      count: 1,
      value: 20,
    },
    {
      name: "PM 30",
      key: "PM_30",
      description:
        "PM +30% 15m: Get an extra 30% Peek Meter for the next 15 minutes",
      count: 1,
      value: 30,
    },
    {
      name: "PM 100 5m",
      key: "PM_100_5M",
      description: "PM +100% 5m: Double Your Peek Meter for the next 5 minutes",
      count: 2,
      value: 100,
      duration: 5,
    },
    {
      name: "PM 100 10m",
      key: "PM_100_10M",
      description:
        "PM +100% 10m: Double Your Peek Meter for the next 10 minutes",
      count: 2,
      value: 100,
      duration: 10,
    },
    {
      name: "PM 2xFill 10m",
      key: "PM_2XFILL_10M",
      description:
        "PM 2xFill 10m: Refresh Your Peek Meter twice as fast for the next 10 minutes",
      count: 2,
      value: 2,
      duration: 10,
    },
    {
      name: "PM 2xFill 15m",
      key: "PM_2XFILL_15M",
      value: 2,
      description:
        "PM 2xFill 15m: Refresh Your Peek Meter twice as fast for the next 15 minutes",
      count: 2,
      value: 2,
      duration: 15,
    },
    {
      name: "PM 3xFill 5m",
      key: "PM_3XFILL_5M",
      value: 3,
      description:
        "PM 3xFill 5m: Refresh Your Peek Meter three time as fast for the next 5 minutes",
      count: 3,
      value: 3,
      duration: 5,
    },
  ],
  [ACTIONBAR.TRADE_DELAY]: [
    {
      name: "TD 25 15m",
      key: "TD_25_15M",
      value: 25,
      description: "TD +25% 15m: Increase trade delay by 25% (15 minutes)",
      count: 1,
      duration: 15,
      value: 25,
    },
    {
      name: "TD 10",
      key: "TD_10",
      value: 10,
      description: "TD +10%: Increase trade delay by 10% (Rest of the match)",
      count: 1,
    },
    {
      name: "TD 50 5-7m",
      key: "TD_50_5_7M",
      value: 50,
      description: "TD +50% 5-7m: Increase trade delay by 50% (5-7 minutes)",
      count: 1,
      min_duration: 5,
      max_duration: 7,
    },
    {
      name: "TD TM 10 30m",
      key: "TD_TM_10_30M",
      value: 10,
      description:
        "TD TM +10% 30m: Increase teams trade delay by 10% (30 minutes)",
      count: 1,
      duration: 30,
    },
    {
      name: "TD TM 20 15m",
      key: "TD_TM_20_15M",
      value: 20,
      description:
        "TD TM +20% 15m: Increase teams trade delay by 20% (15 minutes)",
      count: 1,
      duration: 15,
    },
    {
      name: "TD SL FILL",
      key: "TD_SL_FILL",
      description:
        "TD SL FILL: If your trade hits a stop loss fill your trade delay (10 minutes)",
      count: 1,
      duration: 10,
    },
    {
      name: "TD 25SPD 10m",
      key: "TD_25SPD_10M",
      value: 25,
      description:
        "TD +25%SPD 10m: Your trade delay fills up 25% faster (10 minutes)",
      count: 1,
      duration: 10,
    },
    {
      name: "TD 15SPD 15m",
      key: "TD_15SPD_15M",
      value: 15,
      description:
        "TD +15%SPD 15m: Your trade delay fills up 15% faster (15 minutes)",
      count: 1,
      duration: 15,
    },
  ],
};

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected...");

    // Clear existing data
    await ActionBarBonus.deleteMany({});
    console.log("Existing bonuses cleared");

    // Prepare bonuses for insertion
    const bonuses = [];

    // Add Action Bar bonuses
    Object.keys(ACTIONBAR_BONUS_MATCH).forEach((category) => {
      ACTIONBAR_BONUS_MATCH[category].forEach((bonus) => {
        bonuses.push({
          name: bonus.name,
          key: bonus.key,
          category: category,
          description: bonus.description || "",
          value: bonus.value || null,
          count: bonus.count || null,
          bonus_type: "actionbar",
          isActive: true,
          rarity: "common",
          min_value: bonus.min_value || null,
          max_value: bonus.max_value || null,
          duration: bonus.duration || null,
          min_duration: bonus.min_duration || null,
          max_duration: bonus.max_duration || null,
        });
      });
    });

    // Add Multiplier bonuses
    Object.keys(MULTIPLIER_CATEGORIES).forEach((category) => {
      MULTIPLIER_CATEGORIES[category].forEach((bonus) => {
        bonuses.push({
          name: bonus.name,
          key: bonus.key,
          category: category,
          description: bonus.description || "",
          value: bonus.value,
          max: bonus.max,
          multiplier_type: bonus.multiplier_type,
          bonus_type: "multiplier",
          isActive: true,
          rarity: "common",
          min_value: bonus.min_value || null,
          max_value: bonus.max_value || null,
          duration: bonus.duration || null,
          min_duration: bonus.min_duration || null,
          max_duration: bonus.max_duration || null,
        });
      });
    });

    // Insert bonuses
    await ActionBarBonus.insertMany(bonuses);
    console.log(`✓ Seeded ${bonuses.length} bonuses (Action Bar + Multiplier)`);

    // Display summary
    const summary = await ActionBarBonus.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    console.log("\n=== Seed Summary ===");
    summary.forEach((item) => {
      console.log(`${item._id}: ${item.count} bonuses`);
    });

    console.log("\nDatabase seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
