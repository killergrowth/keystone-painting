import { GoogleAuth } from 'google-auth-library';
import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import os from 'os';

const key = JSON.parse(readFileSync('C:\\Users\\KillerGrowth\\.openclaw\\credentials\\google-service-account.json'));
const auth = new GoogleAuth({
  credentials: key,
  scopes: ['https://www.googleapis.com/auth/drive'],
  clientOptions: { subject: 'tylerbrickley@killergrowth.com' }
});

const token = await auth.getAccessToken();
const fileId = '1nzATCSWA86_22X3Bn8sLCbAY8miSBdxc';

// Download the PDF
const dlRes = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
  headers: { Authorization: `Bearer ${token}` }
});
const buf = Buffer.from(await dlRes.arrayBuffer());
const tmpIn = path.join(os.tmpdir(), 'timnath-report-orig.pdf');
const tmpOut = path.join(os.tmpdir(), 'timnath-report-fixed.pdf');
writeFileSync(tmpIn, buf);
console.log('Downloaded:', tmpIn, buf.length, 'bytes');
console.log('PDF saved. Needs manual edit or PDF tool to replace bounce rate text.');
console.log('File ID:', fileId);
