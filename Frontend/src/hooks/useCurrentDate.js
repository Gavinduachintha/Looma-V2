import { useState, useEffect } from "react";

/**
 * Custom hook for current date that updates periodically
 * @param {number} refreshInterval - Interval in milliseconds to update date (default: 60000 = 1 minute)
 */
export const useCurrentDate = (refreshInterval = 60000) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), refreshInterval);
    return () => clearInterval(timer);
  }, [refreshInterval]);

  return date;
};
