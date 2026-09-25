'use strict';
// Appends a timestamp comment to project pages to force new content hashes,
// deploys to staging, then removes the comments so the next build is clean.
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const distRoot = path.join(__dirname, '..', 'dist');
const targets = [
  'projects/index.html',
  'projects/exterior-painting-loveland-vinyl-flip/index.html',
  'projects/fence-staining-timnath-hoa-approval/index.html',
  'projects/interior-painting-loveland-whole-home-repaint/index.html',
];

const stamp = `<!-- cache-bust:${Date.now()} -->`;

// Add stamp
targets.forEach(f => {
  const p = path.join(distRoot, f);
  const c = fs.readFileSync(p, 'utf8').replace(/<!-- cache-bust:\d+ -->/g, '');
  fs.writeFileSync(p, c + stamp, 'utf8');
  console.log('Stamped:', f);
});

// Read token
const creds = fs.readFileSync('C:/Users/KillerGrowth/.openclaw/workspace/References/credentials.md', 'utf8');
const token = creds.match(/cfut_[a-zA-Z0-9]+/)[0];

// Deploy
console.log('\nDeploying to staging...');
process.env.CLOUDFLARE_API_TOKEN = token;
process.env.CLOUDFLARE_ACCOUNT_ID = '27cafbbee6f8e1db0d9499405d4755c1';
execSync('npx wrangler pages deploy ./dist --project-name keystone-painting --branch staging --commit-dirty=true', {
  stdio: 'inherit',
  cwd: path.join(__dirname, '..'),
});

// Remove stamp — next build.js run will overwrite anyway but keep dist clean
targets.forEach(f => {
  const p = path.join(distRoot, f);
  const c = fs.readFileSync(p, 'utf8').replace(/<!-- cache-bust:\d+ -->/g, '');
  fs.writeFileSync(p, c, 'utf8');
});
console.log('\nStamps removed. Staging deploy complete.');
