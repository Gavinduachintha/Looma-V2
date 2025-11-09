import React from "react";
import { motion } from "framer-motion";
import { CalendarCheck2 } from "lucide-react";
import Button from "../ui/Button";

const UpcomingEventsSection = ({
  upcomingEvents,
  isGoogleAuthenticated,
  isDarkMode,
  navigate,
}) => (
  <motion.div
    className={`w-full rounded-2xl backdrop-blur-xl border p-4 overflow-hidden mb-8 ${
      isDarkMode
        ? "bg-white/5 border-white/20"
        : "bg-white/60 border-white/40 shadow-lg"
    }`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.35 }}
  >
    <div className="flex items-center justify-between mb-2 gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
            isDarkMode ? "bg-pink-600" : "bg-pink-600"
          }`}
        >
          <CalendarCheck2 />
        </div>
        <div className="flex flex-col leading-tight">
          <span
            className={`text-xs font-medium tracking-wide ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Upcoming Events
          </span>
          <span
            className={`text-lg font-semibold -mt-0.5 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {upcomingEvents.length}
          </span>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate("/events")}
        className={`text-[11px] font-medium whitespace-nowrap ${
          isDarkMode ? "text-pink-300" : "text-pink-600"
        }`}
      >
        View all
      </Button>
    </div>
    <ul className="space-y-1 max-h-32 overflow-y-auto pr-1 text-[11.5px] leading-snug custom-scrollbar">
      {!isGoogleAuthenticated && (
        <li
          className={`text-[11px] italic ${
            isDarkMode ? "text-gray-500" : "text-gray-600"
          }`}
        >
          Connect Google to view events.
        </li>
      )}
      {isGoogleAuthenticated &&
        upcomingEvents.slice(0, 3).map((evt) => {
          const dt = evt.start ? new Date(evt.start) : null;
          return (
            <li
              key={evt.id}
              className={`rounded-md px-2.5 py-1.5 border flex flex-col ${
                isDarkMode
                  ? "bg-neutral-800/60 border-white/10 text-gray-200"
                  : "bg-white/80 border-gray-200 text-gray-700"
              }`}
            >
              <span className="font-medium truncate">
                {evt.summary || "(No title)"}
              </span>
              {dt && (
                <span
                  className={`mt-0.5 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {dt.toLocaleDateString()} •{" "}
                  {dt.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              )}
            </li>
          );
        })}
      {isGoogleAuthenticated && upcomingEvents.length === 0 && (
        <li
          className={`text-[11px] italic ${
            isDarkMode ? "text-gray-500" : "text-gray-500"
          }`}
        >
          No events
        </li>
      )}
    </ul>
  </motion.div>
);

export default UpcomingEventsSection;
