'use strict';
const fs = require('fs');
const path = require('path');

const GENERATED_DIR = path.join(__dirname, '..', 'content', 'projects', 'generated');

function buildAllProjects(write, T) {
  const files = fs.readdirSync(GENERATED_DIR).filter(f => f.endsWith('.json'));
  if (!files.length) {
    console.log('[projects] No project JSON files found — skipping.');
    return;
  }

  const projects = files.map(f => JSON.parse(fs.readFileSync(path.join(GENERATED_DIR, f), 'utf8')));

  // Sort by date descending (newest first) — treat date as string for now
  projects.sort((a, b) => (b.date || '').localeCompare(a.date || ''));

  // Build each individual project page
  projects.forEach(p => buildProjectPage(p, write, T));

  // Build /projects/ index (landing page with cards)
  buildProjectsIndex(projects, write, T);

  console.log(`[projects] Built ${projects.length} project page(s) + /projects/ index.`);
}

function buildProjectPage(p, write, T) {
  const hasVideo = !!p.r2_video_url;

  const videoBlock = hasVideo ? `
    <div style="margin-bottom:36px;">
      <video
        id="project-video"
        class="plyr-video"
        controls
        playsinline
        style="width:100%;border-radius:12px;display:block;background:#000;"
        preload="metadata">
        <source src="${p.r2_video_url}" type="video/mp4">
      </video>
    </div>` : '';

  const faqsHtml = (p.faqs || []).map((faq, i) => `
    <div class="proj-faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
      <button class="proj-faq-q" aria-expanded="false" aria-controls="faq-a-${i}" onclick="this.setAttribute('aria-expanded', this.getAttribute('aria-expanded')==='true'?'false':'true');this.nextElementSibling.classList.toggle('open');">
        <span itemprop="name">${faq.q}</span>
        <i class="fa-solid fa-chevron-down proj-faq-icon"></i>
      </button>
      <div class="proj-faq-a" id="faq-a-${i}" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
        <p itemprop="text">${faq.a}</p>
      </div>
    </div>`).join('\n');

  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": (p.faqs || []).map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": { "@type": "Answer", "text": faq.a }
    }))
  });

  const content = `
${T.topbar()}
<style>
.proj-wrap { background:#F4EDE4; padding:40px 0 72px; }
.proj-grid { display:grid; grid-template-columns:1fr 340px; gap:48px; align-items:start; }
@media(max-width:900px){ .proj-grid { grid-template-columns:1fr; } }
.proj-article h2 { font-size:22px; font-weight:800; color:#201B10; margin:32px 0 12px; }
.proj-article p { font-size:15px; color:#5a5650; line-height:1.8; margin-bottom:16px; }
.proj-meta { font-size:13px; color:#999; margin-bottom:28px; }
.proj-meta span { margin-right:16px; }
.proj-sidebar-card { background:#fff; border-radius:14px; padding:28px 24px; box-shadow:0 4px 20px rgba(0,0,0,0.09); margin-bottom:24px; }
.proj-sidebar-card h4 { font-size:16px; font-weight:800; color:#201B10; margin:0 0 12px; }
.proj-sidebar-list { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:10px; }
.proj-sidebar-list li { display:flex; align-items:flex-start; gap:10px; font-size:14px; color:#5a5650; line-height:1.5; }
.proj-sidebar-list li i { color:#AE360E; margin-top:2px; flex-shrink:0; }
.proj-faq-section { margin-top:48px; }
.proj-faq-section h2 { font-size:22px; font-weight:800; color:#201B10; margin-bottom:24px; }
.proj-faq-item { border-bottom:1px solid #e4dacc; }
.proj-faq-q { width:100%; background:none; border:none; padding:18px 0; display:flex; justify-content:space-between; align-items:center; gap:16px; cursor:pointer; text-align:left; font-size:15px; font-weight:700; color:#201B10; font-family:inherit; }
.proj-faq-icon { color:#AE360E; transition:transform 0.2s; flex-shrink:0; }
.proj-faq-q[aria-expanded="true"] .proj-faq-icon { transform:rotate(180deg); }
.proj-faq-a { display:none; padding:0 0 18px; font-size:14px; color:#5a5650; line-height:1.8; }
.proj-faq-a.open { display:block; }
.proj-back-link { display:inline-flex; align-items:center; gap:8px; color:#AE360E; font-size:14px; font-weight:700; text-decoration:none; margin-bottom:28px; }
.proj-back-link:hover { text-decoration:underline; }
</style>
<div class="page-wrapper">
<main>
<section class="proj-wrap">
  <div class="container">
    <a href="/projects/" class="proj-back-link"><i class="fa-solid fa-arrow-left"></i> Project Highlights</a>
    <div class="proj-grid">
      <div class="proj-article">
        <p class="proj-meta">
          <span><i class="fa-solid fa-calendar" style="color:#AE360E;margin-right:5px;"></i>${p.date || ''}</span>
          <span><i class="fa-solid fa-location-dot" style="color:#AE360E;margin-right:5px;"></i>${p.location || ''}</span>
        </p>
        <h1 style="font-size:clamp(26px,3.5vw,42px);font-weight:800;color:#201B10;line-height:1.15;margin:0 0 24px;">${p.title}</h1>
        ${videoBlock}
        ${p.article || ''}
        <div class="proj-faq-section" itemscope itemtype="https://schema.org/FAQPage">
          <h2>Common Questions</h2>
          <p style="color:#5a5650;font-size:14px;margin-bottom:24px;">Frequently Asked Questions</p>
          ${faqsHtml}
        </div>
      </div>
      <div>
        <div class="proj-sidebar-card">
          <h4>Get a Free Quote</h4>
          <p style="font-size:14px;color:#5a5650;margin:0 0 16px;line-height:1.6;">Ready to start your project? Josh will get back to you the same day.</p>
          <a href="/contact-us/" class="wallox-btn wallox-btn--base" style="display:block;text-align:center;">Request a Quote</a>
        </div>
        <div class="proj-sidebar-card">
          <h4>Why Keystone Painting</h4>
          <ul class="proj-sidebar-list">
            <li><i class="fa-solid fa-check"></i><span>Licensed &amp; insured — $1M liability</span></li>
            <li><i class="fa-solid fa-check"></i><span>Sherwin-Williams &amp; Benjamin Moore approved</span></li>
            <li><i class="fa-solid fa-check"></i><span>Free on-site quotes — same-day response</span></li>
            <li><i class="fa-solid fa-check"></i><span>Serving Windsor, Timnath &amp; Northern Colorado</span></li>
          </ul>
        </div>
        <div class="proj-sidebar-card" style="text-align:center;">
          <div style="font-size:28px;color:#AE360E;margin-bottom:8px;"><i class="fa-solid fa-phone"></i></div>
          <a href="tel:9706703965" style="font-size:18px;font-weight:800;color:#201B10;text-decoration:none;display:block;">(970) 670-3965</a>
          <p style="font-size:13px;color:#999;margin:4px 0 0;">Call or text anytime</p>
        </div>
      </div>
    </div>
  </div>
</section>
</main>
</div>
${hasVideo ? `<link rel="stylesheet" href="https://cdn.plyr.io/3.7.8/plyr.css">
<script src="https://cdn.plyr.io/3.7.8/plyr.polyfilled.js"></script>
<script>document.addEventListener('DOMContentLoaded',function(){new Plyr('#project-video',{controls:['play-large','play','progress','current-time','mute','volume','fullscreen']});});</script>` : ''}
<script type="application/ld+json">${faqSchema}</script>`;

  const canonical = `https://paintkeystone.com/projects/${p.slug}/`;
  write(
    `projects/${p.slug}/index.html`,
    `${T.htmlHead(p.meta_title, p.meta_desc, canonical)}${T.wrapBody(content)}`
  );
}

function buildProjectsIndex(projects, write, T) {
  const serviceLabels = {
    'exterior-painting': 'Exterior Painting',
    'interior-painting': 'Interior Painting',
    'fence-staining': 'Fence Staining',
    'hoa-painting': 'HOA Painting',
    'commercial-painting': 'Commercial Painting',
  };

  const cards = projects.map(p => {
    const label = serviceLabels[p.service] || p.service || 'Project';
    const excerpt = p.article
      ? p.article.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().substring(0, 140) + '&hellip;'
      : '';
    return `
    <a href="/projects/${p.slug}/" class="proj-card" style="text-decoration:none;display:block;">
      <div class="proj-card-badge">${label}</div>
      <h3 class="proj-card-title">${p.title}</h3>
      <p class="proj-card-excerpt">${excerpt}</p>
      <div class="proj-card-meta">
        <span><i class="fa-solid fa-location-dot"></i> ${p.location || 'Northern Colorado'}</span>
        <span><i class="fa-solid fa-calendar"></i> ${p.date || ''}</span>
      </div>
      <span class="proj-card-cta">Read the full story <i class="fa-solid fa-arrow-right"></i></span>
    </a>`;
  }).join('\n');

  const content = `
${T.topbar()}
<style>
.proj-index-wrap { background:#F4EDE4; padding:56px 0 80px; }
.proj-index-header { text-align:center; margin-bottom:48px; }
.proj-index-eyebrow { font-size:13px; font-weight:700; color:#AE360E; text-transform:uppercase; letter-spacing:0.08em; margin-bottom:12px; }
.proj-index-title { font-size:clamp(30px,4vw,52px); font-weight:800; color:#201B10; line-height:1.15; margin:0 0 16px; }
.proj-index-sub { font-size:16px; color:#5a5650; max-width:560px; margin:0 auto; line-height:1.6; }
.proj-cards-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:28px; }
@media(max-width:900px){ .proj-cards-grid { grid-template-columns:repeat(2,1fr); } }
@media(max-width:580px){ .proj-cards-grid { grid-template-columns:1fr; } }
.proj-card { background:#fff; border-radius:14px; padding:28px 24px; box-shadow:0 4px 20px rgba(0,0,0,0.08); transition:transform 0.2s,box-shadow 0.2s; display:flex; flex-direction:column; }
.proj-card:hover { transform:translateY(-4px); box-shadow:0 8px 32px rgba(0,0,0,0.13); }
.proj-card-badge { display:inline-block; background:#F4EDE4; color:#AE360E; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; padding:4px 12px; border-radius:20px; margin-bottom:14px; }
.proj-card-title { font-size:18px; font-weight:800; color:#201B10; line-height:1.3; margin:0 0 12px; }
.proj-card-excerpt { font-size:14px; color:#5a5650; line-height:1.75; margin:0 0 16px; flex:1; }
.proj-card-meta { display:flex; gap:16px; font-size:12px; color:#999; margin-bottom:16px; }
.proj-card-meta i { color:#AE360E; margin-right:4px; }
.proj-card-cta { font-size:13px; font-weight:700; color:#AE360E; display:inline-flex; align-items:center; gap:6px; }
</style>
<div class="page-wrapper">
<main>
<section class="proj-index-wrap">
  <div class="container">
    <div class="proj-index-header">
      <p class="proj-index-eyebrow">Our Work</p>
      <h1 class="proj-index-title">Project Highlights</h1>
      <p class="proj-index-sub">Real jobs. Real results. See how we approach exterior painting, interior painting, fence staining, and more across Northern Colorado.</p>
    </div>
    <div class="proj-cards-grid">
      ${cards}
    </div>
  </div>
</section>
</main>
</div>`;

  write(
    'projects/index.html',
    `${T.htmlHead(
      'Project Highlights | Keystone Painting | Northern Colorado',
      'Browse completed painting projects by Keystone Painting across Windsor, Timnath, Loveland, and Northern Colorado. Exterior, interior, fence staining, and HOA work.',
      'https://paintkeystone.com/projects/'
    )}${T.wrapBody(content)}`
  );
}

module.exports = { buildAllProjects };
