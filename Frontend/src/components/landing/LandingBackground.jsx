import React, { Suspense } from "react";
import Aurora from "../common/Aurora";

/**
 * Landing Page Background Effects Component
 * Displays aurora animation and gradient effects
 */
const LandingBackground = ({ isDarkMode, reducedMotion }) => {
  return (
    <>
      {/* Aurora Background Animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {!reducedMotion && (
          <Suspense fallback={null}>
            <Aurora
              colorStops={
                isDarkMode
                  ? ["#059669", "#10b981", "#34d399"]
                  : ["#d1fae5", "#6ee7b7", "#34d399"]
              }
              blend={isDarkMode ? 0.3 : 0.6}
              amplitude={0.8}
              speed={0.3}
            />
          </Suspense>
        )}
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1]">
        <div
          className={`absolute inset-0 ${
            isDarkMode
              ? "bg-[radial-gradient(circle_at_30%_40%,rgba(236,72,153,0.08),transparent_60%)]"
              : "bg-[radial-gradient(circle_at_50%_50%,rgba(251,207,232,0.4),transparent_70%)]"
          }`}
        />
        <div
          className={`absolute top-1/4 -left-40 w-80 h-80 rounded-full blur-3xl ${
            isDarkMode ? "bg-pink-500/10" : "bg-pink-200/30"
          }`}
        />
        <div
          className={`absolute top-1/3 -right-40 w-80 h-80 rounded-full blur-3xl ${
            isDarkMode ? "bg-pink-400/10" : "bg-pink-200/30"
          }`}
        />
        <div
          className={`absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-80 h-80 rounded-full blur-3xl ${
            isDarkMode ? "bg-pink-400/10" : "bg-pink-300/25"
          }`}
        />
      </div>
    </>
  );
};

export default LandingBackground;
