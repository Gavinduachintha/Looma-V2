import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Custom Hooks
import {
  useCurrentDate,
  useGoogleAuth,
  useDashboardData,
  useEmailOperations,
  useEmailFilters,
} from "../hooks";

// Context
import { useTheme } from "../context/ThemeContext";

// Components
import {
  DashboardHeader,
  BackgroundEffects,
  DashboardStats,
  AnalyticsSection,
  SettingsModal,
} from "../components/dashboard";
import { LatestEmailsSection } from "../components/email";
import { UpcomingEventsSection } from "../components/events";

/**
 * Dashboard Page Component (Refactored)
 * Main dashboard showing email stats, latest emails, upcoming events, and analytics
 */
const Dashboard = () => {
  const navigate = useNavigate();
  const currentDate = useCurrentDate();
  const { isDarkMode, toggleTheme } = useTheme();

  // Google Authentication
  const {
    isGoogleAuthenticated,
    isRefreshing: isGoogleRefreshing,
    handleGoogleAuth,
    fetchUpcomingEvents,
  } = useGoogleAuth();

  // Dashboard Data
  const {
    emails,
    setEmails,
    dashboardStats,
    analyticsData,
    isRefreshing,
    upcomingEvents,
    setUpcomingEvents,
    fetchEmails,
    fetchDashboardStats,
    fetchAnalytics,
    refreshAll,
  } = useDashboardData();

  // Email Operations
  const {
    selectedEmails,
    bulkActionMode,
    setBulkActionMode,
    markAsRead,
    deleteEmail,
    handleBulkMarkAsRead,
    handleBulkDelete,
    toggleEmailSelection,
    selectAllVisibleEmails,
    clearSelection,
  } = useEmailOperations(emails, setEmails);

  // Email Filters
  const {
    emailFilter,
    setEmailFilter,
    emailSort,
    setEmailSort,
    emailSearch,
    setEmailSearch,
    filteredAndSortedEmails,
    latestEmails,
  } = useEmailFilters(emails);

  // Local State
  const [settings, setSettings] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);

  // Initial data fetch
  useEffect(() => {
    fetchEmails();
    fetchDashboardStats();
  }, []);

  // Fetch events when Google is authenticated
  useEffect(() => {
    if (isGoogleAuthenticated) {
      fetchUpcomingEvents().then((events) => setUpcomingEvents(events));
    }
  }, [isGoogleAuthenticated]);

  // Fetch analytics when showAnalytics is toggled on
  useEffect(() => {
    if (showAnalytics && !analyticsData) {
      fetchAnalytics();
    }
  }, [showAnalytics, analyticsData]);

  // Handle refresh
  const handleRefresh = () => {
    refreshAll();
    if (showAnalytics) {
      fetchAnalytics();
    }
    if (isGoogleAuthenticated) {
      fetchUpcomingEvents().then((events) => setUpcomingEvents(events));
    }
  };

  return (
    <div
      className="w-full min-h-screen transition-all duration-500"
      style={{
        background: isDarkMode ? "#0a0a0a" : "#ffffff",
      }}
    >
      <Toaster />

      {/* Custom Scrollbar Styles */}
      <style>
        {`
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: ${
              isDarkMode ? "rgba(255,255,255,0.3)" : "rgba(62,207,142,0.5)"
            } transparent;
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: ${
              isDarkMode ? "rgba(255,255,255,0.3)" : "rgba(62,207,142,0.5)"
            };
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: ${
              isDarkMode ? "rgba(255,255,255,0.5)" : "rgba(62,207,142,0.7)"
            };
          }
        `}
      </style>

      {/* Background Effects */}
      <BackgroundEffects isDarkMode={isDarkMode} />

      {/* Main Content */}
      <div className="relative z-10 p-6">
        {/* Header */}
        <DashboardHeader
          currentDate={currentDate}
          isGoogleAuthenticated={isGoogleAuthenticated}
          showAnalytics={showAnalytics}
          isDarkMode={isDarkMode}
          isRefreshing={isRefreshing || isGoogleRefreshing}
          onGoogleAuth={handleGoogleAuth}
          onToggleAnalytics={() => setShowAnalytics(!showAnalytics)}
          onToggleTheme={toggleTheme}
          onRefresh={handleRefresh}
        />

        {/* Stats Cards */}
        <DashboardStats
          dashboardStats={dashboardStats}
          isDarkMode={isDarkMode}
        />

        {/* Upcoming Events Section */}
        <UpcomingEventsSection
          upcomingEvents={upcomingEvents}
          isGoogleAuthenticated={isGoogleAuthenticated}
          isDarkMode={isDarkMode}
          navigate={navigate}
        />

        {/* Analytics Section */}
        <AnalyticsSection
          showAnalytics={showAnalytics}
          emails={emails}
          analyticsData={analyticsData}
          isDarkMode={isDarkMode}
        />

        {/* Latest Emails Section */}
        <LatestEmailsSection
          isDarkMode={isDarkMode}
          latestEmails={latestEmails}
          filteredAndSortedEmails={filteredAndSortedEmails}
          emailSearch={emailSearch}
          setEmailSearch={setEmailSearch}
          emailFilter={emailFilter}
          setEmailFilter={setEmailFilter}
          emailSort={emailSort}
          setEmailSort={setEmailSort}
          selectedEmails={selectedEmails}
          bulkActionMode={bulkActionMode}
          setBulkActionMode={setBulkActionMode}
          selectAllVisibleEmails={() => selectAllVisibleEmails(latestEmails)}
          handleBulkMarkAsRead={handleBulkMarkAsRead}
          handleBulkDelete={handleBulkDelete}
          clearSelection={clearSelection}
          isRefreshing={isRefreshing}
          markAsRead={markAsRead}
          deleteEmail={deleteEmail}
          toggleEmailSelection={toggleEmailSelection}
          navigate={navigate}
        />
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={settings}
        onClose={() => setSettings(false)}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default Dashboard;
