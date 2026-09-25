'use strict';
const https = require('https');

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function main() {
  const urls = {
    'PROD': 'https://paintkeystone.com/projects/',
    'STAGING': 'https://staging.timnath-painting.pages.dev/projects/',
  };
  for (const [label, url] of Object.entries(urls)) {
    const data = await fetch(url);
    let pos = 0, excerpts = [];
    while (true) {
      const i = data.indexOf('proj-card-excerpt">', pos);
      if (i === -1) break;
      excerpts.push(data.substring(i + 19, i + 80));
      pos = i + 1;
    }
    const nonAscii = data.split('\n').filter(l => /[^\x00-\x7F]/.test(l) && !l.includes('/*') && !l.includes('main-footer')).length;
    console.log(`\n${label} (${url})`);
    console.log('  has main-header:', data.includes('main-header'));
    console.log('  non-ascii lines:', nonAscii);
    console.log('  excerpts:', excerpts);
  }
}
main().catch(console.error);
