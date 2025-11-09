import dotenv from "dotenv";
import db from "../config/db.js";

dotenv.config();

export const isRead = async (req, res) => {
  const { read, emailId } = req.body;
  try {
    const response = await db.query(
      "UPDATE emails SET read=$1 WHERE email_id=$2",
      [read, emailId]
    );
    if (response.rowCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No email updated. Check email_id." });
    }
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};