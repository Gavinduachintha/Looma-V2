// // import React from "react";
import { useNavigate } from "react-router-dom";
import { StatCard, SecondaryStatCard } from "./";

/**
 * Dashboard Stats Component
 * Displays primary and secondary statistics cards
 */
const DashboardStats = ({ dashboardStats, isDarkMode }) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Primary Stats Cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Total Emails Card */}
        <StatCard
          title="Total Emails"
          value={dashboardStats.totalEmails}
          icon={(props) => (
            <svg
              {...props}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          )}
          color="pink"
          isDarkMode={isDarkMode}
          onClick={() => navigate("/emails")}
          badge={{ condition: dashboardStats.totalEmails > 50, text: "High" }}
          delay={0.1}
        />

        {/* Unread Emails Card */}
        <StatCard
          title="Unread"
          value={dashboardStats.unreadEmails}
          icon={(props) => (
            <svg
              {...props}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.18 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          )}
          color="orange"
          isDarkMode={isDarkMode}
          onClick={() => navigate("/emails?filter=unread")}
          showBadge={false}
          delay={0.15}
        >
          <div className="flex items-center gap-2">
            <span
              className={`text-xs ${
                isDarkMode ? "text-gray-500" : "text-gray-400"
              }`}
            >
              (
              {dashboardStats.totalEmails > 0
                ? Math.round(
                    (dashboardStats.unreadEmails / dashboardStats.totalEmails) *
                      100
                  )
                : 0}
              %)
            </span>
          </div>
        </StatCard>

        {/* Read Rate Card */}
        <StatCard
          title="Read Rate"
          value={`${dashboardStats.readRate}%`}
          icon={(props) => (
            <svg
              {...props}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
          color="blue"
          isDarkMode={isDarkMode}
          showBadge={false}
          delay={0.2}
        />

        {/* Today's Emails Card */}
        <StatCard
          title="Today's Emails"
          value={dashboardStats.todayEmails}
          icon={(props) => (
            <svg
              {...props}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
          color="pink"
          isDarkMode={isDarkMode}
          showBadge={false}
          delay={0.25}
        />
      </div>

      {/* Secondary Stats Row */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <SecondaryStatCard
          title="Trashed"
          value={dashboardStats.trashedEmails}
          icon={(props) => (
            <svg
              {...props}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          )}
          color="red"
          isDarkMode={isDarkMode}
          delay={0.3}
        />
        <SecondaryStatCard
          title="This Week"
          value={dashboardStats.weekEmails}
          icon={(props) => (
            <svg
              {...props}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          )}
          color="pink"
          isDarkMode={isDarkMode}
          delay={0.35}
        />
        <SecondaryStatCard
          title="Daily Avg"
          value={dashboardStats.dailyAverage}
          icon={(props) => (
            <svg
              {...props}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          )}
          color="cyan"
          isDarkMode={isDarkMode}
          delay={0.4}
        />
      </div>
    </>
  );
};

export default DashboardStats;
