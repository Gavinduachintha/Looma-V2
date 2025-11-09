import React from "react";
import { motion } from "framer-motion";
import {
  Sun,
  Moon,
  SquareArrowOutUpRight,
  BarChart3,
  RefreshCw,
} from "lucide-react";
import { Button } from "../ui";

/**
 * Dashboard Header Component
 * Displays current date and action buttons
 */
const DashboardHeader = ({
  currentDate,
  isGoogleAuthenticated,
  showAnalytics,
  isDarkMode,
  isRefreshing,
  onGoogleAuth,
  onToggleAnalytics,
  onToggleTheme,
  onRefresh,
}) => {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-transparent mb-6"
    >
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between px-6 py-4 gap-4">
        {/* Left: Current Date */}
        <div className="flex items-center gap-3 min-w-[120px]">
          <span
            className={`text-sm font-medium ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {currentDate.toLocaleDateString(undefined, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        {/* Spacer to push actions right */}
        <div className="flex-1 hidden lg:block" />

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {!isGoogleAuthenticated && (
            <Button
              variant="outline"
              size="lg"
              onClick={onGoogleAuth}
              icon={SquareArrowOutUpRight}
              className="hover:bg-pink-500/50 hover:text-white transition-colors duration-200"
            >
              Connect Google
            </Button>
          )}
          <Button
            variant={showAnalytics ? "primary" : "outline"}
            size="lg"
            onClick={onToggleAnalytics}
            icon={BarChart3}
          >
            Analytics
          </Button>
          <Button
            variant="theme"
            size="icon"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            icon={isDarkMode ? Sun : Moon}
          />
          <Button
            variant="primary"
            size="lg"
            onClick={onRefresh}
            loading={isRefreshing}
            icon={RefreshCw}
          >
            Refresh
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardHeader;
