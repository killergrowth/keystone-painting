'use strict';
/**
 * generate-project-content.js
 * Reads a project transcript and generates SEO content via Claude
 * Usage: node scripts/generate-project-content.js <slug>
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

const SLUG = process.argv[2] || 'josh-exterior-painting-project-timnath-co';
const CONTENT_DIR = path.join(__dirname, '..', 'content', 'projects');
const transcriptPath = path.join(CONTENT_DIR, 'transcripts', `${SLUG}.txt`);
const outputPath = path.join(CONTENT_DIR, 'generated', `${SLUG}.json`);

fs.mkdirSync(path.dirname(outputPath), { recursive: true });

if (fs.existsSync(outputPath)) {
  console.log('Already generated:', outputPath);
  process.exit(0);
}

const transcript = fs.readFileSync(transcriptPath, 'utf8').trim();

function stripCodeFences(text) {
  return text.replace(/^```[\w]*\n?/m, '').replace(/```\s*$/m, '').trim();
}

function claudeRequest(systemPrompt, userPrompt) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: 'claude-haiku-4-5',
      max_tokens: 2000,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }]
    });
    const req = https.request({
      hostname: 'api.anthropic.com',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      }
    }, resp => {
      let data = '';
      resp.on('data', c => data += c);
      resp.on('end', () => {
        if (resp.statusCode !== 200) return reject(new Error(`Claude ${resp.statusCode}: ${data}`));
        resolve(JSON.parse(data).content[0].text);
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  const SYSTEM = `You are an SEO content writer for Keystone Painting, a premium painting contractor in Northern Colorado. 
You write honest, specific, zero-fluff copy that sounds like a real contractor wrote it — not a marketing agency.
Never fabricate details. Only use what's in the transcript. When you name services, use real Keystone Painting services: 
exterior painting, interior painting, HOA painting, commercial painting, fence staining, exterior staining.
Always weave in Northern Colorado context and Keystone Painting's differentiators: licensed & insured, $1M liability, 
Sherwin-Williams & Benjamin Moore approved, no-VOC products, we know our crews.
Output ONLY valid JSON, no markdown, no explanation.`;

  console.log('Generating SEO slug + title...');
  const metaRaw = await claudeRequest(SYSTEM, `Given this project video transcript from Keystone Painting, generate the following as a JSON object:
- "seo_slug": a URL-friendly slug for /projects/<slug>/ that includes the service type AND a Northern Colorado city/location for SEO value. 
  Format: <service>-<city>-<descriptor>. Examples: interior-painting-loveland-whole-home-repaint, exterior-painting-timnath-hoa-project.
  Use the actual location from the transcript. Keep under 60 chars.
- "title": H1 page title, punchy, includes service + location + key detail. Under 60 chars.
- "meta_title": SEO title tag. Format: "Title | Keystone Painting | Northern Colorado". Under 65 chars total.
- "meta_desc": 150-160 char meta description. Include service, location, and a CTA.
- "og_title": Social share title. Can be slightly longer/more conversational than meta_title.
- "date": today's date as "August 2026"
- "service": primary service from this list only: interior-painting, exterior-painting, hoa-painting, commercial-painting, fence-staining, exterior-staining
- "location": city name from transcript

Transcript:
${transcript}

Return ONLY a JSON object.`);

  const meta = JSON.parse(stripCodeFences(metaRaw));
  console.log('Title:', meta.title);
  console.log('Slug:', meta.seo_slug);

  console.log('\nGenerating article...');
  const article = await claudeRequest(SYSTEM, `Write a 500-600 word SEO blog post about this painting project. 

Structure:
- Opening paragraph: what the project was, where, key scope details (no H2 needed for opening)
- H2: "What We Did" — specific work performed, products used, techniques
- H2: "Why Prep Matters More Than Paint" — connect to Keystone Painting's standards
- H2: "The Result" — what the homeowner gets, longevity, value
- Closing paragraph: soft CTA to get a quote

Rules:
- Sound like Josh wrote it, not a content farm
- Be specific — cite real details from transcript (sq footage, paint product, finish, location)
- Weave in "Northern Colorado" naturally
- NO generic filler phrases like "look no further" or "your dream home"
- Use <p> tags for paragraphs, <h2> tags for headings. No other HTML.

Transcript:
${transcript}

Return ONLY the HTML string (no JSON wrapper, no markdown).`);

  console.log('\nGenerating FAQ...');
  const faqRaw = await claudeRequest(SYSTEM, `Generate exactly 5 FAQ questions and answers about this painting project for an AEO-optimized FAQ section.

Rules:
- Q1: Specific to this project (scope, products, timeline)  
- Q2: "How much does interior painting cost in [location from transcript]?" — give a real range
- Q3: About Keystone Painting's process/standards
- Q4: About prep work and protecting surfaces
- Q5: "How do I get a quote from Keystone Painting?" — direct CTA answer with phone (970) 670-3965

Each answer should be 2-4 sentences. Specific. No fluff.

Transcript:
${transcript}

Return ONLY a JSON array of {q, a} objects.`);

  const faqs = JSON.parse(stripCodeFences(faqRaw));

  const output = {
    slug: meta.seo_slug,
    title: meta.title,
    meta_title: meta.meta_title,
    meta_desc: meta.meta_desc,
    og_title: meta.og_title,
    date: meta.date,
    service: meta.service,
    location: meta.location,
    drive_file_id: '1U0DRsFj3bDkYhdUHGdSpOPO6z7y5JMXq',
    article,
    faqs
  };

  // Sanitize smart quotes/em-dashes before saving — Claude returns Unicode, PowerShell mangles it
  const cleanJson = JSON.stringify(output, null, 2)
    .replace(/\u2018|\u2019/g, "'")
    .replace(/\u201C|\u201D/g, '"')
    .replace(/\u2013/g, '-')
    .replace(/\u2014/g, '--')
    .replace(/\u2026/g, '...')
    .replace(/\u00A0/g, ' ');
  fs.writeFileSync(outputPath, cleanJson, 'utf8');
  console.log('\n✓ Content saved to:', outputPath);
  console.log('\nFAQs generated:', faqs.length);
}

main().catch(e => { console.error(e.message); process.exit(1); });
