'use strict';
const https = require('https');

https.get('https://staging.paintkeystone.com/projects/', res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('=== STRUCTURE ===');
    console.log('has <body>:', data.includes('<body>'));
    console.log('has main-header:', data.includes('main-header'));
    console.log('has main-footer:', data.includes('main-footer'));
    console.log('has proj-index-wrap:', data.includes('proj-index-wrap'));

    console.log('\n=== NON-ASCII (non-comment lines) ===');
    const hits = data.split('\n').filter(l =>
      /[^\x00-\x7F]/.test(l) && !l.includes('/*') && !l.includes('//')
    );
    console.log('count:', hits.length);
    hits.slice(0, 5).forEach(l => console.log(l.trim().substring(0, 150)));

    console.log('\n=== AROUND "Loveland" ===');
    const idx = data.indexOf('Loveland');
    if (idx > -1) console.log(JSON.stringify(data.substring(idx, idx + 40)));

    console.log('\n=== FIRST 200 chars of body ===');
    const bodyIdx = data.indexOf('<body>');
    if (bodyIdx > -1) console.log(data.substring(bodyIdx, bodyIdx + 200));
    else console.log('NO <body> TAG FOUND');
  });
}).on('error', e => console.error(e.message));
