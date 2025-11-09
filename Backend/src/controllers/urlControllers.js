import path from "path";
import fs from "fs";
import axios from "axios";
import dotenv from "dotenv";
import { google } from "googleapis";
import { oAuth2Client } from "../services/auth.js";
import db from "../config/db.js";

dotenv.config();

// Candidate token paths to support different working directories
const TOKEN_CANDIDATES = [
  path.join(process.cwd(), "../token.json"), // if cwd is Backend
  path.join(process.cwd(), "token.json"), // if cwd is repo root
  path.resolve("token.json"),
  path.resolve("..", "token.json"),
];

function resolveTokenPath() {
  for (const p of TOKEN_CANDIDATES) {
    try {
      if (fs.existsSync(p)) return p;
    } catch (_) {}
  }
  // default to repo root guess
  return path.join(process.cwd(), "token.json");
}

const TOKEN_PATH = resolveTokenPath();
export const OPEN_AI_MODEL = "deepseek/deepseek-chat-v3.1:free";

export function decodeBase64Url(str) {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  str = str.padEnd(str.length + ((4 - (str.length % 4)) % 4), "=");
  return Buffer.from(str, "base64").toString("utf-8");
}

export const healthCheck = (req, res) => res.send("App is running");

export const checkGoogleAuth = (req, res) => {
  try {
    const exists = fs.existsSync(TOKEN_PATH);
    if (!exists) return res.json({ authenticated: false });
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf-8"));
    return res.json({ authenticated: Boolean(token?.access_token) });
  } catch (err) {
    return res.json({ authenticated: false });
  }
};










// Analytics Endpoints

// AI Email Generation
