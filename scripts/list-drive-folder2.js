'use strict';
const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');
const tokenData = require('C:/Users/KillerGrowth/.openclaw/workspace/google-token.json');
const credsData = require('C:/Users/KillerGrowth/.openclaw/workspace/google-oauth-creds.json');

const auth = new OAuth2Client(credsData.client_id, credsData.client_secret);
auth.setCredentials(tokenData);
const drive = google.drive({ version: 'v3', auth });

drive.files.list({
  q: "'1ztt4NqFKsknpMw81_b6fmSM5p2BC0Ugc' in parents and trashed=false",
  fields: 'files(id,name,mimeType,size,createdTime)',
  orderBy: 'createdTime desc'
}).then(r => {
  const files = r.data.files || [];
  if (!files.length) { console.log('No files found in folder'); return; }
  files.forEach(f => console.log(f.id + ' | ' + f.name + ' | ' + (Math.round((f.size||0)/1024/1024*10)/10) + 'MB | ' + f.createdTime));
}).catch(e => console.error('ERROR:', e.message));
