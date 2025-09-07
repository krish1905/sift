"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { AICleaningTab } from "./AICleaningTab";
import { ManualCleaningTab } from "./ManualCleaningTab";
import { AnalyticsTab } from "./AnalyticsTab";
import { DataSourcesTab } from "./DataSourcesTab";

interface DashboardContentProps {
  activeTab: string;
  searchQuery: string;
}

export function DashboardContent({ activeTab, searchQuery }: DashboardContentProps) {
  const renderContent = () => {
    switch (activeTab) {
      case "ai-cleaning":
        return <AICleaningTab searchQuery={searchQuery} />;
      case "manual-cleaning":
        return <ManualCleaningTab />;
      case "analytics":
        return <AnalyticsTab />;
      case "data-sources":
        return <DataSourcesTab />;
      case "settings":
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-white mb-4">Settings</h2>
            <p className="text-white/60">Configure your data cleaning preferences</p>
          </div>
        );
      case "help":
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-white mb-4">Help & Documentation</h2>
            <p className="text-white/60">Learn how to use Sift effectively</p>
          </div>
        );
      default:
        return <AICleaningTab searchQuery={searchQuery} />;
    }
  };

  return (
    <motion.div
      key={activeTab}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-[calc(100vh-200px)]"
    >
      {renderContent()}
    </motion.div>
  );
}
