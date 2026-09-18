'use strict';
/**
 * fetch-reviews.js - Keystone Painting
 * Fetches 5-star Google reviews via Places API (New) using service account OAuth.
 * Writes to data/reviews.json. Safe to run in cron — never overwrites on failure.
 *
 * Usage: node scripts/fetch-reviews.js
 * Requires env: GOOGLE_SA_JSON (service account JSON string)
 */

const crypto = require('crypto');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PLACE_ID = 'ChIJixYBzMR6BKQRn0RVZTe_oFw';
const OUT_FILE = path.join(__dirname, '..', 'data', 'reviews.json');

// ── Service account auth ──────────────────────────────────────────────────────
function getServiceAccount() {
  const raw = process.env.GOOGLE_SA_JSON;
  if (!raw) {
    console.error('GOOGLE_SA_JSON env var not set');
    process.exit(1);
  }
  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse GOOGLE_SA_JSON:', e.message);
    process.exit(1);
  }
}

function makeJwt(clientEmail, privateKey) {
  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
  const claims = Buffer.from(JSON.stringify({
    iss: clientEmail,
    scope: 'https://www.googleapis.com/auth/cloud-platform',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600
  })).toString('base64url');
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(header + '.' + claims);
  const sig = sign.sign(privateKey, 'base64url');
  return header + '.' + claims + '.' + sig;
}

function httpRequest(options, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

async function getAccessToken(clientEmail, privateKey) {
  const jwt = makeJwt(clientEmail, privateKey);
  const body = 'grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=' + jwt;
  const res = await httpRequest({
    hostname: 'oauth2.googleapis.com',
    path: '/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(body)
    }
  }, body);
  const parsed = JSON.parse(res.body);
  if (!parsed.access_token) {
    throw new Error('Failed to get access token: ' + res.body);
  }
  return parsed.access_token;
}

// ── Places API fetch ──────────────────────────────────────────────────────────
async function fetchPlaceDetails(accessToken) {
  const res = await httpRequest({
    hostname: 'places.googleapis.com',
    path: `/v1/places/${PLACE_ID}`,
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'X-Goog-FieldMask': 'reviews,rating,userRatingCount',
      'Content-Type': 'application/json'
    }
  });

  if (res.status !== 200) {
    throw new Error(`Places API returned ${res.status}: ${res.body}`);
  }
  return JSON.parse(res.body);
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  const sa = getServiceAccount();
  console.log('Fetching access token...');

  let accessToken;
  try {
    accessToken = await getAccessToken(sa.client_email, sa.private_key);
  } catch (err) {
    console.error('Auth failed:', err.message);
    console.log('Keeping existing reviews.json unchanged.');
    process.exit(0); // non-destructive
  }

  let place;
  try {
    console.log('Fetching place details for', PLACE_ID, '...');
    place = await fetchPlaceDetails(accessToken);
  } catch (err) {
    console.error('Places API failed:', err.message);
    console.log('Keeping existing reviews.json unchanged.');
    process.exit(0); // non-destructive
  }

  const allReviews = place.reviews || [];
  const fiveStars = allReviews.filter(r => r.rating === 5);
  console.log(`Got ${allReviews.length} reviews total, ${fiveStars.length} are 5-star`);

  const output = {
    rating: place.rating,
    userRatingCount: place.userRatingCount,
    fetchedAt: new Date().toISOString(),
    reviews: fiveStars.map(r => ({
      author: r.authorAttribution.displayName,
      rating: r.rating,
      relativeTime: r.relativePublishTimeDescription,
      text: r.text ? r.text.text : '',
      publishTime: r.publishTime || null
    }))
  };

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify(output, null, 2), 'utf8');
  console.log(`✓ Wrote reviews.json — rating: ${output.rating}, count: ${output.userRatingCount}, 5-star reviews: ${fiveStars.length}`);
}

main().catch(err => {
  console.error('Unexpected error:', err.message);
  console.log('Keeping existing reviews.json unchanged.');
  process.exit(0); // non-destructive
});
