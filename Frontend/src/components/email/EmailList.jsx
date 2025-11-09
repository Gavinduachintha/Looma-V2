import React from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Email List Component
 * Displays paginated list of emails with selection
 */
const EmailList = ({
  emails,
  selectedId,
  onSelectEmail,
  page,
  totalPages,
  onPageChange,
  isDarkMode,
}) => {
  const parseSender = (from) => {
    if (!from) return { name: "Unknown", email: "" };

    const match = from.match(/^(.*?)\s*<([^>]+)>$/);
    if (match) {
      return {
        name: match[1].trim(),
        email: match[2].trim(),
      };
    } else if (from.includes("@")) {
      const localName = from
        .split("@")[0]
        .replace(/[._-]+/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
      return {
        name: localName,
        email: from.trim(),
      };
    }
    return { name: from, email: "" };
  };

  return (
    <div className="lg:w-80 xl:w-100 border-b lg:border-b-0 lg:border-r border-white/10 dark:border-white/10 flex flex-col min-h-0">
      <div
        className={`px-4 py-2 text-xs uppercase tracking-wide font-medium ${
          isDarkMode ? "text-gray-400" : "text-gray-500"
        }`}
      >
        Messages
      </div>
      <div
        className={`flex-1 overflow-y-auto ${
          isDarkMode ? "custom-scrollbar-dark" : "custom-scrollbar-light"
        }`}
        style={{ maxHeight: "100%" }}
      >
        {emails.length === 0 && (
          <div className="p-6 text-sm opacity-70">No emails</div>
        )}
        <ul className="divide-y divide-white/5 dark:divide-white/5">
          <AnimatePresence initial={false}>
            {emails.map((email) => {
              const isActive = email.email_id === selectedId;
              const sender = parseSender(email.from);

              return (
                <motion.li
                  key={email.email_id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <button
                    onClick={() => onSelectEmail(email.email_id)}
                    className={`w-full text-left px-4 py-3 flex flex-col gap-1 group transition-all ${
                      isActive
                        ? isDarkMode
                          ? "bg-pink-600/20"
                          : "bg-pink-50"
                        : isDarkMode
                        ? "hover:bg-white/5"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <span
                          className={`block text-[11px] font-semibold truncate ${
                            isDarkMode ? "text-pink-300" : "text-pink-700"
                          }`}
                        >
                          {sender.name}
                        </span>
                        {sender.email && (
                          <span
                            className={`block text-[10px] truncate ${
                              isDarkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            {sender.email}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] opacity-60 shrink-0">
                        {email.date
                          ? new Date(email.date).toLocaleDateString()
                          : ""}
                      </span>
                    </div>
                    <div
                      className={`text-sm font-semibold truncate ${
                        isDarkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {email.subject || "(No subject)"}
                    </div>
                    <div
                      className={`text-xs line-clamp-2 ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {email.summary || email.snippet || ""}
                    </div>
                    {!email.read && (
                      <span className="mt-1 inline-block w-2 h-2 rounded-full bg-pink-400" />
                    )}
                  </button>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-2 flex items-center justify-between text-xs">
          <button
            onClick={() => onPageChange(Math.max(1, page - 1))}
            disabled={page === 1}
            className="px-2 py-1 rounded disabled:opacity-40 hover:bg-white/10"
          >
            Prev
          </button>
          <span className="opacity-70">
            {page}/{totalPages}
          </span>
          <button
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="px-2 py-1 rounded disabled:opacity-40 hover:bg-white/10"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default EmailList;
