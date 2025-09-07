"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Trash2, 
  Filter, 
  Settings, 
  Save,
  Play,
  BarChart3
} from "lucide-react";

interface FilterRule {
  id: string;
  name: string;
  condition: string;
  value: string;
  action: "keep" | "remove";
  enabled: boolean;
}

export function ManualCleaningTab() {
  const [rules, setRules] = useState<FilterRule[]>([
    {
      id: "1",
      name: "High Quality Images",
      condition: "resolution",
      value: ">= 1920x1080",
      action: "keep",
      enabled: true
    },
    {
      id: "2", 
      name: "Remove Duplicates",
      condition: "similarity",
      value: "> 95%",
      action: "remove",
      enabled: true
    },
    {
      id: "3",
      name: "File Size Filter",
      condition: "size",
      value: "< 10MB",
      action: "keep",
      enabled: false
    }
  ]);

  const [newRule, setNewRule] = useState({
    name: "",
    condition: "size",
    value: "",
    action: "keep" as "keep" | "remove"
  });

  const addRule = () => {
    if (newRule.name && newRule.value) {
      const rule: FilterRule = {
        id: Date.now().toString(),
        ...newRule,
        enabled: true
      };
      setRules([...rules, rule]);
      setNewRule({ name: "", condition: "size", value: "", action: "keep" });
    }
  };

  const deleteRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  const toggleRule = (id: string) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  const conditionOptions = [
    { value: "size", label: "File Size" },
    { value: "resolution", label: "Resolution" },
    { value: "format", label: "Format" },
    { value: "quality", label: "Quality" },
    { value: "similarity", label: "Similarity" },
    { value: "metadata", label: "Metadata" }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Manual Cleaning Rules</h1>
        <p className="text-white/60">
          Create custom rules to filter and clean your data automatically
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Rules List */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Active Rules ({rules.filter(r => r.enabled).length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {rules.map((rule) => (
                <motion.div
                  key={rule.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg border transition-all ${
                    rule.enabled 
                      ? "bg-white/5 border-white/20" 
                      : "bg-white/2 border-white/10 opacity-60"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-medium">{rule.name}</h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleRule(rule.id)}
                        className={`w-10 h-6 rounded-full transition-colors ${
                          rule.enabled ? "bg-green-600" : "bg-gray-600"
                        }`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                          rule.enabled ? "translate-x-5" : "translate-x-1"
                        }`} />
                      </button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteRule(rule.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-white/60">
                    <span className="capitalize">{rule.condition}</span>
                    <span>{rule.value}</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      rule.action === "keep" 
                        ? "bg-green-600/20 text-green-400" 
                        : "bg-red-600/20 text-red-400"
                    }`}>
                      {rule.action.toUpperCase()}
                    </span>
                  </div>
                </motion.div>
              ))}

              {rules.length === 0 && (
                <div className="text-center py-8 text-white/40">
                  No rules created yet. Add your first rule to get started.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Processing Actions */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Processing Options
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Play className="w-4 h-4 mr-2" />
                  Test Rules (Sample)
                </Button>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <Filter className="w-4 h-4 mr-2" />
                  Apply to Dataset
                </Button>
                <Button variant="outline" className="border-white/20 text-white/60 hover:bg-white/5">
                  <Save className="w-4 h-4 mr-2" />
                  Save Rules
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add New Rule */}
        <div className="space-y-6">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add New Rule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-white/60 text-sm mb-2">Rule Name</label>
                <Input
                  value={newRule.name}
                  onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                  placeholder="e.g., High Quality Filter"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                />
              </div>

              <div>
                <label className="block text-white/60 text-sm mb-2">Condition</label>
                <select
                  value={newRule.condition}
                  onChange={(e) => setNewRule({ ...newRule, condition: e.target.value })}
                  className="w-full h-10 px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white focus:border-white/30 focus:ring-2 focus:ring-white/20"
                >
                  {conditionOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-gray-900">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white/60 text-sm mb-2">Value</label>
                <Input
                  value={newRule.value}
                  onChange={(e) => setNewRule({ ...newRule, value: e.target.value })}
                  placeholder="e.g., > 1MB, >= 1920x1080"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                />
              </div>

              <div>
                <label className="block text-white/60 text-sm mb-2">Action</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setNewRule({ ...newRule, action: "keep" })}
                    className={`flex-1 py-2 px-3 rounded-md text-sm transition-colors ${
                      newRule.action === "keep"
                        ? "bg-green-600/20 text-green-400 border border-green-600/30"
                        : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    Keep
                  </button>
                  <button
                    onClick={() => setNewRule({ ...newRule, action: "remove" })}
                    className={`flex-1 py-2 px-3 rounded-md text-sm transition-colors ${
                      newRule.action === "remove"
                        ? "bg-red-600/20 text-red-400 border border-red-600/30"
                        : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    Remove
                  </button>
                </div>
              </div>

              <Button
                onClick={addRule}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Rule
              </Button>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Rule Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-white/60">Active Rules</span>
                <span className="text-white font-medium">
                  {rules.filter(r => r.enabled).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Total Rules</span>
                <span className="text-white font-medium">{rules.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Keep Actions</span>
                <span className="text-green-400 font-medium">
                  {rules.filter(r => r.action === "keep" && r.enabled).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Remove Actions</span>
                <span className="text-red-400 font-medium">
                  {rules.filter(r => r.action === "remove" && r.enabled).length}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
