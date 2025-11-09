import axios from "axios";
import dotenv from "dotenv";
import { google } from "googleapis";
import { oAuth2Client, loadTokenOrRespond } from "../services/auth.js";
import { OPEN_AI_MODEL } from "./urlControllers.js";

dotenv.config();
const OPEN_AI_API = process.env.OPEN_AI_API;
export const generateEmail = async (req, res) => {
  try {
    const { preferences } = req.body;

    if (!preferences || !preferences.purpose) {
      return res.status(400).json({ error: "Email purpose is required" });
    }

    const { tone, purpose, keyPoints, length } = preferences;

    // Create a detailed prompt for the AI
    const aiPrompt = `You are an expert email writer. Generate a professional email based on the following requirements:

REQUIREMENTS:
- Tone: ${tone}
- Purpose: ${purpose}
- Key Points: ${keyPoints || "None specified"}
- Length: ${length}

INSTRUCTIONS:
1. Generate both a subject line and email body
2. The tone should be ${tone}
3. The email should be ${length} in length
4. Include the key points naturally in the content
5. Use appropriate greetings and closings for the ${tone} tone
6. Make it professional and well-structured
7. Use placeholder [Recipient Name] for the recipient and [Your Name] for the sender

OUTPUT FORMAT:
Subject: [Your generated subject line]

Body:
[Your generated email body]

Please generate the email now:`;

    // Call OpenRouter API
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: OPEN_AI_MODEL,
        messages: [
          {
            role: "user",
            content: aiPrompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPEN_AI_API}`,
          "Content-Type": "application/json",
        },
        timeout: 25000,
      }
    );

    const aiResponse = response.data.choices[0].message.content;

    // Parse the AI response to extract subject and body
    const subjectMatch = aiResponse.match(/Subject:\s*(.+?)(?:\n|$)/i);
    const bodyMatch = aiResponse.match(
      /Body:\s*([\s\S]+?)(?:\n\n---|\n\nNote:|$)/i
    );

    let subject = "";
    let body = "";

    if (subjectMatch) {
      subject = subjectMatch[1].trim();
    } else {
      // Fallback: generate a simple subject if parsing fails
      subject = purpose.charAt(0).toUpperCase() + purpose.slice(1);
    }

    if (bodyMatch) {
      body = bodyMatch[1].trim();
    } else {
      // Fallback: use the entire response as body if parsing fails
      body = aiResponse.trim();
    }

    // Clean up the response
    subject = subject.replace(/^["']|["']$/g, ""); // Remove quotes
    body = body.replace(/^["']|["']$/g, ""); // Remove quotes

    res.json({ subject, body });
  } catch (error) {
    console.error("Error generating email:", error);

    // Fallback to a simple generated email if AI fails
    const fallbackEmail = generateFallbackEmail(req.body.preferences);
    res.json(fallbackEmail);
  }
};

// Fallback email generation function
const generateFallbackEmail = (preferences) => {
  const { tone, purpose, keyPoints, length } = preferences;

  let subject = "";
  let body = "";

  // Generate subject based on purpose
  if (purpose.toLowerCase().includes("meeting")) {
    subject = `Meeting Request - ${purpose}`;
  } else if (purpose.toLowerCase().includes("follow up")) {
    subject = `Follow Up: ${purpose}`;
  } else if (purpose.toLowerCase().includes("thank")) {
    subject = `Thank You - ${purpose}`;
  } else {
    subject = purpose.charAt(0).toUpperCase() + purpose.slice(1);
  }

  // Generate body based on tone and length
  const greetings = {
    professional: "Dear [Recipient Name],",
    friendly: "Hi there!",
    formal: "Dear Sir/Madam,",
    casual: "Hey!",
  };

  const closings = {
    professional: "Best regards,\n[Your Name]",
    friendly: "Best,\n[Your Name]",
    formal: "Sincerely,\n[Your Name]",
    casual: "Thanks!\n[Your Name]",
  };

  let bodyContent = "";
  if (length === "short") {
    bodyContent = `I hope this email finds you well. ${purpose}`;
    if (keyPoints) {
      bodyContent += `\n\n${keyPoints}`;
    }
    bodyContent += "\n\nPlease let me know if you have any questions.";
  } else if (length === "medium") {
    bodyContent = `I hope this email finds you well.\n\n${purpose}`;
    if (keyPoints) {
      bodyContent += `\n\nKey points to consider:\n${keyPoints}`;
    }
    bodyContent +=
      "\n\nI would appreciate your feedback on this matter. Please feel free to reach out if you need any additional information.";
  } else {
    // long
    bodyContent = `I hope this email finds you well and that you're having a great day.\n\n${purpose}`;
    if (keyPoints) {
      bodyContent += `\n\nI wanted to highlight the following key points:\n${keyPoints}`;
    }
    bodyContent +=
      "\n\nI believe this would be beneficial for both parties and would love to discuss this further at your convenience. Please don't hesitate to reach out if you have any questions or would like to schedule a time to talk.";
  }

  body = `${greetings[tone] || greetings.professional}\n\n${bodyContent}\n\n${
    closings[tone] || closings.professional
  }`;

  return { subject, body };
};

// Send Email
export const sendEmail = async (req, res) => {
  try {
    const { to, cc, bcc, subject, body } = req.body;

    if (!to || !subject || !body) {
      return res
        .status(400)
        .json({ error: "To, subject, and body are required" });
    }

    const token = loadTokenOrRespond(res);
    if (!token) return;

    oAuth2Client.setCredentials(token);
    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

    // Check if body contains HTML tags
    const isHtml = /<[a-z][\s\S]*>/i.test(body);

    // Create the email message with headers
    const emailHeaders = [
      `To: ${to}`,
      cc && cc.trim() ? `Cc: ${cc}` : null,
      bcc && bcc.trim() ? `Bcc: ${bcc}` : null,
      `Subject: ${subject}`,
      `Content-Type: ${isHtml ? "text/html" : "text/plain"}; charset=utf-8`,
      "",
    ]
      .filter(Boolean)
      .join("\n");

    const emailMessage = emailHeaders + body;

    // Encode the email message
    const encodedMessage = Buffer.from(emailMessage)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    // Send the email
    await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMessage,
      },
    });

    res.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};
