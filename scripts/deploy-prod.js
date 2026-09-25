'use strict';
const fs = require('fs');
const { execSync } = require('child_process');

const creds = fs.readFileSync('C:/Users/KillerGrowth/.openclaw/workspace/References/credentials.md', 'utf8');
const token = creds.match(/cfut_[a-zA-Z0-9]+/)[0];

process.env.CLOUDFLARE_API_TOKEN = token;
process.env.CLOUDFLARE_ACCOUNT_ID = '27cafbbee6f8e1db0d9499405d4755c1';

console.log('Deploying to PRODUCTION (main)...');
execSync('npx wrangler pages deploy ./dist --project-name keystone-painting --branch main --commit-dirty=true', {
  stdio: 'inherit',
  cwd: 'C:\\Users\\KillerGrowth\\.openclaw\\workspace\\sites\\keystone-painting',
});
