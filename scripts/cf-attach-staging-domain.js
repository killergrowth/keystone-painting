'use strict';
const https = require('https');
const fs = require('fs');

const creds = fs.readFileSync('C:/Users/KillerGrowth/.openclaw/workspace/References/credentials.md', 'utf8');
const token = creds.match(/cfut_[a-zA-Z0-9]+/)[0];
const accountId = '27cafbbee6f8e1db0d9499405d4755c1';
const projectName = 'keystone-painting';
const deploymentId = '9bc22207-5078-4f58-9b54-cdc46c05d1cc'; // latest staging deploy

function cfRequest(method, path, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const options = {
      hostname: 'api.cloudflare.com',
      path: `/client/v4${path}`,
      method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {}),
      },
    };
    const req = https.request(options, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve(JSON.parse(d)));
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function main() {
  // Patch the project to set staging alias
  const res = await cfRequest('PATCH', `/accounts/${accountId}/pages/projects/${projectName}`, {
    deployment_configs: {
      preview: {
        deployment_retain_rule: null
      }
    }
  });
  console.log('Patch result:', JSON.stringify(res.success), JSON.stringify(res.errors || []));

  // Try setting alias on the deployment directly
  const res2 = await cfRequest('PATCH', `/accounts/${accountId}/pages/projects/${projectName}/deployments/${deploymentId}`, {
    aliases: ['https://staging.paintkeystone.com', 'https://staging.timnath-painting.pages.dev']
  });
  console.log('Deployment patch result:', JSON.stringify(res2.success), JSON.stringify(res2.errors || []));
  if (res2.result) console.log('Aliases now:', JSON.stringify(res2.result.aliases));
}
main().catch(console.error);
