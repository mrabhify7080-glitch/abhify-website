/**
 * ============================================================
 *  ABHI — AI Chat Widget for AbhiFY Digital Marketing
 *  Self-contained: HTML + CSS + JS in one file.
 *  Embed with: <script src="abhi-chat-widget.js"></script>
 * ============================================================
 */
(function () {
  "use strict";

  /* ──────────────────── CONFIGURATION ──────────────────── */

  const ABHI_CONFIG = {
    apiEndpoint: "https://abhify-leads.vercel.app/api/lead", // Change after Vercel deploy
    ownerWhatsApp: "919569890314",
    brandName: "AbhiFY",
    primaryColor: "#c9a96e",
    bgColor: "#0a0a0a",
    textColor: "#f7f5f0",
    typingDelay: 1200, // ms before bot message appears
  };

  /* ──────────────────── QUESTION FLOW ──────────────────── */
  // Edit this array to change the conversation — no core code changes needed.

  const QUESTIONS = [
    {
      id: "business_name",
      type: "text",
      message:
        "\uD83D\uDC4B Hey! I'm Abhi from AbhiFY.\nLet's see how we can grow your brand digitally!\n\nWhat's your business or brand name?",
      placeholder: "Your business name…",
    },
    {
      id: "city",
      type: "text",
      message: "Nice! Which city are you based in?",
      placeholder: "Your city…",
    },
    {
      id: "services",
      type: "multi-select",
      message: "What services are you interested in? (select all that apply)",
      options: [
        "SEO",
        "Google Ads",
        "Meta Ads",
        "Website Design",
        "Graphic Design",
        "Social Media Marketing",
        "Full Package",
      ],
    },
    {
      id: "goal",
      type: "single-select",
      message: "What's your main marketing goal right now?",
      options: [
        "More Leads",
        "Brand Awareness",
        "More Sales",
        "Website Traffic",
        "Grow Social Followers",
      ],
    },
    {
      id: "existing_presence",
      type: "text",
      message:
        "Do you have an existing website or social media handle?\n(you can skip if you don't have one yet)",
      placeholder: "URL or @handle…",
      optional: true,
      skipLabel: "Skip →",
    },
    {
      id: "budget",
      type: "single-select",
      message: "What's your estimated monthly marketing budget?",
      options: [
        "₹5k – ₹15k",
        "₹15k – ₹30k",
        "₹30k – ₹50k",
        "₹50k+",
        "Not sure yet",
      ],
    },
    {
      id: "timeline",
      type: "single-select",
      message: "When are you looking to get started?",
      options: ["Immediately", "In 1–2 weeks", "Just exploring"],
    },
    {
      id: "name",
      type: "text",
      message:
        "Awesome! Let's grab your contact info so our team can reach out.\n\nYour name?",
      placeholder: "Full name…",
    },
    {
      id: "whatsapp",
      type: "text",
      message: "Your WhatsApp number?",
      placeholder: "+91 XXXXX XXXXX",
      validation: "phone",
    },
    {
      id: "email",
      type: "text",
      message: "Your email address? (optional — you can skip)",
      placeholder: "you@email.com",
      optional: true,
      skipLabel: "Skip →",
    },
    {
      id: "source",
      type: "single-select",
      message: "Last one! How did you hear about AbhiFY?",
      options: [
        "Instagram",
        "Google Search",
        "Referral / Friend",
        "Facebook",
        "Other",
      ],
    },
  ];

  /* ──────────────────── CSS ──────────────────── */

  const WIDGET_CSS = `
    /* ── RESET & HOST ── */
    #abhi-chat-root,
    #abhi-chat-root *,
    #abhi-chat-root *::before,
    #abhi-chat-root *::after {
      margin: 0 !important; padding: 0; box-sizing: border-box !important;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
      -webkit-font-smoothing: antialiased;
      line-height: normal;
    }

    /* ── LAUNCHER ── */
    #abhi-launcher {
      position: fixed !important;
      bottom: 24px !important;
      right: 24px !important;
      width: 62px !important;
      height: 62px !important;
      border-radius: 50% !important;
      background: ${ABHI_CONFIG.bgColor} !important;
      border: 2px solid ${ABHI_CONFIG.primaryColor} !important;
      cursor: pointer !important;
      z-index: 999998 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      opacity: 1 !important;
      visibility: visible !important;
      pointer-events: all !important;
      box-shadow:
        0 4px 24px rgba(201,169,110,0.25),
        0 0 0 0 rgba(201,169,110,0.4);
      transition: transform 0.3s cubic-bezier(.4,0,.2,1), box-shadow 0.3s ease;
      animation: abhi-pulse 2.5s infinite ease-in-out;
    }
    #abhi-launcher:hover {
      transform: scale(1.08);
      box-shadow: 0 6px 32px rgba(201,169,110,0.4);
    }
    #abhi-launcher.abhi-open {
      animation: none !important;
      transform: scale(0.9) rotate(90deg) !important;
      opacity: 0 !important;
      pointer-events: none !important;
    }
    @keyframes abhi-pulse {
      0%, 100% { box-shadow: 0 4px 24px rgba(201,169,110,0.25), 0 0 0 0 rgba(201,169,110,0.35); }
      50% { box-shadow: 0 4px 24px rgba(201,169,110,0.25), 0 0 0 12px rgba(201,169,110,0); }
    }

    /* Launcher Icon */
    #abhi-launcher-icon {
      width: 30px !important;
      height: 30px !important;
      fill: ${ABHI_CONFIG.primaryColor} !important;
      transition: transform 0.3s ease;
      display: block !important;
    }

    /* ── NOTIFICATION BADGE ── */
    #abhi-badge {
      position: absolute;
      top: -2px;
      right: -2px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #e74c3c;
      color: #fff;
      font-size: 11px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transform: scale(0);
      transition: all 0.3s cubic-bezier(.68,-.55,.27,1.55);
    }
    #abhi-badge.abhi-show { opacity: 1; transform: scale(1); }

    /* ── CHAT WINDOW ── */
    #abhi-window {
      position: fixed !important;
      bottom: 100px !important;
      right: 24px !important;
      width: 388px !important;
      max-height: 580px;
      background: ${ABHI_CONFIG.bgColor} !important;
      border-radius: 20px;
      border: 1px solid rgba(201,169,110,0.2);
      box-shadow:
        0 20px 60px rgba(0,0,0,0.5),
        0 0 0 1px rgba(201,169,110,0.08),
        inset 0 1px 0 rgba(255,255,255,0.04);
      z-index: 999999 !important;
      display: flex !important;
      flex-direction: column;
      overflow: hidden;
      opacity: 0;
      transform: translateY(20px) scale(0.95);
      pointer-events: none;
      transition: opacity 0.35s cubic-bezier(.4,0,.2,1),
                  transform 0.35s cubic-bezier(.4,0,.2,1);
    }
    #abhi-window.abhi-visible {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: all;
    }

    /* ── HEADER ── */
    #abhi-header {
      padding: 16px 18px;
      display: flex;
      align-items: center;
      gap: 12px;
      background: linear-gradient(135deg, rgba(201,169,110,0.12) 0%, rgba(10,10,10,0.95) 100%);
      border-bottom: 1px solid rgba(201,169,110,0.15);
      position: relative;
      flex-shrink: 0;
    }
    #abhi-avatar {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: linear-gradient(135deg, ${ABHI_CONFIG.primaryColor}, #a8864f);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: 800;
      color: ${ABHI_CONFIG.bgColor};
      flex-shrink: 0;
      box-shadow: 0 2px 12px rgba(201,169,110,0.3);
    }
    #abhi-header-info { flex: 1; }
    #abhi-header-name {
      font-size: 15px;
      font-weight: 700;
      color: ${ABHI_CONFIG.textColor};
      letter-spacing: 0.3px;
    }
    #abhi-header-status {
      font-size: 11.5px;
      color: rgba(247,245,240,0.5);
      display: flex;
      align-items: center;
      gap: 5px;
      margin-top: 2px;
    }
    #abhi-header-status::before {
      content: '';
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #4ade80;
      display: inline-block;
      animation: abhi-online-pulse 2s infinite;
    }
    @keyframes abhi-online-pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }
    #abhi-close {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.08);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.2s, transform 0.2s;
      flex-shrink: 0;
    }
    #abhi-close:hover {
      background: rgba(255,255,255,0.12);
      transform: rotate(90deg);
    }
    #abhi-close svg {
      width: 14px;
      height: 14px;
      stroke: rgba(247,245,240,0.6);
      stroke-width: 2.5;
    }

    /* ── PROGRESS BAR ── */
    #abhi-progress-wrap {
      height: 3px;
      background: rgba(201,169,110,0.1);
      flex-shrink: 0;
    }
    #abhi-progress {
      height: 100%;
      width: 0%;
      background: linear-gradient(90deg, ${ABHI_CONFIG.primaryColor}, #e0c48a);
      border-radius: 0 3px 3px 0;
      transition: width 0.5s cubic-bezier(.4,0,.2,1);
    }

    /* ── MESSAGES AREA ── */
    #abhi-messages {
      flex: 1;
      overflow-y: auto;
      padding: 18px 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      scroll-behavior: smooth;
      min-height: 0;
    }
    #abhi-messages::-webkit-scrollbar { width: 4px; }
    #abhi-messages::-webkit-scrollbar-track { background: transparent; }
    #abhi-messages::-webkit-scrollbar-thumb {
      background: rgba(201,169,110,0.2);
      border-radius: 4px;
    }

    /* ── MESSAGE BUBBLES ── */
    .abhi-msg {
      max-width: 85%;
      padding: 12px 16px;
      border-radius: 16px;
      font-size: 13.5px;
      line-height: 1.55;
      animation: abhi-msg-in 0.35s cubic-bezier(.4,0,.2,1) both;
      white-space: pre-line;
      word-break: break-word;
    }
    @keyframes abhi-msg-in {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .abhi-msg-bot {
      background: rgba(201,169,110,0.1);
      border: 1px solid rgba(201,169,110,0.12);
      color: ${ABHI_CONFIG.textColor};
      border-bottom-left-radius: 4px;
      align-self: flex-start;
    }
    .abhi-msg-user {
      background: linear-gradient(135deg, ${ABHI_CONFIG.primaryColor}, #a8864f);
      color: ${ABHI_CONFIG.bgColor};
      font-weight: 500;
      border-bottom-right-radius: 4px;
      align-self: flex-end;
    }

    /* ── TYPING INDICATOR ── */
    .abhi-typing {
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 14px 18px;
      background: rgba(201,169,110,0.1);
      border: 1px solid rgba(201,169,110,0.12);
      border-radius: 16px;
      border-bottom-left-radius: 4px;
      align-self: flex-start;
      animation: abhi-msg-in 0.3s cubic-bezier(.4,0,.2,1) both;
    }
    .abhi-typing-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: ${ABHI_CONFIG.primaryColor};
      animation: abhi-bounce 1.4s infinite ease-in-out;
    }
    .abhi-typing-dot:nth-child(2) { animation-delay: 0.16s; }
    .abhi-typing-dot:nth-child(3) { animation-delay: 0.32s; }
    @keyframes abhi-bounce {
      0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
      30% { transform: translateY(-6px); opacity: 1; }
    }

    /* ── OPTION BUTTONS ── */
    .abhi-options {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      padding: 4px 0;
      align-self: flex-start;
      max-width: 92%;
      animation: abhi-msg-in 0.35s cubic-bezier(.4,0,.2,1) both;
      animation-delay: 0.05s;
    }
    .abhi-opt-btn {
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      border: 1.5px solid rgba(201,169,110,0.35);
      background: rgba(201,169,110,0.06);
      color: ${ABHI_CONFIG.textColor};
      transition: all 0.25s cubic-bezier(.4,0,.2,1);
      user-select: none;
      white-space: nowrap;
    }
    .abhi-opt-btn:hover {
      background: rgba(201,169,110,0.18);
      border-color: ${ABHI_CONFIG.primaryColor};
      transform: translateY(-1px);
    }
    .abhi-opt-btn.abhi-selected {
      background: ${ABHI_CONFIG.primaryColor};
      color: ${ABHI_CONFIG.bgColor};
      border-color: ${ABHI_CONFIG.primaryColor};
      font-weight: 600;
    }
    .abhi-opt-btn:disabled {
      opacity: 0.5;
      cursor: default;
      transform: none;
    }

    /* Multi-select confirm */
    .abhi-confirm-wrap {
      display: flex;
      gap: 8px;
      align-self: flex-start;
      animation: abhi-msg-in 0.3s cubic-bezier(.4,0,.2,1) both;
    }
    .abhi-confirm-btn {
      padding: 8px 22px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      border: none;
      background: ${ABHI_CONFIG.primaryColor};
      color: ${ABHI_CONFIG.bgColor};
      transition: all 0.2s;
    }
    .abhi-confirm-btn:hover { filter: brightness(1.1); transform: translateY(-1px); }
    .abhi-confirm-btn:disabled { opacity: 0.4; cursor: default; transform: none; }

    /* ── INPUT AREA ── */
    #abhi-input-area {
      padding: 12px 14px;
      border-top: 1px solid rgba(201,169,110,0.12);
      display: none;
      gap: 10px;
      align-items: center;
      flex-shrink: 0;
      background: rgba(10,10,10,0.6);
    }
    #abhi-input-area.abhi-active { display: flex; }
    #abhi-input {
      flex: 1;
      padding: 10px 16px;
      border-radius: 24px;
      border: 1.5px solid rgba(201,169,110,0.2);
      background: rgba(255,255,255,0.04);
      color: ${ABHI_CONFIG.textColor};
      font-size: 13.5px;
      outline: none;
      transition: border-color 0.2s;
    }
    #abhi-input::placeholder { color: rgba(247,245,240,0.3); }
    #abhi-input:focus { border-color: rgba(201,169,110,0.5); }
    #abhi-send {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      border: none;
      background: ${ABHI_CONFIG.primaryColor};
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s, filter 0.2s;
      flex-shrink: 0;
    }
    #abhi-send:hover { transform: scale(1.06); filter: brightness(1.12); }
    #abhi-send svg {
      width: 16px;
      height: 16px;
      fill: ${ABHI_CONFIG.bgColor};
    }
    #abhi-skip-btn {
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      border: 1px solid rgba(255,255,255,0.12);
      background: transparent;
      color: rgba(247,245,240,0.5);
      transition: all 0.2s;
      white-space: nowrap;
    }
    #abhi-skip-btn:hover { color: ${ABHI_CONFIG.textColor}; border-color: rgba(255,255,255,0.25); }

    /* ── VALIDATION ERROR ── */
    #abhi-error {
      font-size: 11px;
      color: #f87171;
      padding: 0 18px 4px;
      display: none;
      flex-shrink: 0;
    }
    #abhi-error.abhi-show { display: block; }

    /* ── SUMMARY CARD ── */
    .abhi-summary {
      background: rgba(201,169,110,0.07);
      border: 1px solid rgba(201,169,110,0.18);
      border-radius: 16px;
      padding: 18px;
      align-self: flex-start;
      max-width: 92%;
      animation: abhi-msg-in 0.4s cubic-bezier(.4,0,.2,1) both;
    }
    .abhi-summary-title {
      font-size: 14px;
      font-weight: 700;
      color: ${ABHI_CONFIG.primaryColor};
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .abhi-summary-row {
      display: flex;
      gap: 8px;
      padding: 6px 0;
      border-bottom: 1px solid rgba(201,169,110,0.08);
      font-size: 12.5px;
    }
    .abhi-summary-row:last-child { border-bottom: none; }
    .abhi-summary-label {
      color: rgba(247,245,240,0.45);
      min-width: 80px;
      font-weight: 500;
      flex-shrink: 0;
    }
    .abhi-summary-value {
      color: ${ABHI_CONFIG.textColor};
      font-weight: 500;
    }

    /* ── CTA BUTTONS (post-submit) ── */
    .abhi-cta-wrap {
      display: flex;
      flex-direction: column;
      gap: 8px;
      align-self: flex-start;
      max-width: 92%;
      animation: abhi-msg-in 0.35s cubic-bezier(.4,0,.2,1) both;
    }
    .abhi-cta {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 11px 20px;
      border-radius: 24px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      border: none;
      text-decoration: none;
      transition: all 0.25s;
    }
    .abhi-cta-whatsapp {
      background: #25d366;
      color: #fff;
    }
    .abhi-cta-whatsapp:hover { filter: brightness(1.1); transform: translateY(-1px); }
    .abhi-cta-whatsapp svg { width: 18px; height: 18px; fill: #fff; }

    /* ── POWERED BY ── */
    #abhi-powered {
      text-align: center;
      padding: 8px;
      font-size: 10px;
      color: rgba(247,245,240,0.2);
      border-top: 1px solid rgba(201,169,110,0.06);
      flex-shrink: 0;
    }
    #abhi-powered a {
      color: rgba(201,169,110,0.4);
      text-decoration: none;
    }
    #abhi-powered a:hover { color: ${ABHI_CONFIG.primaryColor}; }

    /* ── MOBILE (COMPACT FLOATING CHAT BOX) ── */
    @media (max-width: 480px) {
      #abhi-window {
        position: fixed !important;
        bottom: 74px !important;
        right: 12px !important;
        left: auto !important;
        top: auto !important;
        width: calc(100vw - 24px) !important;
        max-width: 360px !important;
        height: 68vh !important;
        max-height: 480px !important;
        min-height: 380px !important;
        border-radius: 20px !important;
        border: 1.5px solid rgba(201,169,110,0.35) !important;
        box-shadow: 0 16px 48px rgba(0,0,0,0.85), 0 0 20px rgba(201,169,110,0.15) !important;
        z-index: 999999 !important;
        display: flex !important;
        flex-direction: column !important;
        overflow: hidden !important;
      }
      #abhi-header {
        padding: 12px 14px !important;
        flex-shrink: 0 !important;
        border-bottom: 1px solid rgba(201,169,110,0.2) !important;
      }
      #abhi-avatar {
        width: 36px !important;
        height: 36px !important;
        font-size: 15px !important;
      }
      #abhi-header-name {
        font-size: 14px !important;
        font-weight: 700 !important;
      }
      #abhi-header-status {
        font-size: 11px !important;
      }
      #abhi-messages {
        flex: 1 !important;
        min-height: 0 !important;
        padding: 14px 12px !important;
        overflow-y: auto !important;
        -webkit-overflow-scrolling: touch !important;
      }
      .abhi-msg {
        max-width: 88% !important;
        padding: 10px 13px !important;
        font-size: 13px !important;
        line-height: 1.5 !important;
      }
      .abhi-options {
        max-width: 100% !important;
        gap: 6px !important;
      }
      .abhi-opt-btn {
        padding: 7px 12px !important;
        font-size: 12px !important;
      }
      #abhi-input-area {
        padding: 10px 12px !important;
        flex-shrink: 0 !important;
        background: rgba(10,10,10,0.95) !important;
        border-top: 1px solid rgba(201,169,110,0.2) !important;
      }
      #abhi-input {
        font-size: 16px !important; /* Prevents iOS auto-zoom */
        padding: 9px 14px !important;
        border-radius: 20px !important;
      }
      #abhi-send {
        width: 36px !important;
        height: 36px !important;
      }
      #abhi-launcher {
        bottom: 16px !important;
        right: 16px !important;
        width: 50px !important;
        height: 50px !important;
        z-index: 999998 !important;
      }
    }

    /* ── GRAIN OVERLAY ── */
    #abhi-window::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 0;
      border-radius: inherit;
    }
    #abhi-window > * { position: relative; z-index: 1; }
  `;

  /* ──────────────────── HTML ──────────────────── */

  const WIDGET_HTML = `
    <!-- Launcher Button -->
    <button id="abhi-launcher" aria-label="Open chat with Abhi">
      <svg id="abhi-launcher-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/>
        <path d="M7 9h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"/>
      </svg>
      <span id="abhi-badge">1</span>
    </button>

    <!-- Chat Window -->
    <div id="abhi-window">
      <!-- Header -->
      <div id="abhi-header">
        <div id="abhi-avatar">A</div>
        <div id="abhi-header-info">
          <div id="abhi-header-name">Abhi</div>
          <div id="abhi-header-status">Online</div>
        </div>
        <button id="abhi-close" aria-label="Close chat">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="6" y1="6" x2="18" y2="18"/>
            <line x1="18" y1="6" x2="6" y2="18"/>
          </svg>
        </button>
      </div>

      <!-- Progress -->
      <div id="abhi-progress-wrap">
        <div id="abhi-progress"></div>
      </div>

      <!-- Messages -->
      <div id="abhi-messages"></div>

      <!-- Validation Error -->
      <div id="abhi-error"></div>

      <!-- Input Area -->
      <div id="abhi-input-area">
        <input id="abhi-input" type="text" autocomplete="off" />
        <button id="abhi-send" aria-label="Send">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </div>

      <!-- Powered By -->
      <div id="abhi-powered">
        Powered by <a href="https://abhify.com" target="_blank" rel="noopener">AbhiFY</a>
      </div>
    </div>
  `;

  /* ──────────────────── INJECT ──────────────────── */

  function injectWidget() {
    try {
      console.log("[Abhi Widget] Initializing...");

      // Load Google Font via link element (not @import)
      const fontLink = document.createElement("link");
      fontLink.rel = "stylesheet";
      fontLink.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap";
      document.head.appendChild(fontLink);

      // Inject CSS
      const style = document.createElement("style");
      style.setAttribute("id", "abhi-chat-styles");
      style.textContent = WIDGET_CSS;
      document.head.appendChild(style);

      // Create root
      const root = document.createElement("div");
      root.id = "abhi-chat-root";
      root.innerHTML = WIDGET_HTML;
      document.body.appendChild(root);

      console.log("[Abhi Widget] DOM injected, launcher:", document.getElementById("abhi-launcher"));

      // Move #back-top button above chatbot launcher so it doesn't overlap when scrolling
      const backTop = document.getElementById("back-top");
      if (backTop) {
        backTop.style.setProperty("bottom", "96px", "important");
        backTop.style.setProperty("right", "28px", "important");
      }

      initChat();
      console.log("[Abhi Widget] Ready!");
    } catch (err) {
      console.error("[Abhi Widget] Init error:", err);
    }
  }

  /* ──────────────────── CHAT ENGINE ──────────────────── */

  function initChat() {
    const launcher = document.getElementById("abhi-launcher");
    const win = document.getElementById("abhi-window");
    const closeBtn = document.getElementById("abhi-close");
    const messagesEl = document.getElementById("abhi-messages");
    const inputArea = document.getElementById("abhi-input-area");
    const inputEl = document.getElementById("abhi-input");
    const sendBtn = document.getElementById("abhi-send");
    const progressBar = document.getElementById("abhi-progress");
    const errorEl = document.getElementById("abhi-error");
    const badge = document.getElementById("abhi-badge");

    let currentStep = 0;
    let answers = {};
    let multiSelections = [];
    let isOpen = false;
    let hasStarted = false;

    // Show badge after 3 seconds
    setTimeout(() => {
      if (!isOpen) badge.classList.add("abhi-show");
    }, 3000);

    // Lock/Unlock background scroll on mobile
    function lockBodyScroll() {
      if (window.innerWidth <= 480) {
        document.body.style.overflow = "hidden";
      }
    }
    function unlockBodyScroll() {
      document.body.style.overflow = "";
    }

    // Open/Close
    launcher.addEventListener("click", () => {
      isOpen = true;
      launcher.classList.add("abhi-open");
      win.classList.add("abhi-visible");
      badge.classList.remove("abhi-show");
      lockBodyScroll();
      if (!hasStarted) {
        hasStarted = true;
        showBotMessage(QUESTIONS[0].message, () => {
          showQuestionUI(QUESTIONS[0]);
        });
      }
    });

    closeBtn.addEventListener("click", () => {
      isOpen = false;
      launcher.classList.remove("abhi-open");
      win.classList.remove("abhi-visible");
      unlockBodyScroll();
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isOpen) closeBtn.click();
    });

    // Send button & Enter key
    sendBtn.addEventListener("click", handleTextSubmit);
    inputEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleTextSubmit();
    });

    // ── UTILITY ──

    function scrollBottom() {
      setTimeout(() => {
        messagesEl.scrollTop = messagesEl.scrollHeight;
      }, 50);
    }

    function updateProgress() {
      const pct = Math.round((currentStep / QUESTIONS.length) * 100);
      progressBar.style.width = pct + "%";
    }

    function hideError() {
      errorEl.classList.remove("abhi-show");
      errorEl.textContent = "";
    }

    function showError(msg) {
      errorEl.textContent = msg;
      errorEl.classList.add("abhi-show");
    }

    // ── BOT MESSAGE ──

    function showTyping() {
      const el = document.createElement("div");
      el.className = "abhi-typing";
      el.id = "abhi-typing-indicator";
      el.innerHTML = '<div class="abhi-typing-dot"></div><div class="abhi-typing-dot"></div><div class="abhi-typing-dot"></div>';
      messagesEl.appendChild(el);
      scrollBottom();
      return el;
    }

    function showBotMessage(text, callback) {
      const typingEl = showTyping();
      setTimeout(() => {
        typingEl.remove();
        const msg = document.createElement("div");
        msg.className = "abhi-msg abhi-msg-bot";
        msg.textContent = text;
        messagesEl.appendChild(msg);
        scrollBottom();
        if (callback) setTimeout(callback, 150);
      }, ABHI_CONFIG.typingDelay);
    }

    function showUserMessage(text) {
      const msg = document.createElement("div");
      msg.className = "abhi-msg abhi-msg-user";
      msg.textContent = text;
      messagesEl.appendChild(msg);
      scrollBottom();
    }

    // ── QUESTION UI ──

    function showQuestionUI(q) {
      hideError();
      inputArea.classList.remove("abhi-active");

      if (q.type === "text") {
        inputArea.classList.add("abhi-active");
        inputEl.placeholder = q.placeholder || "Type here…";
        inputEl.value = "";
        inputEl.focus();

        // Show skip button if optional
        let skipBtn = document.getElementById("abhi-skip-btn");
        if (skipBtn) skipBtn.remove();

        if (q.optional) {
          skipBtn = document.createElement("button");
          skipBtn.id = "abhi-skip-btn";
          skipBtn.textContent = q.skipLabel || "Skip →";
          skipBtn.addEventListener("click", () => {
            handleAnswer(q, "Skipped");
          });
          inputArea.appendChild(skipBtn);
        }
      } else if (q.type === "single-select") {
        showOptions(q, false);
      } else if (q.type === "multi-select") {
        multiSelections = [];
        showOptions(q, true);
      }
    }

    function showOptions(q, isMulti) {
      const wrap = document.createElement("div");
      wrap.className = "abhi-options";

      q.options.forEach((opt) => {
        const btn = document.createElement("button");
        btn.className = "abhi-opt-btn";
        btn.textContent = opt;

        if (isMulti) {
          btn.addEventListener("click", () => {
            if (btn.classList.contains("abhi-selected")) {
              btn.classList.remove("abhi-selected");
              multiSelections = multiSelections.filter((s) => s !== opt);
            } else {
              btn.classList.add("abhi-selected");
              multiSelections.push(opt);
            }
            // Enable/disable confirm button
            const confirmBtn = wrap.parentElement.querySelector(".abhi-confirm-btn");
            if (confirmBtn) confirmBtn.disabled = multiSelections.length === 0;
          });
        } else {
          btn.addEventListener("click", () => {
            // Disable all buttons
            wrap.querySelectorAll(".abhi-opt-btn").forEach((b) => {
              b.disabled = true;
            });
            btn.classList.add("abhi-selected");
            handleAnswer(q, opt);
          });
        }

        wrap.appendChild(btn);
      });

      messagesEl.appendChild(wrap);
      scrollBottom();

      // For multi-select, add a confirm button
      if (isMulti) {
        const confirmWrap = document.createElement("div");
        confirmWrap.className = "abhi-confirm-wrap";
        const confirmBtn = document.createElement("button");
        confirmBtn.className = "abhi-confirm-btn";
        confirmBtn.textContent = "Confirm \u2713";
        confirmBtn.disabled = true;
        confirmBtn.addEventListener("click", () => {
          if (multiSelections.length === 0) return;
          // Disable all
          wrap.querySelectorAll(".abhi-opt-btn").forEach((b) => (b.disabled = true));
          confirmBtn.disabled = true;
          handleAnswer(q, multiSelections.join(", "));
        });
        confirmWrap.appendChild(confirmBtn);
        messagesEl.appendChild(confirmWrap);
        scrollBottom();
      }
    }

    // ── TEXT SUBMIT ──

    function handleTextSubmit() {
      const q = QUESTIONS[currentStep];
      if (!q || q.type !== "text") return;

      const val = inputEl.value.trim();
      if (!val && !q.optional) {
        showError("Please enter a response to continue.");
        return;
      }
      if (!val && q.optional) {
        handleAnswer(q, "Skipped");
        return;
      }

      // Validation
      if (q.validation === "phone") {
        const cleaned = val.replace(/[\s\-\(\)]/g, "");
        if (!/^\+?\d{10,15}$/.test(cleaned)) {
          showError("Please enter a valid phone number (10+ digits).");
          return;
        }
      }

      handleAnswer(q, val);
    }

    // ── HANDLE ANSWER ──

    function handleAnswer(q, value) {
      hideError();
      inputArea.classList.remove("abhi-active");

      // Remove skip button if present
      const skipBtn = document.getElementById("abhi-skip-btn");
      if (skipBtn) skipBtn.remove();

      answers[q.id] = value;
      showUserMessage(value);

      currentStep++;
      updateProgress();

      if (currentStep < QUESTIONS.length) {
        // Next question
        const nextQ = QUESTIONS[currentStep];
        showBotMessage(nextQ.message, () => {
          showQuestionUI(nextQ);
        });
      } else {
        // Done — show summary
        progressBar.style.width = "100%";
        showCompletionFlow();
      }
    }

    // ── COMPLETION ──

    function showCompletionFlow() {
      showBotMessage(
        "Thank you! \uD83C\uDF89 Here's a summary of your details:",
        () => {
          showSummaryCard();
          setTimeout(() => {
            submitLead();
          }, 500);
        }
      );
    }

    function showSummaryCard() {
      const card = document.createElement("div");
      card.className = "abhi-summary";

      const labels = {
        business_name: "Business",
        city: "City",
        services: "Services",
        goal: "Goal",
        existing_presence: "Existing",
        budget: "Budget",
        timeline: "Timeline",
        name: "Name",
        whatsapp: "WhatsApp",
        email: "Email",
        source: "Source",
      };

      let html = '<div class="abhi-summary-title">\uD83D\uDCCB Lead Summary</div>';
      for (const q of QUESTIONS) {
        const val = answers[q.id];
        if (val && val !== "Skipped") {
          html += `<div class="abhi-summary-row">
            <span class="abhi-summary-label">${labels[q.id] || q.id}</span>
            <span class="abhi-summary-value">${escapeHtml(val)}</span>
          </div>`;
        }
      }

      card.innerHTML = html;
      messagesEl.appendChild(card);
      scrollBottom();
    }

    function escapeHtml(str) {
      const div = document.createElement("div");
      div.textContent = str;
      return div.innerHTML;
    }

    // ── SUBMIT TO BACKEND ──

    async function submitLead() {
      const payload = {
        ...answers,
        timestamp: new Date().toISOString(),
        page: window.location.href,
        userAgent: navigator.userAgent,
      };

      try {
        const res = await fetch(ABHI_CONFIG.apiEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          showBotMessage(
            "Your details have been sent to the AbhiFY team! \uD83D\uDE80\nWe'll reach out within a few hours.\n\nWant to connect right now? Tap below to message us on WhatsApp:",
            () => {
              showWhatsAppCTA();
            }
          );
        } else {
          throw new Error("API error");
        }
      } catch (err) {
        console.error("[Abhi Widget] Lead submit error:", err);
        // Still show WhatsApp option as fallback
        showBotMessage(
          "I've noted all your details! Our team will get back to you soon. \uD83D\uDE4C\n\nYou can also connect directly on WhatsApp:",
          () => {
            showWhatsAppCTA();
          }
        );
      }
    }

    function showWhatsAppCTA() {
      const waText = encodeURIComponent(
        `Hi AbhiFY! \uD83D\uDC4B\n\nI just filled out the chat on your website. Here are my details:\n\n` +
          `\uD83C\uDFE2 Business: ${answers.business_name || "N/A"}\n` +
          `\uD83D\uDCCD City: ${answers.city || "N/A"}\n` +
          `\uD83D\uDCCC Services: ${answers.services || "N/A"}\n` +
          `\uD83C\uDFAF Goal: ${answers.goal || "N/A"}\n` +
          `\uD83D\uDCB0 Budget: ${answers.budget || "N/A"}\n` +
          `\u23F0 Timeline: ${answers.timeline || "N/A"}\n` +
          `\uD83D\uDC64 Name: ${answers.name || "N/A"}\n\n` +
          `Looking forward to hearing from you!`
      );

      const ctaWrap = document.createElement("div");
      ctaWrap.className = "abhi-cta-wrap";
      ctaWrap.innerHTML = `
        <a class="abhi-cta abhi-cta-whatsapp" href="https://wa.me/${ABHI_CONFIG.ownerWhatsApp}?text=${waText}" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Chat on WhatsApp
        </a>
      `;
      messagesEl.appendChild(ctaWrap);
      scrollBottom();
    }
  }

  /* ──────────────────── INIT ──────────────────── */

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectWidget);
  } else {
    injectWidget();
  }
})();
