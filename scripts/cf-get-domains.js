'use strict';
const https = require('https');
const fs = require('fs');

const creds = fs.readFileSync('C:/Users/KillerGrowth/.openclaw/workspace/References/credentials.md', 'utf8');
const token = creds.match(/cfut_[a-zA-Z0-9]+/)[0];
const accountId = '27cafbbee6f8e1db0d9499405d4755c1';
const projectName = 'keystone-painting';

function cfGet(path) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.cloudflare.com',
      path: `/client/v4${path}`,
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
    }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve(JSON.parse(d)));
    });
    req.on('error', reject);
    req.end();
  });
}

async function main() {
  const res = await cfGet(`/accounts/${accountId}/pages/projects/${projectName}/domains`);
  if (!res.success) { console.error('Error:', JSON.stringify(res.errors)); return; }
  console.log('Domains:');
  res.result.forEach(d => console.log(`  ${d.name} | status:${d.status} | verification:${JSON.stringify(d.verification_data || 'none')}`));
}
main().catch(console.error);
