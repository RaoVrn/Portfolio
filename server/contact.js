/**
 * Shared contact-form handler.
 * Used by the local Express server (server/index.js) and the
 * Vercel serverless function (api/contact.js) — one implementation.
 *
 * Environment variables (server-side only, never in the client):
 *   RESEND_API_KEY  — Resend API key
 *   RESEND_FROM     — verified sender identity; swap this when moving
 *                     from the testing sender to a verified domain
 *   CONTACT_EMAIL   — recipient, defaults to the portfolio address
 *
 * Spam protection (lightweight): a hidden honeypot field and a
 * sliding-window rate limit per IP.
 */
import { Resend } from "resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DESTINATION = "prakash.varun.0305@gmail.com";
const MAX_MESSAGE = 5000;
const MAX_OTHER = 300;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_MAX = 8; // submissions per IP per hour

const submissions = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const windowStart = now - RATE_WINDOW_MS;
  const timestamps = (submissions.get(ip) ?? []).filter((t) => t > windowStart);
  if (timestamps.length >= RATE_MAX) {
    submissions.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  submissions.set(ip, timestamps);
  return false;
}

export async function handleContact(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ success: false, message: "Method not allowed" });
    return;
  }

  const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.headers["x-vercel-forwarded-for"] || req.ip || "unknown";
  if (rateLimited(ip)) {
    res.status(429).json({ success: false, message: "Too many messages. Please try again later." });
    return;
  }

  const body = req.body ?? {};
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const company = String(body.company ?? "").trim();
  const subject = String(body.subject ?? "").trim();
  const message = String(body.message ?? "").trim();

  // Honeypot: real users never fill this hidden field.
  if (body.company_hp) {
    res.status(400).json({ success: true, message: "Message sent successfully" });
    return;
  }

  if (!name || !email || !subject || !message) {
    res.status(400).json({ success: false, message: "Missing required fields" });
    return;
  }
  if (!EMAIL_RE.test(email)) {
    res.status(400).json({ success: false, message: "Invalid email address" });
    return;
  }
  if (name.length > MAX_OTHER || email.length > MAX_OTHER || company.length > MAX_OTHER || subject.length > MAX_OTHER || message.length > MAX_MESSAGE) {
    res.status(400).json({ success: false, message: "Input too long" });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const to = process.env.CONTACT_EMAIL || DESTINATION;

  if (!apiKey || !from) {
    console.error("[contact] Resend is not configured (RESEND_API_KEY / RESEND_FROM missing)");
    res.status(500).json({ success: false, message: "Email service is not configured" });
    return;
  }

  const submittedAt = new Date().toLocaleString("en-GB", { dateStyle: "long", timeStyle: "short" });
  const mailSubject = `Portfolio Contact — ${subject}`;

  const textBody = [
    "Portfolio Contact Message",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : "",
    `Subject: ${subject}`,
    `Message: ${message}`,
    "",
    `Submitted: ${submittedAt}`,
  ]
    .filter(Boolean)
    .join("\n");

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: mailSubject,
    html: `
      <div style="font-family: -apple-system, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
        <h2 style="margin: 0 0 16px;">Portfolio Contact Message</h2>
        <table style="border-collapse: collapse; width: 100%; font-size: 14px;">
          <tr><td style="padding: 6px 0; color: #666;">Name</td><td style="padding: 6px 0;"><strong>${escapeHtml(name)}</strong></td></tr>
          <tr><td style="padding: 6px 0; color: #666;">Email</td><td style="padding: 6px 0;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
          ${company ? `<tr><td style="padding: 6px 0; color: #666;">Company</td><td style="padding: 6px 0;">${escapeHtml(company)}</td></tr>` : ""}
          <tr><td style="padding: 6px 0; color: #666;">Subject</td><td style="padding: 6px 0;"><strong>${escapeHtml(subject)}</strong></td></tr>
          <tr><td style="padding: 6px 0; color: #666;">Submitted</td><td style="padding: 6px 0;">${escapeHtml(submittedAt)}</td></tr>
        </table>
        <div style="margin-top: 16px; padding: 14px 16px; background: #f4f4f2; border-radius: 6px; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(message)}</div>
      </div>
    `,
    text: textBody,
  });

  if (error) {
    console.error("[contact] Resend delivery failed:", error.message);
    res.status(500).json({ success: false, message: "Unable to send message" });
    return;
  }

  console.log(`[contact] Message sent — subject: "${subject}" — from: ${email} — to: ${to}`);
  res.status(200).json({ success: true, message: "Message sent successfully" });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}