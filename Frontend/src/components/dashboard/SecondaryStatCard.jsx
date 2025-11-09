import React from "react";
import { motion } from "framer-motion";

const SecondaryStatCard = ({
  title,
  value,
  icon: Icon,
  color,
  isDarkMode,
  delay = 0,
}) => (
  <motion.div
    className={`rounded-xl backdrop-blur-xl border p-4 ${
      isDarkMode ? "border-[#262626]" : "border-[#e5e7eb] shadow-sm"
    }`}
    style={{ background: isDarkMode ? "#171717" : "#ffffff" }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
  >
    <div className="flex items-center gap-3">
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
          isDarkMode ? `${color}-600/20` : `${color}-100`
        }`}
      >
        <Icon
          className={`w-4 h-4 ${
            isDarkMode ? `text-${color}-400` : `text-${color}-600`
          }`}
        />
      </div>
      <div>
        <p
          className={`text-xs ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {title}
        </p>
        <p
          className={`text-lg font-semibold ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  </motion.div>
);

export default SecondaryStatCard;
