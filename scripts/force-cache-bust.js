'use strict';
// Append an invisible HTML comment with a timestamp to force new content hash
// so Wrangler treats these as new files and uploads them
const fs = require('fs');
const path = require('path');
const stamp = `<!-- bust:${Date.now()} -->`;
const files = [
  'dist/projects/index.html',
  'dist/projects/exterior-painting-loveland-vinyl-flip/index.html',
  'dist/projects/fence-staining-timnath-hoa-approval/index.html',
  'dist/projects/interior-painting-loveland-whole-home-repaint/index.html',
];
files.forEach(f => {
  const p = path.join(__dirname, '..', f);
  const content = fs.readFileSync(p, 'utf8');
  // Remove any old bust comment first, then append new one
  const cleaned = content.replace(/<!-- bust:\d+ -->/g, '');
  fs.writeFileSync(p, cleaned + stamp, 'utf8');
  console.log('Busted:', f);
});
