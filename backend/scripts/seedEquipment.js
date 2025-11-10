require("dotenv").config();
const mongoose = require("mongoose");
const Equipment = require("../models/Equipment");
const { EQUIPMENT_ITEM_SUMMARY } = require("../constants/equipment");

const seedEquipmentDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected...");

    // Clear existing data
    await Equipment.deleteMany({});
    console.log("Existing equipment cleared");

    // Prepare equipment for insertion
    const equipmentItems = [];

    // Convert EQUIPMENT_ITEM_SUMMARY to equipment items
    Object.keys(EQUIPMENT_ITEM_SUMMARY).forEach((key) => {
      const item = EQUIPMENT_ITEM_SUMMARY[key];

      // Generate a readable name from the key
      // Simply replace underscores with spaces and convert to lowercase
      // e.g., "carbon_case_bridge" -> "carbon case bridge"
      const name = key.replace(/_/g, " ").toLowerCase();

      equipmentItems.push({
        name: name,
        key: item.key || key,
        summary: item.summary || "",
        bonus: item.bonus || "",
        case_type: item.case_type || "",
        profit: item.profit ?? null,
        loss: item.loss ?? null,
        value: item.value ?? null,
        max_value: item.max_value ?? null,
        max_stack: item.max_stack ?? null,
        duration: item.duration ?? null,
        cooldown: item.cooldown ?? null,
        percentage: item.percentage ?? null,
        count: item.count ?? null,
        half1: item.half1 || null,
        half2: item.half2 || null,
        isActive: true,
      });
    });

    // Insert equipment
    await Equipment.insertMany(equipmentItems);
    console.log(`✓ Seeded ${equipmentItems.length} equipment items`);

    // Display summary by case type
    const summary = await Equipment.aggregate([
      { $group: { _id: "$case_type", count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    console.log("\n=== Seed Summary ===");
    summary.forEach((item) => {
      console.log(`${item._id}: ${item.count} items`);
    });

    // Display summary by bonus type
    const bonusSummary = await Equipment.aggregate([
      { $group: { _id: "$bonus", count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    console.log("\n=== Bonus Type Summary ===");
    bonusSummary.forEach((item) => {
      console.log(`${item._id}: ${item.count} items`);
    });

    console.log("\nEquipment database seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding equipment database:", error);
    process.exit(1);
  }
};

seedEquipmentDatabase();
