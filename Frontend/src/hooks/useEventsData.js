import { useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useCount } from "../context/CountContext";

/**
 * Custom hook for fetching and managing events
 * Handles event list, loading states, and event creation
 */
export const useEventsData = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { refreshCounts } = useCount();

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("http://localhost:3000/upcomingEvents", {
        withCredentials: true,
      });
      setEvents(res.data.events || []);
      refreshCounts();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load events");
    } finally {
      setLoading(false);
    }
  }, [refreshCounts]);

  const handleCreateEvent = useCallback(
    async (eventData) => {
      try {
        await axios.post("http://localhost:3000/addEvent", eventData, {
          withCredentials: true,
        });
        await fetchEvents();
        refreshCounts();
        toast.success("Event created successfully");
        return true;
      } catch (error) {
        console.error("Error creating event:", error);
        toast.error(error?.response?.data?.error || "Failed to create event");
        return false;
      }
    },
    [fetchEvents, refreshCounts]
  );

  return {
    events,
    loading,
    error,
    fetchEvents,
    handleCreateEvent,
  };
};
