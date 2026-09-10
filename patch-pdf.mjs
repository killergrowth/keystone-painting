import { GoogleAuth } from 'google-auth-library';
import { readFileSync, writeFileSync } from 'fs';
import os from 'os';
import path from 'path';

const key = JSON.parse(readFileSync('C:\\Users\\KillerGrowth\\.openclaw\\credentials\\google-service-account.json'));
const auth = new GoogleAuth({
  credentials: key,
  scopes: ['https://www.googleapis.com/auth/drive'],
  clientOptions: { subject: 'tylerbrickley@killergrowth.com' }
});

const token = await auth.getAccessToken();
const fileId = '1nzATCSWA86_22X3Bn8sLCbAY8miSBdxc';
const tmpIn = path.join(os.tmpdir(), 'timnath-report-orig.pdf');

// Read the downloaded PDF as a string to find the bounce rate value
const buf = readFileSync(tmpIn);
const str = buf.toString('latin1');

// Search for the bounce rate pattern (e.g. 5000%, 5,000%, variations)
const matches = [];
const re = /\d[\d,]*\s*%/g;
let m;
while ((m = re.exec(str)) !== null) {
  if (parseInt(m[0].replace(/[,%\s]/g,'')) > 500) {
    matches.push({ value: m[0], index: m.index });
  }
}
console.log('High % values found:', JSON.stringify(matches.slice(0, 10)));
