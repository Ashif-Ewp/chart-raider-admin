import React, { useEffect, useMemo, useState } from "react";
import { RefreshCcw, Plus, Activity, Clock } from "lucide-react";
import { toast } from "react-toastify";
import MatchRuleForm from "../components/MatchRuleForm";
import MatchRuleCard from "../components/MatchRuleCard";
import { matchRuleAPI } from "../services/api";

const RANGE_OPTIONS = [
  { value: "24h", label: "24H" },
  { value: "7d", label: "7D" },
  { value: "30d", label: "3Mo" },
  { value: "1y", label: "1Yr" },
  { value: "all", label: "All" },
];

const SettingsMatchRules = () => {
  const [rules, setRules] = useState([]);
  const [loadingRules, setLoadingRules] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingRule, setEditingRule] = useState(null);
  const [saving, setSaving] = useState(false);
  const [changes, setChanges] = useState([]);
  const [loadingChanges, setLoadingChanges] = useState(false);
  const [changeRange, setChangeRange] = useState("24h");

  const loadRules = async () => {
    setLoadingRules(true);
    try {
      const resp = await matchRuleAPI.getAll();
      const data = resp.data?.data ?? [];
      setRules(data);
    } catch (error) {
      console.error("Failed to load match rules", error);
      toast.error("Failed to load match rules.");
    } finally {
      setLoadingRules(false);
    }
  };

  const loadChanges = async (range = changeRange) => {
    setLoadingChanges(true);
    try {
      const resp = await matchRuleAPI.getChanges({
        range,
        limit: 40,
      });
      const data = resp.data?.data ?? [];
      setChanges(data);
    } catch (error) {
      console.error("Failed to load match rule changes", error);
      toast.error("Failed to load rule changes.");
    } finally {
      setLoadingChanges(false);
    }
  };

  useEffect(() => {
    loadRules();
  }, []);

  useEffect(() => {
    loadChanges(changeRange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeRange]);

  const openCreateForm = () => {
    setEditingRule(null);
    setShowForm(true);
  };

  const handleEditRule = (rule) => {
    setEditingRule(rule);
    setShowForm(true);
  };

  const handleDeleteRule = async (rule) => {
    const confirmed = window.confirm(
      `Delete “${rule.title}”? This will remove all entries for this rule set.`
    );
    if (!confirmed) return;

    try {
      await matchRuleAPI.remove(rule._id);
      toast.success("Rule group deleted.");
      await loadRules();
      await loadChanges();
    } catch (error) {
      console.error("Failed to delete match rule", error);
      const message =
        error.response?.data?.message || "Unable to delete match rule.";
      toast.error(message);
    }
  };

  const handleSubmit = async (payload) => {
    setSaving(true);
    try {
      if (editingRule) {
        await matchRuleAPI.update(editingRule._id, payload);
        toast.success("Rule group updated.");
      } else {
        await matchRuleAPI.create(payload);
        toast.success("Rule group created.");
      }
      setShowForm(false);
      setEditingRule(null);
      await loadRules();
      await loadChanges();
    } catch (error) {
      console.error("Failed to save match rule", error);
      const message =
        error.response?.data?.message || "Unable to save match rule.";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  const closeForm = () => {
    if (saving) return;
    setShowForm(false);
    setEditingRule(null);
  };

  const changesByDay = useMemo(() => {
    return changes.reduce((acc, change) => {
      const date = change.changedAt
        ? new Date(change.changedAt)
        : new Date(change.createdAt || Date.now());
      const key = date.toDateString();
      if (!acc[key]) acc[key] = [];
      acc[key].push(change);
      return acc;
    }, {});
  }, [changes]);

  const sortedChangeSections = useMemo(() => {
    return Object.entries(changesByDay)
      .map(([day, entries]) => {
        const orderedEntries = [...entries].sort(
          (a, b) =>
            new Date(b.changedAt || b.createdAt || 0).getTime() -
            new Date(a.changedAt || a.createdAt || 0).getTime()
        );
        const topTimestamp = new Date(
          orderedEntries[0]?.changedAt || orderedEntries[0]?.createdAt || 0
        ).getTime();
        return {
          day,
          entries: orderedEntries,
          topTimestamp,
        };
      })
      .sort((a, b) => b.topTimestamp - a.topTimestamp);
  }, [changesByDay]);

  const renderChangeDescription = (change) => {
    if (change.changeType === "title") {
      return (
        <span>
          Section title updated to{" "}
          <span className="font-semibold text-gray-900">{change.newValue}</span>
          .
        </span>
      );
    }

    if (change.changeType === "deleted" && !change.newValue) {
      return (
        <span>
          Removed{" "}
          <span className="font-semibold text-gray-900">
            {change.itemLabel || "entry"}
          </span>
          .
        </span>
      );
    }

    if (change.changeType === "created") {
      return (
        <span>
          Added{" "}
          <span className="font-semibold text-gray-900">
            {change.itemLabel}
          </span>{" "}
          →{" "}
          <span className="font-semibold text-primary-600">
            {change.newValue}
          </span>
        </span>
      );
    }

    return (
      <span>
        Updated{" "}
        <span className="font-semibold text-gray-900">{change.itemLabel}</span>{" "}
        from{" "}
        <span className="line-through text-red-500/70">{change.oldValue}</span>{" "}
        to{" "}
        <span className="font-semibold text-emerald-600">
          {change.newValue}
        </span>
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Match Rules</h2>
          <p className="text-gray-600 mt-2">
            Configure in-game rule sections and track recent changes.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => loadRules()}
            className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <RefreshCcw size={16} className="mr-2" />
            Refresh
          </button>
          <button
            onClick={openCreateForm}
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700"
          >
            <Plus size={16} className="mr-2" />
            New Rule Group
          </button>
        </div>
      </div>

      {showForm && (
        <MatchRuleForm
          initialData={editingRule}
          onSubmit={handleSubmit}
          onCancel={closeForm}
          saving={saving}
        />
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-4">
          {loadingRules ? (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm h-64 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3 text-gray-500">
                <Activity className="animate-spin" size={32} />
                <span className="text-sm font-medium">
                  Loading match rules...
                </span>
              </div>
            </div>
          ) : rules.length === 0 ? (
            <div className="bg-white rounded-lg border border-dashed border-gray-300 shadow-sm h-64 flex flex-col items-center justify-center text-center p-6">
              <h3 className="text-lg font-semibold text-gray-700">
                No rule groups yet
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                Create your first section to start publishing the match rules
                shown to players.
              </p>
              <button
                onClick={openCreateForm}
                className="mt-4 inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700"
              >
                <Plus size={16} className="mr-2" />
                Create Rule Group
              </button>
            </div>
          ) : (
            rules.map((rule) => (
              <MatchRuleCard
                key={rule._id}
                rule={rule}
                onEdit={handleEditRule}
                onDelete={handleDeleteRule}
              />
            ))
          )}
        </div>

        <aside className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Rule Changes
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Snapshot of the latest edits made to match rules.
                </p>
              </div>
              <div className="flex items-center gap-1">
                {RANGE_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setChangeRange(option.value)}
                    className={`px-2 py-1 text-xs font-semibold rounded-md uppercase tracking-wide transition-colors ${
                      changeRange === option.value
                        ? "bg-primary-600 text-white"
                        : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="max-h-[32rem] overflow-y-auto custom-scrollbar bg-gray-50">
              {loadingChanges ? (
                <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                  <Activity className="animate-spin mb-3" size={28} />
                  <span className="text-sm font-medium">
                    Loading recent changes...
                  </span>
                </div>
              ) : changes.length === 0 ? (
                <div className="py-12 text-center text-gray-500 text-sm">
                  No changes captured in this window.
                </div>
              ) : (
                <div className="px-5 py-4 space-y-6">
                  {sortedChangeSections.map((section) => (
                    <div key={section.day} className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-500 uppercase text-xs tracking-widest">
                        <Clock size={12} />
                        <span>{section.day}</span>
                      </div>
                      <div className="space-y-3">
                        {section.entries.map((change) => (
                          <div
                            key={change._id}
                            className="bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                                  {change.ruleTitle}
                                </p>
                                {change.itemLabel && (
                                  <p className="text-sm text-gray-800 mt-1">
                                    {change.itemLabel}
                                  </p>
                                )}
                              </div>
                              <span className="text-[10px] uppercase text-gray-400">
                                {change.changeType}
                              </span>
                            </div>
                            <div className="text-xs text-gray-600 mt-2 leading-relaxed">
                              {renderChangeDescription(change)}
                            </div>
                            <div className="text-[10px] text-gray-400 uppercase tracking-wider mt-3">
                              {change.changedAt
                                ? new Date(change.changedAt).toLocaleString()
                                : ""}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default SettingsMatchRules;
