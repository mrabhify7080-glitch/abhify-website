const fs = require('fs');
const path = require('path');

const root = __dirname;
console.log('Verified Working Directory:', root);

const htmlFiles = fs.readdirSync(root).filter(f => f.endsWith('.html'));
console.log('Testing', htmlFiles.length, 'HTML pages in abhify-production...\n');

let totalBroken = 0;
let checkedCount = 0;

htmlFiles.forEach(file => {
  const content = fs.readFileSync(path.join(root, file), 'utf8');
  
  // Check local HTML links
  const hrefRegex = /href=["']([^"'#:?]+?\.html)["']/gi;
  let match;
  while ((match = hrefRegex.exec(content)) !== null) {
    const target = match[1];
    checkedCount++;
    if (!fs.existsSync(path.join(root, target))) {
      console.log(`[BROKEN LINK] in ${file} -> ${target}`);
      totalBroken++;
    }
  }

  // Check local CSS links
  const cssRegex = /href=["']([^"'#:?]+?\.css)(?:\?[^"']*)?["']/gi;
  while ((match = cssRegex.exec(content)) !== null) {
    const target = match[1];
    if (!target.startsWith('http')) {
      checkedCount++;
      if (!fs.existsSync(path.join(root, target))) {
        console.log(`[BROKEN CSS] in ${file} -> ${target}`);
        totalBroken++;
      }
    }
  }

  // Check local JS links
  const jsRegex = /src=["']([^"'#:?]+?\.js)(?:\?[^"']*)?["']/gi;
  while ((match = jsRegex.exec(content)) !== null) {
    const target = match[1];
    if (!target.startsWith('http')) {
      checkedCount++;
      if (!fs.existsSync(path.join(root, target))) {
        console.log(`[BROKEN JS] in ${file} -> ${target}`);
        totalBroken++;
      }
    }
  }
});

console.log(`Tested ${checkedCount} internal asset & page references.`);
if (totalBroken === 0) {
  console.log('✓ SUCCESS: All internal HTML, CSS, and JS links across all pages are 100% valid!');
} else {
  console.log(`✗ FOUND ${totalBroken} broken internal references.`);
}
