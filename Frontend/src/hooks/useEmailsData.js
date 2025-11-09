import { useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCount } from "../context/CountContext";

/**
 * Custom hook for email data fetching and operations
 * Handles fetching, summary generation, and email list management
 */
export const useEmailsData = () => {
  const [emails, setEmails] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const navigate = useNavigate();
  const { refreshCounts } = useCount();

  const fetchEmails = useCallback(
    async (showLoader = true) => {
      if (showLoader) setIsRefreshing(true);
      setFetchError(null);
      try {
        const token = localStorage.getItem("authToken");
        const res = await axios.get("http://localhost:3000/fetchEmails", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const list = res.data || [];
        setEmails(list);
        refreshCounts();
        return list;
      } catch (e) {
        console.error(e);
        if (e.response?.status === 401) {
          localStorage.removeItem("authToken");
          navigate("/signin");
        } else if (e.response?.status === 403) {
          setFetchError(
            "You do not have permission to view these emails. Please check your login or contact support."
          );
          toast.error("Forbidden: You do not have access to this resource.");
        } else {
          setFetchError("Failed to fetch emails. Please try again later.");
        }
        return [];
      } finally {
        setIsRefreshing(false);
      }
    },
    [navigate, refreshCounts]
  );

  const handleNewSummary = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const token = localStorage.getItem("authToken");
      toast.loading("Generating summaries...", { id: "summary-loading" });

      await axios.get("http://localhost:3000/summary", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Automatically refresh emails to show updated summaries
      await fetchEmails(false);

      toast.success("Summaries generated and emails refreshed!", {
        id: "summary-loading",
      });
    } catch (e) {
      console.error("Summary error:", e);
      const errorMessage =
        e.response?.data?.error || "Failed to generate summaries";
      toast.error(errorMessage, {
        id: "summary-loading",
      });
    } finally {
      setIsRefreshing(false);
    }
  }, [fetchEmails]);

  const markAsRead = useCallback(
    async (emailId, read) => {
      try {
        await axios.post("http://localhost:3000/isRead", { emailId, read });
        setEmails((prev) =>
          prev.map((e) => (e.email_id === emailId ? { ...e, read } : e))
        );
        refreshCounts();
      } catch (e) {
        console.error(e);
        toast.error("Failed to update email status");
      }
    },
    [refreshCounts]
  );

  const deleteEmail = useCallback(
    async (emailId) => {
      const backup = emails;
      setEmails((prev) => prev.filter((e) => e.email_id !== emailId));
      try {
        const token = localStorage.getItem("authToken");
        await axios.post(
          "http://localhost:3000/moveToTrash",
          { emailId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Email moved to trash");
        refreshCounts();
      } catch (e) {
        console.error(e);
        toast.error("Failed to move email to trash");
        setEmails(backup);
      }
    },
    [emails, refreshCounts]
  );

  return {
    emails,
    setEmails,
    isRefreshing,
    fetchError,
    fetchEmails,
    handleNewSummary,
    markAsRead,
    deleteEmail,
  };
};
