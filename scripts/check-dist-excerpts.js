'use strict';
const fs = require('fs');
const h = fs.readFileSync(__dirname + '/../dist/projects/index.html', 'utf8');

// find all proj-card-excerpt instances
let pos = 0;
let count = 0;
while (true) {
  const i = h.indexOf('proj-card-excerpt">', pos);
  if (i === -1) break;
  count++;
  const chunk = h.substring(i + 19, i + 200);
  console.log('EXCERPT ' + count + ':', chunk);
  pos = i + 1;
}

// non-ascii check
const nonAscii = h.split('\n').filter(l => /[^\x00-\x7F]/.test(l) && !l.includes('/*') && !l.includes('main-footer'));
console.log('\nNon-ASCII lines in dist:', nonAscii.length);
nonAscii.forEach(l => console.log(' >', l.trim().substring(0, 120)));
