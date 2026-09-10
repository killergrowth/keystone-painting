/**
 * upload-gallery-photos.js
 * Downloads photos from Google Drive, resizes to web-safe size, uploads to gallery API.
 * Usage: node upload-gallery-photos.js
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const GALLERY_API = 'https://keystone-painting.pages.dev/api/photos';
const ADMIN_PASSWORD = 'killergrowth';
const TEMP_DIR = path.join(__dirname, '_gallery_temp');

let ACCESS_TOKEN = '';

// All photos to upload (Photos folder + 2 unique Gallery items)
const PHOTOS = [
  { id: '10hteC5jxZIpi9ZqCkXglgEMPSx-X6uKR', name: 'IMG_5611.jpg' },
  { id: '1rrtIPzj4vMx4loW1RV3frJ5eF7T-VnxU', name: 'IMG_5599.jpg' },
  { id: '10CRhUs93f5XpfLSdMfL0ZmwV-oRSkREA', name: 'IMG_0595.jpg' },
  { id: '1yOWY05ECt4A9vwwRx2HY3L_ANCVFt5wF', name: 'IMG_0594.jpg' },
  { id: '19bh-LE219kZuPjhxzLlH10ccDd-hkU8m', name: 'Sharon_2.jpg' },
  { id: '1kKdarIEPPgsd64Xd7kJRgJBxqAj4GIXC', name: 'IMG_7798.jpg' },
  { id: '1RSsBl7ZxyzpJlXzElyOH6zv6x961SdDl', name: 'IMG_6142.jpg' },
  { id: '17CnZSwvuJQfffE7l5oXol102WTTVFSjT', name: 'IMG_4932.jpg' },
  { id: '1iOdnB18LbjH8IH3izp6u3ZRpzeduDYE3', name: 'IMG_3224.jpg' },
  { id: '1L2abL9QEzhXyZlEGq6uvuz9Lf2h_9FKH', name: 'IMG_3179.jpg' },
  { id: '1c_ZhKTOFN1DrP1E4J3QEQyFyDz7DoY9M', name: '338A8002.jpg' },
  { id: '19PkNVhZqgQtXPWHgbmmaufShiMMhiaV7', name: '338A8005.jpg' },
  { id: '1WC5I4ZidKOuU0m0C_fMkvLuMnjgAf_Ar', name: '338A8010-Edit.jpg' },
  { id: '1GEHD_CJVkVy0lU6UCFD-cTP7DFkhq-2P', name: 'photo_2.jpg' },
  { id: '1pLLWENhDeFa8yYcIMRD8wPLr532sjRCP', name: 'photo_1.jpg' },
  { id: '1hrpfPy39eZo-kU-Cb5QglwQEdfLajPH7', name: 'DSC_8442.jpg' },
  { id: '1YsYCWI3Z2bp-x6KgjGbSz6dAMADlSKr9', name: 'DSC_8410.jpg' },
  { id: '1Kw0odD-mzndD5WY-jp5L_XwbI5ZcAbHI', name: 'DSC_8535.jpg' },
  { id: '1lAJW3YSWFwP_JP8olp0QmDMa89e9YPTU', name: 'DSC_8581.jpg' },
  { id: '1XSNdGv8FWMGxDaCQUhDI0q-yrqGkU8RH', name: '_r4a2817-edit.jpg' },
  // Unique Gallery items
  { id: '1C0hzZFO8Lhxy4mJspmONQtMqHP0LxXDi', name: 'IMG_8843.jpg' },
  { id: '1jGg8qfPcEyuVO2q0UbgDA92nI6pCs58p', name: 'DSC_8424.jpg' },
];

function autoTag(name) {
  const n = name.toLowerCase();
  if (n.startsWith('dsc_') || n.startsWith('_r4a') || n.startsWith('338a')) return ['exterior'];
  if (n.startsWith('sharon')) return ['exterior'];
  return ['painting'];
}

async function refreshToken() {
  const credsPath = path.join(__dirname, '../../google-oauth-creds.json');
  const tokenPath = path.join(__dirname, '../../google-token.json');
  const creds = JSON.parse(fs.readFileSync(credsPath, 'utf8'));
  const tokenData = JSON.parse(fs.readFileSync(tokenPath, 'utf8'));
  const body = new URLSearchParams({
    client_id: creds.client_id,
    client_secret: creds.client_secret,
    refresh_token: tokenData.refresh_token,
    grant_type: 'refresh_token',
  });
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });
  const data = await res.json();
  if (!data.access_token) throw new Error('Token refresh failed: ' + JSON.stringify(data));
  ACCESS_TOKEN = data.access_token;
  console.log('✓ Token refreshed');
}

async function downloadFile(fileId, destPath) {
  const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${ACCESS_TOKEN}` } });
  if (!res.ok) throw new Error(`Drive download ${res.status}: ${res.statusText}`);
  const buf = await res.arrayBuffer();
  fs.writeFileSync(destPath, Buffer.from(buf));
}

async function resizeImage(inputPath, outputPath) {
  const stat = fs.statSync(inputPath);
  const meta = await sharp(inputPath).metadata();
  const MAX = 1920;
  if ((meta.width || 0) > MAX || (meta.height || 0) > MAX) {
    await sharp(inputPath)
      .resize({ width: MAX, height: MAX, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 82, progressive: true })
      .toFile(outputPath);
    const newStat = fs.statSync(outputPath);
    console.log(`  Resized: ${(stat.size/1024/1024).toFixed(1)}MB → ${(newStat.size/1024/1024).toFixed(1)}MB`);
  } else {
    // Still re-encode as JPEG for consistency
    await sharp(inputPath).jpeg({ quality: 85, progressive: true }).toFile(outputPath);
    console.log(`  Re-encoded: ${(fs.statSync(outputPath).size/1024).toFixed(0)}KB`);
  }
}

async function uploadPhoto(imagePath, filename, tags) {
  const bytes = fs.readFileSync(imagePath);
  const blob = new Blob([bytes], { type: 'image/jpeg' });
  const form = new FormData();
  form.append('password', ADMIN_PASSWORD);
  form.append('photo', blob, filename);
  form.append('tags', tags.join(','));
  form.append('title', '');
  const res = await fetch(GALLERY_API, { method: 'POST', body: form });
  const data = await res.json();
  if (!data.ok) throw new Error('Upload failed: ' + JSON.stringify(data));
  return data.photo;
}

async function main() {
  if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true });
  await refreshToken();

  const results = [];

  for (let i = 0; i < PHOTOS.length; i++) {
    const photo = PHOTOS[i];
    const rawPath = path.join(TEMP_DIR, 'raw_' + photo.name);
    const webPath = path.join(TEMP_DIR, 'web_' + photo.name.replace(/\.[^.]+$/, '.jpg'));

    console.log(`\n[${i+1}/${PHOTOS.length}] ${photo.name}`);

    try {
      if (!fs.existsSync(webPath)) {
        console.log('  Downloading...');
        await downloadFile(photo.id, rawPath);
        console.log(`  Downloaded (${(fs.statSync(rawPath).size/1024/1024).toFixed(1)}MB)`);
        await resizeImage(rawPath, webPath);
        if (fs.existsSync(rawPath)) fs.unlinkSync(rawPath);
      } else {
        console.log('  Using cached resize');
      }

      console.log('  Uploading...');
      const tags = autoTag(photo.name);
      const uploaded = await uploadPhoto(webPath, photo.name.replace(/\.[^.]+$/, '.jpg'), tags);
      console.log(`  ✅ id=${uploaded.id} tags=[${tags.join(',')}]`);
      results.push({ name: photo.name, status: 'ok', id: uploaded.id, tags });
    } catch (err) {
      console.error(`  ❌ ${err.message}`);
      results.push({ name: photo.name, status: 'failed', error: err.message });
    }
  }

  console.log('\n══════════ SUMMARY ══════════');
  const ok = results.filter(r => r.status === 'ok');
  const fail = results.filter(r => r.status !== 'ok');
  console.log(`✅ Uploaded: ${ok.length}/${PHOTOS.length}`);
  if (fail.length) {
    console.log(`❌ Failed:   ${fail.length}`);
    fail.forEach(r => console.log(`   ${r.name}: ${r.error}`));
  }

  fs.writeFileSync(path.join(TEMP_DIR, 'upload-results.json'), JSON.stringify(results, null, 2));
  console.log('Results: _gallery_temp/upload-results.json');
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
