import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import EventCard from "./EventCard";

/**
 * Event Grid Component
 * Displays grid of events with loading skeletons
 */
const EventGrid = ({ events, loading, isDarkMode }) => {
  const skeletons = Array.from({ length: 3 });

  return (
    <div
      className={`rounded-2xl backdrop-blur-xl border p-6 ${
        isDarkMode
          ? "bg-neutral-900/60 border-white/10"
          : "bg-white/80 border-white/30 shadow-lg"
      }`}
    >
      <h2
        className={`text-lg font-semibold mb-4 ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Event List
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {loading &&
            skeletons.map((_, i) => (
              <motion.div
                key={`sk-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`rounded-xl border p-4 h-40 animate-pulse flex flex-col gap-3 ${
                  isDarkMode
                    ? "bg-neutral-800/40 border-white/10"
                    : "bg-white border-gray-200 shadow"
                }`}
              >
                <div className="h-4 w-3/4 rounded bg-gray-400/30" />
                <div className="h-3 w-1/2 rounded bg-gray-400/20" />
                <div className="h-3 w-full rounded bg-gray-400/20" />
                <div className="mt-auto h-6 w-32 rounded bg-gray-400/20" />
              </motion.div>
            ))}

          {!loading &&
            events.map((evt, idx) => (
              <EventCard
                key={evt.id}
                event={evt}
                index={idx}
                isDarkMode={isDarkMode}
              />
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EventGrid;
