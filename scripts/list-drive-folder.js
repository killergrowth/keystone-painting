'use strict';
const fs = require('fs');
const https = require('https');
const crypto = require('crypto');

const sa = JSON.parse(fs.readFileSync('C:/Users/KillerGrowth/.openclaw/credentials/google-service-account.json'));
const now = Math.floor(Date.now() / 1000);
const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
const claim = Buffer.from(JSON.stringify({
  iss: sa.client_email,
  sub: 'brickley@killergrowth.com',
  scope: 'https://www.googleapis.com/auth/drive.readonly',
  aud: 'https://oauth2.googleapis.com/token',
  iat: now, exp: now + 3600
})).toString('base64url');
const sig = crypto.createSign('RSA-SHA256').update(header + '.' + claim).sign(sa.private_key, 'base64url');
const jwt = header + '.' + claim + '.' + sig;

const body = 'grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=' + jwt;
const req = https.request({
  hostname: 'oauth2.googleapis.com', path: '/token', method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': body.length }
}, (res) => {
  let d = ''; res.on('data', c => d += c); res.on('end', () => {
    const tok = JSON.parse(d).access_token;
    if (!tok) { console.error('No token:', d); return; }
    const folderId = '1ztt4NqFKsknpMw81_b6fmSM5p2BC0Ugc';
    const qs = "q=" + encodeURIComponent("'" + folderId + "' in parents and trashed=false") +
      "&fields=" + encodeURIComponent("files(id,name,mimeType,size,createdTime)") +
      "&orderBy=createdTime%20desc";
    const r2 = https.request({
      hostname: 'www.googleapis.com',
      path: '/drive/v3/files?' + qs,
      method: 'GET',
      headers: { Authorization: 'Bearer ' + tok }
    }, (res2) => {
      let d2 = ''; res2.on('data', c => d2 += c); res2.on('end', () => {
        const files = JSON.parse(d2).files || [];
        if (!files.length) { console.log('No files found in folder'); return; }
        files.forEach(f => console.log(f.id + ' | ' + f.name + ' | ' + f.mimeType + ' | ' + (Math.round((f.size||0)/1024/1024*10)/10) + 'MB | ' + f.createdTime));
      });
    });
    r2.end();
  });
});
req.write(body); req.end();
