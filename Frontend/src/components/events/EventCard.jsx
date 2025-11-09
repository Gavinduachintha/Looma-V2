import React from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Event Card Component
 * Displays individual event information
 */
const EventCard = ({ event, index, isDarkMode }) => {
  const start = event.start ? new Date(event.start) : null;
  const end = event.end ? new Date(event.end) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.04 }}
      className={`rounded-xl border p-4 flex flex-col group hover:shadow-xl transition-shadow ${
        isDarkMode
          ? "bg-neutral-800/60 border-white/10 hover:bg-neutral-800/80"
          : "bg-white border-gray-200 shadow hover:shadow-pink-100"
      }`}
    >
      <h3
        className={`font-semibold mb-1 line-clamp-2 leading-snug ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
        title={event.summary}
      >
        {event.summary}
      </h3>

      <p
        className={`text-[11px] mb-2 ${
          isDarkMode ? "text-gray-400" : "text-gray-500"
        }`}
      >
        {start ? start.toLocaleDateString() : ""}
        {start && " • "}
        {start
          ? start.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : ""}
        {end
          ? ` - ${new Date(end).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}`
          : ""}
      </p>

      {event.location && (
        <p
          className={`text-xs mb-3 line-clamp-2 ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
          title={event.location}
        >
          {event.location}
        </p>
      )}

      <div className="mt-auto flex gap-2">
        {event.htmlLink && (
          <a
            href={event.htmlLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-[11px] px-3 py-1.5 rounded-full font-medium transition-all border flex items-center gap-1 ${
              isDarkMode
                ? "bg-pink-500/20 border-pink-400/30 text-pink-200 hover:bg-pink-500/30"
                : "bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100"
            }`}
          >
            View
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default EventCard;
