import React from "react";

/**
 * Background Effects Component
 * Renders decorative background gradients and blurs
 */
const BackgroundEffects = ({ isDarkMode }) => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div
        className={`absolute inset-0 ${
          isDarkMode
            ? "bg-[radial-gradient(circle_at_30%_40%,rgba(244,114,182,0.1),transparent_50%)]"
            : "bg-[radial-gradient(circle_at_50%_50%,rgba(244,114,182,0.05),transparent_50%)]"
        }`}
      />
      <div
        className={`absolute top-1/4 -left-40 w-80 h-80 rounded-full blur-3xl ${
          isDarkMode ? "bg-pink-400/10" : "bg-pink-400/8"
        }`}
      />
      <div
        className={`absolute top-1/3 -right-40 w-80 h-80 rounded-full blur-3xl ${
          isDarkMode ? "bg-pink-400/10" : "bg-pink-400/8"
        }`}
      />
      <div
        className={`absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-80 h-80 rounded-full blur-3xl ${
          isDarkMode ? "bg-pink-400/10" : "bg-pink-400/8"
        }`}
      />
    </div>
  );
};

export default BackgroundEffects;
