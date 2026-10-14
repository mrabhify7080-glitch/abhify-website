const fs = require('fs');
const path = require('path');

const root = __dirname;

console.log('--- Starting AbhiFY Information Architecture Update ---');

// Unified Nav HTML for desktop
const desktopNav = `      <!-- Clean Minimal Navigation -->
      <ul class="nav-links-modern">
        <li><a href="index.html"><span>Home</span></a></li>
        <li><a href="about.html"><span>About</span></a></li>
        <li><a href="services.html"><span>Services</span></a></li>
        <li><a href="prices.html" class="nav-badge-pill"><span>Pricing</span></a></li>
        <li><a href="ai-automation.html"><span>AI Automation</span></a></li>
        <li><a href="portfolio.html"><span>Portfolio</span></a></li>
        <li><a href="blog.html"><span>Blog</span></a></li>
        <li><a href="contact.html"><span>Contact</span></a></li>
      </ul>`;

// Unified Mobile Nav HTML
const mobileNav = `<div class="nav-overlay" id="navOverlay"></div>
<div class="mobile-nav" id="mobileNav">
  <a href="index.html">HOME</a>
  <a href="about.html">ABOUT</a>
  <a href="services.html">SERVICES</a>
  <a href="prices.html">PRICING (OFFERS)</a>
  <a href="ai-automation.html">AI AUTOMATION</a>
  <a href="portfolio.html">PORTFOLIO</a>
  <a href="blog.html">BLOG</a>
  <a href="contact.html">CONTACT</a>
  <a href="contact.html" class="mobile-audit-btn"><i class="fa-solid fa-paper-plane"></i> Get Free Audit &rarr;</a>
</div>`;

// Unified Footer Links
const footerColLinks = `      <div class="footer-col">
        <h5>Explore</h5>
        <a href="services.html">Services</a>
        <a href="prices.html">Pricing</a>
        <a href="ai-automation.html">AI Automation</a>
        <a href="portfolio.html">Portfolio</a>
        <a href="blog.html">Blog</a>
      </div>
      <div class="footer-col">
        <h5>Core Services</h5>
        <a href="service-seo.html">SEO Services</a>
        <a href="service-google-ads.html">Google Ads</a>
        <a href="service-meta-ads.html">Meta Ads</a>
        <a href="service-web-design.html">Web Design</a>
        <a href="service-smm.html">Social Media</a>
      </div>`;

// ================= 1. UPDATE index.html =================
const indexPath = path.join(root, 'index.html');
if (fs.existsSync(indexPath)) {
  let indexHtml = fs.readFileSync(indexPath, 'utf8');

  // Add architecture CSS if missing
  if (!indexHtml.includes('abhify-architecture.css')) {
    indexHtml = indexHtml.replace('<link rel="stylesheet" href="style.css?v=18">', '<link rel="stylesheet" href="style.css?v=18">\n<link rel="stylesheet" href="abhify-architecture.css?v=1">');
    indexHtml = indexHtml.replace(/<link rel="stylesheet" href="style\.min\.css\?v=\d+">/, '$&\n<link rel="stylesheet" href="abhify-architecture.css?v=1">');
  }

  // Update nav
  indexHtml = indexHtml.replace(/<!-- Clean Minimal Navigation -->\s*<ul class="nav-links-modern">[\s\S]*?<\/ul>/, desktopNav.replace('href="index.html"', 'href="index.html" class="active"'));
  indexHtml = indexHtml.replace(/<div class="nav-overlay" id="navOverlay"><\/div>\s*<div class="mobile-nav" id="mobileNav">[\s\S]*?<\/div>/, mobileNav.replace('href="index.html"', 'href="index.html" class="active"'));

  // Update service cards on index to link to individual pages
  indexHtml = indexHtml.replace(/<a href="services\.html"[^>]*>Explore SEO[^<]*<i[^>]*><\/i><\/a>/g, '<a href="service-seo.html" style="display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 700; color: var(--btn-primary); margin-top: 12px; font-family: var(--font-alt);">Explore SEO Page <i class="fa-solid fa-arrow-right" style="font-size: 10px;"></i></a>');
  indexHtml = indexHtml.replace(/<a href="services\.html"[^>]*>Explore Google Ads[^<]*<i[^>]*><\/i><\/a>/g, '<a href="service-google-ads.html" style="display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 700; color: var(--btn-primary); margin-top: 12px; font-family: var(--font-alt);">Explore Google Ads Page <i class="fa-solid fa-arrow-right" style="font-size: 10px;"></i></a>');
  indexHtml = indexHtml.replace(/<a href="services\.html"[^>]*>Explore Meta Ads[^<]*<i[^>]*><\/i><\/a>/g, '<a href="service-meta-ads.html" style="display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 700; color: var(--btn-primary); margin-top: 12px; font-family: var(--font-alt);">Explore Meta Ads Page <i class="fa-solid fa-arrow-right" style="font-size: 10px;"></i></a>');
  indexHtml = indexHtml.replace(/<a href="services\.html"[^>]*>Explore SMM[^<]*<i[^>]*><\/i><\/a>/g, '<a href="service-smm.html" style="display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 700; color: var(--btn-primary); margin-top: 12px; font-family: var(--font-alt);">Explore SMM Page <i class="fa-solid fa-arrow-right" style="font-size: 10px;"></i></a>');
  indexHtml = indexHtml.replace(/<a href="services\.html"[^>]*>Explore Web Design[^<]*<i[^>]*><\/i><\/a>/g, '<a href="service-web-design.html" style="display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 700; color: var(--btn-primary); margin-top: 12px; font-family: var(--font-alt);">Explore Web Design Page <i class="fa-solid fa-arrow-right" style="font-size: 10px;"></i></a>');
  indexHtml = indexHtml.replace(/<a href="services\.html"[^>]*>Explore Branding[^<]*<i[^>]*><\/i><\/a>/g, '<a href="service-branding.html" style="display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 700; color: var(--btn-primary); margin-top: 12px; font-family: var(--font-alt);">Explore Branding Page <i class="fa-solid fa-arrow-right" style="font-size: 10px;"></i></a>');

  // Insert 3 Featured Launch Offers & Strategy Consultation CTA if missing
  if (!indexHtml.includes('id="launch-offers"')) {
    const launchOffersHtml = `
<!-- ================= REAL ESTATE SPECIALIZATION & 3 FEATURED LAUNCH OFFERS ================= -->
<section class="launch-offers-section" id="launch-offers">
  <div class="container">
    <div class="section-head-center">
      <span class="section-badge-gold"><i class="fa-solid fa-fire"></i> Limited-Time Launch Opportunities</span>
      <h2>3 Featured <span class="gold-text">Launch Offers</span></h2>
      <p>Lock in heavily discounted introductory pricing for our most popular growth engines. Month-to-month flexibility with zero long-term lock-in.</p>
    </div>

    <div class="launch-offers-grid">

      <!-- OFFER 1: REAL ESTATE LEAD ENGINE (FEATURED) -->
      <div class="launch-offer-card featured-card">
        <span class="launch-offer-ribbon">Real Estate Special</span>
        <div>
          <span class="offer-card-category">PROVEN IN AN ESTATE PORTFOLIO</span>
          <h3 class="offer-card-title">Real Estate Lead Engine</h3>
          <p class="offer-card-sub">Full digital sales pipeline engineered specifically for builders, township developers, and property consultants in Uttar Pradesh.</p>

          <div class="offer-price-box">
            <div>
              <span class="price-strikethrough">₹45,000</span>
              <span class="price-live">₹26,999</span>
              <span class="price-period">/first month</span>
            </div>
            <span class="price-badge-savings">Save 40%</span>
          </div>

          <div class="offer-timeline-badge"><i class="fa-solid fa-clock"></i> 7–10 Days Setup</div>

          <ul class="offer-highlights-list">
            <li><i class="fa-solid fa-circle-check"></i><span>High-converting property landing page with WhatsApp capture</span></li>
            <li><i class="fa-solid fa-circle-check"></i><span>Geo-radius Google Search & Meta Lead ads setup</span></li>
            <li><i class="fa-solid fa-circle-check"></i><span>Automated WhatsApp lead instant-reply sequence</span></li>
            <li><i class="fa-solid fa-circle-check"></i><span>Lead qualification screening script & tracking sheet</span></li>
          </ul>
        </div>

        <div style="margin-top:20px;">
          <a href="contact.html?offer=real-estate-engine" class="btn-claim-offer">
            <span>Claim Real Estate Offer</span>
            <i class="fa-solid fa-bolt"></i>
          </a>
        </div>
      </div>

      <!-- OFFER 2: LOCAL SEO GROWTH SPRINT -->
      <div class="launch-offer-card">
        <div>
          <span class="offer-card-category">SEARCH DOMINANCE</span>
          <h3 class="offer-card-title">Local SEO Growth Sprint</h3>
          <p class="offer-card-sub">Dominate local Google search rankings and Google Maps 3-Pack listings within 90 days for your high-intent buyer searches.</p>

          <div class="offer-price-box">
            <div>
              <span class="price-strikethrough">₹24,999/mo</span>
              <span class="price-live">₹15,999</span>
              <span class="price-period">/month</span>
            </div>
            <span class="price-badge-savings">Save 35%</span>
          </div>

          <div class="offer-timeline-badge"><i class="fa-solid fa-clock"></i> 5–7 Days Setup</div>

          <ul class="offer-highlights-list">
            <li><i class="fa-solid fa-circle-check"></i><span>Complete Google Business Profile (GBP) 100% optimization</span></li>
            <li><i class="fa-solid fa-circle-check"></i><span>30 High-authority local directory citation submissions</span></li>
            <li><i class="fa-solid fa-circle-check"></i><span>Rank tracking for top 15 commercial buyer queries</span></li>
            <li><i class="fa-solid fa-circle-check"></i><span>LocalBusiness Schema markup & on-page geo-tagging</span></li>
          </ul>
        </div>

        <div style="margin-top:20px;">
          <a href="contact.html?offer=seo-sprint" class="btn-claim-offer-outline">
            <span>Claim SEO Offer</span>
            <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>

      <!-- OFFER 3: BRAND IDENTITY + WEB KICKSTART -->
      <div class="launch-offer-card">
        <div>
          <span class="offer-card-category">COMPLETE DIGITAL PRESENCE</span>
          <h3 class="offer-card-title">Brand Identity + Web Kickstart</h3>
          <p class="offer-card-sub">Launch your business online with luxury Scandinavian design, vector logo, and a modern high-speed website in 14 days.</p>

          <div class="offer-price-box">
            <div>
              <span class="price-strikethrough">₹55,000</span>
              <span class="price-live">₹29,999</span>
              <span class="price-period">one-time</span>
            </div>
            <span class="price-badge-savings">Save 45%</span>
          </div>

          <div class="offer-timeline-badge"><i class="fa-solid fa-clock"></i> 10–14 Days Delivery</div>

          <ul class="offer-highlights-list">
            <li><i class="fa-solid fa-circle-check"></i><span>Custom 5-page responsive website with modern UI/UX</span></li>
            <li><i class="fa-solid fa-circle-check"></i><span>Premium vector logo design with official brand guidelines</span></li>
            <li><i class="fa-solid fa-circle-check"></i><span>Social media branding kit (10 graphics + banners)</span></li>
            <li><i class="fa-solid fa-circle-check"></i><span>Free domain, SSL & Google Analytics 4 integration</span></li>
          </ul>
        </div>

        <div style="margin-top:20px;">
          <a href="contact.html?offer=brand-web-kickstart" class="btn-claim-offer-outline">
            <span>Claim Brand Kickstart</span>
            <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- ================= STRATEGY CONSULTATION CTA ================= -->
<section style="padding:80px 0;background:linear-gradient(135deg, #121417 0%, #1E232B 100%);color:#FFFFFF;text-align:center;">
  <div class="container" style="max-width:800px;">
    <span class="prospect-status-pill"><i class="fa-solid fa-phone"></i> Free 30-Minute Growth Session</span>
    <h2 style="font-family:var(--font-display);font-size:clamp(28px, 4vw, 42px);font-weight:800;margin:16px 0;">Book a 1-on-1 Marketing Strategy Consultation</h2>
    <p style="font-size:16px;color:#A0A5B2;line-height:1.6;margin-bottom:32px;">No sales pressure, no generic slides. We review your current online presence, show you where competitors are outranking you, and outline an actionable 90-day growth plan.</p>
    <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;">
      <a href="contact.html?service=free-consultation" class="btn-claim-offer" style="max-width:280px;">
        <i class="fa-solid fa-calendar-check"></i>
        <span>Book Free Consultation</span>
      </a>
      <a href="tel:+919569890314" class="btn-claim-offer-outline" style="border-color:#C6934B;color:#FFFFFF;max-width:220px;">
        <i class="fa-solid fa-phone"></i>
        <span>+91 9569890314</span>
      </a>
    </div>
  </div>
</section>
`;
    indexHtml = indexHtml.replace('</section>\n\n<!-- ================= MEET THE FOUNDER', '</section>\n' + launchOffersHtml + '\n<!-- ================= MEET THE FOUNDER');
    // fallback if exact spacing differs:
    if (!indexHtml.includes('id="launch-offers"')) {
      indexHtml = indexHtml.replace(/<\/section>\s*<!-- ================= MEET THE FOUNDER/, '</section>\n' + launchOffersHtml + '\n<!-- ================= MEET THE FOUNDER');
    }
  }

  // Update Footer links
  indexHtml = indexHtml.replace(/<div class="footer-col">\s*<h5>Explore<\/h5>[\s\S]*?<\/div>\s*<div class="footer-col">\s*<h5>Company<\/h5>[\s\S]*?<\/div>/, footerColLinks);

  // Add abhify-data.js before app.js
  if (!indexHtml.includes('abhify-data.js')) {
    indexHtml = indexHtml.replace('<script src="app.js', '<script src="abhify-data.js"></script>\n<script src="app.js');
  }

  fs.writeFileSync(indexPath, indexHtml, 'utf8');
  console.log('✓ index.html updated');
}

// ================= 2. UPDATE services.html =================
const servicesPath = path.join(root, 'services.html');
if (fs.existsSync(servicesPath)) {
  let servHtml = fs.readFileSync(servicesPath, 'utf8');

  // Add architecture CSS if missing
  if (!servHtml.includes('abhify-architecture.css')) {
    servHtml = servHtml.replace('<link rel="stylesheet" href="style.css?v=2">', '<link rel="stylesheet" href="style.css?v=2">\n<link rel="stylesheet" href="abhify-architecture.css?v=1">');
    servHtml = servHtml.replace(/<link rel="stylesheet" href="style\.min\.css\?v=\d+">/, '$&\n<link rel="stylesheet" href="abhify-architecture.css?v=1">');
  }

  // Update nav
  servHtml = servHtml.replace(/<!-- Clean Minimal Navigation -->\s*<ul class="nav-links-modern">[\s\S]*?<\/ul>/, desktopNav.replace('href="services.html"', 'href="services.html" class="active"'));
  servHtml = servHtml.replace(/<div class="nav-overlay" id="navOverlay"><\/div>\s*<div class="mobile-nav" id="mobileNav">[\s\S]*?<\/div>/, mobileNav.replace('href="services.html"', 'href="services.html" class="active"'));

  // Enhance core service cards with starting prices, benefits, and "View Details" buttons
  // 1. Web Dev (Custom Website)
  servHtml = servHtml.replace(
    /<h3>Website Development<\/h3>\s*<p>Full-stack, responsive websites built with modern HTML5, CSS3, JavaScript &amp; clean design\.<\/p>\s*<\/div>\s*<div class="service-card-footer">/g,
    `<h3>Website Development</h3>
          <p>Full-stack, responsive websites built with modern HTML5, CSS3, JavaScript &amp; clean design.</p>
          <div class="service-price-tag"><i class="fa-solid fa-tag"></i> From ₹24,999 (Launch Offer)</div>
          <ul class="service-card-benefits">
            <li><i class="fa-solid fa-check"></i> Sub-1.5s load speed & 90+ PageSpeed</li>
            <li><i class="fa-solid fa-check"></i> 100% mobile responsive with WhatsApp chat</li>
          </ul>
        </div>
        <div class="service-card-footer">
          <div class="service-dual-actions">
            <a href="service-web-design.html" class="btn-view-details"><i class="fa-solid fa-circle-info"></i> View Details</a>
          </div>`
  );

  // 2. SEO (On-page / Digital Marketing)
  servHtml = servHtml.replace(
    /<h3>SEO \(On-page\)<\/h3>\s*<p>Comprehensive keyword strategy, meta tag optimization, structured data schema, and content tweaks\.<\/p>\s*<\/div>\s*<div class="service-card-footer">/g,
    `<h3>SEO (Search Engine Optimization)</h3>
          <p>Comprehensive keyword strategy, meta tag optimization, structured data schema, and local authority ranking.</p>
          <div class="service-price-tag"><i class="fa-solid fa-tag"></i> From ₹14,999/mo (Launch Offer)</div>
          <ul class="service-card-benefits">
            <li><i class="fa-solid fa-check"></i> Page 1 Google Maps & search ranking</li>
            <li><i class="fa-solid fa-check"></i> Compounding zero-PPC inbound lead stream</li>
          </ul>
        </div>
        <div class="service-card-footer">
          <div class="service-dual-actions">
            <a href="service-seo.html" class="btn-view-details"><i class="fa-solid fa-circle-info"></i> View Details</a>
          </div>`
  );

  // 3. Google Ads Setup
  servHtml = servHtml.replace(
    /<h3>Google Ads Setup<\/h3>\s*<p>High-ROI Search, Display &amp; YouTube ad campaign structure, negative keyword filters, and bidding setup\.<\/p>\s*<\/div>\s*<div class="service-card-footer">/g,
    `<h3>Google Ads & PPC Management</h3>
          <p>High-ROI Search, Display &amp; YouTube ad campaign structure, negative keyword filters, and bidding setup.</p>
          <div class="service-price-tag"><i class="fa-solid fa-tag"></i> From ₹16,999/mo (Launch Offer)</div>
          <ul class="service-card-benefits">
            <li><i class="fa-solid fa-check"></i> Qualified phone leads in 48–72 hours</li>
            <li><i class="fa-solid fa-check"></i> 200+ negative keywords stop wasted spend</li>
          </ul>
        </div>
        <div class="service-card-footer">
          <div class="service-dual-actions">
            <a href="service-google-ads.html" class="btn-view-details"><i class="fa-solid fa-circle-info"></i> View Details</a>
          </div>`
  );

  // 4. Social Media Management
  servHtml = servHtml.replace(
    /<h3>Social Media Management<\/h3>\s*<p>Complete multi-platform post scheduling, community engagement, content calendars, and growth strategy\.<\/p>\s*<\/div>\s*<div class="service-card-footer">/g,
    `<h3>Social Media Marketing (SMM)</h3>
          <p>Complete multi-platform post scheduling, community engagement, content calendars, and growth strategy.</p>
          <div class="service-price-tag"><i class="fa-solid fa-tag"></i> From ₹12,999/mo (Launch Offer)</div>
          <ul class="service-card-benefits">
            <li><i class="fa-solid fa-check"></i> 15–20 High-aesthetic carousels & reels</li>
            <li><i class="fa-solid fa-check"></i> Direct DM to WhatsApp inquiry pipeline</li>
          </ul>
        </div>
        <div class="service-card-footer">
          <div class="service-dual-actions">
            <a href="service-smm.html" class="btn-view-details"><i class="fa-solid fa-circle-info"></i> View Details</a>
          </div>`
  );

  // 5. Logo Design / Graphic Design
  servHtml = servHtml.replace(
    /<h3>Logo Design<\/h3>\s*<p>Unique vector logo design, custom iconography, brand color palette, and usage guidelines\.<\/p>\s*<\/div>\s*<div class="service-card-footer">/g,
    `<h3>Logo Design & Brand Identity</h3>
          <p>Unique vector logo design, custom iconography, brand color palette, and usage guidelines.</p>
          <div class="service-price-tag"><i class="fa-solid fa-tag"></i> From ₹14,999 (Package Offer)</div>
          <ul class="service-card-benefits">
            <li><i class="fa-solid fa-check"></i> 100% Vector master files (.AI, .EPS, .SVG)</li>
            <li><i class="fa-solid fa-check"></i> Official Brand Style Guide & social kit</li>
          </ul>
        </div>
        <div class="service-card-footer">
          <div class="service-dual-actions">
            <a href="service-branding.html" class="btn-view-details"><i class="fa-solid fa-circle-info"></i> View Details</a>
          </div>`
  );

  // Update Footer links
  servHtml = servHtml.replace(/<div class="footer-col">\s*<h5>Explore<\/h5>[\s\S]*?<\/div>\s*<div class="footer-col">\s*<h5>Company<\/h5>[\s\S]*?<\/div>/, footerColLinks);

  // Add abhify-data.js before app.js
  if (!servHtml.includes('abhify-data.js')) {
    servHtml = servHtml.replace('<script src="app.js', '<script src="abhify-data.js"></script>\n<script src="app.js');
  }

  fs.writeFileSync(servicesPath, servHtml, 'utf8');
  console.log('✓ services.html updated');
}

// ================= 3. UPDATE about.html, contact.html, blog.html =================
const otherPages = ['about.html', 'contact.html', 'blog.html'];

otherPages.forEach(page => {
  const pagePath = path.join(root, page);
  if (!fs.existsSync(pagePath)) return;
  let html = fs.readFileSync(pagePath, 'utf8');

  // Add architecture CSS if missing
  if (!html.includes('abhify-architecture.css')) {
    html = html.replace(/<link rel="stylesheet" href="style(\.min)?\.css[^"]*">/, '$&\n<link rel="stylesheet" href="abhify-architecture.css?v=1">');
  }

  // Update desktop nav
  html = html.replace(/<!-- Clean Minimal Navigation -->\s*<ul class="nav-links-modern">[\s\S]*?<\/ul>/, desktopNav.replace(`href="${page}"`, `href="${page}" class="active"`));
  // Update mobile nav
  html = html.replace(/<div class="nav-overlay" id="navOverlay"><\/div>\s*<div class="mobile-nav" id="mobileNav">[\s\S]*?<\/div>/, mobileNav.replace(`href="${page}"`, `href="${page}" class="active"`));

  // Update Footer links
  html = html.replace(/<div class="footer-col">\s*<h5>Explore<\/h5>[\s\S]*?<\/div>\s*<div class="footer-col">\s*<h5>Company<\/h5>[\s\S]*?<\/div>/, footerColLinks);

  // Add abhify-data.js
  if (!html.includes('abhify-data.js')) {
    html = html.replace('<script src="app.js', '<script src="abhify-data.js"></script>\n<script src="app.js');
  }

  fs.writeFileSync(pagePath, html, 'utf8');
  console.log(`✓ ${page} updated`);
});

// ================= 4. UPDATE sitemap.xml =================
const sitemapPath = path.join(root, 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  let sitemap = fs.readFileSync(sitemapPath, 'utf8');
  const today = new Date().toISOString().split('T')[0];

  const newUrls = [
    { loc: 'https://abhify.com/prices.html', priority: '0.9', changefreq: 'weekly' },
    { loc: 'https://abhify.com/ai-automation.html', priority: '0.9', changefreq: 'weekly' },
    { loc: 'https://abhify.com/portfolio.html', priority: '0.9', changefreq: 'weekly' },
    { loc: 'https://abhify.com/service-seo.html', priority: '0.8', changefreq: 'weekly' },
    { loc: 'https://abhify.com/service-google-ads.html', priority: '0.8', changefreq: 'weekly' },
    { loc: 'https://abhify.com/service-meta-ads.html', priority: '0.8', changefreq: 'weekly' },
    { loc: 'https://abhify.com/service-web-design.html', priority: '0.8', changefreq: 'weekly' },
    { loc: 'https://abhify.com/service-smm.html', priority: '0.8', changefreq: 'weekly' },
    { loc: 'https://abhify.com/service-branding.html', priority: '0.8', changefreq: 'weekly' },
  ];

  let xmlEntries = '';
  newUrls.forEach(u => {
    if (!sitemap.includes(u.loc)) {
      xmlEntries += `\n  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`;
    }
  });

  if (xmlEntries) {
    sitemap = sitemap.replace('</urlset>', xmlEntries + '\n</urlset>');
    fs.writeFileSync(sitemapPath, sitemap, 'utf8');
    console.log('✓ sitemap.xml updated with new pages');
  }
}

console.log('--- AbhiFY Architecture Update Successfully Completed ---');
