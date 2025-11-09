import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCount } from "../context/CountContext";

/**
 * Custom hook for fetching dashboard data
 * Manages emails, stats, and analytics data
 */
export const useDashboardData = () => {
  const [emails, setEmails] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({
    totalEmails: 0,
    unreadEmails: 0,
    readRate: 0,
    todayEmails: 0,
    weekEmails: 0,
    trashedEmails: 0,
    starredEmails: 0,
    attachmentEmails: 0,
    dailyAverage: 0,
  });
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  const navigate = useNavigate();
  const { refreshCounts } = useCount();

  const fetchEmails = async (isLoadingRequest = true) => {
    if (isLoadingRequest) {
      setIsRefreshing(true);
    }
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get("http://localhost:3000/fetchEmails", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmails(res.data || []);
      refreshCounts();
    } catch (error) {
      console.error("Error fetching emails:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("authToken");
        navigate("/signin");
      }
      toast.error("Failed to fetch emails");
    } finally {
      setIsRefreshing(false);
    }
  };

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get("http://localhost:3000/dashboard-stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDashboardStats(res.data);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("authToken");
        navigate("/signin");
      } else {
        // Set default stats to prevent UI from showing undefined values
        setDashboardStats({
          totalEmails: 0,
          unreadEmails: 0,
          readRate: 0,
          todayEmails: 0,
          weekEmails: 0,
          trashedEmails: 0,
          starredEmails: 0,
          attachmentEmails: 0,
          dailyAverage: 0,
        });
      }
    }
  };

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get("http://localhost:3000/email-analytics", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAnalyticsData(res.data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  };

  const refreshAll = () => {
    fetchEmails();
    fetchDashboardStats();
  };

  return {
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
  };
};
