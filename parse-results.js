const fs = require('fs');
const path = require('path');

const dir = 'D:\\abhify-website\\lighthouse-reports';

function parseReport(filename) {
  const fullPath = path.join(dir, filename);
  if (!fs.existsSync(fullPath)) return null;
  const r = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  return {
    file: filename,
    performance: Math.round((r.categories.performance?.score || 0) * 100),
    accessibility: Math.round((r.categories.accessibility?.score || 0) * 100),
    bestPractices: Math.round((r.categories['best-practices']?.score || 0) * 100),
    seo: Math.round((r.categories.seo?.score || 0) * 100),
    fcp: r.audits['first-contentful-paint']?.displayValue,
    fcpNum: r.audits['first-contentful-paint']?.numericValue,
    lcp: r.audits['largest-contentful-paint']?.displayValue,
    lcpNum: r.audits['largest-contentful-paint']?.numericValue,
    tbt: r.audits['total-blocking-time']?.displayValue,
    tbtNum: r.audits['total-blocking-time']?.numericValue,
    cls: r.audits['cumulative-layout-shift']?.displayValue,
    clsNum: r.audits['cumulative-layout-shift']?.numericValue,
    si: r.audits['speed-index']?.displayValue,
    siNum: r.audits['speed-index']?.numericValue
  };
}

function median(arr) {
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

const mobileRuns = [1, 2, 3].map(i => parseReport(`final-mobile-run-${i}.report.json`)).filter(Boolean);
const desktopRuns = [1, 2, 3].map(i => parseReport(`final-desktop-run-${i}.report.json`)).filter(Boolean);

console.log('=== FINAL MOBILE RUNS ===');
console.table(mobileRuns.map(r => ({
  Run: r.file,
  Perf: r.performance,
  A11y: r.accessibility,
  BP: r.bestPractices,
  SEO: r.seo,
  FCP: r.fcp,
  LCP: r.lcp,
  TBT: r.tbt,
  CLS: r.cls,
  SI: r.si
})));

if (mobileRuns.length) {
  console.log('Mobile Median Scores:');
  console.log('  Performance:   ', median(mobileRuns.map(r => r.performance)));
  console.log('  Accessibility: ', median(mobileRuns.map(r => r.accessibility)));
  console.log('  Best Practices:', median(mobileRuns.map(r => r.bestPractices)));
  console.log('  SEO:           ', median(mobileRuns.map(r => r.seo)));
  console.log('  LCP:           ', (median(mobileRuns.map(r => r.lcpNum)) / 1000).toFixed(2) + ' s');
  console.log('  FCP:           ', (median(mobileRuns.map(r => r.fcpNum)) / 1000).toFixed(2) + ' s');
  console.log('  TBT:           ', Math.round(median(mobileRuns.map(r => r.tbtNum))) + ' ms');
  console.log('  CLS:           ', median(mobileRuns.map(r => r.clsNum)).toFixed(3));
}

console.log('\n=== FINAL DESKTOP RUNS ===');
console.table(desktopRuns.map(r => ({
  Run: r.file,
  Perf: r.performance,
  A11y: r.accessibility,
  BP: r.bestPractices,
  SEO: r.seo,
  FCP: r.fcp,
  LCP: r.lcp,
  TBT: r.tbt,
  CLS: r.cls,
  SI: r.si
})));

if (desktopRuns.length) {
  console.log('Desktop Median Scores:');
  console.log('  Performance:   ', median(desktopRuns.map(r => r.performance)));
  console.log('  Accessibility: ', median(desktopRuns.map(r => r.accessibility)));
  console.log('  Best Practices:', median(desktopRuns.map(r => r.bestPractices)));
  console.log('  SEO:           ', median(desktopRuns.map(r => r.seo)));
  console.log('  LCP:           ', (median(desktopRuns.map(r => r.lcpNum)) / 1000).toFixed(2) + ' s');
  console.log('  FCP:           ', (median(desktopRuns.map(r => r.fcpNum)) / 1000).toFixed(2) + ' s');
  console.log('  TBT:           ', Math.round(median(desktopRuns.map(r => r.tbtNum))) + ' ms');
  console.log('  CLS:           ', median(desktopRuns.map(r => r.clsNum)).toFixed(3));
}
