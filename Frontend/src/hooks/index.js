// Export all custom hooks from a single entry point

// Dashboard hooks
export { useAuth } from "./useAuth";
export { useGoogleAuth } from "./useGoogleAuth";
export { useDashboardData } from "./useDashboardData";
export { useEmailOperations } from "./useEmailOperations";
export { useEmailFilters } from "./useEmailFilters";
export { useCurrentDate } from "./useCurrentDate";

// Emails page hooks
export { useEmailsData } from "./useEmailsData";
export { useEmailList } from "./useEmailList";
export { useEmailEvents } from "./useEmailEvents";

// Events page hooks
export { useEventsData } from "./useEventsData";

// Landing page hooks
export { useLandingNavigation } from "./useLandingNavigation";
export { useReducedMotion } from "./useReducedMotion";
export { useLandingFeatures } from "./useLandingFeatures.jsx";
