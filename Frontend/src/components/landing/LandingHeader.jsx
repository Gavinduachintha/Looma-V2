import React from "react";
import { motion } from "framer-motion";
import { Github } from "lucide-react";
import Button from "../ui/Button";

/**
 * Landing Page Header Component
 * Displays logo, navigation, and action buttons
 */
const LandingHeader = ({
  isDarkMode,
  toggleTheme,
  onDashboardClick,
  onSigninClick,
  onSignupClick,
}) => {
  return (
    <header className="relative z-20 pt-6" role="banner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-transparent"
        >
          <div className="flex justify-between items-center py-4 px-6 md:justify-start md:space-x-10">
            {/* Logo */}
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <motion.div
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-lg ${
                    isDarkMode ? "bg-pink-600" : "bg-pink-500"
                  }`}
                >
                  <span className="font-bold text-lg text-white">L</span>
                </div>
                <span
                  className={`font-bold text-xl ${
                    isDarkMode ? "text-pink-300" : "text-pink-800"
                  }`}
                >
                  Looma
                </span>
              </motion.div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 space-x-4">
              {/* Theme Toggle */}
              <Button
                onClick={toggleTheme}
                aria-label="Toggle color theme"
                aria-pressed={isDarkMode}
                className={`p-2 rounded-xl ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
                size="icon"
              >
                {isDarkMode ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </Button>

              {/* GitHub Icon */}
              <a
                href="https://github.com/Gavinduachintha/Looma"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg ${
                  isDarkMode
                    ? "text-white hover:bg-neutral-800"
                    : "text-black hover:bg-gray-100"
                }`}
                title="View Looma on GitHub"
                aria-label="View Looma repository on GitHub"
              >
                <Github className="w-6 h-6" />
              </a>

              <Button
                onClick={onDashboardClick}
                aria-label="Go to dashboard"
                className={`rounded-xl font-bold px-5 py-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-400/60 ${
                  isDarkMode
                    ? "bg-black text-white hover:bg-neutral-800 border border-gray-700 shadow-lg"
                    : "bg-white text-black hover:bg-gray-200 border border-gray-400 shadow-lg"
                }`}
              >
                Dashboard
              </Button>

              <Button
                onClick={onSigninClick}
                aria-label="Sign in"
                className={`rounded-xl font-bold px-5 py-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-400/60 ${
                  isDarkMode
                    ? "bg-black text-white hover:bg-neutral-800 border border-gray-700 shadow-lg"
                    : "bg-white text-black hover:bg-gray-200 border border-gray-400 shadow-lg"
                }`}
              >
                Sign In
              </Button>

              <Button
                onClick={onSignupClick}
                aria-label="Get started free"
                className={`rounded-xl font-bold px-5 py-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-400/60 ${
                  isDarkMode
                    ? "bg-black text-white hover:bg-neutral-800 border border-gray-700 shadow-lg"
                    : "bg-white text-black hover:bg-gray-200 border border-gray-400 shadow-lg"
                }`}
              >
                Get Started
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <Button
                onClick={toggleTheme}
                className={`p-2 rounded-xl ${
                  isDarkMode ? "text-pink-300" : "text-pink-600"
                }`}
                aria-label="Toggle color theme"
                aria-pressed={isDarkMode}
              >
                {isDarkMode ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </Button>
              <Button
                onClick={onSignupClick}
                className={`rounded-xl font-semibold text-sm ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
                aria-label="Start free trial"
              >
                Start
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default LandingHeader;
