'use strict';
const https = require('https');
const fs = require('fs');
const raw = fs.readFileSync('C:\\Users\\KillerGrowth\\.openclaw\\workspace\\References\\credentials.md', 'utf8');
const match = raw.match(/\*\*Token:\*\* (cfut_[^\s<]+)/);
const token = match[1].trim();
const acct = '27cafbbee6f8e1db0d9499405d4755c1';

function get(url, cb) {
  https.get(url, { headers: { 'Authorization': 'Bearer ' + token } }, res => {
    let d = '';
    res.on('data', c => d += c);
    res.on('end', () => { try { cb(JSON.parse(d)); } catch(e) { cb({ raw: d.slice(0,500) }); } });
  });
}

get('https://api.cloudflare.com/client/v4/accounts/' + acct + '/pages/projects/keystone-painting', data => {
  if (!data.result) { console.log(JSON.stringify(data).slice(0,500)); return; }
  const envs = data.result.deployment_configs;
  const prod = envs && envs.production;
  const vars = prod && prod.env_vars;
  if (!vars) { console.log('No env vars found'); console.log(JSON.stringify(prod).slice(0,500)); return; }
  console.log('Production env vars (names only):');
  Object.keys(vars).forEach(k => {
    const v = vars[k];
    console.log(' ', k, '=', v.type === 'secret_text' ? '[SECRET]' : JSON.stringify((v.value || '').slice(0,30)));
  });
});
