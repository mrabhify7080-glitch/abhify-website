const fs = require('fs');
const path = require('path');

const root = 'c:\\Users\\Uttam\\abhify-production';
const htmlFiles = fs.readdirSync(root).filter(f => f.endsWith('.html') && !f.includes('.bak'));

console.log('=== HTML FILES AUDIT (' + htmlFiles.length + ' files) ===');

const report = [];

htmlFiles.forEach(file => {
  const content = fs.readFileSync(path.join(root, file), 'utf8');
  
  const hasLang = /<html[^>]*\blang=/i.test(content);
  const titleMatch = content.match(/<title>([^<]*)<\/title>/i);
  const metaDescMatch = content.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
  const canonicalMatch = content.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
  const hasViewport = /<meta[^>]*name=["']viewport["']/i.test(content);
  const hasMain = /<main[\s>]/i.test(content) && /<\/main>/i.test(content);
  
  // Extract CSS, JS, Image, and Anchor references
  const cssMatches = [...content.matchAll(/<link[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']*)["']/gi)].map(m => m[1]);
  const scriptMatches = [...content.matchAll(/<script[^>]*src=["']([^"']*)["']/gi)].map(m => m[1]);
  const imgMatches = [...content.matchAll(/<img[^>]*src=["']([^"']*)["']/gi)].map(m => m[1]);
  const anchorMatches = [...content.matchAll(/<a[^>]*href=["']([^"']*)["']/gi)].map(m => m[1]);

  const checkAsset = (src) => {
    if (!src || src.startsWith('http') || src.startsWith('//') || src.startsWith('#') || src.startsWith('mailto:') || src.startsWith('tel:') || src.startsWith('javascript:')) return true;
    const clean = src.split('?')[0].split('#')[0];
    return fs.existsSync(path.join(root, clean));
  };

  const missingAssets = [...cssMatches, ...scriptMatches, ...imgMatches].filter(s => !checkAsset(s));
  const brokenLinks = anchorMatches.filter(h => {
    if (!h || h.startsWith('http') || h.startsWith('//') || h.startsWith('#') || h.startsWith('mailto:') || h.startsWith('tel:') || h.startsWith('javascript:')) return false;
    const clean = h.split('?')[0].split('#')[0];
    if (!clean) return false;
    return !fs.existsSync(path.join(root, clean));
  });

  const fileReport = {
    file,
    lang: hasLang ? 'OK' : 'MISSING',
    title: titleMatch ? titleMatch[1].trim() : 'MISSING',
    metaDesc: metaDescMatch ? metaDescMatch[1].trim() : 'MISSING',
    canonical: canonicalMatch ? canonicalMatch[1].trim() : 'MISSING',
    viewport: hasViewport ? 'OK' : 'MISSING',
    mainLandmark: hasMain ? 'OK' : 'MISSING',
    missingAssets,
    brokenLinks
  };
  report.push(fileReport);
});

console.log(JSON.stringify(report, null, 2));
