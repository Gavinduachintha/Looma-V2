import React from "react";
import { motion } from "framer-motion";
import { RefreshCw, Plus } from "lucide-react";
import Button from "../ui/Button";

/**
 * Events Page Header Component
 * Displays event statistics and action buttons
 */
const EventsHeader = ({
  eventCount,
  nextEvent,
  loading,
  error,
  onRefresh,
  onAddEvent,
  isDarkMode,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex-1 rounded-2xl backdrop-blur-xl border p-6 flex flex-col justify-between ${
        isDarkMode
          ? "bg-neutral-900/60 border-white/10"
          : "bg-white/80 border-white/30 shadow-lg"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h1
          className={`text-xl font-semibold tracking-tight ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Upcoming Events
        </h1>
        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="lg"
            onClick={onRefresh}
            loading={loading}
            icon={RefreshCw}
          >
            Refresh
          </Button>
          <Button variant="primary" size="lg" onClick={onAddEvent} icon={Plus}>
            Add Event
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        <div
          className={`flex-1 min-w-[140px] rounded-xl px-4 py-3 border ${
            isDarkMode
              ? "bg-white/5 border-white/10"
              : "bg-white/70 border-white/40 shadow"
          }`}
        >
          <p
            className={`text-xs mb-1 font-medium ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Total Upcoming
          </p>
          <p
            className={`text-2xl font-bold leading-none ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {eventCount}
          </p>
        </div>

        <div
          className={`flex-1 min-w-[140px] rounded-xl px-4 py-3 border ${
            isDarkMode
              ? "bg-white/5 border-white/10"
              : "bg-white/70 border-white/40 shadow"
          }`}
        >
          <p
            className={`text-xs mb-1 font-medium ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Next Event
          </p>
          <p
            className={`text-sm font-semibold line-clamp-2 ${
              isDarkMode ? "text-pink-300" : "text-pink-600"
            }`}
          >
            {nextEvent || "--"}
          </p>
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-xs font-medium mb-2">{error}</p>
      )}
      {!loading && !error && eventCount === 0 && (
        <p
          className={`text-sm ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          No upcoming events found.
        </p>
      )}
    </motion.div>
  );
};

export default EventsHeader;
