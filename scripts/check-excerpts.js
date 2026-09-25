'use strict';
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'content/projects/generated');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

files.forEach(f => {
  const j = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
  const article = j.article || '';
  
  // Show first 200 chars of article
  console.log('\n=== ' + f + ' ===');
  console.log('First 200:', article.substring(0, 200));
  
  // Show any non-ASCII
  const hits = [];
  for (let i = 0; i < article.length; i++) {
    if (article.charCodeAt(i) > 127) hits.push({ i, code: article.charCodeAt(i), char: article[i] });
  }
  console.log('Non-ASCII chars:', hits.length);
  if (hits.length) hits.slice(0,5).forEach(h => console.log('  pos', h.i, 'code', h.code, '=', JSON.stringify(article.substring(h.i-5, h.i+10))));
});
