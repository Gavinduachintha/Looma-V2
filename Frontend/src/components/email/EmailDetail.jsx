import React from "react";
import { CalendarPlus, Eye, EyeOff, Trash2 } from "lucide-react";
import Button from "../ui/Button";
import EmailSummarySection from "./EmailSummarySection";

/**
 * Email Detail View Component
 * Displays selected email with actions
 */
const EmailDetail = ({
  email,
  onMarkAsRead,
  onDelete,
  onAddEvent,
  isDarkMode,
}) => {
  if (!email) {
    return (
      <div className="flex-1 flex items-center justify-center text-sm opacity-60">
        Select an email
      </div>
    );
  }

  // Parse sender info
  const parseSender = () => {
    if (!email.from) return { name: "Unknown", email: "" };

    const match = email.from.match(/^(.*?)\s*<([^>]+)>$/);
    if (match) {
      return {
        name: match[1].trim(),
        email: match[2].trim(),
      };
    } else if (email.from.includes("@")) {
      const raw = email.from.trim();
      const localName = raw
        .split("@")[0]
        .replace(/[._-]+/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
      return { name: localName, email: raw };
    }
    return { name: email.from, email: "" };
  };

  const sender = parseSender();

  return (
    <div className="flex-1 p-6 space-y-4">
      {/* Email Header */}
      <div className="mb-4">
        <h2
          className={`text-xl font-semibold leading-snug ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {email.subject || "(No subject)"}
        </h2>
        <div className="mt-1">
          <p
            className={`text-sm font-medium leading-snug ${
              isDarkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            {sender.name}
          </p>
          {sender.email && (
            <p
              className={`text-xs break-all ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {sender.email}
            </p>
          )}
        </div>
        <p
          className={`text-xs mt-0.5 ${
            isDarkMode ? "text-gray-500" : "text-gray-500"
          }`}
        >
          {email.date ? new Date(email.date).toLocaleString() : ""}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 flex-wrap justify-end mb-4">
        <Button
          variant="primary"
          size="sm"
          onClick={onAddEvent}
          icon={CalendarPlus}
        >
          Add Event
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onMarkAsRead(email.email_id, !email.read)}
          icon={email.read ? EyeOff : Eye}
        >
          {email.read ? "Mark Unread" : "Mark Read"}
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(email.email_id)}
          icon={Trash2}
        >
          Delete
        </Button>
      </div>

      {/* Email Content */}
      {(email.summary || email.full_body) && (
        <div className="w-full">
          {email.summary && (
            <EmailSummarySection
              summary={email.summary}
              isDarkMode={isDarkMode}
            />
          )}
          {email.full_body && (
            <div
              className={`p-4 rounded-xl border text-sm leading-relaxed w-full mt-6 ${
                isDarkMode
                  ? "bg-white/5 border-white/10 text-gray-300"
                  : "bg-white border-gray-200 text-gray-700"
              }`}
            >
              <h3 className="text-[11px] font-semibold uppercase tracking-wide mb-2 opacity-70">
                Content
              </h3>
              <p className="whitespace-pre-line break-words text-[13px] leading-snug">
                {email.full_body}
              </p>
            </div>
          )}
        </div>
      )}
      {!email.full_body && email.snippet && (
        <div className="text-xs italic opacity-60">{email.snippet}</div>
      )}
    </div>
  );
};

export default EmailDetail;
