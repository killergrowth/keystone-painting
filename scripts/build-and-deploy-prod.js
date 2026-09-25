'use strict';
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const siteRoot = 'C:\\Users\\KillerGrowth\\.openclaw\\workspace\\sites\\keystone-painting';
const creds = fs.readFileSync('C:/Users/KillerGrowth/.openclaw/workspace/References/credentials.md', 'utf8');
const token = creds.match(/cfut_[a-zA-Z0-9]+/)[0];

// Step 1: build
console.log('Building...');
execSync('node build.js', { stdio: 'inherit', cwd: siteRoot });

// Step 2: add timestamp comment to project pages to force new content hashes
const targets = [
  'dist/projects/index.html',
  'dist/projects/exterior-painting-loveland-vinyl-flip/index.html',
  'dist/projects/fence-staining-timnath-hoa-approval/index.html',
  'dist/projects/interior-painting-loveland-whole-home-repaint/index.html',
];
const stamp = `\n<!-- deploy:${Date.now()} -->`;
targets.forEach(f => {
  const p = path.join(siteRoot, f);
  let c = fs.readFileSync(p, 'utf8');
  c = c.replace(/\n<!-- deploy:\d+ -->/g, ''); // remove old stamp
  fs.writeFileSync(p, c + stamp, 'utf8');
  console.log('Stamped:', f);
});

// Step 3: deploy to prod
process.env.CLOUDFLARE_API_TOKEN = token;
process.env.CLOUDFLARE_ACCOUNT_ID = '27cafbbee6f8e1db0d9499405d4755c1';
console.log('\nDeploying to PRODUCTION...');
execSync('npx wrangler pages deploy ./dist --project-name keystone-painting --branch main --commit-dirty=true', {
  stdio: 'inherit',
  cwd: siteRoot,
});
console.log('\nDone.');
