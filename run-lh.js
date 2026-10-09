const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

process.env.PATH = 'C:\\Program Files\\nodejs;C:\\Users\\Uttam\\AppData\\Roaming\\npm;' + (process.env.PATH || '');

const lh = 'C:\\Users\\Uttam\\AppData\\Roaming\\npm\\lighthouse.cmd';
const outDir = 'D:\\abhify-website\\lighthouse-reports';
const url = 'http://localhost:8080/index.html';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

console.log('=== Starting 3 Final Mobile Lighthouse Tests ===');
for (let i = 1; i <= 3; i++) {
  console.log(`\n>>> Running Mobile Test #${i}...`);
  const outPath = path.join(outDir, `final-mobile-run-${i}`);
  const cmd = `"${lh}" ${url} --output=json,html --output-path="${outPath}" --chrome-flags="--headless=new --no-sandbox --disable-gpu" --form-factor=mobile --screenEmulation.mobile=true --throttling-method=simulate --quiet`;
  execSync(cmd, { stdio: 'inherit', env: process.env });
  console.log(`Saved: final-mobile-run-${i}.report.html and .json`);
}

console.log('\n=== Starting 3 Final Desktop Lighthouse Tests ===');
for (let i = 1; i <= 3; i++) {
  console.log(`\n>>> Running Desktop Test #${i}...`);
  const outPath = path.join(outDir, `final-desktop-run-${i}`);
  const cmd = `"${lh}" ${url} --output=json,html --output-path="${outPath}" --chrome-flags="--headless=new --no-sandbox --disable-gpu" --preset=desktop --throttling-method=simulate --quiet`;
  execSync(cmd, { stdio: 'inherit', env: process.env });
  console.log(`Saved: final-desktop-run-${i}.report.html and .json`);
}

console.log('\n=== ALL 6 FINAL LIGHTHOUSE TESTS COMPLETED SUCCESSFULLY ===');
