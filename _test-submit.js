'use strict';
const https = require('https');

// POST to /submit with a fake Turnstile token — will fail Turnstile but reveal any other errors
// We need to see what error code comes back
const boundary = '----FormBoundary' + Math.random().toString(36).slice(2);
const fields = {
  name: 'Test User',
  email: 'test@example.com',
  phone: '5551234567',
  address: '123 Test St, Timnath CO',
  service: 'exterior-painting',
  message: 'Test submission',
  'cf-turnstile-response': 'XXXX.DUMMY.TOKEN.XXXX'
};

let body = '';
for (const [k, v] of Object.entries(fields)) {
  body += `--${boundary}\r\nContent-Disposition: form-data; name="${k}"\r\n\r\n${v}\r\n`;
}
body += `--${boundary}--\r\n`;

const options = {
  hostname: 'timnathpainting.com',
  path: '/submit',
  method: 'POST',
  headers: {
    'Content-Type': `multipart/form-data; boundary=${boundary}`,
    'Content-Length': Buffer.byteLength(body),
    'Origin': 'https://timnathpainting.com',
  }
};

const req = https.request(options, res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Body:', d);
  });
});
req.on('error', e => console.error('Error:', e.message));
req.write(body);
req.end();
