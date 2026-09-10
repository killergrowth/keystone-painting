/**
 * Cloudflare Pages Function — /submit
 * Returns JSON { ok: true } or { ok: false, error: string }
 * Sends a branded HTML email via Gmail API (service account JWT auth).
 */

function objToB64url(obj) {
  const json = JSON.stringify(obj);
  let binary = '';
  for (let i = 0; i < json.length; i++) binary += String.fromCharCode(json.charCodeAt(i) & 0xff);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function bufToB64url(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function getGmailAccessToken(serviceEmail, privateKeyPem, impersonateEmail) {
  const now = Math.floor(Date.now() / 1000);
  const headerB64 = objToB64url({ alg: 'RS256', typ: 'JWT' });
  const claimB64  = objToB64url({
    iss: serviceEmail, sub: impersonateEmail,
    scope: 'https://www.googleapis.com/auth/gmail.send',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now, exp: now + 3600,
  });
  const signingInput = `${headerB64}.${claimB64}`;

  const b64 = privateKeyPem.replace(/-----[A-Z ]+-----/g, '').replace(/\s+/g, '');
  const decoded = atob(b64);
  const keyBuffer = new Uint8Array(decoded.length);
  for (let i = 0; i < decoded.length; i++) keyBuffer[i] = decoded.charCodeAt(i);

  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8', keyBuffer.buffer,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false, ['sign']
  );
  const sigBytes = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5', cryptoKey,
    new TextEncoder().encode(signingInput)
  );

  const jwt = `${signingInput}.${bufToB64url(sigBytes)}`;

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${encodeURIComponent(jwt)}`,
  });
  const data = await tokenRes.json();
  if (!data.access_token) throw new Error('Token error ' + tokenRes.status + ': ' + JSON.stringify(data));
  return data.access_token;
}

function buildHtmlEmail(name, email, phone, service, message) {
  const serviceLabel = service ? service.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Not specified';
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
</head>
<body style="margin:0;padding:0;background:#f4f0eb;font-family:'Open Sans',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f0eb;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="background:#2E2A20;padding:36px 40px;text-align:center;border-radius:8px 8px 0 0;">
          <img src="https://timnathpainting.com/assets/images/logo-email-v3.png" alt="Keystone Painting" style="max-width:280px;width:100%;height:auto;display:block;margin:0 auto 20px;">
          <div style="color:#DF9E42;font-family:'Oswald',Arial,sans-serif;font-size:14px;font-weight:600;letter-spacing:3px;text-transform:uppercase;">New Quote Request</div>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:#ffffff;padding:36px 40px;">
          <p style="margin:0 0 24px;color:#2E2A20;font-family:'Open Sans',Arial,sans-serif;font-size:15px;line-height:1.6;">
            A new quote request was submitted through the Keystone Painting website. Here are the details:
          </p>

          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            <tr>
              <td style="padding:12px 16px;background:#f9f5f0;border-left:3px solid #DF9E42;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px;width:120px;">Name</td>
              <td style="padding:12px 16px;background:#f9f5f0;font-size:15px;color:#2E2A20;font-weight:bold;">${name}</td>
            </tr>
            <tr>
              <td style="padding:12px 16px;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px;">Email</td>
              <td style="padding:12px 16px;font-size:15px;color:#2E2A20;"><a href="mailto:${email}" style="color:#DF9E42;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding:12px 16px;background:#f9f5f0;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px;">Phone</td>
              <td style="padding:12px 16px;background:#f9f5f0;font-size:15px;color:#2E2A20;">${phone || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding:12px 16px;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px;">Service</td>
              <td style="padding:12px 16px;font-size:15px;color:#2E2A20;">${serviceLabel}</td>
            </tr>
          </table>

          ${message ? `
          <div style="margin-top:24px;">
            <div style="font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Message</div>
            <div style="background:#f9f5f0;border-left:3px solid #DF9E42;padding:16px;font-size:15px;color:#2E2A20;line-height:1.7;">${message.replace(/\n/g,'<br>')}</div>
          </div>` : ''}

          ${phone ? `<div style="margin-top:32px;text-align:center;"><a href="tel:${phone.replace(/\D/g,'')}" style="display:inline-block;background:#DF9E42;color:#2E2A20;font-family:'Oswald','Arial Narrow',Arial,sans-serif;font-size:16px;font-weight:700;padding:14px 36px;border-radius:4px;text-decoration:none;letter-spacing:2px;text-transform:uppercase;">Call ${phone}</a></div>` : ''}
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#2E2A20;padding:24px 40px;text-align:center;border-radius:0 0 8px 8px;">
          <p style="margin:0;color:#888;font-size:12px;">
            Keystone Painting &bull; Windsor, CO 80550 &bull;
            <a href="mailto:josh@timnathpainting.com" style="color:#DF9E42;">josh@timnathpainting.com</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

const JSON_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': 'https://timnathpainting.com',
};

export async function onRequestPost({ request, env }) {
  try {
    const form    = await request.formData();
    const name    = form.get('name')    || '(no name)';
    const email   = form.get('email')   || '';
    const phone   = form.get('phone')   || '';
    const service = form.get('service') || '';
    const message = form.get('message') || '';

    const accessToken = await getGmailAccessToken(
      env.GMAIL_SERVICE_EMAIL,
      env.GMAIL_PRIVATE_KEY,
      env.GMAIL_FROM
    );

    const subject = 'New Quote Request - Keystone Painting';
    const htmlBody = buildHtmlEmail(name, email, phone, service, message);

    // Build MIME multipart message (HTML only)
    const mimeLines = [
      `From: Keystone Painting <${env.GMAIL_FROM}>`,
      `To: josh@paintkeystone.com, josh@timnathpainting.com`,
      `Subject: ${subject}`,
      `MIME-Version: 1.0`,
      `Content-Type: text/html; charset=UTF-8`,
      '',
      htmlBody,
    ].join('\r\n');

    const emailBytes = new TextEncoder().encode(mimeLines);
    let emailBinary = '';
    for (let i = 0; i < emailBytes.length; i++) emailBinary += String.fromCharCode(emailBytes[i]);
    const encoded = btoa(emailBinary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

    const sendRes = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/${encodeURIComponent(env.GMAIL_FROM)}/messages/send`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ raw: encoded }),
      }
    );

    if (!sendRes.ok) {
      const err = await sendRes.text();
      throw new Error('Gmail send ' + sendRes.status + ': ' + err.slice(0, 200));
    }

    return new Response(JSON.stringify({ ok: true }), { headers: JSON_HEADERS });

  } catch (err) {
    console.error('submit error:', err.message);
    return new Response(JSON.stringify({ ok: false, error: err.message.slice(0, 200) }), {
      status: 500,
      headers: JSON_HEADERS,
    });
  }
}
