'use strict';
const fs = require('fs');
const path = require('path');

const files = [
  'content/projects/generated/exterior-painting-south-loveland-vinyl-flip.json',
  'content/projects/generated/fence-staining-timnath-hoa-approval.json',
  'content/projects/generated/interior-painting-loveland-whole-home-repaint.json',
];

files.forEach(f => {
  const fullPath = path.join(__dirname, '..', f);
  let raw = fs.readFileSync(fullPath, 'utf8');
  const before = (raw.match(/[^\x00-\x7F]/g) || []).length;

  // Fix mojibake: three-byte UTF-8 sequences misread as Latin-1
  // Order matters -- longest sequences first
  raw = raw
    .replace(/\u00e2\u0080\u0099/g, "'")      // right single quote '
    .replace(/\u00e2\u0080\u0098/g, "'")      // left single quote '
    .replace(/\u00e2\u0080\u009c/g, '"')      // left double quote "
    .replace(/\u00e2\u0080\u009d/g, '"')      // right double quote "
    .replace(/\u00e2\u0080\u0094/g, ' -- ')   // em dash — (with spaces so words don't jam)
    .replace(/\u00e2\u0080\u0093/g, ' - ')    // en dash –
    .replace(/\u00e2\u0080\u00a6/g, '...')    // ellipsis …
    .replace(/\u00e2\u0080\u00a2/g, '-')      // bullet •
    .replace(/[^\x00-\x7F]/g, ' ');           // catch-all: replace with space, not empty string

  // Also fix jammed words from previous bad run (no space around dash)
  // e.g. "Lovelanda" should be "Loveland -- a"
  // We can't auto-detect all of these, but we can re-check for obvious runs
  const after = (raw.match(/[^\x00-\x7F]/g) || []).length;
  fs.writeFileSync(fullPath, raw, 'utf8');
  console.log(path.basename(f), '| fixed:', before - after, '| remaining:', after);
});
