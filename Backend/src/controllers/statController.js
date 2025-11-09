import dotenv from "dotenv";
import db from "../config/db.js";

dotenv.config();

export const getDashboardStats = async (req, res) => {
  try {
    console.log("Dashboard stats request received for user:", req.user);
    const userId = req.user.id;

    // First check if emails table exists
    const tableCheck = await db.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'emails'
      );
    `);

    if (!tableCheck.rows[0].exists) {
      console.log("Emails table doesn't exist, returning default stats");
      return res.json({
        totalEmails: 0,
        unreadEmails: 0,
        readEmails: 0,
        readRate: 0,
        trashedEmails: 0,
        todayEmails: 0,
        weekEmails: 0,
        starredEmails: 0,
        attachmentEmails: 0,
        dailyAverage: 0,
      });
    }

    // Check if emails table exists and get basic email counts
    const totalEmailsResult = await db
      .query(
        "SELECT COUNT(*) as total FROM emails WHERE user_id = $1 AND (is_trashed IS NULL OR is_trashed = false)",
        [userId]
      )
      .catch((error) => {
        console.error("Error in totalEmails query:", error);
        throw error;
      });

    const unreadEmailsResult = await db
      .query(
        "SELECT COUNT(*) as unread FROM emails WHERE user_id = $1 AND (read IS NULL OR read = false) AND (is_trashed IS NULL OR is_trashed = false)",
        [userId]
      )
      .catch((error) => {
        console.error("Error in unreadEmails query:", error);
        throw error;
      });

    const trashedEmailsResult = await db
      .query(
        "SELECT COUNT(*) as trashed FROM emails WHERE user_id = $1 AND is_trashed = true",
        [userId]
      )
      .catch((error) => {
        console.error("Error in trashedEmails query:", error);
        throw error;
      });

    // Get today's emails
    const todayEmailsResult = await db.query(
      `SELECT COUNT(*) as today FROM emails 
       WHERE user_id = $1 AND DATE(date) = CURRENT_DATE 
       AND (is_trashed IS NULL OR is_trashed = false)`,
      [userId]
    );

    // Get this week's emails
    const weekEmailsResult = await db.query(
      `SELECT COUNT(*) as week FROM emails 
       WHERE user_id = $1 AND date >= DATE_TRUNC('week', CURRENT_DATE)
       AND (is_trashed IS NULL OR is_trashed = false)`,
      [userId]
    );

    const totalEmails = parseInt(totalEmailsResult.rows[0].total);
    const unreadEmails = parseInt(unreadEmailsResult.rows[0].unread);
    const readRate =
      totalEmails > 0
        ? Math.round(((totalEmails - unreadEmails) / totalEmails) * 100)
        : 0;
    const dailyAverage = await getDailyAverage(userId);

    const stats = {
      totalEmails,
      unreadEmails,
      readEmails: totalEmails - unreadEmails,
      readRate,
      trashedEmails: parseInt(trashedEmailsResult.rows[0].trashed),
      todayEmails: parseInt(todayEmailsResult.rows[0].today),
      weekEmails: parseInt(weekEmailsResult.rows[0].week),
      // starredEmails: parseInt(starredEmailsResult.rows[0].starred),
      // attachmentEmails: parseInt(attachmentEmailsResult.rows[0].attachments),
      dailyAverage,
    };

    console.log("Dashboard stats calculated:", stats);
    res.json(stats);
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    console.error("Error stack:", error.stack);
    res.status(500).json({ error: error.message });
  }
};

export const getEmailAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get top senders
    const topSendersResult = await db.query(
      `SELECT from_email, COUNT(*) as count 
       FROM emails 
       WHERE user_id = $1 AND (is_trashed IS NULL OR is_trashed = false)
       GROUP BY from_email 
       ORDER BY count DESC 
       LIMIT 10`,
      [userId]
    );

    // Get emails by day of week
    const emailsByDayResult = await db.query(
      `SELECT 
         EXTRACT(DOW FROM date) as day_of_week,
         TO_CHAR(date, 'Dy') as day_name,
         COUNT(*) as count
       FROM emails 
       WHERE user_id = $1 AND (is_trashed IS NULL OR is_trashed = false)
       GROUP BY EXTRACT(DOW FROM date), TO_CHAR(date, 'Dy')
       ORDER BY day_of_week`,
      [userId]
    );

    // Get unread emails by age
    const unreadByAgeResult = await db.query(
      `SELECT 
         CASE 
           WHEN DATE(date) = CURRENT_DATE THEN 'today'
           WHEN date >= CURRENT_DATE - INTERVAL '7 days' THEN 'week'
           WHEN date >= CURRENT_DATE - INTERVAL '30 days' THEN 'month'
           ELSE 'older'
         END as age_group,
         COUNT(*) as count
       FROM emails 
       WHERE user_id = $1 AND (read IS NULL OR read = false) 
       AND (is_trashed IS NULL OR is_trashed = false)
       GROUP BY age_group`,
      [userId]
    );

    // Get email activity by hour (if we have time data)
    const emailsByHourResult = await db.query(
      `SELECT 
         EXTRACT(HOUR FROM date) as hour,
         COUNT(*) as count
       FROM emails 
       WHERE user_id = $1 AND (is_trashed IS NULL OR is_trashed = false)
       AND date >= CURRENT_DATE - INTERVAL '30 days'
       GROUP BY EXTRACT(HOUR FROM date)
       ORDER BY hour`,
      [userId]
    );

    const analytics = {
      topSenders: topSendersResult.rows.map((row) => ({
        sender: row.from_email,
        count: parseInt(row.count),
      })),
      emailsByDay: emailsByDayResult.rows.reduce((acc, row) => {
        acc[row.day_name] = parseInt(row.count);
        return acc;
      }, {}),
      unreadByAge: unreadByAgeResult.rows.reduce(
        (acc, row) => {
          acc[row.age_group] = parseInt(row.count);
          return acc;
        },
        { today: 0, week: 0, month: 0, older: 0 }
      ),
      emailsByHour: emailsByHourResult.rows.map((row) => ({
        hour: parseInt(row.hour),
        count: parseInt(row.count),
      })),
    };

    res.json(analytics);
  } catch (error) {
    console.error("Error fetching email analytics:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getEmailTrends = async (req, res) => {
  try {
    const userId = req.user.id;
    const { period = "7" } = req.query; // Default to 7 days

    const trendsResult = await db.query(
      `SELECT 
         DATE(date) as email_date,
         COUNT(*) as total_emails,
         COUNT(CASE WHEN read = true THEN 1 END) as read_emails,
         COUNT(CASE WHEN (read IS NULL OR read = false) THEN 1 END) as unread_emails
       FROM emails 
       WHERE user_id = $1 
       AND date >= CURRENT_DATE - INTERVAL '${period} days'
       AND (is_trashed IS NULL OR is_trashed = false)
       GROUP BY DATE(date)
       ORDER BY email_date DESC`,
      [userId]
    );

    const trends = trendsResult.rows.map((row) => ({
      date: row.email_date,
      totalEmails: parseInt(row.total_emails),
      readEmails: parseInt(row.read_emails),
      unreadEmails: parseInt(row.unread_emails),
      readRate:
        row.total_emails > 0
          ? Math.round((row.read_emails / row.total_emails) * 100)
          : 0,
    }));

    res.json(trends);
  } catch (error) {
    console.error("Error fetching email trends:", error);
    res.status(500).json({ error: error.message });
  }
};

// Helper function to calculate daily average
async function getDailyAverage(userId) {
  try {
    const result = await db.query(
      `SELECT COUNT(*) as count 
       FROM emails 
       WHERE user_id = $1 
       AND date >= CURRENT_DATE - INTERVAL '7 days'
       AND (is_trashed IS NULL OR is_trashed = false)`,
      [userId]
    );

    const weeklyCount = parseInt(result.rows[0].count);
    return Math.round(weeklyCount / 7);
  } catch (error) {
    console.error("Error calculating daily average:", error);
    return 0;
  }
}