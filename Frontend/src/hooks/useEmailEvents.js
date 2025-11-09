import { useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";

/**
 * Custom hook for event creation from emails
 * Handles event modal state and event creation API call
 */
export const useEmailEvents = () => {
  const [showEventModal, setShowEventModal] = useState(false);

  const handleCreateEvent = useCallback(async (eventData) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/addEvent",
        eventData,
        { withCredentials: true }
      );
      toast.success("Event created");
      setShowEventModal(false);
      return res.data;
    } catch (error) {
      console.error("Add event failed", error?.response?.data || error.message);
      toast.error(error?.response?.data?.error || "Failed to create event");
      throw error;
    }
  }, []);

  return {
    showEventModal,
    setShowEventModal,
    handleCreateEvent,
  };
};
