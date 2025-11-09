import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useEmailsData, useEmailList, useEmailEvents } from "../hooks";
import { EmailsHeader, EmailList, EmailDetail } from "../components/email";
import EventModal from "../components/events/EventModal";

/**
 * Emails Page Component (Refactored)
 * Full email list with search, pagination, and detail view
 */
const Emails = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  // Email data management
  const {
    emails,
    isRefreshing,
    fetchError,
    fetchEmails,
    handleNewSummary,
    markAsRead,
    deleteEmail,
  } = useEmailsData();

  // List management (pagination, search, selection)
  const {
    selectedId,
    setSelectedId,
    search,
    setSearch,
    page,
    setPage,
    totalPages,
    pageSlice,
    activeEmail,
    autoSelectFirst,
  } = useEmailList(emails);

  // Event creation
  const { showEventModal, setShowEventModal, handleCreateEvent } =
    useEmailEvents();

  // Auth check
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) navigate("/signin");
    fetchEmails().then((list) => autoSelectFirst(list));
  }, []); // eslint-disable-line

  return (
    <>
      <div
        className={`w-full min-h-screen px-2 md:px-4 lg:px-6 py-3 md:py-4 flex flex-col ${
          isDarkMode ? "bg-neutral-950" : "bg-white"
        }`}
      >
        <div className="w-full flex flex-col gap-2 flex-1 min-h-0">
          {/* Error Message */}
          {fetchError && (
            <div className="mb-2 p-3 rounded-lg bg-red-100 text-red-700 border border-red-300 text-center text-sm">
              {fetchError}
            </div>
          )}

          {/* Header with Actions */}
          <EmailsHeader
            emailCount={emails.length}
            search={search}
            setSearch={setSearch}
            setPage={setPage}
            isRefreshing={isRefreshing}
            onRefresh={() => fetchEmails()}
            onSummarize={handleNewSummary}
            isDarkMode={isDarkMode}
          />

          {/* Main Two-Pane Layout */}
          <div
            className={`flex flex-col lg:flex-row gap-3 flex-1 min-h-0 h-full rounded-xl backdrop-blur-xl border overflow-hidden ${
              isDarkMode
                ? "bg-neutral-900/60 border-white/10"
                : "bg-white/80 border-gray-200 shadow"
            }`}
            style={{
              maxHeight: "calc(109vh - 170px)",
            }}
          >
            {/* Email List */}
            <EmailList
              emails={pageSlice}
              selectedId={selectedId}
              onSelectEmail={setSelectedId}
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
              isDarkMode={isDarkMode}
            />

            {/* Email Detail */}
            <EmailDetail
              email={activeEmail}
              onMarkAsRead={markAsRead}
              onDelete={deleteEmail}
              onAddEvent={() => setShowEventModal(true)}
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      </div>

      {/* Event Creation Modal */}
      <EventModal
        isOpen={showEventModal}
        onClose={() => setShowEventModal(false)}
        emailData={{
          subject: activeEmail?.subject || "",
          summary: activeEmail?.summary || "",
          from: activeEmail?.from_email || activeEmail?.from || "",
          date: activeEmail?.date,
        }}
        onCreateEvent={handleCreateEvent}
      />
    </>
  );
};

export default Emails;
