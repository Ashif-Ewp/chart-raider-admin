const mongoose = require("mongoose");
const MatchRule = require("../models/MatchRule");
const MatchRuleChange = require("../models/MatchRuleChange");

const sanitizeItemsPayload = (items) => {
  if (!Array.isArray(items)) return [];
  return items
    .map((item, index) => {
      const label = (item.label || "").trim();
      const value = (item.value || "").trim();
      if (!label || !value) {
        return null;
      }
      const fallbackId =
        item._id && mongoose.Types.ObjectId.isValid(item._id)
          ? new mongoose.Types.ObjectId(item._id)
          : new mongoose.Types.ObjectId();

      return {
        _id: fallbackId,
        label,
        value,
        order: typeof item.order === "number" ? item.order : index,
      };
    })
    .filter(Boolean);
};

const sortItems = (items) => {
  if (!Array.isArray(items)) return [];
  return [...items].sort((a, b) => {
    const orderA = typeof a.order === "number" ? a.order : 0;
    const orderB = typeof b.order === "number" ? b.order : 0;
    if (orderA !== orderB) return orderA - orderB;
    return (a.label || "").localeCompare(b.label || "");
  });
};

// GET /api/match-rules
const getMatchRules = async (req, res) => {
  try {
    const rules = await MatchRule.find().sort({ createdAt: -1 });
    const payload = rules.map((rule) => {
      const obj = rule.toObject();
      obj.items = sortItems(obj.items);
      return obj;
    });
    res.json({
      success: true,
      count: payload.length,
      data: payload,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching match rules",
      error: error.message,
    });
  }
};

// GET /api/match-rules/:id
const getMatchRuleById = async (req, res) => {
  try {
    const rule = await MatchRule.findById(req.params.id);
    if (!rule) {
      return res.status(404).json({
        success: false,
        message: "Match rule not found",
      });
    }
    const payload = rule.toObject();
    payload.items = sortItems(payload.items);
    res.json({
      success: true,
      data: payload,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching match rule",
      error: error.message,
    });
  }
};

// POST /api/match-rules
const createMatchRule = async (req, res) => {
  try {
    const { title, description, items } = req.body;
    if (!title || !String(title).trim()) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }
    const sanitizedItems = sanitizeItemsPayload(items);
    const now = new Date();

    const matchRule = await MatchRule.create({
      title: String(title).trim(),
      description: description ? String(description).trim() : "",
      items: sanitizedItems.map((item) => ({
        ...item,
        previousValue: null,
        lastChangedAt: now,
      })),
    });

    if (matchRule.items.length > 0) {
      await MatchRuleChange.insertMany(
        matchRule.items.map((item) => ({
          ruleId: matchRule._id,
          ruleTitle: matchRule.title,
          itemId: item._id,
          itemLabel: item.label,
          oldValue: null,
          newValue: item.value,
          changeType: "created",
          changedAt: now,
        }))
      );
    }

    const payload = matchRule.toObject();
    payload.items = sortItems(payload.items);

    res.status(201).json({
      success: true,
      message: "Match rule created successfully",
      data: payload,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating match rule",
      error: error.message,
    });
  }
};

// PUT /api/match-rules/:id
const updateMatchRule = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, items } = req.body;
    const matchRule = await MatchRule.findById(id);

    if (!matchRule) {
      return res.status(404).json({
        success: false,
        message: "Match rule not found",
      });
    }

    if (!title || !String(title).trim()) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    const originalTitle = matchRule.title;
    const sanitizedItems = sanitizeItemsPayload(items);
    const existingItemMap = new Map(
      matchRule.items.map((item) => [item._id.toString(), item])
    );
    const incomingIds = new Set();
    const now = new Date();
    const changes = [];

    const nextItems = sanitizedItems.map((item, index) => {
      const fallbackId = item._id || new mongoose.Types.ObjectId();
      const existing = existingItemMap.get(fallbackId.toString());
      incomingIds.add(fallbackId.toString());

      if (!existing) {
        changes.push({
          ruleId: matchRule._id,
          ruleTitle: String(title).trim(),
          itemId: fallbackId,
          itemLabel: item.label,
          oldValue: null,
          newValue: item.value,
          changeType: "created",
          changedAt: now,
        });
        return {
          ...item,
          _id: fallbackId,
          order: typeof item.order === "number" ? item.order : index,
          previousValue: null,
          lastChangedAt: now,
        };
      }

      const hasLabelChange = existing.label !== item.label;
      const hasValueChange = existing.value !== item.value;

      if (hasLabelChange || hasValueChange) {
        changes.push({
          ruleId: matchRule._id,
          ruleTitle: String(title).trim(),
          itemId: existing._id,
          itemLabel: item.label,
          oldValue: existing.value,
          newValue: item.value,
          changeType: "updated",
          changedAt: now,
        });
      }

      return {
        ...item,
        _id: existing._id,
        order: typeof item.order === "number" ? item.order : index,
        previousValue: hasValueChange ? existing.value : existing.previousValue,
        lastChangedAt:
          hasValueChange || hasLabelChange ? now : existing.lastChangedAt,
      };
    });

    // deletions
    matchRule.items.forEach((existing) => {
      if (!incomingIds.has(existing._id.toString())) {
        changes.push({
          ruleId: matchRule._id,
          ruleTitle: String(title).trim(),
          itemId: existing._id,
          itemLabel: existing.label,
          oldValue: existing.value,
          newValue: null,
          changeType: "deleted",
          changedAt: now,
        });
      }
    });

    matchRule.title = String(title).trim();
    matchRule.description = description ? String(description).trim() : "";
    matchRule.items = nextItems;

    await matchRule.save();

    if (originalTitle !== matchRule.title) {
      changes.push({
        ruleId: matchRule._id,
        ruleTitle: matchRule.title,
        itemId: null,
        itemLabel: "",
        oldValue: originalTitle,
        newValue: matchRule.title,
        changeType: "title",
        changedAt: now,
      });
    }

    if (changes.length > 0) {
      await MatchRuleChange.insertMany(changes);
    }

    const payload = matchRule.toObject();
    payload.items = sortItems(payload.items);

    res.json({
      success: true,
      message: "Match rule updated successfully",
      data: payload,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating match rule",
      error: error.message,
    });
  }
};

// DELETE /api/match-rules/:id
const deleteMatchRule = async (req, res) => {
  try {
    const { id } = req.params;
    const matchRule = await MatchRule.findById(id);

    if (!matchRule) {
      return res.status(404).json({
        success: false,
        message: "Match rule not found",
      });
    }

    await MatchRule.deleteOne({ _id: id });

    const now = new Date();
    const changes = matchRule.items.map((item) => ({
      ruleId: matchRule._id,
      ruleTitle: matchRule.title,
      itemId: item._id,
      itemLabel: item.label,
      oldValue: item.value,
      newValue: null,
      changeType: "deleted",
      changedAt: now,
    }));

    changes.push({
      ruleId: matchRule._id,
      ruleTitle: matchRule.title,
      itemId: null,
      itemLabel: "",
      oldValue: matchRule.title,
      newValue: null,
      changeType: "deleted",
      changedAt: now,
    });

    if (changes.length > 0) {
      await MatchRuleChange.insertMany(changes);
    }

    res.json({
      success: true,
      message: "Match rule deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting match rule",
      error: error.message,
    });
  }
};

// GET /api/match-rules/changes/timeline
const getMatchRuleChanges = async (req, res) => {
  try {
    const { limit = 25, range = "24h" } = req.query;
    const query = {};
    const normalizedRange = String(range || "").toLowerCase();
    const now = Date.now();
    let since = null;

    switch (normalizedRange) {
      case "24h":
      case "24hours":
        since = new Date(now - 24 * 60 * 60 * 1000);
        break;
      case "7d":
      case "7days":
        since = new Date(now - 7 * 24 * 60 * 60 * 1000);
        break;
      case "30d":
      case "30days":
        since = new Date(now - 30 * 24 * 60 * 60 * 1000);
        break;
      case "1y":
      case "1yr":
      case "12m":
        since = new Date(now - 365 * 24 * 60 * 60 * 1000);
        break;
      case "all":
      case "":
        since = null;
        break;
      default:
        if (!Number.isNaN(Date.parse(range))) {
          since = new Date(range);
        }
        break;
    }

    if (since) {
      query.changedAt = { $gte: since };
    }

    const changes = await MatchRuleChange.find(query)
      .sort({ changedAt: -1 })
      .limit(Math.min(Number(limit) || 25, 200));

    res.json({
      success: true,
      count: changes.length,
      data: changes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching match rule changes",
      error: error.message,
    });
  }
};

module.exports = {
  getMatchRules,
  getMatchRuleById,
  createMatchRule,
  updateMatchRule,
  deleteMatchRule,
  getMatchRuleChanges,
};
