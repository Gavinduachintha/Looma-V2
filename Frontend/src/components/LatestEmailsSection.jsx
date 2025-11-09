import React from "react";
import { motion } from "framer-motion";
import Button from "../components/ui/Button";
import SkeletonCard from "../components/SkeletonCard";
import EmailCard from "../components/EmailCard";

const LatestEmailsSection = ({
  isDarkMode,
  latestEmails,
  filteredAndSortedEmails,
  emailSearch,
  setEmailSearch,
  emailFilter,
  setEmailFilter,
  emailSort,
  setEmailSort,
  selectedEmails,
  bulkActionMode,
  setBulkActionMode,
  selectAllVisibleEmails,
  handleBulkMarkAsRead,
  handleBulkDelete,
  clearSelection,
  isRefreshing,
  markAsRead,
  deleteEmail,
  toggleEmailSelection,
  navigate,
}) => (
  <motion.div
    className={`rounded-xl backdrop-blur-xl border overflow-hidden ${
      isDarkMode
        ? "bg-white/5 border-white/20"
        : "bg-white/60 border-white/40 shadow-lg"
    }`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
  >
    <div className="p-6">
      <div className="flex flex-col gap-4 mb-4">
        {/* Header Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3
              className={`text-lg font-semibold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Latest Emails
            </h3>
            <span
              className={`text-sm px-2 py-1 rounded-full ${
                isDarkMode
                  ? "bg-gray-700 text-gray-300"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {latestEmails.length} of {filteredAndSortedEmails.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => window.open("mailto:", "_blank")}
              className="text-xs"
            >
              ✉️ Compose
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/emails")}
              className={`text-xs font-medium ${
                isDarkMode ? "text-pink-300" : "text-pink-600"
              }`}
            >
              Open Inbox
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search emails by subject, sender, or content..."
            value={emailSearch}
            onChange={(e) => setEmailSearch(e.target.value)}
            className={`w-full px-4 py-2 pl-10 text-sm rounded-lg border transition-all ${
              isDarkMode
                ? "bg-gray-800 border-gray-600 text-gray-300 placeholder-gray-500 focus:border-pink-500"
                : "bg-white border-gray-300 text-gray-700 placeholder-gray-400 focus:border-pink-500"
            } focus:outline-none focus:ring-2 focus:ring-emerald-500/20`}
          />
          <svg
            className={`absolute left-3 top-2.5 w-4 h-4 ${
              isDarkMode ? "text-gray-500" : "text-gray-400"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {emailSearch && (
            <button
              onClick={() => setEmailSearch("")}
              className={`absolute right-3 top-2.5 w-4 h-4 ${
                isDarkMode
                  ? "text-gray-500 hover:text-gray-300"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter and Sort Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-medium ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Filter:
            </span>
            <div className="flex gap-1">
              {[
                { key: "all", label: "All" },
                { key: "unread", label: "Unread" },
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setEmailFilter(filter.key)}
                  className={`text-xs px-3 py-1 rounded-full transition-all duration-200 ${
                    emailFilter === filter.key
                      ? isDarkMode
                        ? "bg-pink-600 text-white"
                        : "bg-pink-500 text-white"
                      : isDarkMode
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-medium ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Sort:
            </span>
            <select
              value={emailSort}
              onChange={(e) => setEmailSort(e.target.value)}
              className={`text-xs px-2 py-1 rounded border ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-gray-300"
                  : "bg-white border-gray-300 text-gray-700"
              }`}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="unread-first">Unread First</option>
            </select>
          </div>
        </div>

        {/* Bulk Actions Toolbar */}
        {selectedEmails.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-center justify-between p-3 rounded-lg border ${
              isDarkMode
                ? "bg-gray-800 border-gray-600"
                : "bg-blue-50 border-blue-200"
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`text-sm font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {selectedEmails.length} email
                {selectedEmails.length !== 1 ? "s" : ""} selected
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={selectAllVisibleEmails}
                className="text-xs"
              >
                Select All ({latestEmails.length})
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleBulkMarkAsRead}
                className="text-xs"
              >
                📧 Mark Read
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleBulkDelete}
                className="text-xs text-red-600"
              >
                🗑️ Delete
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSelection}
                className="text-xs"
              >
                ✕ Clear
              </Button>
            </div>
          </motion.div>
        )}
      </div>
      {isRefreshing && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[600px]">
          {[...Array(12)].map((_, i) => (
            <SkeletonCard key={i} isDarkMode={isDarkMode} compact />
          ))}
        </div>
      )}
      {!isRefreshing && latestEmails.length === 0 && (
        <div className="text-sm opacity-70 py-4">No emails yet.</div>
      )}
      {!isRefreshing && latestEmails.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {latestEmails.map((email) => (
            <div key={email.email_id} className="relative group">
              {/* Selection Checkbox */}
              <div className="absolute top-2 left-2 z-10">
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity:
                      selectedEmails.includes(email.email_id) || bulkActionMode
                        ? 1
                        : 0,
                    scale:
                      selectedEmails.includes(email.email_id) || bulkActionMode
                        ? 1
                        : 0.8,
                  }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleEmailSelection(email.email_id);
                    setBulkActionMode(true);
                  }}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                    selectedEmails.includes(email.email_id)
                      ? "bg-pink-500 border-pink-500"
                      : isDarkMode
                      ? "border-gray-500 bg-gray-800 hover:border-gray-400"
                      : "border-gray-400 bg-white hover:border-gray-500"
                  }`}
                >
                  {selectedEmails.includes(email.email_id) && (
                    <svg
                      className="w-3 h-3 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </motion.button>
              </div>

              {/* Email Status Indicators */}
              <div className="absolute bottom-2 left-2 z-10 flex gap-1">
                {(email.subject?.toLowerCase().includes("urgent") ||
                  email.subject?.toLowerCase().includes("important") ||
                  email.subject?.toLowerCase().includes("asap")) && (
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      isDarkMode
                        ? "bg-red-600 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    Priority
                  </span>
                )}
              </div>

              <EmailCard
                email={email}
                onMarkAsRead={markAsRead}
                onDelete={deleteEmail}
                isDarkMode={isDarkMode}
                compact
                isSelected={selectedEmails.includes(email.email_id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  </motion.div>
);

export default LatestEmailsSection;
