import React from "react";
import Navigation from "./Navigation";
import { useTheme } from "../../context/ThemeContext";

const Layout = ({ children }) => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`flex h-screen relative ${
        isDarkMode
          ? "text-white"
          : "bg-gradient-to-br from-pink-50 via-white to-pink-100"
      }`}
      style={{
        background: isDarkMode
          ? "linear-gradient(135deg, #0a0a0a 0%, #0f0f0f 50%, #141414 100%)"
          : undefined,
      }}
    >
      {/* Background Effects */}
      {isDarkMode && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(244,114,182,0.15),transparent_50%)]"></div>
          <div className="absolute top-1/4 -left-40 w-80 h-80 rounded-full blur-3xl bg-pink-400/15"></div>
          <div className="absolute top-1/3 -right-40 w-80 h-80 rounded-full blur-3xl bg-pink-300/15"></div>
          <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-80 h-80 rounded-full blur-3xl bg-pink-400/15"></div>
        </div>
      )}

      <Navigation />
      <main className="flex-1 overflow-auto relative z-10">{children}</main>
    </div>
  );
};

export default Layout;
