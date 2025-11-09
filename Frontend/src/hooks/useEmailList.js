import { useState, useMemo } from "react";

/**
 * Custom hook for email list pagination and search
 * Manages search, filtering, pagination, and selection
 */
export const useEmailList = (emails, pageSize = 25) => {
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Filter and sort emails
  const filtered = useMemo(() => {
    const s = search.toLowerCase();
    return emails
      .filter(
        (e) =>
          e.subject?.toLowerCase().includes(s) ||
          e.from?.toLowerCase().includes(s) ||
          e.summary?.toLowerCase().includes(s)
      )
      .sort(
        (a, b) =>
          new Date(b.date || b.timestamp || 0) -
          new Date(a.date || a.timestamp || 0)
      );
  }, [emails, search]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / pageSize);
  const start = (page - 1) * pageSize;
  const pageSlice = filtered.slice(start, start + pageSize);

  // Get active email
  const activeEmail = emails.find((e) => e.email_id === selectedId) || null;

  // Auto-select first email when list changes
  const autoSelectFirst = (emailList) => {
    if (!selectedId && emailList.length) {
      setSelectedId(emailList[0].email_id);
    }
  };

  return {
    selectedId,
    setSelectedId,
    search,
    setSearch,
    page,
    setPage,
    filtered,
    totalPages,
    pageSlice,
    activeEmail,
    autoSelectFirst,
  };
};
