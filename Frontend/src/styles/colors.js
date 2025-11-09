// Looma Color System - Pink & Seamless Theme
// Pink color palette for light mode, seamless dark for dark mode

export const colors = {
  // Brand Colors - Pink Theme
  brand: {
    // Pink - Primary brand color
    50: "#fdf2f8",
    100: "#fce7f3",
    200: "#fbcfe8",
    300: "#f9a8d4",
    400: "#f472b6",
    500: "#ec4899", // Primary pink
    600: "#db2777",
    700: "#be185d",
    800: "#9d174d",
    900: "#831843",
  },

  // Supabase Grays for backgrounds and text
  gray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
  },

  // Supabase Dark Theme Colors - Exact Match from Screenshots
  dark: {
    background: "#0a0a0a", // Almost pure black like Supabase
    surface: "#171717", // Very dark gray for cards
    border: "#262626", // Subtle borders
    lighter: "#404040", // Hover states
    overlay: "#000000", // Pure black for overlays
  },

  // Semantic colors
  semantic: {
    success: "#ec4899",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6",
  },

  // Theme configurations - Pink & Seamless style
  themes: {
    light: {
      // Backgrounds
      background: {
        primary: "#ffffff", // Pure white
        secondary: "#fdf2f8", // Light pink
        tertiary: "#fce7f3", // Slightly darker pink
        surface: "#ffffff", // Card surfaces
        elevated: "#ffffff", // Elevated surfaces
      },
      // Text colors
      text: {
        primary: "#1f2937", // Dark gray for primary text
        secondary: "#4b5563", // Medium gray for secondary text
        tertiary: "#6b7280", // Light gray for tertiary text
        inverse: "#ffffff", // White text for dark backgrounds
        accent: "#ec4899", // Pink for accents
      },
      // Borders and dividers
      border: {
        primary: "#fbcfe8", // Light pink border
        secondary: "#f9a8d4", // Slightly darker pink border
        accent: "#ec4899", // Pink border for focus states
      },
      // Interactive elements
      interactive: {
        primary: "#ec4899", // Pink
        secondary: "#fce7f3", // Light pink
        hover: "#db2777", // Darker pink
        active: "#be185d", // Even darker pink
      },
    },
    dark: {
      // Backgrounds - Seamless Dark Theme
      background: {
        primary: "#0a0a0a", // Almost pure black main background
        secondary: "#0f0f0f", // Slightly lighter dark
        tertiary: "#141414", // Card backgrounds
        surface: "#0f0f0f", // Card surfaces
        elevated: "#141414", // Elevated surfaces
      },
      // Text colors - High contrast
      text: {
        primary: "#ffffff", // Pure white primary text
        secondary: "#a1a1a1", // Light gray text
        tertiary: "#666666", // Muted gray text
        inverse: "#1f2937", // Dark text for light backgrounds
        accent: "#f472b6", // Lighter pink for dark mode
      },
      // Borders and dividers - Seamless Dark
      border: {
        primary: "#1a1a1a", // Very subtle borders
        secondary: "#252525", // Slightly lighter borders
        accent: "#f472b6", // Pink border for focus
      },
      // Interactive elements - Seamless Dark Theme
      interactive: {
        primary: "#f472b6", // Pink
        secondary: "#141414", // Very dark interactive
        hover: "#ec4899", // Hover pink
        active: "#db2777", // Active pink
      },
    },
  },

  // Button variants - Pink & Seamless style
  buttons: {
    primary: {
      light: {
        background: "#ec4899",
        backgroundHover: "#db2777",
        backgroundActive: "#be185d",
        text: "#ffffff",
        border: "#ec4899",
      },
      dark: {
        background: "#f472b6",
        backgroundHover: "#ec4899",
        backgroundActive: "#db2777",
        text: "#0a0a0a",
        border: "#f472b6",
      },
    },
    secondary: {
      light: {
        background: "#fce7f3",
        backgroundHover: "#fbcfe8",
        backgroundActive: "#f9a8d4",
        text: "#1f2937",
        border: "#fbcfe8",
      },
      dark: {
        background: "#141414",
        backgroundHover: "#1a1a1a",
        backgroundActive: "#252525",
        text: "#ffffff",
        border: "#1a1a1a",
      },
    },
    outline: {
      light: {
        background: "transparent",
        backgroundHover: "#fdf2f8",
        backgroundActive: "#fce7f3",
        text: "#ec4899",
        border: "#ec4899",
      },
      dark: {
        background: "transparent",
        backgroundHover: "rgba(244, 114, 182, 0.1)",
        backgroundActive: "rgba(244, 114, 182, 0.2)",
        text: "#f472b6",
        border: "#f472b6",
      },
    },
    ghost: {
      light: {
        background: "transparent",
        backgroundHover: "#fce7f3",
        backgroundActive: "#fbcfe8",
        text: "#1f2937",
        border: "transparent",
      },
      dark: {
        background: "transparent",
        backgroundHover: "#141414",
        backgroundActive: "#1a1a1a",
        text: "#ffffff",
        border: "transparent",
      },
    },
  },
};

// Utility functions for theme management
export const getTheme = (isDarkMode) => {
  return isDarkMode ? colors.themes.dark : colors.themes.light;
};

export const getButtonStyles = (variant, isDarkMode) => {
  const buttonVariant = colors.buttons[variant] || colors.buttons.primary;
  return isDarkMode ? buttonVariant.dark : buttonVariant.light;
};

export const getSemanticColor = (type, isDarkMode) => {
  return colors.semantic[type];
};

// Supabase-style component styles
export const supabaseStyles = {
  card: (isDarkMode) => ({
    background: isDarkMode
      ? colors.themes.dark.background.surface
      : colors.themes.light.background.surface,
    border: `1px solid ${
      isDarkMode
        ? colors.themes.dark.border.primary
        : colors.themes.light.border.primary
    }`,
    borderRadius: "8px",
    boxShadow: isDarkMode
      ? "0 1px 3px 0 rgba(0, 0, 0, 0.3)"
      : "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  }),

  input: (isDarkMode) => ({
    background: isDarkMode
      ? colors.themes.dark.background.tertiary
      : colors.themes.light.background.primary,
    border: `1px solid ${
      isDarkMode
        ? colors.themes.dark.border.primary
        : colors.themes.light.border.primary
    }`,
    color: isDarkMode
      ? colors.themes.dark.text.primary
      : colors.themes.light.text.primary,
    borderRadius: "6px",
    focusBorderColor: colors.brand[500],
    focusRingColor: `${colors.brand[500]}40`,
  }),
};
