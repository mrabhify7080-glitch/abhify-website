/**
 * ============================================================
 *  AbhiFY Lead API — Vercel Serverless Function
 *  POST /api/lead
 *  - Saves lead to Google Sheets
 *  - Sends email notification via Resend
 * ============================================================
 */

const { google } = require("googleapis");
const { Resend } = require("resend");

// ─── INIT ───

const resend = new Resend(process.env.RESEND_API_KEY);

function getGoogleAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

// ─── HANDLER ───

module.exports = async function handler(req, res) {
  // CORS preflight
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  res.setHeader("Access-Control-Allow-Origin", "*");

  try {
    const lead = req.body;

    if (!lead || !lead.name || !lead.whatsapp) {
      return res.status(400).json({ error: "Missing required fields: name, whatsapp" });
    }

    // Run both in parallel
    const results = await Promise.allSettled([
      saveToGoogleSheets(lead),
      sendEmailNotification(lead),
    ]);

    const sheetsResult = results[0];
    const emailResult = results[1];

    console.log("[Lead API] Sheets:", sheetsResult.status, sheetsResult.reason?.message || "OK");
    console.log("[Lead API] Email:", emailResult.status, emailResult.reason?.message || "OK");

    return res.status(200).json({
      success: true,
      message: "Lead received",
      sheets: sheetsResult.status,
      email: emailResult.status,
    });
  } catch (err) {
    console.error("[Lead API] Error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// ─── GOOGLE SHEETS ───

async function saveToGoogleSheets(lead) {
  const auth = getGoogleAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  if (!spreadsheetId) {
    throw new Error("GOOGLE_SHEET_ID not configured");
  }

  const timestamp = lead.timestamp
    ? new Date(lead.timestamp).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
    : new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  const row = [
    timestamp,
    lead.business_name || "",
    lead.city || "",
    lead.services || "",
    lead.goal || "",
    lead.existing_presence || "",
    lead.budget || "",
    lead.timeline || "",
    lead.name || "",
    lead.whatsapp || "",
    lead.email || "",
    lead.source || "",
    lead.page || "",
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Sheet1!A:M",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [row],
    },
  });
}

// ─── EMAIL NOTIFICATION ───

async function sendEmailNotification(lead) {
  const notificationEmail = process.env.NOTIFICATION_EMAIL || "abhify07@gmail.com";
  const fromEmail = process.env.FROM_EMAIL || "onboarding@resend.dev";

  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY not configured");
  }

  const timestamp = lead.timestamp
    ? new Date(lead.timestamp).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
    : new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  const urgencyEmoji =
    lead.timeline === "Immediately"
      ? "🔴 URGENT"
      : lead.timeline === "In 1–2 weeks"
      ? "🟡 Soon"
      : "🟢 Exploring";

  await resend.emails.send({
    from: `AbhiFY Leads <${fromEmail}>`,
    to: [notificationEmail],
    subject: `🚀 New Lead: ${lead.business_name || "Unknown"} — ${lead.services || "N/A"} | ${urgencyEmoji}`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; border-radius: 16px; overflow: hidden; border: 1px solid rgba(201,169,110,0.2);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #c9a96e 0%, #a8864f 100%); padding: 24px 28px;">
          <h1 style="margin: 0; font-size: 20px; color: #0a0a0a; font-weight: 700;">🚀 New Lead from AbhiFY Chat</h1>
          <p style="margin: 6px 0 0; font-size: 13px; color: rgba(10,10,10,0.7);">${timestamp}</p>
        </div>

        <!-- Body -->
        <div style="padding: 24px 28px;">
          <!-- Urgency Badge -->
          <div style="background: rgba(201,169,110,0.1); border: 1px solid rgba(201,169,110,0.2); border-radius: 8px; padding: 12px 16px; margin-bottom: 20px;">
            <span style="font-size: 14px; color: #f7f5f0;">${urgencyEmoji} — Timeline: <strong>${lead.timeline || "N/A"}</strong></span>
          </div>

          <!-- Details Table -->
          <table style="width: 100%; border-collapse: collapse;">
            ${makeEmailRow("🏢 Business", lead.business_name)}
            ${makeEmailRow("📍 City", lead.city)}
            ${makeEmailRow("📌 Services", lead.services)}
            ${makeEmailRow("🎯 Goal", lead.goal)}
            ${makeEmailRow("🌐 Existing", lead.existing_presence)}
            ${makeEmailRow("💰 Budget", lead.budget)}
            ${makeEmailRow("⏰ Timeline", lead.timeline)}
            ${makeEmailRow("👤 Name", lead.name)}
            ${makeEmailRow("📱 WhatsApp", lead.whatsapp)}
            ${makeEmailRow("📧 Email", lead.email)}
            ${makeEmailRow("📢 Source", lead.source)}
            ${makeEmailRow("🔗 Page", lead.page)}
          </table>

          <!-- CTA -->
          <div style="margin-top: 24px; text-align: center;">
            <a href="https://wa.me/${(lead.whatsapp || "").replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hi ${lead.name || ""}! 👋\nThanks for reaching out to AbhiFY. I'd love to discuss how we can help ${lead.business_name || "your brand"} with ${lead.services || "digital marketing"}.\n\nLet's connect!`)}"
               style="display: inline-block; padding: 12px 28px; background: #25d366; color: #fff; border-radius: 24px; text-decoration: none; font-weight: 600; font-size: 14px;">
              💬 Reply on WhatsApp
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="padding: 14px 28px; border-top: 1px solid rgba(201,169,110,0.1); text-align: center;">
          <p style="margin: 0; font-size: 11px; color: rgba(247,245,240,0.3);">AbhiFY Lead Notification • abhify.com</p>
        </div>
      </div>
    `,
  });
}

function makeEmailRow(label, value) {
  if (!value || value === "Skipped") return "";
  return `
    <tr>
      <td style="padding: 10px 0; border-bottom: 1px solid rgba(201,169,110,0.08); color: rgba(247,245,240,0.5); font-size: 13px; width: 120px; vertical-align: top;">${label}</td>
      <td style="padding: 10px 0; border-bottom: 1px solid rgba(201,169,110,0.08); color: #f7f5f0; font-size: 13px; font-weight: 500;">${escapeHtml(value)}</td>
    </tr>
  `;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
