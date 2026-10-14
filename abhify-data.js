/* ============================================================
   AbhiFY — abhify-data.js  •  Centralized Data Layer
   Single source of truth for services, pricing, launch offers,
   timelines, deliverables, FAQs, and portfolio data.
   ============================================================ */

const ABHIFY_DATA = {
  agency: {
    name: "AbhiFY",
    tagline: "Turning Strategy Into Measurable Growth",
    phone: "+91 9569890314",
    phoneAlt: "+91 7080630314",
    email: "abhify07@gmail.com",
    address: "Civil Lines, Unnao, Uttar Pradesh 209801",
    whatsapp: "https://wa.me/919569890314"
  },

  // 3 Featured Launch Offers on Homepage
  featuredLaunchOffers: [
    {
      id: "offer-realestate-sprint",
      tag: "REAL ESTATE SPECIAL",
      title: "Real Estate Lead Engine",
      subtitle: "Full digital sales pipeline for builders & property consultants",
      badge: "Save 40%",
      regularPrice: "₹45,000",
      offerPrice: "₹26,999",
      period: "/first month",
      timeline: "7-10 Days Setup",
      highlights: [
        "High-converting property landing page with WhatsApp capture",
        "Targeted Google Search & Meta Lead ads setup in local radius",
        "Automated WhatsApp lead instant-reply sequence",
        "Lead qualification script & tracking spreadsheet"
      ],
      ctaText: "Claim Real Estate Offer",
      ctaLink: "contact.html?service=real-estate-offer",
      popular: true
    },
    {
      id: "offer-seo-starter",
      tag: "SEARCH VISIBILITY",
      title: "Local SEO Growth Sprint",
      subtitle: "Dominate local Google rankings and Google Maps in 90 days",
      badge: "Save 35%",
      regularPrice: "₹24,999",
      offerPrice: "₹15,999",
      period: "/month",
      timeline: "5-7 Days Setup",
      highlights: [
        "Complete Google Business Profile (GBP) audit & 100% optimization",
        "30 Local citation submissions on high-authority directories",
        "Keyword ranking tracking for top 15 high-intent buyer searches",
        "On-page schema markup and local geo-tagging"
      ],
      ctaText: "Claim SEO Offer",
      ctaLink: "contact.html?service=seo-offer",
      popular: false
    },
    {
      id: "offer-brand-launch",
      tag: "COMPLETE DIGITAL PRESENCE",
      title: "Brand Identity + Web Kickstart",
      subtitle: "Launch your business online with world-class design in 14 days",
      badge: "Save 45%",
      regularPrice: "₹55,000",
      offerPrice: "₹29,999",
      period: "one-time",
      timeline: "10-14 Days Delivery",
      highlights: [
        "Custom 5-page responsive website with dark/light luxury UI",
        "Premium vector logo design with complete brand guidelines",
        "Social media launch kit (10 branded banners + templates)",
        "Domain, SSL, fast hosting setup & Google Analytics 4 integration"
      ],
      ctaText: "Claim Brand Launch",
      ctaLink: "contact.html?service=brand-launch-offer",
      popular: false
    }
  ],

  // 6 Core Services with deep page detail
  coreServices: {
    "seo": {
      slug: "service-seo.html",
      name: "Search Engine Optimization (SEO)",
      shortDesc: "Data-driven SEO strategies that elevate search rankings, build domain authority, and generate continuous inbound organic leads.",
      startingPrice: "₹14,999/mo",
      regularPrice: "₹22,000/mo",
      launchOfferPrice: "₹14,999/mo",
      setupFee: "Waived during launch (Save ₹5,000)",
      timeline: "5–7 Days initial technical audit & roadmap",
      resultExpectation: "Initial keyword ranking shifts in 4–8 weeks; compound organic traffic growth in 3–6 months",
      icon: "fa-solid fa-magnifying-glass-chart",
      problemsSolved: [
        "Your website is invisible on page 3+ of Google search results",
        "Competitors are capturing all local buyer intent searches",
        "High reliance on costly paid ads with zero residual organic traffic",
        "Technical errors, slow speed, and bad mobile experience penalizing rank"
      ],
      howItWorks: [
        { step: "01", title: "Comprehensive Deep Audit", desc: "We run a 120-point technical, on-page, and backlink audit to identify every bottleneck." },
        { step: "02", title: "Keyword & Competitor Intelligence", desc: "Pinpointing high-intent, high-converting commercial search queries in your niche." },
        { step: "03", title: "On-Page & Architecture Fixes", desc: "Rewriting title tags, meta descriptions, heading structures, internal linking, and Schema.org." },
        { step: "04", title: "Content & Authority Building", desc: "Publishing keyword-targeted authority content and acquiring genuine local and niche backlinks." },
        { step: "05", title: "Monitoring & Monthly Reporting", desc: "Live Google Search Console and GA4 tracking showing exact clicks, rankings, and lead numbers." }
      ],
      benefits: [
        { metric: "200%+", title: "Organic Traffic Growth", desc: "Build permanent organic equity without ongoing pay-per-click charges." },
        { metric: "Top 3", title: "Google Map Pack Ranking", desc: "Win dominant local search positioning for customers ready to buy." },
        { metric: "60%", title: "Lower Cost Per Lead", desc: "Dramatically lower your blended customer acquisition costs over time." }
      ],
      deliverables: [
        "120-point Technical SEO audit & fix report",
        "Google Business Profile (GBP) 100% complete optimization",
        "Keyword research report (30-50 targeted search terms)",
        "On-page optimization for up to 15 core website pages",
        "Monthly content plan with 4 SEO-optimized blog articles",
        "30+ High-authority local citations and directory links",
        "Monthly executive ranking and traffic progress report"
      ],
      faqs: [
        {
          q: "How long does it realistically take to see SEO results?",
          a: "Local SEO optimizations (Google Maps) often show ranking improvements within 30 to 45 days. Broader organic search rankings typically start showing noticeable traction in 60 to 90 days as Google indexes updates and authority builds."
        },
        {
          q: "Do you guarantee #1 ranking on Google?",
          a: "No honest agency can guarantee a specific #1 position because Google's algorithm uses 200+ factors. However, we guarantee strict adherence to white-hat SEO best practices, proven strategies, and transparent metric tracking that has consistently placed our clients on Page 1."
        },
        {
          q: "What is the difference between Local SEO and National SEO?",
          a: "Local SEO targets customers in specific cities or radius areas (e.g., 'Real Estate Agent in Unnao' or 'Dental Clinic Kanpur') focusing heavily on Google Business Profile and local citations. National SEO targets wider keyword competition across India or globally."
        }
      ]
    },

    "google-ads": {
      slug: "service-google-ads.html",
      name: "Google Ads & PPC Management",
      shortDesc: "High-ROI Google Search, Display, and Performance Max ad campaigns engineered to capture ready-to-buy customers at the lowest CPA.",
      startingPrice: "₹16,999/mo",
      regularPrice: "₹25,000/mo",
      launchOfferPrice: "₹16,999/mo",
      setupFee: "Waived during launch (Save ₹6,000)",
      timeline: "3–5 Days account architecture & creative build",
      resultExpectation: "First qualified leads generated within 48–72 hours of campaign launch",
      icon: "fa-brands fa-google",
      problemsSolved: [
        "Burning ad budget on irrelevant search clicks with zero qualified leads",
        "High cost-per-lead (CPA) eating away your profit margins",
        "Lack of negative keyword filtering resulting in junk phone calls",
        "No conversion tracking setup to prove where sales are coming from"
      ],
      howItWorks: [
        { step: "01", title: "Funnel Strategy & Keyword Mapping", desc: "We structure campaigns around high commercial-intent search keywords." },
        { step: "02", title: "Compelling Ad Copy & Extensions", desc: "Writing persuasive headline variations with callouts, sitelinks, and structured snippets." },
        { step: "03", title: "Conversion Tracking Implementation", desc: "Configuring Google Tag Manager, GA4 events, and call-tracking triggers." },
        { step: "04", title: "Daily Bid & Negative Keyword Pruning", desc: "Aggressively eliminating wasteful spend and optimizing smart bidding algorithms." },
        { step: "05", title: "Landing Page CRO Guidance", desc: "Refining your page headline, form fields, and mobile CTA to maximize conversion rate." }
      ],
      benefits: [
        { metric: "48-72h", title: "Fast Lead Generation", desc: "Start receiving inbound phone calls and inquiries right after launch." },
        { metric: "-35%", title: "Average CPA Reduction", desc: "Continuous negative keyword pruning stops wasted ad spend." },
        { metric: "4.5x+", title: "Average ROAS Achieved", desc: "Focus strictly on high-intent transactional buyer keywords." }
      ],
      deliverables: [
        "Complete Google Ads account architecture & structure",
        "Comprehensive keyword research & competitor ad spy audit",
        "Negative keyword list with 200+ junk search terms blocked",
        "High-converting ad copy variations (Responsive Search Ads)",
        "Google Tag Manager (GTM) conversion tracking & call tracking",
        "A/B split testing of headlines and call-to-actions",
        "Weekly performance monitoring and bi-weekly optimization reports"
      ],
      faqs: [
        {
          q: "Is ad spend included in the management fee?",
          a: "No, your ad budget is paid directly to Google via your credit card or Google billing account. Our fee covers strategy, setup, copywriting, daily bid management, conversion tracking, and ongoing optimization."
        },
        {
          q: "What is the recommended minimum ad budget?",
          a: "For local service businesses and real estate in Tier 1/2 cities in India, we recommend a minimum ad budget of ₹15,000 to ₹30,000 per month for statistically significant testing and steady lead flow."
        },
        {
          q: "Can you stop junk leads from clicking my ads?",
          a: "Yes. We implement strict match-type controls (phrase and exact match), comprehensive negative keyword lists, location targeting exclusions, and device bid adjustments to eliminate junk searches."
        }
      ]
    },

    "meta-ads": {
      slug: "service-meta-ads.html",
      name: "Meta Ads (Facebook & Instagram)",
      shortDesc: "Stop-scrolling creative ads and precision audience targeting funnels designed to scale direct-to-consumer sales and high-ticket B2B leads.",
      startingPrice: "₹15,999/mo",
      regularPrice: "₹24,000/mo",
      launchOfferPrice: "₹15,999/mo",
      setupFee: "Waived during launch (Save ₹5,000)",
      timeline: "4–6 Days creative design & pixel configuration",
      resultExpectation: "Leads start coming in within 24–48 hours post-learning phase",
      icon: "fa-brands fa-meta",
      problemsSolved: [
        "Boosting posts directly with no targeting strategy and getting only vanity likes",
        "Ad fatigue causing CPA to double after just two weeks",
        "Pixel tracking broken or not receiving Conversions API events",
        "Unqualified leads filling forms with wrong phone numbers"
      ],
      howItWorks: [
        { step: "01", title: "Target Audience Profiling", desc: "Building lookalikes, custom retargeting pools, and laser-targeted interest personas." },
        { step: "02", title: "Creative Production & Scripting", desc: "Designing thumb-stopping static graphics, carousel cards, and video hooks." },
        { step: "03", title: "CAPI & Meta Pixel Setup", desc: "Setting up server-side Conversions API (CAPI) to bypass iOS privacy restrictions." },
        { step: "04", title: "Instant Form & WhatsApp Funnel", desc: "Deploying high-intent instant forms with custom screening questions." },
        { step: "05", title: "Scaling Winners & Audience Refresh", desc: "Budget scaling on winning ads while constantly testing new creatives." }
      ],
      benefits: [
        { metric: "3-5x", title: "Return on Ad Spend (ROAS)", desc: "Hyper-targeted visual ads that captivate attention and stimulate demand." },
        { metric: "100%", title: "Server-Side Tracking", desc: "Meta CAPI integration ensures accurate tracking despite iOS limitations." },
        { metric: "Instant", title: "WhatsApp Direct Funnels", desc: "Connect prospective buyers directly into your WhatsApp inbox for fast closing." }
      ],
      deliverables: [
        "Full Meta Business Suite & Ad Account setup",
        "Meta Pixel + Conversions API (CAPI) integration",
        "8-12 Custom designed ad creatives per month (Static & Carousels)",
        "Persuasive ad copy in English & Hindi targeting buyer psychology",
        "Instant Lead Form configuration with OTP validation filters",
        "Audience segmentation (Cold Prospecting, Warm Engaged, Hot Retargeting)",
        "Bi-weekly performance review and creative refreshment"
      ],
      faqs: [
        {
          q: "Why do I get fake or uninterested leads from Facebook ads?",
          a: "Standard instant forms auto-fill contact info with old Facebook data. We fix this by enabling 'Higher Intent' forms with custom questions, manual phone confirmation, or direct click-to-WhatsApp funnels where users message you first."
        },
        {
          q: "How many creative ad variations do you make?",
          a: "We produce 8 to 12 distinct creative assets every month, testing multiple hooks, color palettes, and angles to combat ad fatigue and identify top performers."
        },
        {
          q: "Can Meta ads work for real estate or local B2B?",
          a: "Absolutely. Meta Ads are one of the most powerful channels for real estate property showcases and local businesses when paired with geographic pin-drop targeting and video walkthroughs."
        }
      ]
    },

    "web-design": {
      slug: "service-web-design.html",
      name: "Custom Website Design & Development",
      shortDesc: "Ultra-fast, mobile-responsive, conversion-optimized websites built with modern UI/UX design to turn casual visitors into paying clients.",
      startingPrice: "₹24,999 (One-Time)",
      regularPrice: "₹40,000",
      launchOfferPrice: "₹24,999",
      setupFee: "Zero hidden charges — includes free 1st year domain & SSL setup",
      timeline: "10–14 Business Days from kickoff to launch",
      resultExpectation: "Sub-2 second load times, 90+ Google PageSpeed score, 2x higher inquiry conversion rates",
      icon: "fa-solid fa-laptop-code",
      problemsSolved: [
        "Outdated website that looks terrible on mobile phones and damages credibility",
        "Slow-loading pages losing 50%+ of visitors before they even read your headline",
        "No clear call-to-action or WhatsApp integration, leaving visitors stranded",
        "Clunky WordPress sites loaded with bloated plugins that break constantly"
      ],
      howItWorks: [
        { step: "01", title: "Wireframing & Conversion Architecture", desc: "Structuring pages for maximum user engagement, clear hierarchy, and friction-free CTAs." },
        { step: "02", title: "Luxury Scandinavian Minimal Design", desc: "Crafting modern dark/light UI with bespoke typography, glassmorphism, and brand accents." },
        { step: "03", title: "Clean, Lightweight Coding", desc: "Building responsive, semantic code that scores 90+ on Google PageSpeed Insights." },
        { step: "04", title: "Lead Form & WhatsApp Integration", desc: "Setting up instant lead delivery to your email, Google Sheets, and WhatsApp." },
        { step: "05", title: "QA Testing & Live Deployment", desc: "Cross-browser testing, SSL configuration, SEO meta tagging, and smooth server deployment." }
      ],
      benefits: [
        { metric: "< 1.5s", title: "Lightning Fast Speed", desc: "Clean code architecture ensures instant loading and superior user retention." },
        { metric: "100%", title: "Mobile Optimized", desc: "Flawless rendering across iPhones, Android devices, tablets, and desktop displays." },
        { metric: "2-3x", title: "Higher Inquiry Rate", desc: "Conversion-first layout with floating WhatsApp and strategic CTA placement." }
      ],
      deliverables: [
        "Custom designed 5 to 10 page responsive website",
        "Conversion-focused copywriting assistance & hero messaging",
        "Interactive lead capture forms + WhatsApp direct chat integration",
        "On-page SEO foundational setup (Meta tags, Open Graph, Sitemap, Schema)",
        "Google Analytics 4 & Microsoft Clarity heatmap setup",
        "Domain connection, SSL security certificate, and hosting configuration",
        "30-day complimentary post-launch support and maintenance"
      ],
      faqs: [
        {
          q: "Will I be able to update content myself?",
          a: "Yes! We build clean, modular websites and provide you with clear guidance or an easy CMS so you can edit text, swap images, or add blog posts effortlessly."
        },
        {
          q: "Do you provide website hosting and domain names?",
          a: "We assist in securing your chosen domain name and setting up high-performance cloud hosting (Hostinger, Cloudflare, etc.) under your own ownership so you retain 100% control."
        },
        {
          q: "What makes AbhiFY websites different from cheap website templates?",
          a: "Cheap templates are bloated with unnecessary code, load slowly, and look generic. AbhiFY crafts custom conversion-optimized designs with tailored copy, fast load speeds (<1.5s), and strategic sales funnels designed to turn traffic into paying revenue."
        }
      ]
    },

    "smm": {
      slug: "service-smm.html",
      name: "Social Media Marketing (SMM)",
      shortDesc: "End-to-end social media growth, engaging reels, strategic carousel design, and active community management to build real brand authority.",
      startingPrice: "₹12,999/mo",
      regularPrice: "₹20,000/mo",
      launchOfferPrice: "₹12,999/mo",
      setupFee: "Waived during launch (Save ₹4,000)",
      timeline: "3–5 Days content calendar & brand kit setup",
      resultExpectation: "Consistent reach expansion and organic engagement growth in first 30 days",
      icon: "fa-solid fa-hashtag",
      problemsSolved: [
        "Inconsistent posting leaving your brand profiles looking dormant or dead",
        "Low engagement and generic graphics that get scrolled past immediately",
        "No structured content calendar or strategic messaging aligned with sales",
        "Wasting hours trying to figure out algorithms without seeing business inquiries"
      ],
      howItWorks: [
        { step: "01", title: "Brand Voice & Visual Aesthetic", desc: "Establishing custom color palettes, typography templates, and content pillars." },
        { step: "02", title: "Monthly Content Calendar", desc: "Planning 15 to 25 strategic posts (Educational, Social Proof, Sales, Entertaining)." },
        { step: "03", title: "Graphic & Video Creative Production", desc: "Designing high-aesthetic carousels, infographics, and short-form video reels." },
        { step: "04", title: "Captions & Strategic Hashtags", desc: "Crafting engaging copy with clear calls-to-action and researched hashtag pools." },
        { step: "05", title: "Publishing & Engagement Analysis", desc: "Scheduling at optimal times, monitoring analytics, and refining top-performing formats." }
      ],
      benefits: [
        { metric: "15-20", title: "High-Aesthetic Posts/Mo", desc: "Consistent, polished content that positions you as the undisputed authority in your niche." },
        { metric: "3x+", title: "Engagement Increase", desc: "Reels and multi-slide carousels engineered for saves, shares, and algorithmic reach." },
        { metric: "Direct", title: "Inbound DM Inquiries", desc: "Strategic story highlights and post CTAs that guide followers into your DM funnel." }
      ],
      deliverables: [
        "15–20 Custom designed feed posts (Carousels & Statics)",
        "4–6 Short-form video reels edited with dynamic captions and hooks",
        "Custom designed Instagram Story highlights & bio optimization",
        "Researched hashtag sets and strategic SEO caption writing",
        "Monthly content calendar delivered in advance for review",
        "Monthly performance growth report tracking reach, followers, and inquiries"
      ],
      faqs: [
        {
          q: "Do I have to provide video footage or photos?",
          a: "For personal brands and physical businesses (like real estate, clinics, showrooms), sending raw clips and photos from your phone helps us produce authentic reels. For digital services and products, we can produce high-quality motion graphics and curated creative assets."
        },
        {
          q: "Which platforms do you manage?",
          a: "We manage Instagram, Facebook, LinkedIn, and YouTube Shorts. We recommend focusing heavily on Instagram and Facebook for B2C/Real Estate, and LinkedIn for B2B."
        },
        {
          q: "Do you reply to comments and direct messages?",
          a: "We monitor post comments to maintain active algorithmic engagement. For high-intent sales inquiries, we can route leads directly to your WhatsApp or notify your sales representative immediately."
        }
      ]
    },

    "branding": {
      slug: "service-branding.html",
      name: "Graphic Design & Brand Identity",
      shortDesc: "Cohesive brand identities, premium vector logos, marketing collateral, and digital asset kits that command premium pricing for your business.",
      startingPrice: "₹14,999 (Package)",
      regularPrice: "₹25,000",
      launchOfferPrice: "₹14,999",
      setupFee: "All source files & copyright ownership included",
      timeline: "5–8 Business Days",
      resultExpectation: "A complete, modern brand identity ready for digital and print deployment",
      icon: "fa-solid fa-palette",
      problemsSolved: [
        "Amateur logo or mismatched graphics that make your business look small or untrustworthy",
        "Lack of brand consistency across your website, social media, and brochures",
        "No vector source files for professional printing or large billboards",
        "Struggling to justify premium pricing due to low perceived brand value"
      ],
      howItWorks: [
        { step: "01", title: "Discovery & Moodboarding", desc: "Understanding your company values, aesthetic references, and market competition." },
        { step: "02", title: "Concept Development", desc: "Presenting 3 distinct custom logo concepts with typography and color system options." },
        { step: "03", title: "Iterative Refinement", desc: "Polishing the chosen concept based on your feedback until every detail is sharp." },
        { step: "04", title: "Brand Guidelines Manual", desc: "Documenting rules for logo spacing, color codes (HEX/RGB/CMYK), and typography usage." },
        { step: "05", title: "Master File Export", desc: "Exporting all production files: AI, EPS, SVG vector formats, transparent PNGs, and print PDFs." }
      ],
      benefits: [
        { metric: "100%", title: "Full Ownership & Copyright", desc: "You receive all master vector source files with zero royalty claims." },
        { metric: "3x", title: "Higher Perceived Value", desc: "Luxury Scandinavian-inspired aesthetics allow you to charge higher prices." },
        { metric: "Print & Web", title: "All-Format Ready", desc: "Assets prepared for everything from tiny social avatars to massive street billboards." }
      ],
      deliverables: [
        "3 Unique creative logo concept proposals",
        "Primary logo, secondary submark, and responsive favicon",
        "Official Brand Style Guide (Color palette, font pairings, usage rules)",
        "Social media branding kit (Profile pictures, cover banners for FB/LinkedIn/X)",
        "Business card design + letterhead stationery mockup",
        "Complete vector master files: .AI, .EPS, .SVG, .PNG, .PDF"
      ],
      faqs: [
        {
          q: "How many revisions do I get during the design process?",
          a: "Our brand identity package includes up to 3 rounds of comprehensive revisions to ensure the final design meets your exact vision."
        },
        {
          q: "Do I get full commercial ownership of the designs?",
          a: "Yes. Once the final payment is complete, 100% full intellectual property and commercial copyright transfer to your business, along with all original vector source files."
        },
        {
          q: "Can you design marketing brochures and packaging?",
          a: "Yes! We frequently design product brochures, physical flyers, presentation pitch decks, roll-up banners, and product packaging as add-ons to your brand identity."
        }
      ]
    }
  },

  // Full Packages Comparison (Pricing Page)
  packages: [
    {
      id: "pkg-starter",
      name: "Starter Growth",
      badge: "50% OFF",
      regularPrice: "₹5,999",
      offerPrice: "₹2,999",
      period: "/month",
      billingNote: "Billed monthly • Initial Performance Review: 30 Days",
      desc: "Perfect for startups, solo service providers, and local property dealers establishing their initial online presence.",
      featured: false,
      ctaText: "Get Started with Starter",
      ctaLink: "contact.html?plan=starter-growth",
      features: [
        { text: "6 Social Media Posts Monthly", included: true },
        { text: "Basic Google Business Profile Optimization", included: true },
        { text: "Basic Content Planning", included: true },
        { text: "Monthly Performance Summary", included: true },
        { text: "WhatsApp Support", included: true },
        { text: "Edited Video Reels", included: false },
        { text: "Meta Ads Campaign Management", included: false },
        { text: "Local SEO Management", included: false }
      ]
    },
    {
      id: "pkg-business",
      name: "Business Growth",
      badge: "Most Popular • 50% OFF",
      regularPrice: "₹11,999",
      offerPrice: "₹5,999",
      period: "/month",
      billingNote: "Billed monthly • Initial Performance Review: 30–60 Days",
      desc: "Engineered for growing businesses, independent real estate agents, and local shops ready to attract inquiries.",
      featured: true,
      ctaText: "Claim Business Growth",
      ctaLink: "contact.html?plan=business-growth",
      features: [
        { text: "10 Social Media Posts Monthly", included: true },
        { text: "2 Edited Reels Monthly (Client Footage)", included: true },
        { text: "Google Business Profile Management", included: true },
        { text: "Basic Local SEO", included: true },
        { text: "Management of 1 Meta Ads Campaign", included: true },
        { text: "Monthly Performance Report", included: true },
        { text: "Direct WhatsApp & Email Support", included: true },
        { text: "Expanded Local SEO", included: false }
      ]
    },
    {
      id: "pkg-premium",
      name: "Premium Growth",
      badge: "50% OFF",
      regularPrice: "₹19,999",
      offerPrice: "₹9,999",
      period: "/month",
      billingNote: "Billed monthly • Initial Performance Review: 60–90 Days",
      desc: "Comprehensive multi-channel management for active builders, established agencies, and growing firms.",
      featured: false,
      ctaText: "Get Started with Premium",
      ctaLink: "contact.html?plan=premium-growth",
      features: [
        { text: "14 Social Media Posts Monthly", included: true },
        { text: "4 Edited Reels Monthly (Client Footage)", included: true },
        { text: "Google Business Profile Management", included: true },
        { text: "Expanded Local SEO", included: true },
        { text: "Management of Up to 2 Meta Ads Campaigns", included: true },
        { text: "Monthly Performance Report", included: true },
        { text: "Priority WhatsApp Support", included: true }
      ]
    }
  ],

  // Additional Charges / Add-ons transparently stated
  addOnServices: [
    { name: "Additional High-Converting Landing Page", price: "₹8,999", desc: "Custom designed, mobile-optimized page with form and analytics tracking" },
    { name: "Extra Short-Form Reel / Ad Creative Video", price: "₹1,499", desc: "Professional motion graphics, hook writing, subtitles, and color grading" },
    { name: "WhatsApp Business API & Automation Setup", price: "₹12,999", desc: "Automated greeting, interactive menu, and CRM pipeline connection" },
    { name: "Speed Optimization & Core Web Vitals Fix", price: "₹6,999", desc: "Guarantee 85+ mobile score on Google PageSpeed Insights" },
    { name: "Blog Article (1,500+ Words SEO-Optimized)", price: "₹1,999", desc: "Researched, keyword-mapped, formatted with custom header graphics" },
    { name: "Google Business Profile Recovery / Suspension Help", price: "₹9,999", desc: "Documentation review, Google appeal filing, and verification guidance" }
  ],

  // AI Automation Services Data
  aiAutomation: {
    hero: {
      tag: "Next-Gen AI Systems",
      title: "Intelligent AI Automation for Modern Businesses",
      desc: "Replace repetitive manual lead chasing, data entry, and slow customer replies with self-driving AI workflows that operate 24/7/365."
    },
    services: [
      {
        icon: "fa-solid fa-robot",
        title: "24/7 AI Lead Qualification & Booking",
        desc: "Conversational AI that engages inbound website visitors and WhatsApp inquiries instantly, qualifies budget/intent, and books meetings into your calendar.",
        price: "Starting ₹18,999 setup"
      },
      {
        icon: "fa-solid fa-diagram-project",
        title: "Autonomous CRM & Pipeline Workflows",
        desc: "Automatically sync leads from Google Ads, Meta Ads, and website forms into Google Sheets, Airtable, or your CRM with automated email & WhatsApp alerts.",
        price: "Starting ₹14,999 setup"
      },
      {
        icon: "fa-brands fa-whatsapp",
        title: "AI WhatsApp Assistant & Chatbot",
        desc: "Instant customer support on WhatsApp. Answer FAQs, share property brochures or product catalogs, and route hot buyers directly to your sales team.",
        price: "Starting ₹16,999 setup"
      },
      {
        icon: "fa-solid fa-brain",
        title: "Automated Content & Repurposing Engine",
        desc: "AI-assisted workflows that transform long-form video or blog transcripts into social media posts, email newsletters, and Twitter/LinkedIn threads.",
        price: "Starting ₹12,999 setup"
      }
    ],
    prospectOS: {
      status: "In Active Development • Alpha 0.4",
      title: "AbhiFY Prospect OS",
      desc: "Our proprietary autonomous sales development intelligence system designed specifically for Indian real estate developers and service agencies. Integrates automated prospect discovery, AI-filtered lead enrichment, and instant omni-channel outreach.",
      badge: "Coming Soon • Early Access Waitlist Open"
    }
  },

  // Portfolio data with real client verification + transparent demo tags
  portfolio: [
    {
      id: "pf-anshu",
      title: "Anshu Properties — Real Estate Portal & Lead Engine",
      client: "Anshu Properties (anshuproperties.com)",
      category: "real-estate",
      isReal: true,
      badge: "Verified Client Project",
      url: "https://anshuproperties.com/",
      summary: "Custom real estate listing website with property search, mobile inquiry funnels, and localized Google Ads campaign driving steady buyer inquiries.",
      metrics: [
        { label: "Lead Growth", val: "+340%" },
        { label: "Page Load Time", val: "1.4s" },
        { label: "Status", val: "Live & Active" }
      ],
      tags: ["Real Estate", "Custom Web Dev", "Lead Generation", "Google Ads"]
    },
    {
      id: "pf-melofy",
      title: "The Melofy — Modern Music Identity & Platform",
      client: "Aayush Sharma (themelofy.com)",
      category: "web-dev",
      isReal: true,
      badge: "Verified Client Project",
      url: "https://themelofy.com/",
      summary: "Minimalist, high-aesthetic artist portfolio showcasing original musical compositions, streaming integrations, and interactive sound visualizer.",
      metrics: [
        { label: "Client Rating", val: "5.0 ★" },
        { label: "Design Style", val: "Scandinavian Dark" },
        { label: "Mobile UX", val: "100%" }
      ],
      tags: ["Creative Portfolio", "Web Design", "Audio Showcase", "UI/UX"]
    },
    {
      id: "pf-digibanaras",
      title: "Digi Banaras — Regional Digital Expansion",
      client: "Digi Banaras",
      category: "seo",
      isReal: true,
      badge: "Verified Client Project",
      url: "https://abhify.com/digital-marketing-agency-varanasi.html",
      summary: "Regional SEO and digital positioning campaign targeting businesses across Varanasi, Allahabad, and Eastern UP for marketing services.",
      metrics: [
        { label: "Rankings", val: "Page 1" },
        { label: "Target Niche", val: "B2B Agency" },
        { label: "Local Reach", val: "50k+ Monthly" }
      ],
      tags: ["Local SEO", "Content Strategy", "Regional Growth"]
    },
    {
      id: "pf-demo-d2c",
      title: "Aura Home Furnishings — Meta Ads E-Commerce Funnel",
      client: "AbhiFY Demo Showcase",
      category: "ads",
      isReal: false,
      badge: "Concept & Strategy Demo",
      url: "contact.html?demo=aura-home",
      summary: "Demonstration of a full-funnel Meta Ads strategy for luxury home decor. Showcases creative testing matrix, lookalike segmentation, and retargeting hooks.",
      metrics: [
        { label: "Modeled ROAS", val: "4.8x" },
        { label: "Ad Formats", val: "Video + Carousel" },
        { label: "Type", val: "Strategic Demo" }
      ],
      tags: ["Concept Demo", "Meta Ads", "E-Commerce", "Creative Testing"]
    },
    {
      id: "pf-demo-clinic",
      title: "Apex Dental & Aesthetic Clinic — Local SEO Engine",
      client: "AbhiFY Demo Showcase",
      category: "seo",
      isReal: false,
      badge: "Concept & Strategy Demo",
      url: "contact.html?demo=apex-clinic",
      summary: "Demonstration of our 90-day Local SEO playbook for healthcare practices: Google Business Profile optimization, schema markup, and patient appointment funnels.",
      metrics: [
        { label: "Modeled Footfall", val: "+280%" },
        { label: "Target", val: "Local Map Pack" },
        { label: "Type", val: "Strategic Demo" }
      ],
      tags: ["Concept Demo", "Local SEO", "Healthcare", "GBP Optimization"]
    },
    {
      id: "pf-demo-saas",
      title: "CloudFlow SaaS — High-Conversion Landing Page",
      client: "AbhiFY Demo Showcase",
      category: "web-dev",
      isReal: false,
      badge: "Concept & Strategy Demo",
      url: "contact.html?demo=cloudflow-saas",
      summary: "Demonstration of interactive B2B SaaS landing page architecture with micro-animations, pricing calculators, feature comparisons, and demo booking modal.",
      metrics: [
        { label: "Modeled Conv. Rate", val: "7.2%" },
        { label: "PageSpeed", val: "98/100" },
        { label: "Type", val: "Strategic Demo" }
      ],
      tags: ["Concept Demo", "SaaS UI/UX", "Landing Page", "Performance"]
    }
  ]
};

// Export to window for global browser usage
if (typeof window !== "undefined") {
  window.ABHIFY_DATA = ABHIFY_DATA;
}
