'use strict';
// Updates the staging.paintkeystone.com alias to point to the latest staging deployment
const https = require('https');
const fs = require('fs');

const creds = fs.readFileSync('C:/Users/KillerGrowth/.openclaw/workspace/References/credentials.md', 'utf8');
const token = creds.match(/cfut_[a-zA-Z0-9]+/)[0];
const accountId = '27cafbbee6f8e1db0d9499405d4755c1';
const projectName = 'keystone-painting';

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
  // Get list of deployments for this project
  const deploymentsRes = await cfRequest('GET', `/accounts/${accountId}/pages/projects/${projectName}/deployments`);
  if (!deploymentsRes.success) {
    console.error('Failed to list deployments:', JSON.stringify(deploymentsRes.errors));
    return;
  }

  // Find most recent staging deployment
  const stagingDeploys = deploymentsRes.result.filter(d => d.deployment_trigger?.metadata?.branch === 'staging');
  stagingDeploys.sort((a, b) => new Date(b.created_on) - new Date(a.created_on));
  const latest = stagingDeploys[0];
  if (!latest) { console.log('No staging deployments found.'); return; }

  console.log('Latest staging deployment:', latest.id);
  console.log('Created:', latest.created_on);
  console.log('URL:', latest.url);

  // Check current aliases
  const projectRes = await cfRequest('GET', `/accounts/${accountId}/pages/projects/${projectName}`);
  if (!projectRes.success) { console.error('Failed to get project:', JSON.stringify(projectRes.errors)); return; }

  const stagingAlias = projectRes.result.deployment_configs?.preview?.deployment_retention_period;
  console.log('\nProject staging config:', JSON.stringify(projectRes.result.subdomain));
  console.log('Latest deployment aliases:', JSON.stringify(latest.aliases));
}

main().catch(console.error);
