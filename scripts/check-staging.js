'use strict';
const https = require('https');

https.get('https://staging.paintkeystone.com/projects/', res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const lines = data.split('\n');
    const hits = lines.filter(l => /[^\x00-\x7F]/.test(l) && !l.includes('/*') && !l.includes('main-footer'));
    console.log('Non-ASCII lines on LIVE staging:', hits.length);
    hits.slice(0, 5).forEach(l => console.log(l.trim().substring(0, 150)));
  });
}).on('error', e => console.error(e.message));
