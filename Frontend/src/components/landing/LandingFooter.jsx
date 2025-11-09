import React from "react";

/**
 * Landing Page Footer Component
 * Displays logo and copyright information
 */
const LandingFooter = ({ isDarkMode }) => {
  return (
    <footer className="relative z-20 py-12" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <span className="font-bold text-lg text-white">L</span>
            </div>
            <span
              className={`text-xl font-bold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Looma
            </span>
          </div>

          <div
            className={`text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            © 2024 Looma. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
