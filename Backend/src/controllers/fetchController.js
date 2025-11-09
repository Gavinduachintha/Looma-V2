import dotenv from "dotenv";
import db from "../config/db.js";

dotenv.config();

export const fetchEmails = async (req, res) => {
  try {
    const userId = req.user.id;
    const response = await db.query(
      `SELECT email_id, from_email AS from, subject, summary, date, read, user_id
       FROM emails
       WHERE user_id = $1 AND (is_trashed = false OR is_trashed IS NULL)
       ORDER BY date DESC NULLS LAST`,
      [userId]
    );
    res.json(response.rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};