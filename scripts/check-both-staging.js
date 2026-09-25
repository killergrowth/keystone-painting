'use strict';
const https = require('https');

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ url, data }));
    }).on('error', reject);
  });
}

async function main() {
  const urls = [
    'https://staging.paintkeystone.com/projects/',
    'https://staging.timnath-painting.pages.dev/projects/',
  ];
  for (const url of urls) {
    const { data } = await fetch(url);
    const idx = data.indexOf('proj-card-excerpt">');
    let excerpt = idx > -1 ? data.substring(idx + 19, idx + 120) : 'NOT FOUND';
    const nonAscii = data.split('\n').filter(l => /[^\x00-\x7F]/.test(l) && !l.includes('/*') && !l.includes('main-footer')).length;
    const hasHeader = data.includes('main-header');
    console.log('\nURL:', url);
    console.log('has main-header:', hasHeader);
    console.log('non-ascii lines:', nonAscii);
    console.log('excerpt:', excerpt);
  }
}
main().catch(console.error);
