/* ============================================================
   AbhiFY — app.js  •  Scandinavian Minimal Agency Engine
   ============================================================ */
(() => {
"use strict";

/* ---------- DATA ---------- */

const SERVICES = [
  { icon:"fa-solid fa-magnifying-glass-chart", title:"SEO", desc:"On-page, off-page, technical SEO and keyword strategy to rank higher and drive organic traffic." },
  { icon:"fa-brands fa-google", title:"Google Ads", desc:"Search, Display, Shopping & YouTube campaigns optimized for maximum ROAS and lead quality." },
  { icon:"fa-brands fa-meta", title:"Meta Ads", desc:"High-converting Facebook & Instagram campaigns — from creatives to lookalike audience funnels." },
  { icon:"fa-solid fa-laptop-code", title:"Website Design", desc:"Modern, responsive, conversion-focused websites built with clean code and luxury UI/UX." },
  { icon:"fa-solid fa-hashtag", title:"Social Media Marketing", desc:"Content creation, reels, community growth and strategic brand positioning across platforms." },
  { icon:"fa-solid fa-chess-knight", title:"Brand Strategy", desc:"Eye-catching brand identities, positioning strategy, color systems & digital guidelines." },
  { icon:"fa-solid fa-chart-pie", title:"Analytics & CRO", desc:"Google Analytics, Tag Manager, custom dashboards — track metrics and optimize conversion rates." },
  { icon:"fa-solid fa-envelope-open-text", title:"Email Marketing", desc:"High-converting email sequences, automated funnels, newsletter design and retention loops." },
  { icon:"fa-solid fa-pen-nib", title:"Content Marketing", desc:"SEO blog articles, copy, case studies, and editorial content that builds industry authority." },
  { icon:"fa-solid fa-palette", title:"Graphic Design", desc:"Custom brand graphics, social media templates, ad banners, and marketing collaterals." },
  { icon:"fa-solid fa-clapperboard", title:"Video Editing", desc:"High-engagement video shorts, reels, ad creatives, motion graphics and promotional videos." }
];

const PROCESS_STEPS = [
  { num:"01", title:"Discovery", desc:"Understanding your brand vision, target audience, competitive landscape, and growth KPIs." },
  { num:"02", title:"Research", desc:"In-depth keyword auditing, audience behavior analysis, and ad creative benchmarking." },
  { num:"03", title:"Planning", desc:"Crafting a custom data-driven marketing blueprint tailored for high ROI and scale." },
  { num:"04", title:"Execution", desc:"Building high-converting assets, launching campaigns, and deploying website improvements." },
  { num:"05", title:"Optimization", desc:"Continuous A/B testing, bid management, CRO tweaks, and funnel refining." },
  { num:"06", title:"Growth", desc:"Expanding reach, scaling profitable ad spend, and driving predictable monthly revenue." }
];

const PRICING_PLANS = [
  {
    name: "Starter",
    price: "₹19,999",
    period: "/month",
    desc: "Essential marketing & search visibility for growing brands.",
    featured: false,
    badge: "Essential",
    features: [
      "On-Page & Technical SEO",
      "Social Media Management (12 Posts)",
      "Google Business Profile Setup",
      "Monthly Performance Dashboard",
      "Email Support"
    ]
  },
  {
    name: "Growth",
    price: "₹49,999",
    period: "/month",
    desc: "Full-funnel digital marketing & paid performance to scale revenue.",
    featured: true,
    badge: "Most Popular",
    features: [
      "Everything in Starter",
      "Google Ads & Meta Ads Management",
      "Conversion Rate Optimization (CRO)",
      "High-Converting Landing Page Design",
      "24/7 Dedicated Account Manager",
      "Weekly ROI & Lead Reports"
    ]
  },
  {
    name: "Premium",
    price: "₹89,999",
    period: "/month",
    desc: "Complete enterprise marketing takeover & custom branding.",
    featured: false,
    badge: "Enterprise",
    features: [
      "Everything in Growth",
      "Full Custom Website / App Redesign",
      "Video Editing & Ad Creative Production",
      "Omnichannel Scale Strategy",
      "Priority Strategy Consultation",
      "Custom API & Analytics Dashboard"
    ]
  }
];

const FAQS = [
  {
    q: "How soon can I expect results from SEO & Ads campaigns?",
    a: "Google Ads & Meta Ads start generating leads within 48–72 hours of launch. SEO results typically begin compounding within 60 to 90 days as domain authority builds."
  },
  {
    q: "Do you handle custom website design & development?",
    a: "Yes! We build modern, conversion-focused websites using clean HTML, CSS, JavaScript, and WordPress tailored for fast loading speed and mobile responsiveness."
  },
  {
    q: "How do we track ROI and campaign performance?",
    a: "We set up real-time Google Analytics and custom performance dashboards so you can track leads, cost-per-acquisition (CPA), and return on ad spend (ROAS) transparently."
  },
  {
    q: "Is there a minimum contract duration?",
    a: "We offer flexible month-to-month plans as well as discounted annual growth retainers. You are never locked into long rigid contracts."
  }
];

const SKILLS = [
  { name:"SEO (On-Page & Off-Page)", level:"Expert", pct:92 },
  { name:"Google Ads", level:"Advanced", pct:88 },
  { name:"Meta Ads", level:"Advanced", pct:85 },
  { name:"Website Design", level:"Advanced", pct:87 },
  { name:"Social Media Marketing", level:"Expert", pct:90 },
  { name:"Graphic Design & Branding", level:"Advanced", pct:82 },
  { name:"Google Analytics & CRO", level:"Advanced", pct:85 },
  { name:"Content Strategy", level:"Advanced", pct:84 },
  { name:"Email & Video Automation", level:"Intermediate", pct:80 }
];

const PORTFOLIO = [
  { cat:"seo",    title:"E-Commerce SEO Overhaul",  desc:"Increased organic traffic 210% in 6 months with technical fixes and content strategy.", tags:["SEO","Technical","Content"] },
  { cat:"ads",    title:"Google Ads — Lead Gen",     desc:"Reduced CPA by 45% while scaling ad spend 3× for a real-estate client.", tags:["Google Ads","PPC","Leads"] },
  { cat:"ads",    title:"Meta Ads — D2C Brand",      desc:"Generated ₹12L revenue at 5.2× ROAS through creative testing and retargeting.", tags:["Meta Ads","E-com","ROAS"] },
  { cat:"web",    title:"SaaS Landing Page",         desc:"Conversion rate jumped from 2.1% to 6.8% after a complete redesign.", tags:["Web Design","UI/UX","CRO"] },
  { cat:"design", title:"Brand Identity — Startup",  desc:"Complete brand kit including logo, colours, typography and social templates.", tags:["Branding","Design","Identity"] },
  { cat:"seo",    title:"Local SEO — Restaurant",    desc:"#1 on Google Maps within 3 months, driving 4× more footfall.", tags:["Local SEO","GMB","Reviews"] },
  { cat:"web",    title:"Portfolio Website",          desc:"Premium portfolio with smooth animations, dark theme and mobile-first approach.", tags:["Web","Animation","Responsive"] },
  { cat:"design", title:"Social Media Kit",           desc:"30-day content calendar with designed post templates and story templates.", tags:["Design","Social","Content"] }
];

const CASE_STUDIES = [
  {
    tag:"SEO CASE STUDY",
    title:"From Page 5 to #1 — E-Commerce SEO Transformation",
    steps:[
      { label:"Problem", text:"Client's 800+ product pages had zero organic traffic — no indexing, thin content, broken links." },
      { label:"Strategy", text:"Full technical audit, content re-writing, internal linking overhaul, and 60+ high-DA backlinks." },
      { label:"Result", text:"Organic traffic grew 210% in 6 months. 32 keywords now rank in Top 3." }
    ],
    result:"+210% Organic Traffic"
  },
  {
    tag:"PAID ADS CASE STUDY",
    title:"Scaling Google Ads Revenue 3× While Cutting CPA",
    steps:[
      { label:"Problem", text:"High CPA of ₹1,200 per lead with poor keyword targeting and generic ad copy." },
      { label:"Strategy", text:"Restructured campaigns, added negative keywords, wrote benefit-driven copy, and built dedicated landing pages." },
      { label:"Result", text:"CPA dropped to ₹660 (−45%) and lead volume tripled in 4 months." }
    ],
    result:"-45% CPA  •  3× Leads"
  }
];

const TESTIMONIALS = [
  { name:"Rahul Sharma", role:"CEO, ShopEase", text:"AbhiFY completely transformed our online presence. Our SEO traffic tripled and Google Ads ROI has never been better. Highly recommended!", stars:5 },
  { name:"Priya Patel", role:"Founder, StyleHive", text:"The Meta Ads campaigns were game-changing. We saw a 5× return on our ad spend within the first two months. Incredible work!", stars:5 },
  { name:"Amit Verma", role:"Director, BuildRight", text:"Professional, data-driven and always available. AbhiFY redesigned our website and it now converts 3× more leads than before.", stars:5 },
  { name:"Sneha Kapoor", role:"Marketing Head, FreshBite", text:"Our social media went from dead to thriving. Engagement is up 400% and we're getting quality leads every single day.", stars:5 }
];

const TECHNOLOGIES = [
  { icon:"fa-brands fa-google", label:"Google Ads" },
  { icon:"fa-brands fa-meta", label:"Meta Ads" },
  { icon:"fa-brands fa-facebook-f", label:"Facebook" },
  { icon:"fa-brands fa-instagram", label:"Instagram" },
  { icon:"fa-brands fa-youtube", label:"YouTube" },
  { icon:"fa-brands fa-wordpress", label:"WordPress" },
  { icon:"fa-brands fa-shopify", label:"Shopify" },
  { icon:"fa-brands fa-html5", label:"HTML5" },
  { icon:"fa-brands fa-css3-alt", label:"CSS3" },
  { icon:"fa-brands fa-js", label:"JavaScript" },
  { icon:"fa-brands fa-figma", label:"Figma" },
  { icon:"fa-solid fa-chart-line", label:"Analytics" }
];

const GALLERY = [
  { h:220, cat:"Design" },
  { h:280, cat:"Social Media" },
  { h:200, cat:"Website" },
  { h:300, cat:"Branding" },
  { h:240, cat:"Ads" },
  { h:260, cat:"SEO Report" },
  { h:190, cat:"Email" },
  { h:310, cat:"Dashboard" }
];

const SM_PLATFORMS = [
  {
    id:"instagram", icon:"fa-brands fa-instagram", label:"Instagram",
    desc:"Content creation, reels, stories, engagement growth and influencer collaboration.",
    skills:[
      { icon:"fa-solid fa-camera", name:"Content Creation", pct:92 },
      { icon:"fa-solid fa-film", name:"Reels & Stories", pct:88 },
      { icon:"fa-solid fa-users", name:"Community Management", pct:90 },
      { icon:"fa-solid fa-chart-line", name:"Growth Strategy", pct:85 },
      { icon:"fa-solid fa-hashtag", name:"Hashtag Research", pct:87 },
      { icon:"fa-solid fa-bullseye", name:"Influencer Marketing", pct:80 }
    ]
  },
  {
    id:"facebook", icon:"fa-brands fa-facebook-f", label:"Facebook",
    desc:"Page management, group marketing, Meta Business Suite and community building.",
    skills:[
      { icon:"fa-solid fa-pager", name:"Page Management", pct:90 },
      { icon:"fa-solid fa-people-group", name:"Group Marketing", pct:85 },
      { icon:"fa-solid fa-rectangle-ad", name:"Ad Campaigns", pct:88 },
      { icon:"fa-solid fa-chart-bar", name:"Analytics & Insights", pct:86 },
      { icon:"fa-solid fa-calendar", name:"Content Planning", pct:84 },
      { icon:"fa-solid fa-shield-halved", name:"Brand Reputation", pct:82 }
    ]
  },
  {
    id:"youtube", icon:"fa-brands fa-youtube", label:"YouTube",
    desc:"Video SEO, thumbnail design, channel strategy and audience retention tactics.",
    skills:[
      { icon:"fa-solid fa-video", name:"Video SEO", pct:86 },
      { icon:"fa-solid fa-image", name:"Thumbnail Design", pct:88 },
      { icon:"fa-solid fa-tv", name:"Channel Strategy", pct:84 },
      { icon:"fa-solid fa-clock", name:"Audience Retention", pct:82 },
      { icon:"fa-solid fa-closed-captioning", name:"Subtitles & Tags", pct:80 },
      { icon:"fa-solid fa-chart-simple", name:"YouTube Analytics", pct:85 }
    ]
  },
  {
    id:"linkedin", icon:"fa-brands fa-linkedin-in", label:"LinkedIn",
    desc:"Profile optimisation, thought-leadership posts, B2B lead generation and networking.",
    skills:[
      { icon:"fa-solid fa-user-tie", name:"Profile Optimisation", pct:88 },
      { icon:"fa-solid fa-pen-nib", name:"Thought Leadership", pct:85 },
      { icon:"fa-solid fa-handshake", name:"B2B Lead Gen", pct:82 },
      { icon:"fa-solid fa-network-wired", name:"Networking", pct:86 },
      { icon:"fa-solid fa-briefcase", name:"Company Page Mgmt", pct:84 },
      { icon:"fa-solid fa-bullhorn", name:"LinkedIn Ads", pct:78 }
    ]
  }
];

const FLOAT_ICONS_DATA = [
  { icon:"fa-brands fa-instagram", top:"8%", left:"4%" },
  { icon:"fa-brands fa-facebook-f", top:"15%", right:"6%" },
  { icon:"fa-brands fa-youtube", bottom:"20%", left:"8%" },
  { icon:"fa-brands fa-linkedin-in", bottom:"12%", right:"10%" },
  { icon:"fa-brands fa-twitter", top:"45%", left:"2%" },
  { icon:"fa-brands fa-tiktok", top:"50%", right:"3%" }
];


/* ---------- HELPERS ---------- */

const $ = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => [...p.querySelectorAll(s)];

function el(tag, attrs = {}, children = []) {
  const e = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === "className") e.className = v;
    else if (k === "innerHTML") e.innerHTML = v;
    else if (k === "textContent") e.textContent = v;
    else if (k.startsWith("data-")) e.setAttribute(k, v);
    else e.setAttribute(k, v);
  });
  children.forEach(c => { if (typeof c === "string") e.append(c); else e.appendChild(c); });
  return e;
}


/* ---------- GLOBAL ANIMATED PRELOADER ENGINE ---------- */

(function initPreloader() {
  const preloaderFill = $("#preloaderFill");
  const preloaderPct  = $("#preloaderPct");
  const preCanvas     = $("#preloader-particles");
  const loader        = $("#loader");
  if (!loader) return;
  
  const DURATION = 2000; // Exactly 2.0 seconds
  const startTime = performance.now();

  function updateProgress(now) {
    const elapsed = now - startTime;
    const progress = Math.min(Math.floor((elapsed / DURATION) * 100), 100);

    if (preloaderFill) preloaderFill.style.width = progress + "%";
    if (preloaderPct)  preloaderPct.textContent  = progress + "%";

    if (progress < 100) {
      requestAnimationFrame(updateProgress);
    } else {
      setTimeout(() => {
        if (loader) {
          loader.classList.add("hide");
          setTimeout(() => { loader.style.display = "none"; }, 500);
        }
      }, 150);
    }
  }

  requestAnimationFrame(updateProgress);

  // Safety fallback for mobile
  setTimeout(() => {
    if (loader && !loader.classList.contains("hide")) {
      loader.classList.add("hide");
      setTimeout(() => { loader.style.display = "none"; }, 500);
    }
  }, 2200);

  // Particles Engine
  if (preCanvas) {
    const ctx = preCanvas.getContext("2d");
    let pList = [];
    function resizePreCanvas() {
      preCanvas.width  = window.innerWidth;
      preCanvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resizePreCanvas);
    resizePreCanvas();

    for (let i = 0; i < 25; i++) {
      pList.push({
        x: Math.random() * preCanvas.width,
        y: Math.random() * preCanvas.height,
        r: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        alpha: Math.random() * 0.5 + 0.15
      });
    }

    function animPreParticles() {
      if (loader && loader.classList.contains("hide")) return;
      ctx.clearRect(0, 0, preCanvas.width, preCanvas.height);
      pList.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > preCanvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > preCanvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(166, 124, 82, ${p.alpha})`;
        ctx.shadowColor = "#A67C52";
        ctx.shadowBlur = 6;
        ctx.fill();
      });
      requestAnimationFrame(animPreParticles);
    }
    animPreParticles();
  }
})();


/* ---------- SCROLL PROGRESS ---------- */

const scrollProg = $("#scroll-progress");
window.addEventListener("scroll", () => {
  const h = document.documentElement.scrollHeight - innerHeight;
  if (scrollProg && h > 0) scrollProg.style.width = (scrollY / h * 100) + "%";
});


/* ---------- HEADER SCROLL ---------- */

const header = $("#site-header");
window.addEventListener("scroll", () => {
  if (header) header.classList.toggle("scrolled", scrollY > 60);
});


/* ---------- CURSOR GLOW ---------- */

const glow = $("#cursor-glow");
const dot  = $("#cursor-dot");
if (glow && dot) {
  document.addEventListener("mousemove", e => {
    glow.style.left = e.clientX + "px";
    glow.style.top  = e.clientY + "px";
    dot.style.left   = e.clientX + "px";
    dot.style.top    = e.clientY + "px";
  });
}


/* ---------- BURGER / MOBILE NAV ---------- */

const burger   = $("#burger");
const mobileNav = $("#mobileNav");
const navOverlay = $("#navOverlay");
function closeMobileNav() {
  mobileNav && mobileNav.classList.remove("open");
  navOverlay && navOverlay.classList.remove("open");
}
if (burger) {
  burger.addEventListener("click", () => {
    mobileNav.classList.toggle("open");
    navOverlay.classList.toggle("open");
  });
}
if (navOverlay) navOverlay.addEventListener("click", closeMobileNav);
$$(".mobile-nav a").forEach(a => a.addEventListener("click", closeMobileNav));


/* ---------- BACK TO TOP ---------- */

const backTop = $("#back-top");
window.addEventListener("scroll", () => {
  if (backTop) backTop.classList.toggle("show", scrollY > 500);
});
if (backTop) backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));


/* ---------- RIPPLE EFFECT ---------- */

document.addEventListener("click", e => {
  const btn = e.target.closest(".rippleize");
  if (!btn) return;
  const r = document.createElement("span");
  r.className = "ripple";
  const rect = btn.getBoundingClientRect();
  const sz = Math.max(rect.width, rect.height);
  r.style.width = r.style.height = sz + "px";
  r.style.left = (e.clientX - rect.left - sz / 2) + "px";
  r.style.top  = (e.clientY - rect.top - sz / 2) + "px";
  btn.appendChild(r);
  r.addEventListener("animationend", () => r.remove());
});


/* ---------- TYPED ROLE ---------- */

const roles = ["Digital Marketer", "SEO Specialist", "Google Ads Expert", "Meta Ads Strategist", "Website Designer", "Content Creator", "Brand Builder"];
const typedEl = $("#typed-role");
if (typedEl) {
  let ri = 0, ci = 0, deleting = false;
  function typeLoop() {
    const word = roles[ri];
    if (!deleting) {
      typedEl.textContent = word.slice(0, ++ci);
      if (ci === word.length) { deleting = true; setTimeout(typeLoop, 1800); return; }
      setTimeout(typeLoop, 90);
    } else {
      typedEl.textContent = word.slice(0, --ci);
      if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; setTimeout(typeLoop, 400); return; }
      setTimeout(typeLoop, 45);
    }
  }
  typeLoop();
}


/* ---------- COUNT-UP ---------- */

function animateCounters(entries, obs) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.dataset.target;
    const dur = 2000;
    const start = performance.now();
    function step(now) {
      const t = Math.min((now - start) / dur, 1);
      el.textContent = Math.floor(t * target);
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
    obs.unobserve(el);
  });
}
const countObs = new IntersectionObserver(animateCounters, { threshold: 0.5 });
$$(".count-up").forEach(el => countObs.observe(el));
  // Horizontal Skill Bars Observer
  const hbarObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const fill = e.target;
      fill.style.width = fill.dataset.pct + "%";
      hbarObs.unobserve(fill);
    });
  }, { threshold: 0.2 });
  $$(".hbar-fill").forEach(el => hbarObs.observe(el));


/* ---------- SCROLL REVEAL ---------- */

const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); revealObs.unobserve(e.target); } });
}, { threshold: 0.12 });
$$(".reveal, .reveal-zoom").forEach(el => revealObs.observe(el));

/* ---------- FAQ ACCORDION TOGGLE ---------- */
document.addEventListener("click", e => {
  const q = e.target.closest(".faq-question");
  if (!q) return;
  const item = q.closest(".faq-item");
  if (!item) return;
  const isOpen = item.classList.contains("active");
  $$(".faq-item").forEach(el => el.classList.remove("active"));
  if (!isOpen) item.classList.add("active");
});


/* ---------- PARTICLES (Warm Champagne) ---------- */

const pCanvas = $("#particles-canvas");
if (pCanvas) {
  const ctx = pCanvas.getContext("2d");
  let particles = [];
  function resizeCanvas() { pCanvas.width = pCanvas.offsetWidth; pCanvas.height = pCanvas.offsetHeight; }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * pCanvas.width;
      this.y = Math.random() * pCanvas.height;
      this.r = Math.random() * 2.2 + .5;
      this.vx = (Math.random() - .5) * .4;
      this.vy = (Math.random() - .5) * .4;
      this.alpha = Math.random() * .4 + .1;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > pCanvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > pCanvas.height) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(183,144,104,${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 70; i++) particles.push(new Particle());

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(166,124,82,${.14 * (1 - d / 120)})`;
          ctx.lineWidth = .5;
          ctx.stroke();
        }
      }
    }
  }

  function animParticles() {
    ctx.clearRect(0, 0, pCanvas.width, pCanvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(animParticles);
  }
  animParticles();
}


/* ---------- RENDER: SERVICES (11 Premium Cards) ---------- */

const servicesGrid = $("#servicesGrid");
if (servicesGrid) {
  SERVICES.forEach((s, i) => {
    const card = el("div", { className: "service-card glass-card reveal" });
    card.style.setProperty("--i", i);
    card.innerHTML = `
      <span class="service-num">${i + 1 < 10 ? '0' + (i + 1) : i + 1}</span>
      <div class="service-icon"><i class="${s.icon}"></i></div>
      <h3>${s.title}</h3>
      <p>${s.desc}</p>`;
    servicesGrid.appendChild(card);
  });
  $$(".reveal", servicesGrid).forEach(el => revealObs.observe(el));
}


/* ---------- RENDER: FAQ ACCORDION ---------- */

const faqWrap = $("#faqWrap");
if (faqWrap) {
  FAQS.forEach((f, i) => {
    const item = el("div", { className: `faq-item glass-card${i === 0 ? " active" : ""}` });
    item.innerHTML = `
      <div class="faq-question">
        <span>${f.q}</span>
        <i class="fa-solid fa-chevron-down"></i>
      </div>
      <div class="faq-answer">
        <p>${f.a}</p>
      </div>`;
    item.querySelector(".faq-question").addEventListener("click", () => {
      item.classList.toggle("active");
    });
    faqWrap.appendChild(item);
  });
}


/* ---------- RENDER: PROCESS TIMELINE ---------- */

const processGrid = $("#processGrid");
if (processGrid) {
  PROCESS_STEPS.forEach((p, i) => {
    const card = el("div", { className: "process-card glass-card reveal" });
    card.style.setProperty("--i", i);
    card.innerHTML = `
      <div class="process-num">${p.num}</div>
      <h4>${p.title}</h4>
      <p>${p.desc}</p>`;
    processGrid.appendChild(card);
  });
  $$(".reveal", processGrid).forEach(el => revealObs.observe(el));
}


/* ---------- RENDER: PRICING ---------- */

const pricingGrid = $("#pricingGrid");
if (pricingGrid) {
  PRICING_PLANS.forEach((p, i) => {
    const card = el("div", { className: `pricing-card glass-card reveal${p.featured ? " pricing-card-featured" : ""}` });
    card.style.setProperty("--i", i);
    card.innerHTML = `
      <div>
        <span class="pricing-badge">${p.badge}</span>
        <h3>${p.name}</h3>
        <div class="pricing-price"><b>${p.price}</b><span>${p.period}</span></div>
        <p style="font-size:13.5px;color:var(--text-secondary);">${p.desc}</p>
        <ul class="pricing-features">
          ${p.features.map(f => `<li><i class="fa-solid fa-circle-check"></i>${f}</li>`).join("")}
        </ul>
      </div>
      <a href="contact.html" class="btn ${p.featured ? "btn-primary" : "btn-outline"} rippleize" style="margin-top:28px;width:100%;justify-content:center;">
        Get Started
      </a>`;
    pricingGrid.appendChild(card);
  });
  $$(".reveal", pricingGrid).forEach(el => revealObs.observe(el));
}


/* ---------- BLOG CATEGORY FILTER ---------- */

const blogTabs = $$(".blog-tab");
const blogCards = $$(".blog-card");
if (blogTabs.length > 0) {
  blogTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      blogTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const cat = tab.dataset.cat;
      blogCards.forEach(card => {
        if (cat === "all" || card.dataset.cat === cat) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

const skillsGrid = $("#skillsGrid");
if (skillsGrid) {
  SKILLS.forEach((s, i) => {
    const item = el("div", { className: "skill-item reveal" });
    item.style.setProperty("--i", i);
    const offset = 251 - (251 * s.pct / 100);
    item.innerHTML = `
      <div class="skill-ring">
        <svg viewBox="0 0 92 92">
          <circle class="bg" cx="46" cy="46" r="40"/>
          <circle class="bar" cx="46" cy="46" r="40" data-offset="${offset}"/>
        </svg>
        <span>${s.pct}%</span>
      </div>
      <div class="skill-info">
        <h4>${s.name}</h4>
        <span>${s.level}</span>
      </div>`;
    skillsGrid.appendChild(item);
  });
  const skillObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const bar = e.target.querySelector(".bar");
      if (bar) bar.style.strokeDashoffset = bar.dataset.offset;
      skillObs.unobserve(e.target);
    });
  }, { threshold: 0.3 });
  $$(".skill-item", skillsGrid).forEach(el => { revealObs.observe(el); skillObs.observe(el); });
}


/* ---------- RENDER: PORTFOLIO ---------- */

const portfolioGrid = $("#portfolioGrid");
if (portfolioGrid) {
  function renderPortfolio(filter) {
    portfolioGrid.innerHTML = "";
    const items = filter === "all" ? PORTFOLIO : PORTFOLIO.filter(p => p.cat === filter);
    items.forEach((p, i) => {
      const card = el("div", { className: "pf-card glass-card reveal" });
      card.style.setProperty("--i", i);
      card.innerHTML = `
        <div class="pf-thumb">
          <div class="img-placeholder shimmer">
            <i class="fa-solid fa-folder-open ph-icon"></i>
            <span class="ph-label">${p.cat}</span>
          </div>
          <div class="pf-overlay"><div class="pf-tags">${p.tags.map(t => `<span>${t}</span>`).join("")}</div></div>
        </div>
        <div class="pf-body">
          <h3>${p.title}</h3>
          <p>${p.desc}</p>
          <div class="pf-btns">
            <a href="#" class="solid">View Details</a>
            <a href="#">Live Demo</a>
          </div>
        </div>`;
      portfolioGrid.appendChild(card);
    });
    $$(".reveal", portfolioGrid).forEach(el => { el.classList.add("in"); });
  }
  renderPortfolio("all");

  $$(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      $$(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderPortfolio(btn.dataset.filter);
    });
  });
}


/* ---------- RENDER: CASE STUDIES ---------- */

const csTimeline = $("#csTimeline");
if (csTimeline) {
  CASE_STUDIES.forEach((cs, i) => {
    const card = el("div", { className: "cs-card glass-card reveal" });
    card.style.setProperty("--i", i);
    card.innerHTML = `
      <div class="cs-banner">
        <div class="img-placeholder shimmer">
          <i class="fa-solid fa-chart-line ph-icon"></i>
          <span class="ph-label">Case Study ${i + 1}</span>
        </div>
      </div>
      <div class="cs-content">
        <span class="cs-tag">${cs.tag}</span>
        <h3>${cs.title}</h3>
        <div class="cs-steps">
          ${cs.steps.map(s => `<div class="cs-step"><b><i class="fa-solid fa-circle" style="font-size:6px"></i>${s.label}</b><p>${s.text}</p></div>`).join("")}
        </div>
        <div class="cs-result"><i class="fa-solid fa-arrow-trend-up"></i>${cs.result}</div>
      </div>`;
    csTimeline.appendChild(card);
  });
  $$(".reveal", csTimeline).forEach(el => revealObs.observe(el));
}


/* ---------- RENDER: TESTIMONIALS ---------- */

const testiWrap = $("#testiWrap");
if (testiWrap) {
  let curSlide = 0;
  let slides = [];

  TESTIMONIALS.forEach((t, i) => {
    const slide = el("div", { className: `testi-slide${i === 0 ? " active" : ""}` });
    slide.innerHTML = `
      <div class="testi-avatar">
        <div class="img-placeholder shimmer" style="border-radius:50%;width:100%;height:100%;">
          <i class="fa-solid fa-user ph-icon" style="font-size:24px"></i>
        </div>
      </div>
      <div class="testi-stars">${"★".repeat(t.stars)}</div>
      <p class="testi-text">"${t.text}"</p>
      <div class="testi-name">${t.name}</div>
      <div class="testi-role">${t.role}</div>`;
    testiWrap.appendChild(slide);
    slides.push(slide);
  });

  const dotsWrap = el("div", { className: "testi-dots" });
  TESTIMONIALS.forEach((_, i) => {
    const d = el("span", { className: i === 0 ? "active" : "" });
    d.addEventListener("click", () => goSlide(i));
    dotsWrap.appendChild(d);
  });
  testiWrap.appendChild(dotsWrap);

  function goSlide(idx) {
    slides[curSlide].classList.remove("active");
    $$(".testi-dots span", testiWrap)[curSlide].classList.remove("active");
    curSlide = idx;
    slides[curSlide].classList.add("active");
    $$(".testi-dots span", testiWrap)[curSlide].classList.add("active");
  }

  setInterval(() => goSlide((curSlide + 1) % slides.length), 5000);
}


/* ---------- RENDER: TECHNOLOGIES ---------- */

const techGrid = $("#techGrid");
if (techGrid) {
  TECHNOLOGIES.forEach((t, i) => {
    const item = el("div", { className: "tech-item glass-card reveal" });
    item.style.setProperty("--i", i);
    item.innerHTML = `<i class="${t.icon}"></i><span>${t.label}</span>`;
    techGrid.appendChild(item);
  });
  $$(".reveal", techGrid).forEach(el => revealObs.observe(el));
}


/* ---------- RENDER: GALLERY ---------- */

const galleryGrid = $("#galleryGrid");
if (galleryGrid) {
  GALLERY.forEach((g, i) => {
    const item = el("div", { className: "gallery-item reveal", "data-cat": g.cat });
    item.innerHTML = `
      <div class="img-placeholder shimmer" style="height:${g.h}px">
        <i class="fa-solid fa-image ph-icon"></i>
        <span class="ph-label">${g.cat}</span>
      </div>`;
    item.addEventListener("click", () => openLightbox(i));
    galleryGrid.appendChild(item);
  });
  $$(".reveal", galleryGrid).forEach(el => revealObs.observe(el));
}


/* ---------- LIGHTBOX ---------- */

const lightbox = $("#lightbox");
const lbClose  = $("#lbClose");
const lbPrev   = $("#lbPrev");
const lbNext   = $("#lbNext");
const lbLabel  = $("#lbLabel");
let lbIdx = 0;

function openLightbox(idx) {
  lbIdx = idx;
  if (lbLabel) lbLabel.textContent = GALLERY[idx].cat;
  lightbox && lightbox.classList.add("open");
}
function closeLightbox() { lightbox && lightbox.classList.remove("open"); }

if (lbClose) lbClose.addEventListener("click", closeLightbox);
if (lightbox) lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });
if (lbPrev) lbPrev.addEventListener("click", () => { lbIdx = (lbIdx - 1 + GALLERY.length) % GALLERY.length; if (lbLabel) lbLabel.textContent = GALLERY[lbIdx].cat; });
if (lbNext) lbNext.addEventListener("click", () => { lbIdx = (lbIdx + 1) % GALLERY.length; if (lbLabel) lbLabel.textContent = GALLERY[lbIdx].cat; });


/* ---------- RENDER: SOCIAL MEDIA ---------- */

const smTabs  = $("#smTabs");
const smCards = $("#smCards");
const smFloat = $("#smFloatIcons");

if (smTabs && smCards) {
  if (smFloat) {
    FLOAT_ICONS_DATA.forEach((fi, i) => {
      const icon = el("div", { className: "fi" });
      icon.innerHTML = `<i class="${fi.icon}"></i>`;
      icon.style.animationDelay = `${i * 1.2}s`;
      if (fi.top) icon.style.top = fi.top;
      if (fi.bottom) icon.style.bottom = fi.bottom;
      if (fi.left) icon.style.left = fi.left;
      if (fi.right) icon.style.right = fi.right;
      smFloat.appendChild(icon);
    });
  }

  SM_PLATFORMS.forEach((p, i) => {
    const btn = el("button", { className: `sm-tab-btn${i === 0 ? " active" : ""}`, "data-id": p.id });
    btn.innerHTML = `<i class="${p.icon}"></i>${p.label}`;
    btn.addEventListener("click", () => switchSM(p.id));
    smTabs.appendChild(btn);
  });

  SM_PLATFORMS.forEach((p, i) => {
    const card = el("div", { className: `sm-card glass-card${i === 0 ? " active" : ""}`, "data-id": p.id });
    card.innerHTML = `
      <div class="sm-card-head">
        <div class="sm-card-icon"><i class="${p.icon}"></i></div>
        <div><h3>${p.label} Management</h3><span>${p.desc}</span></div>
      </div>
      <div class="sm-skill-list">
        ${p.skills.map(s => `
          <div class="sm-skill">
            <div class="sm-skill-top">
              <div class="sm-skill-icon"><i class="${s.icon}"></i></div>
              <span class="sm-skill-name">${s.name}</span>
              <span class="sm-skill-pct">${s.pct}%</span>
            </div>
            <div class="sm-bar"><div class="sm-bar-fill" data-pct="${s.pct}"></div></div>
          </div>`).join("")}
      </div>`;
    smCards.appendChild(card);
  });

  function switchSM(id) {
    $$(".sm-tab-btn", smTabs).forEach(b => b.classList.toggle("active", b.dataset.id === id));
    $$(".sm-card", smCards).forEach(c => c.classList.toggle("active", c.dataset.id === id));
    setTimeout(() => animateSMBars(), 100);
  }

  function animateSMBars() {
    const activeCard = $(".sm-card.active", smCards);
    if (!activeCard) return;
    $$(".sm-bar-fill", activeCard).forEach(bar => {
      bar.style.width = "0%";
      setTimeout(() => { bar.style.width = bar.dataset.pct + "%"; }, 50);
    });
  }

  const smObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      animateSMBars();
      smObs.unobserve(e.target);
    });
  }, { threshold: 0.2 });
  smObs.observe(smCards);
}


/* ---------- RENDER: PREVIEW SERVICES (Home page - 6 Cards) ---------- */

const previewGrid = $("#previewServicesGrid");
if (previewGrid) {
  SERVICES.slice(0, 6).forEach((s, i) => {
    const card = el("div", { className: "service-card glass-card reveal" });
    card.style.setProperty("--i", i);
    card.innerHTML = `
      <span class="service-num">0${i + 1}</span>
      <div class="service-icon"><i class="${s.icon}"></i></div>
      <h3>${s.title}</h3>
      <p>${s.desc}</p>`;
    previewGrid.appendChild(card);
  });
  $$(".reveal", previewGrid).forEach(el => revealObs.observe(el));
}


/* ---------- PARALLAX HERO IMAGE ---------- */

const parallaxImg = $("#parallaxImg");
if (parallaxImg) {
  window.addEventListener("mousemove", e => {
    const x = (e.clientX / innerWidth - .5) * 16;
    const y = (e.clientY / innerHeight - .5) * 16;
    parallaxImg.style.transform = `translate(${x}px, ${y}px)`;
  });
}


/* ---------- ACTIVE NAV LINK ---------- */

(function setActiveNav() {
  const path = location.pathname.split("/").pop() || "index.html";
  const map = {
    "index.html": "Home",
    "": "Home",
    "about.html": "About",
    "services.html": "Services",
    "portfolio.html": "Portfolio",
    "social-media.html": "Social Media",
    "gallery.html": "Gallery",
    "contact.html": "Contact"
  };
  const activeLabel = map[path];
  if (!activeLabel) return;

  $$(".nav-links a").forEach(a => {
    if (a.textContent.trim() === activeLabel) a.classList.add("active");
  });
  $$(".mobile-nav a").forEach(a => {
    if (a.textContent.trim() === activeLabel) a.classList.add("active");
  });
})();


/* ---------- SEND MESSAGE (WhatsApp redirect) ---------- */

const sendBtn = $("#sendMsgBtn");
if (sendBtn) {
  sendBtn.addEventListener("click", () => {
    const name  = $(".form-card input[type='text']")?.value || "";
    const email = $(".form-card input[type='email']")?.value || "";
    const phone = $(".form-card input[type='tel']")?.value || "";
    const msg   = $(".form-card textarea")?.value || "";
    const body  = `Hi AbhiFY!%0A%0AName: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0APhone: ${encodeURIComponent(phone)}%0AMessage: ${encodeURIComponent(msg)}`;
    window.open(`https://wa.me/919569890314?text=${body}`, "_blank");
  });
}/* ================= FOOTER CONSTELLATION MESH ANIMATION ================= */
function initFooterMeshCanvas() {
  const footer = document.querySelector("footer");
  if (!footer) return;

  // Create canvas if not existing
  let canvas = document.getElementById("footerMeshCanvas");
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.id = "footerMeshCanvas";
    canvas.className = "footer-mesh-canvas";
    footer.insertBefore(canvas, footer.firstChild);
  }

  const ctx = canvas.getContext("2d");
  let width, height;
  let particles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 18), 75);
  const connectionDist = 145;

  let mouse = { x: -1000, y: -1000, radius: 190 };

  function resize() {
    width = canvas.width = footer.offsetWidth;
    height = canvas.height = footer.offsetHeight;
  }

  window.addEventListener("resize", resize);
  resize();

  footer.addEventListener("mousemove", (e) => {
    const rect = footer.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  footer.addEventListener("mouseleave", () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.9;
      this.vy = (Math.random() - 0.5) * 0.9;
      this.radius = Math.random() * 2 + 1.8;
      this.baseAlpha = Math.random() * 0.45 + 0.35;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse interactive push/pull effect
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouse.radius) {
        const force = (mouse.radius - dist) / mouse.radius;
        this.x -= (dx / dist) * force * 1.6;
        this.y -= (dy / dist) * force * 1.6;
      }
    }

    draw() {
      const isDark = document.body.classList.contains("dark") || document.documentElement.getAttribute("data-theme") === "dark";
      const color = isDark ? "225, 185, 125" : "166, 124, 82";

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color}, ${this.baseAlpha})`;
      ctx.fill();
    }
  }

  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    const isDark = document.body.classList.contains("dark") || document.documentElement.getAttribute("data-theme") === "dark";
    const lineColor = isDark ? "220, 180, 130" : "166, 124, 82";

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionDist) {
          const alpha = (1 - dist / connectionDist) * 0.38;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${lineColor}, ${alpha})`;
          ctx.lineWidth = 1.15;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initFooterMeshCanvas);
} else {
  initFooterMeshCanvas();
}

/* ---------- COUNT-UP ANIMATION ---------- */
function initCountUp() {
  const counters = document.querySelectorAll('.count-up');
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2000;
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCountUp);
} else {
  initCountUp();
}

/* ---------- SERVICES CATEGORY SCROLLSPY & NAVIGATION ---------- */
function initCategoryScrollSpy() {
  const pills = document.querySelectorAll('.cat-nav-pill');
  const sections = document.querySelectorAll('.category-section');
  if (!pills.length || !sections.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        pills.forEach(pill => {
          if (pill.getAttribute('href') === '#' + id) {
            pill.classList.add('active');
            pill.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
          } else {
            pill.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCategoryScrollSpy);
} else {
  initCategoryScrollSpy();
}

})();

