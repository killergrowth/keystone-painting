'use strict';
const fs = require('fs');
const p = 'C:/Users/KillerGrowth/.openclaw/workspace/sites/keystone-painting/content/projects/generated/interior-painting-loveland-whole-home-repaint.json';

// Strip BOM if present, then parse
let raw = fs.readFileSync(p, 'utf8');
if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);

const j = JSON.parse(raw);
j.drive_file_id = '1U0DRsFj3bDkYhdUHGdSpOPO6z7y5JMXq';
j.r2_video_url = 'https://pub-c0750a835db24cafb2122a61ebf6d99c.r2.dev/projects/interior-painting-loveland-whole-home-repaint.mp4';

const out = JSON.stringify(j, null, 2)
  .replace(/[\u2018\u2019]/g, "'")
  .replace(/[\u201C\u201D]/g, '"')
  .replace(/\u2013/g, '-')
  .replace(/\u2014/g, '--')
  .replace(/\u2026/g, '...')
  .replace(/\u00A0/g, ' ');

// Write without BOM
fs.writeFileSync(p, out, 'utf8');
console.log('Done. drive_file_id:', j.drive_file_id);
console.log('r2_video_url:', j.r2_video_url);
