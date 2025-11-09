import { useState, useMemo } from "react";

/**
 * Custom hook for email filtering and sorting
 * Manages filter states and returns filtered/sorted emails
 */
export const useEmailFilters = (emails) => {
  const [emailFilter, setEmailFilter] = useState("all"); // 'all', 'unread', 'priority', 'today'
  const [emailSort, setEmailSort] = useState("newest"); // 'newest', 'oldest', 'unread-first'
  const [emailSearch, setEmailSearch] = useState("");

  const filteredAndSortedEmails = useMemo(() => {
    let filtered = [...emails];

    // Apply search filter
    if (emailSearch) {
      filtered = filtered.filter(
        (email) =>
          email.subject?.toLowerCase().includes(emailSearch.toLowerCase()) ||
          email.from_email?.toLowerCase().includes(emailSearch.toLowerCase()) ||
          email.summary?.toLowerCase().includes(emailSearch.toLowerCase())
      );
    }

    // Apply filters
    switch (emailFilter) {
      case "unread":
        filtered = filtered.filter((email) => !email.read);
        break;
      case "priority":
        filtered = filtered.filter(
          (email) =>
            email.subject?.toLowerCase().includes("urgent") ||
            email.subject?.toLowerCase().includes("important") ||
            email.subject?.toLowerCase().includes("asap")
        );
        break;
      case "today":
        const today = new Date().toISOString().split("T")[0];
        filtered = filtered.filter((email) => {
          const emailDate = new Date(
            email.date || email.receivedAt || email.timestamp
          );
          return emailDate.toISOString().split("T")[0] === today;
        });
        break;
      default:
        // 'all' - no filtering
        break;
    }

    // Apply sorting
    switch (emailSort) {
      case "oldest":
        filtered.sort(
          (a, b) =>
            new Date(a?.date || a?.receivedAt || a?.timestamp || 0).getTime() -
            new Date(b?.date || b?.receivedAt || b?.timestamp || 0).getTime()
        );
        break;
      case "unread-first":
        filtered.sort((a, b) => {
          if (a.read !== b.read) return a.read ? 1 : -1;
          return (
            new Date(b?.date || b?.receivedAt || b?.timestamp || 0).getTime() -
            new Date(a?.date || a?.receivedAt || a?.timestamp || 0).getTime()
          );
        });
        break;
      default: // 'newest'
        filtered.sort(
          (a, b) =>
            new Date(b?.date || b?.receivedAt || b?.timestamp || 0).getTime() -
            new Date(a?.date || a?.receivedAt || a?.timestamp || 0).getTime()
        );
        break;
    }

    return filtered;
  }, [emails, emailFilter, emailSort, emailSearch]);

  const latestEmails = useMemo(
    () => filteredAndSortedEmails.slice(0, 6),
    [filteredAndSortedEmails]
  );

  return {
    emailFilter,
    setEmailFilter,
    emailSort,
    setEmailSort,
    emailSearch,
    setEmailSearch,
    filteredAndSortedEmails,
    latestEmails,
  };
};
