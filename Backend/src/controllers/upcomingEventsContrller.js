import dotenv from "dotenv";
import { google } from "googleapis";
import { oAuth2Client, loadTokenOrRespond } from "../services/auth.js";

dotenv.config();

export const getUpcomingEvents = async (req, res) => {
  try {
    const token = loadTokenOrRespond(res);
    if (!token) return;
    const calendar = google.calendar({ version: "v3", auth: oAuth2Client });
    const now = new Date();
    const response = await calendar.events.list({
      calendarId: "primary",
      timeMin: now.toISOString(),
      maxResults: 100,
      singleEvents: true,
      orderBy: "startTime",
    });
    if (!Array.isArray(response.data.items)) return res.json({ events: [] });
    const events = response.data.items.map((evt) => ({
      id: evt.id,
      summary: evt.summary || "(No title)",
      start: evt.start?.dateTime || evt.start?.date || null,
      end: evt.end?.dateTime || evt.end?.date || null,
      location: evt.location || null,
      htmlLink: evt.htmlLink || null,
      status: evt.status,
    }));
    res.json({ events });
  } catch (e) {
    console.error("Error fetching upcoming events", e);
    res
      .status(500)
      .json({ error: "Failed to fetch upcoming events", details: e.message });
  }
};
