import { GoogleAuth } from 'google-auth-library';
import { readFileSync } from 'fs';

const key = JSON.parse(readFileSync('C:\\Users\\KillerGrowth\\.openclaw\\credentials\\google-service-account.json'));
const auth = new GoogleAuth({
  credentials: key,
  scopes: ['https://www.googleapis.com/auth/drive'],
  clientOptions: { subject: 'tylerbrickley@killergrowth.com' }
});

const token = await auth.getAccessToken();
const folderId = '1TdXzXwnpx_AGtBwNc50Xq8Pecj5av_Ml';
const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(`"${folderId}" in parents`)}&supportsAllDrives=true&includeItemsFromAllDrives=true&fields=files(id,name,mimeType)`;
const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
const data = await res.json();
console.log(JSON.stringify(data.files, null, 2));
