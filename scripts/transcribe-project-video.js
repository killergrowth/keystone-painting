'use strict';
/**
 * transcribe-project-video.js
 * Downloads a Drive video, converts to mp3 if needed, transcribes via Whisper
 * Usage: node scripts/transcribe-project-video.js <driveFileId> <outputSlug>
 */
const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const https = require('https');

const tokenData = require('C:/Users/KillerGrowth/.openclaw/workspace/google-token.json');
const credsData = require('C:/Users/KillerGrowth/.openclaw/workspace/google-oauth-creds.json');
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const auth = new OAuth2Client(credsData.client_id, credsData.client_secret);
auth.setCredentials(tokenData);
const drive = google.drive({ version: 'v3', auth });

const FILE_ID = process.argv[2] || '1U0DRsFj3bDkYhdUHGdSpOPO6z7y5JMXq';
const SLUG = process.argv[3] || 'josh-project-august-2026';

const CONTENT_DIR = path.join(__dirname, '..', 'content', 'projects');
const TRANSCRIPT_DIR = path.join(CONTENT_DIR, 'transcripts');
const TMP_DIR = path.join(__dirname, '..', '.tmp');

[CONTENT_DIR, TRANSCRIPT_DIR, TMP_DIR].forEach(d => fs.mkdirSync(d, { recursive: true }));

const transcriptPath = path.join(TRANSCRIPT_DIR, `${SLUG}.txt`);
if (fs.existsSync(transcriptPath)) {
  console.log('Transcript already exists:', transcriptPath);
  process.exit(0);
}

async function downloadVideo() {
  const tmpPath = path.join(TMP_DIR, `${SLUG}.mp4`);
  if (fs.existsSync(tmpPath)) {
    console.log('Video already downloaded:', tmpPath);
    return tmpPath;
  }
  console.log('Downloading video from Drive...');
  const dest = fs.createWriteStream(tmpPath);
  const res = await drive.files.get(
    { fileId: FILE_ID, alt: 'media', supportsAllDrives: true },
    { responseType: 'stream' }
  );
  await new Promise((resolve, reject) => {
    let downloaded = 0;
    res.data
      .on('data', chunk => { downloaded += chunk.length; process.stdout.write(`\r  ${(downloaded / 1024 / 1024).toFixed(1)} MB`); })
      .on('end', () => { console.log('\n  Download complete.'); resolve(); })
      .on('error', reject)
      .pipe(dest);
  });
  return tmpPath;
}

async function toMp3(videoPath) {
  const mp3Path = videoPath.replace('.mp4', '.mp3');
  if (fs.existsSync(mp3Path)) return mp3Path;
  const sizeMB = fs.statSync(videoPath).size / 1024 / 1024;
  if (sizeMB <= 24) return videoPath; // under 25MB Whisper limit, use directly
  console.log(`File is ${sizeMB.toFixed(1)} MB — converting to mono MP3...`);
  execSync(`ffmpeg -i "${videoPath}" -vn -ac 1 -ar 16000 -b:a 64k "${mp3Path}" -y`, { stdio: 'inherit' });
  console.log('MP3 size:', (fs.statSync(mp3Path).size / 1024 / 1024).toFixed(1), 'MB');
  return mp3Path;
}

async function transcribe(audioPath) {
  console.log('Transcribing via Whisper...');
  const FormData = (await import('form-data')).default;
  const form = new FormData();
  form.append('file', fs.createReadStream(audioPath), { filename: path.basename(audioPath) });
  form.append('model', 'whisper-1');
  form.append('response_format', 'text');

  const res = await new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.openai.com',
      path: '/v1/audio/transcriptions',
      method: 'POST',
      headers: {
        ...form.getHeaders(),
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      }
    }, (resp) => {
      let data = '';
      resp.on('data', c => data += c);
      resp.on('end', () => resolve({ status: resp.statusCode, body: data }));
    });
    req.on('error', reject);
    form.pipe(req);
  });

  if (res.status !== 200) throw new Error(`Whisper error ${res.status}: ${res.body}`);
  return res.body;
}

async function main() {
  const videoPath = await downloadVideo();
  const audioPath = await toMp3(videoPath);
  const transcript = await transcribe(audioPath);
  fs.writeFileSync(transcriptPath, transcript, 'utf8');
  console.log('Transcript saved to:', transcriptPath);
  console.log('\nFirst 500 chars:', transcript.substring(0, 500));
}

main().catch(e => { console.error(e.message); process.exit(1); });
