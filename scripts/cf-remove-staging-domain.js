'use strict';
const https = require('https');
const fs = require('fs');

const creds = fs.readFileSync('C:/Users/KillerGrowth/.openclaw/workspace/References/credentials.md', 'utf8');
const token = creds.match(/cfut_[a-zA-Z0-9]+/)[0];
const accountId = '27cafbbee6f8e1db0d9499405d4755c1';
const projectName = 'keystone-painting';

function cfRequest(method, path) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.cloudflare.com',
      path: `/client/v4${path}`,
      method,
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
    }, res => {
      let d = ''; res.on('data', c => d += c); res.on('end', () => resolve(JSON.parse(d)));
    });
    req.on('error', reject); req.end();
  });
}

async function main() {
  const res = await cfRequest('DELETE', `/accounts/${accountId}/pages/projects/${projectName}/domains/staging.paintkeystone.com`);
  console.log('Removed staging.paintkeystone.com:', res.success);
  if (res.errors?.length) console.error(JSON.stringify(res.errors));
}
main().catch(console.error);
