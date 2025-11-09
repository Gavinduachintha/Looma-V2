import React from "react";

/**
 * Email Summary Section Component
 * Parses and displays formatted email summary with sections
 */
const EmailSummarySection = ({ summary, isDarkMode }) => {
  const parseSummary = () => {
    const raw = summary || "";
    const lines = raw.split(/\r?\n/);
    const sectionTitles = ["Summary", "Events", "Links"];
    const sections = {};
    let current = "Summary";
    sections[current] = [];

    for (let ln of lines) {
      const trimmed = ln.trim();
      const titleMatch = sectionTitles.find((t) =>
        new RegExp(`^${t}:?$`, "i").test(trimmed)
      );
      if (titleMatch) {
        current = titleMatch;
        if (!sections[current]) sections[current] = [];
        continue;
      }
      if (current === "Links" && trimmed === "-") continue;
      if (!sections[current]) sections[current] = [];
      sections[current].push(ln);
    }

    return sections;
  };

  const buildBullets = (arr) =>
    arr
      .filter((l) => l.trim().startsWith("- "))
      .map((l) => l.replace(/^\-\s*/, ""));

  const buildParagraphs = (arr) =>
    arr.filter((l) => l.trim() && !l.trim().startsWith("- "));

  const extractLinks = (lines) => {
    const urlRegex = /(https?:\/\/[^\s)]+)|(www\.[^\s)]+)/gi;
    const linkUrls = [];
    lines.forEach((l) => {
      let match;
      urlRegex.lastIndex = 0;
      const local = [];
      while ((match = urlRegex.exec(l)) !== null) local.push(match[0]);
      if (local.length === 0 && l.trim()) linkUrls.push(l.trim());
      else linkUrls.push(...local);
    });
    return linkUrls;
  };

  const truncateUrl = (u) => (u.length > 90 ? u.slice(0, 87) + "…" : u);

  const sections = parseSummary();
  const linkUrls = extractLinks(sections.Links || []);

  return (
    <div
      className={`p-4 rounded-xl border text-sm leading-relaxed relative w-full ${
        isDarkMode
          ? "bg-white/5 border-white/10 text-gray-200"
          : "bg-gray-50 border-gray-200 text-gray-700"
      }`}
    >
      <div className="space-y-5">
        {["Summary", "Events"].map((sec) => {
          if (!sections[sec]) return null;

          const bullets = buildBullets(sections[sec]);
          const paragraphs = buildParagraphs(sections[sec]).filter(
            (t) => !/^Summary:|^Events:/i.test(t.trim())
          );

          if (bullets.length === 0 && paragraphs.length === 0) return null;

          return (
            <div key={sec}>
              <h4 className="text-[11px] font-semibold uppercase tracking-wide mb-2 opacity-70">
                {sec}
              </h4>
              {paragraphs.length > 0 && (
                <div className="space-y-2 text-[13px] leading-snug">
                  {paragraphs.map((p, i) => (
                    <p key={i} className="whitespace-pre-wrap break-words">
                      {p}
                    </p>
                  ))}
                </div>
              )}
              {bullets.length > 0 && (
                <ul className="list-disc pl-5 space-y-1 text-[13px] leading-snug">
                  {bullets.map((b, i) => (
                    <li key={i} className="break-words">
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
        {linkUrls.length > 0 && (
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-wide mb-2 opacity-70">
              Links
            </h4>
            <div className="space-y-1">
              {linkUrls.map((u, i) => {
                const href = u.startsWith("http") ? u : `https://${u}`;
                return (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-[12px] text-pink-500 underline break-all hover:text-pink-400 leading-tight"
                  >
                    {truncateUrl(u)}
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailSummarySection;
