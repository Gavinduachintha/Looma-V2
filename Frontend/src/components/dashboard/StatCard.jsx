// filepath: c:\Users\Asus\Desktop\codes\Looma\Frontend\src\components\StatCard.jsx
import React from "react";
import { motion } from "framer-motion";

const StatCard = ({
  title,
  value,
  icon: Icon,
  color,
  isDarkMode,
  onClick,
  badge,
  delay = 0,
  showBadge = true,
}) => (
  <motion.div
    className={`rounded-2xl backdrop-blur-xl border p-6 cursor-pointer transition-all duration-300 ${
      isDarkMode
        ? "border-[#262626] hover:border-emerald-500/50"
        : "border-[#e5e7eb] shadow-sm hover:shadow-lg hover:border-emerald-500/50"
    }`}
    style={{ background: isDarkMode ? "#171717" : "#ffffff" }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{ y: -2, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            isDarkMode ? `${color}-600` : `${color}-500`
          }`}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="ml-4">
          <p
            className={`text-sm font-medium ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {title}
          </p>
          <p
            className={`text-2xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {value}
          </p>
        </div>
      </div>
      {showBadge && badge && (
        <div
          className={`text-xs px-2 py-1 rounded-full ${
            badge.condition
              ? isDarkMode
                ? "bg-red-900/30 text-red-400"
                : "bg-red-100 text-red-600"
              : isDarkMode
              ? "bg-green-900/30 text-green-400"
              : "bg-green-100 text-green-600"
          }`}
        >
          {badge.text}
        </div>
      )}
    </div>
  </motion.div>
);

export default StatCard;