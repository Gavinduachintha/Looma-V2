import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useEventsData } from "../hooks";
import { EventsHeader, EventGrid } from "../components/events";
import EventModal from "../components/events/EventModal";

/**
 * Events Page Component (Refactored)
 * Displays upcoming events from Google Calendar
 */
const Events = () => {
  const { isDarkMode } = useTheme();
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  // Events data management
  const { events, loading, error, fetchEvents, handleCreateEvent } =
    useEventsData();

  // Fetch events on mount
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleEventCreated = async (eventData) => {
    const success = await handleCreateEvent(eventData);
    if (success) {
      setIsEventModalOpen(false);
    }
  };

  return (
    <div
      className={`p-6 w-full min-h-screen ${
        isDarkMode ? "bg-neutral-950" : "bg-white"
      }`}
    >
      {/* Header Section */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-stretch">
        <EventsHeader
          eventCount={events.length}
          nextEvent={events[0]?.summary}
          loading={loading}
          error={error}
          onRefresh={fetchEvents}
          onAddEvent={() => setIsEventModalOpen(true)}
          isDarkMode={isDarkMode}
        />
      </div>

      {/* Event Grid */}
      <EventGrid events={events} loading={loading} isDarkMode={isDarkMode} />

      {/* Event Creation Modal */}
      <EventModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        emailData={{}}
        onCreateEvent={handleEventCreated}
      />
    </div>
  );
};

export default Events;
