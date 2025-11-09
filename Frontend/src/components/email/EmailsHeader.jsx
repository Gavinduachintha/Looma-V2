import React from "react";
import { motion } from "framer-motion";
import { RefreshCw, Sparkles } from "lucide-react";
import Button from "../ui/Button";

/**
 * Emails Page Header Component
 * Displays title, count, search, and action buttons
 */
const EmailsHeader = ({
  emailCount,
  search,
  setSearch,
  setPage,
  isRefreshing,
  onRefresh,
  onSummarize,
  isDarkMode,
}) => {
  return (
    <motion.div
      initial={{ y: -15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between rounded-xl backdrop-blur-xl border px-4 py-3 ${
        isDarkMode
          ? "bg-neutral-900/60 border-white/10"
          : "bg-white/80 border-gray-200 shadow"
      }`}
    >
      <div className="flex gap-3 items-center">
        <h1
          className={`text-xl font-semibold ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Emails :
        </h1>
        <span
          className={`text-xl font-semibold ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {emailCount}
        </span>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
        <div
          className={`flex items-center gap-2 px-3 py-2 rounded-xl border w-full sm:w-72 ${
            isDarkMode
              ? "bg-white/10 border-white/20"
              : "bg-white border-gray-300"
          }`}
        >
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search emails..."
            className={`bg-transparent outline-none text-sm flex-1 ${
              isDarkMode
                ? "text-white placeholder:text-gray-400"
                : "text-gray-800 placeholder:text-gray-500"
            }`}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="text-xs opacity-60 hover:opacity-100"
            >
              ✕
            </button>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="primary"
            size="lg"
            onClick={onRefresh}
            loading={isRefreshing}
            icon={RefreshCw}
          >
            Refresh
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={onSummarize}
            disabled={isRefreshing}
            icon={Sparkles}
          >
            Summarize
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default EmailsHeader;
