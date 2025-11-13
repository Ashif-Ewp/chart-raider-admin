const express = require("express");
const {
  getMatchRules,
  getMatchRuleById,
  createMatchRule,
  updateMatchRule,
  deleteMatchRule,
  getMatchRuleChanges,
} = require("../controllers/matchRuleController");

const router = express.Router();

router.route("/").get(getMatchRules).post(createMatchRule);

router.get("/changes/timeline", getMatchRuleChanges);

router
  .route("/:id")
  .get(getMatchRuleById)
  .put(updateMatchRule)
  .delete(deleteMatchRule);

module.exports = router;
