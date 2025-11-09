import dotenv from "dotenv";
import { google } from "googleapis";
import { oAuth2Client, loadTokenOrRespond } from "../services/auth.js";

dotenv.config();

export const addEvent = async (req, res) => {
  const event = req.body;
  if (!event.summary || !event.start || !event.end) {
    return res
      .status(400)
      .json({ error: "Missing required event fields (summary, start, end)" });
  }
  try {
    const token = loadTokenOrRespond(res);
    if (!token) return;
    const calendar = google.calendar({ version: "v3", auth: oAuth2Client });
    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });
    res.status(200).json({
      message: "Event created successfully",
      eventLink: response.data.htmlLink,
    });
  } catch (e) {
    console.error("Error creating event", e);
    res
      .status(500)
      .json({ error: "Failed to create event", details: e.message });
  }
};