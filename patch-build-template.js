'use strict';
// Patches buildServiceHub in build.js to render new content sections
// Run: node patch-build-template.js — safe to delete after.

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'build.js');
let content = fs.readFileSync(filePath, 'utf8');

// ---- Find the reviews section build block ----
// We need to inject serviceReviewsSection var before the content template literal
// and add new sections inside it.

// OLD: the section from `const content = \`` through `${T.contactFormSection()}\`;`
// We'll target a unique anchor inside buildServiceHub

const OLD_ANCHOR = "        ${d.intro.split('\\n\\n').map(p => `<p class=\"wow fadeInUp\" data-wow-duration=\"1500ms\" data-wow-delay=\"100ms\">${p}</p>`).join('\\n')}";

if (!content.includes(OLD_ANCHOR)) {
  console.error('Could not find anchor text in build.js. Check the file.');
  process.exit(1);
}

// Find the full block: from "function buildServiceHub" to the closing write() call
const FN_START = 'function buildServiceHub(slug) {';
const FN_END_ANCHOR = "write(`${slug}/index.html`";

const fnStart = content.indexOf(FN_START);
const fnEndIdx = content.indexOf(FN_END_ANCHOR, fnStart);
// Find the closing of this write() call
const writeCallEnd = content.indexOf('\n}', fnEndIdx) + 2; // includes closing brace

if (fnStart === -1 || fnEndIdx === -1) {
  console.error('Could not find function boundaries.');
  process.exit(1);
}

// Extract the existing function body up to the const content = ` line
const beforeContent = content.substring(fnStart, content.indexOf('  const content = `\n', fnStart) + '  const content = `\n'.length);

// Build new function body
const newFn = `function buildServiceHub(slug) {
  const d = SERVICE_DATA[slug];
  if (!d) { console.warn('No data for', slug); return; }

  const cityLinksHTML = CITIES.map(c =>
    \`<a href="/\${slug}-\${c.slug}/index.html" class="wallox-btn wallox-btn--border" style="margin:4px 4px 4px 0;">\${c.label}</a>\`
  ).join('\\n');

  // Reviews section (same pattern as homepage)
  const reviewsFile = require('path').join(__dirname, 'data', 'reviews.json');
  const reviewData = require('fs').existsSync(reviewsFile)
    ? JSON.parse(require('fs').readFileSync(reviewsFile, 'utf8'))
    : { rating: null, userRatingCount: 0, reviews: [] };
  const PARTS_LOCAL = require('path').join(__dirname, '_partials');
  const reviewCards = reviewData.reviews.slice(0, 3).map(r => {
    const initial = (r.author || 'A').charAt(0).toUpperCase();
    const escapedText = (r.text || '').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return \`<div class="col-md-6 col-lg-4">
  <div class="wow fadeInUp" data-wow-duration="1500ms" style="background:#fff;border-radius:10px;padding:28px 24px;border:1px solid rgba(0,0,0,0.07);height:100%;display:flex;flex-direction:column;">
    <div style="color:#AE360E;margin-bottom:12px;font-size:15px;">
      <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
    </div>
    <p style="font-size:14px;color:#5a5650;line-height:1.8;margin-bottom:20px;flex:1;">&ldquo;\${escapedText}&rdquo;</p>
    <div style="display:flex;align-items:center;gap:12px;">
      <div style="width:38px;height:38px;background:#AE360E;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:15px;flex-shrink:0;">\${initial}</div>
      <div>
        <strong style="font-size:14px;color:#201B10;display:block;">\${r.author}</strong>
        <span style="font-size:12px;color:#999;">\${r.relativeTime}</span>
      </div>
    </div>
  </div>
</div>\`;
  }).join('\\n');
  const serviceReviewsSection = reviewCards
    ? require('fs').readFileSync(require('path').join(PARTS_LOCAL, 'reviews.html'), 'utf8')
        .replace('<!-- REVIEW_CARDS -->', reviewCards)
        .replace('<!-- RATING_VALUE -->', reviewData.rating !== null ? Number(reviewData.rating).toFixed(1) : '5.0')
    : '';

  const sidingSection = d.sidingTypes ? \`<div style="margin:40px 0;">
          <div class="sec-title text-start" style="padding-bottom:0;margin-bottom:16px;">
            <div class="d-flex align-items-center justify-content-start"><p class="sec-title__tagline">siding types</p></div>
            <h3 class="sec-title__title" style="margin-bottom:8px;">Siding Types We Work With</h3>
            <p style="margin:0;color:#666;">Different siding materials require different prep and coating strategies. Here is how we approach each one in Colorado's climate.</p>
          </div>
          <div style="margin-top:20px;">
            \${d.sidingTypes.map(s => \`<div class="wow fadeInUp" data-wow-duration="1500ms" style="border-left:3px solid #AE360E;padding:14px 18px;margin-bottom:16px;background:#faf7f4;border-radius:0 6px 6px 0;">
              <strong style="display:block;color:#201B10;margin-bottom:6px;">\${s.type}</strong>
              <p style="margin:0;color:#5a5650;font-size:15px;line-height:1.7;">\${s.desc}</p>
            </div>\`).join('\\n')}
          </div>
        </div>\` : '';

  const whyUsSection = d.whyUs ? \`<div style="margin:40px 0;padding:32px;background:#201b10;border-radius:10px;">
          <div class="sec-title text-start" style="padding-bottom:0;margin-bottom:16px;">
            <div class="d-flex align-items-center justify-content-start"><p class="sec-title__tagline" style="color:#AE360E;">why choose us</p></div>
            <h3 class="sec-title__title" style="margin-bottom:0;color:#fff;">Why Keystone Painting</h3>
          </div>
          \${d.whyUs.split('\\n\\n').map(p => \`<p class="wow fadeInUp" data-wow-duration="1500ms" style="color:#e8e0d8;line-height:1.8;">\${p}</p>\`).join('\\n')}
          <ul class="list-unstyled" style="margin-top:20px;line-height:2.2;">
            <li><i class="fa-solid fa-check" style="color:#AE360E;margin-right:10px;"></i><span style="color:#fff;">Licensed &amp; Insured in Colorado</span></li>
            <li><i class="fa-solid fa-check" style="color:#AE360E;margin-right:10px;"></i><span style="color:#fff;">No-VOC Products.</span></li>
            <li><i class="fa-solid fa-check" style="color:#AE360E;margin-right:10px;"></i><span style="color:#fff;">$1M General Liability &mdash; COI on request</span></li>
            <li><i class="fa-solid fa-check" style="color:#AE360E;margin-right:10px;"></i><span style="color:#fff;">Sherwin-Williams &amp; Benjamin Moore Approved</span></li>
            <li><i class="fa-solid fa-check" style="color:#AE360E;margin-right:10px;"></i><span style="color:#fff;">No subcontractors. We know our crews.</span></li>
          </ul>
        </div>\` : '';

  const timelineSection = d.timeline ? \`<div style="margin:40px 0;">
          <div class="sec-title text-start" style="padding-bottom:0;margin-bottom:12px;">
            <div class="d-flex align-items-center justify-content-start"><p class="sec-title__tagline">what to expect</p></div>
            <h3 class="sec-title__title" style="margin-bottom:0;">Project Timeline</h3>
          </div>
          \${d.timeline.split('\\n\\n').map(p => \`<p class="wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="100ms">\${p}</p>\`).join('\\n')}
        </div>\` : '';

  const relatedSection = d.relatedServices ? \`<div style="margin:40px 0;">
          <div class="sec-title text-start" style="padding-bottom:0;margin-bottom:16px;">
            <div class="d-flex align-items-center justify-content-start"><p class="sec-title__tagline">related services</p></div>
            <h3 class="sec-title__title" style="margin-bottom:0;">Other Services We Offer</h3>
          </div>
          <div class="row gutter-y-20" style="margin-top:8px;">
            \${d.relatedServices.map(s => \`<div class="col-md-6"><div style="border:1px solid #e4dacc;border-radius:8px;padding:20px;height:100%;">
              <strong><a href="/\${s.slug}/index.html" style="color:#201B10;">\${s.label}</a></strong>
              <p style="margin:8px 0 12px;font-size:14px;color:#5a5650;">\${s.desc}</p>
              <a href="/\${s.slug}/index.html" style="font-size:13px;font-weight:700;color:#AE360E;text-decoration:none;">Learn more &rarr;</a>
            </div></div>\`).join('\\n')}
          </div>
        </div>\` : '';

  const content = \`
\${T.topbar()}
<!-- HEADER -->
\${T.pageHeader(d.title, \`<li><span>\${d.title.split(' in ')[0]}</span></li>\`)}

<section style="padding:80px 0;">
  <div class="container">
    <div class="row gutter-y-30">
      <div class="col-lg-8">
        <div class="sec-title text-start" style="padding-bottom:0;margin-bottom:16px;">
          <div class="d-flex align-items-center justify-content-start"><p class="sec-title__tagline">\${d.tagline}</p></div>
          <h3 class="sec-title__title" style="margin-bottom:0;">\${d.heroTitle}</h3>
        </div>
        \${d.intro.split('\\n\\n').map(p => \`<p class="wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="100ms">\${p}</p>\`).join('\\n')}
        <div style="margin:40px 0;">
          <div class="sec-title text-start" style="padding-bottom:0;">
            <h4 style="margin-bottom:12px;">Our Process</h4>
          </div>
          \${d.process.split('\\n\\n').map(p => \`<p class="wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="100ms">\${p}</p>\`).join('\\n')}
        </div>
        \${sidingSection}
        \${whyUsSection}
        \${timelineSection}
        \${relatedSection}
        <div style="margin:40px 0;">
          <div class="sec-title text-start" style="padding-bottom:0;margin-bottom:12px;">
            <div class="d-flex align-items-center justify-content-start"><p class="sec-title__tagline">cities we serve</p></div>
            <h3 class="sec-title__title" style="margin-bottom:0;">Areas Served</h3>
          </div>
          <p class="wow fadeInUp" data-wow-duration="1500ms">We provide \${d.title.split(' in ')[0].toLowerCase()} throughout Northern Colorado:</p>
          <div style="margin-top:20px;">\${cityLinksHTML}</div>
        </div>
        <div style="margin:40px 0;">
          <div class="sec-title text-start" style="padding-bottom:0;margin-bottom:12px;">
            <div class="d-flex align-items-center justify-content-start"><p class="sec-title__tagline">common questions</p></div>
            <h3 class="sec-title__title" style="margin-bottom:0;">Frequently Asked Questions</h3>
          </div>
          <div style="margin-top:30px;">\${T.faqBlock(d.faqs, slug + '-faq')}</div>
        </div>
      </div>
      <div class="col-lg-4">
        <div style="position:sticky;top:100px;">
          <div style="background:#f4ede4;padding:30px;border-radius:8px;margin-bottom:30px;">
            <h4 style="margin-bottom:20px;">Get a Free Quote</h4>
            <ul class="list-unstyled" style="line-height:2.2;">
              <li><i class="fa-solid fa-phone" style="color:var(--wallox-base);margin-right:8px;"></i><a href="tel:\${CLIENT.phoneTel}" style="font-weight:700;font-size:18px;">\${CLIENT.phone}</a></li>
              <li><i class="fa-solid fa-envelope" style="color:var(--wallox-base);margin-right:8px;"></i><a href="mailto:\${CLIENT.email}">\${CLIENT.email}</a></li>
              <li><i class="fa-solid fa-location-dot" style="color:var(--wallox-base);margin-right:8px;"></i>\${CLIENT.city}, \${CLIENT.state}</li>
            </ul>
            <a href="/contact.html" class="wallox-btn wallox-btn--base" style="margin-top:20px;display:block;text-align:center;">Request a Quote</a>
          </div>
          <div style="background:#201b10;color:#f4ede4;padding:30px;border-radius:8px;">
            <h4 style="color:#ae360e;margin-bottom:15px;">Why Keystone Painting</h4>
            <ul class="list-unstyled" style="line-height:2;">
              <li><i class="fa-solid fa-check" style="color:#ae360e;margin-right:8px;"></i>Licensed &amp; Insured</li>
              <li><i class="fa-solid fa-check" style="color:#ae360e;margin-right:8px;"></i>No-VOC Products.</li>
              <li><i class="fa-solid fa-check" style="color:#ae360e;margin-right:8px;"></i>$1M General Liability</li>
              <li><i class="fa-solid fa-check" style="color:#ae360e;margin-right:8px;"></i>SW &amp; BM Approved</li>
              <li><i class="fa-solid fa-check" style="color:#ae360e;margin-right:8px;"></i>No Subcontractors</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

\${serviceReviewsSection}

\${T.contactFormSection()}\`;

  write(\`\${slug}/index.html\`, \`\${T.htmlHead(d.metaTitle, d.metaDesc, \`https://timnathpainting.com/\${slug}/\`)}
\${T.wrapBody(content)}\`);
}
`;

// Find old function bounds precisely
const oldFnStart = content.indexOf('function buildServiceHub(slug) {');
// Find the closing } of this function — look for the write() call and the } after it
const writeCall = content.indexOf("  write(`${slug}/index.html`", oldFnStart);
// Find the `\n}\n` after the write call
let closingBrace = content.indexOf('\n}\n', writeCall);
if (closingBrace === -1) closingBrace = content.indexOf('\n}', writeCall);
const oldFnEnd = closingBrace + 3; // include \n}\n

content = content.substring(0, oldFnStart) + newFn + '\n' + content.substring(oldFnEnd);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Done. Patched buildServiceHub in build.js.');
