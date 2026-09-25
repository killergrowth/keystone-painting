'use strict';
const https = require('https');
const fs = require('fs');

const creds = fs.readFileSync('C:/Users/KillerGrowth/.openclaw/workspace/References/credentials.md', 'utf8');
const token = creds.match(/cfut_[a-zA-Z0-9]+/)[0];
const accountId = '27cafbbee6f8e1db0d9499405d4755c1';
const projectName = 'keystone-painting';

function cfGet(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.cloudflare.com',
      path: `/client/v4${path}`,
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
    };
    const req = https.request(options, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve(JSON.parse(d)));
    });
    req.on('error', reject);
    req.end();
  });
}

async function main() {
  // List all deployments, find the one staging.paintkeystone.com is aliased to
  const res = await cfGet(`/accounts/${accountId}/pages/projects/${projectName}/deployments?per_page=25`);
  if (!res.success) { console.error('Error:', JSON.stringify(res.errors)); return; }

  console.log('Recent deployments:');
  res.result.slice(0, 8).forEach(d => {
    console.log(`  ${d.id.substring(0,8)} | branch:${d.deployment_trigger?.metadata?.branch} | created:${d.created_on} | aliases:${JSON.stringify(d.aliases)}`);
  });
}
main().catch(console.error);
