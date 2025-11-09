import React from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";

/**
 * Landing Page CTA Section Component
 * Displays call-to-action banner
 */
const CTASection = ({ isDarkMode, onSignupClick }) => {
  return (
    <section className="relative z-20 py-24" aria-labelledby="cta-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`p-12 rounded-3xl backdrop-blur-xl border ${
            isDarkMode
              ? "bg-white/5 border-white/20"
              : "bg-white/60 border-white/40 shadow-2xl"
          }`}
        >
          <h2
            id="cta-heading"
            className={`text-4xl md:text-5xl font-bold mb-6 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Ready to Transform Your Email Experience?
          </h2>
          <p
            className={`text-xl mb-8 ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Join thousands of professionals who have revolutionized their email
            workflow with Looma
          </p>
          <Button
            onClick={onSignupClick}
            className={`px-10 py-4 rounded-2xl font-semibold text-lg shadow-2xl ${
              isDarkMode
                ? "bg-[#3ecf8e] text-[#0a0a0a] hover:bg-[#16a34a]"
                : "bg-[#5cec98] text-green-900 hover:bg-[#bbf7d0]"
            }`}
          >
            Start Your With Looma
          </Button>
        </motion.div>
      </div>
      <div className="flex flex-col items-center justify-center mt-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className={`text-xl mb-8 ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Made with <span className="font-semibold">KIRO IDE</span>
        </motion.p>
      </div>
    </section>
  );
};

export default CTASection;
