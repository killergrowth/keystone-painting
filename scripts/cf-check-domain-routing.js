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
      let d = ''; res.on('data', c => d += c); res.on('end', () => resolve(JSON.parse(d)));
    });
    req.on('error', reject); req.end();
  });
}

async function main() {
  // Get project config - shows what branch each custom domain follows
  const res = await cfGet(`/accounts/${accountId}/pages/projects/${projectName}`);
  if (!res.success) { console.error(JSON.stringify(res.errors)); return; }

  const p = res.result;
  console.log('Production branch:', p.production_branch);
  console.log('Preview branch:', p.preview_deployment_setting);
  console.log('\nProduction deployment:');
  if (p.canonical_deployment) {
    console.log('  id:', p.canonical_deployment.id.substring(0,8));
    console.log('  branch:', p.canonical_deployment.deployment_trigger?.metadata?.branch);
    console.log('  aliases:', JSON.stringify(p.canonical_deployment.aliases));
  }
  console.log('\nLatest preview deployment:');
  if (p.latest_deployment) {
    console.log('  id:', p.latest_deployment.id.substring(0,8));
    console.log('  branch:', p.latest_deployment.deployment_trigger?.metadata?.branch);
    console.log('  aliases:', JSON.stringify(p.latest_deployment.aliases));
  }
  console.log('\nDeployment configs preview branches:', JSON.stringify(p.deployment_configs?.preview?.deployment_retention_period));
}
main().catch(console.error);
