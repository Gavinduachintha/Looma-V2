import axios from "axios";
import dotenv from "dotenv";
import { google } from "googleapis";
import { oAuth2Client, loadTokenOrRespond } from "../services/auth.js";
import { decodeBase64Url, OPEN_AI_MODEL } from "./urlControllers.js";
import db from "../config/db.js";

dotenv.config();
export const summary = async (req, res) => {
  const userId = req.user.id;
  try {
    const token = loadTokenOrRespond(res);
    if (!token) return;

    console.log("Initializing Gmail API...");
    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

    console.log("Fetching email list from Gmail...");
    const result = await gmail.users.messages.list({
      userId: "me",
      maxResults: 10,
      labelIds: ["INBOX", "IMPORTANT"],
    });

    console.log(
      "Gmail API returned",
      result.data.messages?.length || 0,
      "messages"
    );

    const messages = result.data.messages || [];
    if (messages.length === 0) return res.json({ summary: "No emails found" });

    const mails = [];
    for (const m of messages) {
      try {
        console.log(`Fetching email details for message ID: ${m.id}`);
        const msgRes = await gmail.users.messages.get({
          userId: "me",
          id: m.id,
          format: "full",
        });

        // Add detailed logging to understand the response structure
        console.log(`Response for ${m.id}:`, {
          hasResponse: !!msgRes,
          hasData: !!msgRes?.data,
          hasPayload: !!msgRes?.data?.payload,
          dataKeys: msgRes?.data ? Object.keys(msgRes.data) : "no data",
        });

        // Add null checks for the response
        if (!msgRes || !msgRes.data) {
          console.warn(`No response data for message ${m.id}, skipping`);
          continue;
        }

        if (!msgRes.data.payload) {
          console.warn(
            `No payload for message ${m.id}, response keys:`,
            Object.keys(msgRes.data)
          );
          continue;
        }

        const payload = msgRes.data.payload;
        const headers = payload.headers || [];
        const subject =
          headers.find((h) => h.name === "Subject")?.value || "(No Subject)";
        const from =
          headers.find((h) => h.name === "From")?.value || "(Unknown Sender)";
        const date =
          headers.find((h) => h.name === "Date")?.value ||
          new Date().toISOString();

        let body = "";
        if (payload.parts) {
          const part = payload.parts.find((p) => p.mimeType === "text/plain");
          if (part?.body?.data) body = decodeBase64Url(part.body.data);
        } else if (payload.body?.data) {
          body = decodeBase64Url(payload.body.data);
        }

        mails.push({ id: m.id, from, subject, date, body });
        console.log(`Successfully processed email: ${subject}`);
      } catch (emailError) {
        console.error(`Error processing email ${m.id}:`, emailError.message);
        // Continue with other emails even if one fails
        continue;
      }
    }

    console.log(
      `Successfully processed ${mails.length} emails out of ${messages.length} total`
    );

    // Check if we have any emails to process
    if (mails.length === 0) {
      return res.json({
        summary: "No emails could be processed",
        processed: 0,
      });
    }

    // Batch process all emails in a single AI request
    const emailsForAI = mails.map((mail, index) => ({
      id: index + 1,
      emailId: mail.id,
      from: mail.from,
      subject: mail.subject,
      body: mail.body,
      date: mail.date,
    }));

    const batchPrompt = `You are an AI assistant. Analyze the following ${
      emailsForAI.length
    } emails and provide a JSON response with summaries for each email.

IMPORTANT: Return ONLY valid JSON without any markdown formatting, code blocks, or additional text.

For each email, provide the output in this exact JSON structure:
{
  "emails": [
    {
      "id": 1,
      "emailId": "actual_email_id",
      "summary": ["Bullet point 1", "Bullet point 2", "Bullet point 3"],
      "events": [
        {
          "name": "Event Name",
          "date": "YYYY-MM-DD",
          "time": "HH:MM",
          "venue": "Venue Name"
        }
      ],
      "links": ["https://example.com"]
    }
  ]
}

Requirements:
- Provide 4-6 meaningful bullet points for each email summary
- Exclude greetings, signatures, or irrelevant text
- If the mail has social media links like youtube, facebook, etc., omit them
- If there are no events or links, use empty arrays []
- Return ONLY the JSON object, no markdown, no explanations, no code blocks

Emails to analyze:
${emailsForAI
  .map(
    (email) => `
Email ID: ${email.id}
Actual Email ID: ${email.emailId}
From: ${email.from}
Subject: ${email.subject}
Date: ${email.date}
Body: ${email.body}
---`
  )
  .join("\n")}`;

    console.log("Making AI API request with", emailsForAI.length, "emails");

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: OPEN_AI_MODEL,
        messages: [
          {
            role: "user",
            content: batchPrompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPEN_AI_API}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("AI API response received successfully");

    let aiResults;
    try {
      let aiContent = response.data.choices[0].message.content;
      console.log("Raw AI response:", aiContent.substring(0, 200) + "...");

      // Remove markdown code blocks if present
      if (aiContent.includes("```json")) {
        aiContent = aiContent
          .replace(/```json\s*/g, "")
          .replace(/```\s*$/g, "");
      } else if (aiContent.includes("```")) {
        aiContent = aiContent.replace(/```\s*/g, "");
      }

      // Clean up any extra whitespace
      aiContent = aiContent.trim();

      console.log("Cleaned AI response:", aiContent.substring(0, 200) + "...");
      aiResults = JSON.parse(aiContent);

      console.log(
        "Successfully parsed AI response with",
        aiResults.emails?.length || 0,
        "emails"
      );
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      console.error(
        "Raw response content:",
        response.data.choices[0].message.content
      );

      // Better fallback with actual email content analysis
      aiResults = {
        emails: mails.map((mail, index) => ({
          id: index + 1,
          emailId: mail.id,
          summary: [
            `Email from: ${mail.from}`,
            `Subject: ${mail.subject}`,
            `Content preview: ${mail.body.substring(0, 100)}...`,
          ],
          events: [],
          links: [],
        })),
      };
      console.log(
        "Using fallback summaries for",
        aiResults.emails.length,
        "emails"
      );
    }

    // Batch insert into database
    const insertPromises = aiResults.emails.map(async (emailResult) => {
      const originalEmail = mails.find((m) => m.id === emailResult.emailId);
      if (!originalEmail) return;

      const summaryText = `Summary:\n${emailResult.summary
        .map((s) => `- ${s}`)
        .join("\n")}${
        emailResult.events.length > 0
          ? `\n\nEvents:\n${emailResult.events
              .map((e) => `- ${e.name}: ${e.date} ${e.time} at ${e.venue}`)
              .join("\n")}`
          : ""
      }${
        emailResult.links.length > 0
          ? `\n\nLinks:\n${emailResult.links.map((l) => `- ${l}`).join("\n")}`
          : ""
      }`;

      return db.query(
        `INSERT INTO emails (email_id, from_email, subject, summary, date, user_id)
         VALUES ($1,$2,$3,$4,$5,$6)
         ON CONFLICT (email_id) DO NOTHING`,
        [
          originalEmail.id,
          originalEmail.from,
          originalEmail.subject,
          summaryText,
          new Date(originalEmail.date),
          userId,
        ]
      );
    });

    await Promise.all(insertPromises);
    res.status(200).json({
      success: "Summarize successful",
      processed: aiResults.emails.length,
    });
  } catch (e) {
    console.error("Summary function error:", e);
    console.error("Error details:", {
      message: e.message,
      stack: e.stack,
      name: e.name,
    });
    res.status(500).json({
      error: e.message,
      details: "Check server logs for more information",
    });
  }
};