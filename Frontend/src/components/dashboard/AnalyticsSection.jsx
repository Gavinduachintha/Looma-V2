import React from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { EmailAnalytics } from "../email";

/**
 * Analytics Section Component
 * Displays email analytics when toggled on
 */
const AnalyticsSection = ({
  showAnalytics,
  emails,
  analyticsData,
  isDarkMode,
}) => {
  if (!showAnalytics) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="mb-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp
          className={`w-6 h-6 ${
            isDarkMode ? "text-pink-400" : "text-pink-600"
          }`}
        />
        <h2
          className={`text-2xl font-bold ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Email Analytics
        </h2>
      </div>
      <EmailAnalytics
        emails={emails}
        isDarkMode={isDarkMode}
        analyticsData={analyticsData}
      />
    </motion.div>
  );
};

export default AnalyticsSection;
