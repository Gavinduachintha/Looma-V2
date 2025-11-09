import { useState, useEffect } from "react";

/**
 * Custom hook to detect if user prefers reduced motion
 * Respects accessibility preferences for animations
 */
export const useReducedMotion = () => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setReducedMotion(mq.matches);

    handleChange();
    mq.addEventListener("change", handleChange);

    return () => mq.removeEventListener("change", handleChange);
  }, []);

  return reducedMotion;
};
