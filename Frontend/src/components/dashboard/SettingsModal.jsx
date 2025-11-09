import React from "react";
import { Settings } from "../common";

/**
 * Settings Modal Component
 * Displays settings in a modal overlay
 */
const SettingsModal = ({ isOpen, onClose, isDarkMode }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: isDarkMode ? "#1a1a1a" : "#fff",
          borderRadius: 8,
          minWidth: 320,
          padding: 24,
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            background: "none",
            border: "none",
            fontSize: 20,
            cursor: "pointer",
            color: isDarkMode ? "#fff" : "#000",
          }}
          aria-label="Close settings"
        >
          ×
        </button>
        <Settings />
      </div>
    </div>
  );
};

export default SettingsModal;
