import dotenv from "dotenv";
import db from "../config/db.js";

dotenv.config();

// Trash-related functions
export const fetchTrashedEmails = async (req, res) => {
  try {
    const userId = req.user.id;
    const response = await db.query(
      `SELECT email_id, from_email AS from, subject, summary, date, deleted_date, read
       FROM emails
       WHERE user_id = $1 AND is_trashed = true
       ORDER BY deleted_date DESC NULLS LAST, date DESC NULLS LAST`,
      [userId]
    );

    // Transform the data to match the frontend expectations
    const trashedEmails = response.rows.map((email) => ({
      email_id: email.email_id,
      subject: email.subject,
      from: email.from,
      from_email: email.from, // Extract email if needed
      date: email.date,
      summary: email.summary,
      snippet: email.summary ? email.summary.substring(0, 100) + "..." : "",
      deleted_date: email.deleted_date,
      read: email.read || false,
    }));

    res.json(trashedEmails);
  } catch (e) {
    console.error("Error fetching trashed emails:", e);
    res.status(500).json({ error: e.message });
  }
};

export const moveToTrash = async (req, res) => {
  try {
    const { emailId } = req.body;
    const userId = req.user.id;

    if (!emailId) {
      return res.status(400).json({ error: "Email ID is required" });
    }

    const response = await db.query(
      `UPDATE emails 
       SET is_trashed = true, deleted_date = NOW() 
       WHERE email_id = $1 AND user_id = $2`,
      [emailId, userId]
    );

    if (response.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Email not found or not authorized",
      });
    }

    res.json({ success: true, message: "Email moved to trash" });
  } catch (e) {
    console.error("Error moving email to trash:", e);
    res.status(500).json({ error: e.message });
  }
};

export const restoreEmail = async (req, res) => {
  try {
    const { emailId } = req.body;
    const userId = req.user.id;

    if (!emailId) {
      return res.status(400).json({ error: "Email ID is required" });
    }

    const response = await db.query(
      `UPDATE emails 
       SET is_trashed = false, deleted_date = NULL 
       WHERE email_id = $1 AND user_id = $2 AND is_trashed = true`,
      [emailId, userId]
    );

    if (response.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Email not found in trash or not authorized",
      });
    }

    res.json({ success: true, message: "Email restored successfully" });
  } catch (e) {
    console.error("Error restoring email:", e);
    res.status(500).json({ error: e.message });
  }
};

export const permanentlyDeleteEmail = async (req, res) => {
  try {
    const { emailId } = req.body;
    const userId = req.user.id;

    if (!emailId) {
      return res.status(400).json({ error: "Email ID is required" });
    }

    const response = await db.query(
      `DELETE FROM emails 
       WHERE email_id = $1 AND user_id = $2 AND is_trashed = true`,
      [emailId, userId]
    );

    if (response.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Email not found in trash or not authorized",
      });
    }

    res.json({ success: true, message: "Email permanently deleted" });
  } catch (e) {
    console.error("Error permanently deleting email:", e);
    res.status(500).json({ error: e.message });
  }
};

export const emptyTrash = async (req, res) => {
  try {
    const userId = req.user.id;

    const response = await db.query(
      `DELETE FROM emails 
       WHERE user_id = $1 AND is_trashed = true`,
      [userId]
    );

    res.json({
      success: true,
      message: `${response.rowCount} emails permanently deleted from trash`,
    });
  } catch (e) {
    console.error("Error emptying trash:", e);
    res.status(500).json({ error: e.message });
  }
};