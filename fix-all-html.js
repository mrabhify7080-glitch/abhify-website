const fs = require('fs');
const path = require('path');

const root = 'c:\\Users\\Uttam\\abhify-production';

// Canonical URLs mapping
const canonicals = {
  'index.html': 'https://abhify.com/',
  'about.html': 'https://abhify.com/about.html',
  'services.html': 'https://abhify.com/services.html',
  'blog.html': 'https://abhify.com/blog.html',
  'contact.html': 'https://abhify.com/contact.html',
  'blog-choose-agency-varanasi.html': 'https://abhify.com/blog-choose-agency-varanasi.html',
  'blog-digital-marketing-cost-india.html': 'https://abhify.com/blog-digital-marketing-cost-india.html',
  'blog-seo-small-business.html': 'https://abhify.com/blog-seo-small-business.html',
  'blog-seo-vs-google-ads.html': 'https://abhify.com/blog-seo-vs-google-ads.html',
  'digital-marketing-agency-varanasi.html': 'https://abhify.com/digital-marketing-agency-varanasi.html'
};

const files = Object.keys(canonicals);

files.forEach(file => {
  const filePath = path.join(root, file);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Add canonical link if missing
  const canonUrl = canonicals[file];
  if (!content.includes('rel="canonical"')) {
    content = content.replace('</head>', `  <link rel="canonical" href="${canonUrl}">\n</head>`);
  }

  // 2. Update logo.jpg to logo.webp
  content = content.replace(/logo\.jpg/g, 'logo.webp');

  // 3. Update style.css to style.min.css?v=38
  content = content.replace(/style\.min\.css(\?v=\d+)?/g, 'style.min.css?v=38');
  content = content.replace(/style\.css(\?v=\d+)?/g, 'style.min.css?v=38');

  // 4. Fix broken blog link in blog.html or other files
  content = content.replace(/blog-choose-agency-KANPUR & UNNAO\.html/g, 'blog-choose-agency-varanasi.html');
  content = content.replace(/KANPUR & UNNAO-hero\.png/g, 'varanasi-hero.png');

  // 5. Fix missing services-hero.png and custom-service-banner.jpg in services.html
  if (file === 'services.html') {
    content = content.replace(/services-hero\.png/g, 'seo-strategy.png');
    content = content.replace(/custom-service-banner\.jpg/g, 'hero-workspace.png');
  }

  // 6. Fix index.html broken service & testimonial images + stale portfolio link
  if (file === 'index.html') {
    // Remove stale portfolio nav links
    content = content.replace(/<li><a href="portfolio\.html"[^>]*>.*?<\/a><\/li>/gi, '');
    content = content.replace(/<a href="portfolio\.html"[^>]*>.*?<\/a>/gi, '');
    // Clean up 404 service photo blocks in index.html
    content = content.replace(/<!-- 📷 SERVICE PHOTO:[^>]*-->\s*<div[^>]*>\s*<img src="service-[^"]*"[^>]*>\s*<\/div>/gi, '');
    // Clean up 404 testimonial photo blocks
    content = content.replace(/<img src="testimonial\d+\.jpg"[^>]*onerror="[^"]*">/gi, '<i class="fa-solid fa-user ph-icon" style="font-size:18px; color:var(--btn-primary);"></i>');
  }

  // 7. Ensure <main id="main-content"> exists and wraps body before <footer>
  if (!content.includes('<main') && content.includes('<header') && content.includes('<footer')) {
    content = content.replace(/<\/header>\s*(<div class="nav-overlay"[^>]*><\/div>\s*<aside[\s\S]*?<\/aside>)?/i, (match) => {
      return match + '\n\n<main id="main-content">\n';
    });
    content = content.replace(/<footer/i, '</main>\n\n<footer');
  }

  // 8. Fix footer column heading levels across subpages to h3 / .footer-col-title
  content = content.replace(/<div class="footer-col">\s*<h5>(.*?)<\/h5>/gi, '<div class="footer-col">\n        <h3 class="footer-col-title">$1</h3>');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Processed & fixed:', file);
});

console.log('All HTML files updated successfully.');
