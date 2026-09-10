'use strict';
const { execSync } = require('child_process');
const fs = require('fs');

const raw = fs.readFileSync('C:\\Users\\KillerGrowth\\.openclaw\\workspace\\References\\credentials.md', 'utf8');
const token = raw.match(/\*\*Token:\*\* (cfut_[^\s<]+)/)[1].trim();
const env = Object.assign({}, process.env, {
  CLOUDFLARE_API_TOKEN: ***
  CLOUDFLARE_ACCOUNT_ID: '27cafbbee6f8e1db0d9499405d4755c1',
});

// Patch verbose error into functions/submit.js
let src = fs.readFileSync('functions/submit.js', 'utf8');
src = src.replace(
  "new Response(JSON.stringify({ ok: false, error: err.message.slice(0, 200) }),",
  "new Response(JSON.stringify({ ok: false, error: ('ERR: ' + err.message + ' | ' + String(err.stack||'').split('\\n').slice(0,3).join(' | ')).slice(0,500) }),"
);
fs.writeFileSync('functions/submit.js', src, 'utf8');
console.log('Verbose error patch applied');

// Build
execSync('node build.js', { stdio: 'inherit' });

// Deploy staging
console.log('Deploying to staging...');
const out = execSync('npx wrangler pages deploy ./dist --project-name keystone-painting --branch staging --commit-dirty=true', { env, stdio: 'pipe' }).toString();
console.log(out.split('\n').slice(-5).join('\n'));
