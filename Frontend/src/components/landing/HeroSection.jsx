import React from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";

/**
 * Landing Page Hero Section Component
 * Displays main headline, description, and CTA buttons
 */
const HeroSection = ({ isDarkMode, reducedMotion, onSignupClick }) => {
  return (
    <section className="pt-20 pb-32 text-center" aria-labelledby="hero-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1
              id="hero-heading"
              className={`text-5xl md:text-7xl font-bold leading-tight ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Transform Your{" "}
              <span
                className={`bg-gradient-to-r ${
                  isDarkMode
                    ? "from-green-300 to-emerald-400"
                    : "from-green-600 to-emerald-600"
                } bg-clip-text text-transparent`}
              >
                Email
              </span>{" "}
              Workflow
            </h1>
            <p
              className={`text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Get instant AI-powered summaries, insights, and analytics from
              your email data. Save hours every day with intelligent email
              processing.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
          >
            <Button
              onClick={onSignupClick}
              className={`px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl focus:outline-none focus:ring-2 focus:ring-green-400/60 ${
                isDarkMode
                  ? "bg-[#3ecf8e] text-[#0a0a0a] hover:bg-[#16a34a]"
                  : "bg-[#f9a8d4] text-pink-900 hover:bg-[#fbcfe8]"
              }`}
            >
              Start Free Trial
            </Button>

            <Button
              className={`px-8 py-4 rounded-2xl font-semibold text-lg border backdrop-blur-sm shadow-lg ${
                isDarkMode
                  ? "border-pink-400/30 text-pink-200 hover:bg-pink-800/30 bg-pink-900/20"
                  : "border-green-300 text-green-900 hover:bg-green-800/30 bg-white/60"
              }`}
            >
              Watch Demo
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className={`text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            ✨ Easy implementation • 🚀 Setup in 2 minutes • 🔒 Enterprise-grade
            security
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
