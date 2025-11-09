import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useCount } from "../context/CountContext";

/**
 * Custom hook for email operations
 * Handles marking as read, deleting, and bulk actions
 */
export const useEmailOperations = (emails, setEmails) => {
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [bulkActionMode, setBulkActionMode] = useState(false);
  const { refreshCounts } = useCount();

  const markAsRead = async (emailId, read) => {
    try {
      await axios.post("http://localhost:3000/isRead", { emailId, read });
      setEmails((prev) =>
        prev.map((e) => (e.email_id === emailId ? { ...e, read } : e))
      );
      refreshCounts();
    } catch (error) {
      console.error("Error marking as read: ", error);
      toast.error("Failed to update email status");
    }
  };

  const deleteEmail = async (emailId) => {
    const prev = emails;
    setEmails((list) => list.filter((e) => e.email_id !== emailId));
    try {
      await axios.post("http://localhost:3000/deleteEmail", { emailId });
      toast.success("Email deleted");
      refreshCounts();
    } catch (error) {
      console.error("Error deleting email: ", error);
      setEmails(prev);
      toast.error("Error deleting the email");
    }
  };

  const handleBulkMarkAsRead = async () => {
    try {
      for (const emailId of selectedEmails) {
        await markAsRead(emailId, true);
      }
      setSelectedEmails([]);
      setBulkActionMode(false);
      toast.success(`${selectedEmails.length} emails marked as read`);
    } catch (error) {
      toast.error("Error marking emails as read");
    }
  };

  const handleBulkDelete = async () => {
    try {
      for (const emailId of selectedEmails) {
        await deleteEmail(emailId);
      }
      setSelectedEmails([]);
      setBulkActionMode(false);
      toast.success(`${selectedEmails.length} emails deleted`);
    } catch (error) {
      toast.error("Error deleting emails");
    }
  };

  const toggleEmailSelection = (emailId) => {
    setSelectedEmails((prev) =>
      prev.includes(emailId)
        ? prev.filter((id) => id !== emailId)
        : [...prev, emailId]
    );
  };

  const selectAllVisibleEmails = (visibleEmails) => {
    const visibleEmailIds = visibleEmails.map((email) => email.email_id);
    setSelectedEmails(visibleEmailIds);
  };

  const clearSelection = () => {
    setSelectedEmails([]);
    setBulkActionMode(false);
  };

  return {
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
  };
};
