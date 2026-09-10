'use strict';
/**
 * build-neighborhood-pages.js
 * Generates 6 neighborhood-specific exterior painting pages for Timnath, CO.
 * URLs: /neighborhoods/<slug>/index.html
 * Run: node build-neighborhood-pages.js
 */

const fs   = require('fs');
const path = require('path');
const { NEIGHBORHOODS, NEIGHBORHOOD_NAMES } = require('./_neighborhood-data.js');
const { injectScripts, loadSiteScripts } = require('C:\\Users\\KillerGrowth\\.openclaw\\workspace\\tools\\kg-site-builder\\lib\\inject-scripts');

const SITE_ID = 'keystone-painting';
const DIST  = path.join(__dirname, 'dist');
const PARTS = path.join(__dirname, '_partials');

function ensureDir(d) { if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true }); }

const HEADER = fs.readFileSync(path.join(PARTS, 'header.html'), 'utf8');
const FOOTER = fs.readFileSync(path.join(PARTS, 'footer.html'), 'utf8');

function injectPartials(html) {
  return html.replace('<!-- HEADER -->', HEADER).replace('<!-- FOOTER -->', FOOTER);
}

function write(relPath, html) {
  html = injectScripts(html, loadSiteScripts(SITE_ID));
  const dest = path.join(DIST, relPath);
  ensureDir(path.dirname(dest));
  fs.writeFileSync(dest, injectPartials(html), 'utf8');
  console.log('Built:', relPath);
}

// ── HEAD boilerplate shared across all neighborhood pages ──────────────────
function buildHead(n) {
  return `<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${n.metaTitle}</title>
<meta name="description" content="${n.metaDesc}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${n.canonical}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Keystone Painting">
<meta property="og:title" content="${n.metaTitle}">
<meta property="og:description" content="${n.metaDesc}">
<meta property="og:url" content="${n.canonical}">
<meta property="og:image" content="https://timnathpainting.com/assets/images/social-share.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${n.metaTitle}">
<meta name="twitter:description" content="${n.metaDesc}">
<meta name="twitter:image" content="https://timnathpainting.com/assets/images/social-share.png">
<link rel="apple-touch-icon" sizes="180x180" href="/assets/images/favicons-v2/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicons-v2/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/images/favicons-v2/favicon-16x16.png">
<link rel="manifest" href="/assets/images/favicons-v2/site.webmanifest">
<link rel="preload" href="/assets/fonts/outfit-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/plusjakarta-normal-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/css/fonts.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<link rel="preload" href="/assets/vendors/bootstrap/css/bootstrap.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<link rel="preload" href="/assets/css/wallox.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<link rel="preload" href="/assets/css/timnath-custom.css?v=20260514" as="style" onload="this.onload=null;this.rel='stylesheet'">
<link rel="preload" href="/assets/css/timnath-overrides.css?v=20260514" as="style" onload="this.onload=null;this.rel='stylesheet'">
<link rel="preload" href="/assets/vendors/fontawesome/webfonts/fa-solid-900.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/vendors/fontawesome/css/all.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<link rel="preload" href="/assets/vendors/wallox-icons/style.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<link rel="preload" href="/assets/css/icon-shim.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<link rel="preload" href="/assets/vendors/animate/animate.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<link rel="preload" href="/assets/vendors/bootstrap-select/bootstrap-select.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<link rel="preload" href="/assets/vendors/jquery-ui/jquery-ui.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<link rel="preload" href="/assets/vendors/jarallax/jarallax.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<link rel="preload" href="/assets/vendors/jquery-magnific-popup/jquery.magnific-popup.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<link rel="preload" href="/assets/vendors/tiny-slider/tiny-slider.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<link rel="preload" href="/assets/vendors/slick-carousel/slick.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<link rel="preload" href="/assets/vendors/slick-carousel/slick-theme.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript>
<link rel="stylesheet" href="/assets/css/fonts.css">
<link rel="stylesheet" href="/assets/vendors/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" href="/assets/css/wallox.css">
<link rel="stylesheet" href="/assets/css/timnath-custom.css?v=20260514">
<link rel="stylesheet" href="/assets/css/timnath-overrides.css?v=20260514">
<link rel="stylesheet" href="/assets/vendors/animate/animate.min.css">
<link rel="stylesheet" href="/assets/vendors/bootstrap-select/bootstrap-select.min.css">
<link rel="stylesheet" href="/assets/vendors/jquery-ui/jquery-ui.css">
<link rel="stylesheet" href="/assets/vendors/jquery-magnific-popup/jquery.magnific-popup.css">
<link rel="stylesheet" href="/assets/vendors/tiny-slider/tiny-slider.css">
<link rel="stylesheet" href="/assets/vendors/slick-carousel/slick.css">
<link rel="stylesheet" href="/assets/vendors/slick-carousel/slick-theme.css">
<link rel="stylesheet" href="/assets/vendors/jarallax/jarallax.css">
<link rel="stylesheet" href="/assets/vendors/fontawesome/css/all.min.css">
<link rel="stylesheet" href="/assets/vendors/wallox-icons/style.css">
<link rel="stylesheet" href="/assets/css/icon-shim.css">
</noscript>
<style>
:root{--wallox-font:"Plus Jakarta Sans",sans-serif;--wallox-text:#7E7C76;--wallox-text-dark:#2E2A20;--wallox-base:#AE360E;--wallox-gray:#F4EDE4;--wallox-white:#fff;--wallox-border-color:#E4DACC}
.container,.container-fluid{width:100%;padding-right:15px;padding-left:15px;margin-right:auto;margin-left:auto}
@media(min-width:576px){.container{max-width:540px}}
@media(min-width:768px){.container{max-width:720px}}
@media(min-width:992px){.container{max-width:960px}}
@media(min-width:1200px){.container{max-width:1140px}}
@media(min-width:1400px){.container{max-width:1320px}}
.d-none{display:none!important}.d-block{display:block!important}
@media(min-width:768px){.d-md-inline{display:inline!important}}
.page-wrapper{position:relative;margin:0 auto;width:100%;min-width:300px;overflow:hidden}
.wallox-btn{display:inline-block;vertical-align:middle;border:none;outline:none!important;background-color:#2E2A20;color:#fff;font-family:var(--wallox-font,"Plus Jakarta Sans",sans-serif);padding:15px 24px;font-weight:600;font-size:16px;line-height:1.25;text-transform:capitalize;border-radius:100px;position:relative;overflow:hidden;text-align:center}
.wallox-btn--base{background:#AE360E;color:#fff}
.main-header__right{display:flex;align-items:center}
.main-header--three .main-header__inner{padding:0}
@media(max-width:1199px){.main-header--three .main-header__inner{padding:10px 0}}
.main-header--three .main-menu .main-menu__list > li > a{color:#fff}
.main-header--three .main-header__logo{display:none}
@media(max-width:1199px){.main-header--three .main-header__logo{display:block}}
.main-header--three .main-header__nav{margin-left:0;margin-right:auto}
.mobile-nav__btn span{display:block;width:30px;height:2px;background:#fff;margin-bottom:7px}
.mobile-nav__btn span:last-child{margin-bottom:0}
.main-header{background-color:#201B10!important}
.main-header__inner{padding:0!important}
.main-header__logo{display:none!important}
.real-image{overflow:hidden}
.fa-solid,.fa-regular,.fa-brands,.fa{display:inline-block;min-width:1em;font-style:normal}
@media(max-width:1199px){.main-header__right__link{display:none!important}}
@media(min-width:1200px){.mobile-nav__btn{display:none!important}}
.sec-title__tagline{letter-spacing:0.5px!important}
.kg-faq details[open] .faq-toggle{color:#AE360E}
.kg-faq details > summary::-webkit-details-marker{display:none}
.kg-faq details > summary::marker{display:none}
</style>
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-K8ZXCK8V');</script>
<script type="text/javascript">(function(k){let s=document.createElement('script');s.defer=true;s.src="https://cdn.feedbucket.app/assets/feedbucket.js";s.dataset.feedbucket=k;document.head.appendChild(s);})('unHnhjucA9iBv9bu4nxg')</script>
<script src="https://cdn.usefathom.com/script.js" data-site="YNVVPFQV" defer></script>
</head>`;
}

// ── Main page HTML builder ─────────────────────────────────────────────────
function buildNeighborhoodPage(n) {
  const faqSchema = n.faqs.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a }
  }));

  const schema = JSON.stringify([
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `Exterior Painting in ${n.name}, Timnath, CO`,
      serviceType: 'Exterior Painting',
      description: n.metaDesc,
      provider: {
        '@type': 'LocalBusiness',
        name: 'Keystone Painting',
        telephone: '(970) 670-3965',
        email: 'josh@timnathpainting.com',
        url: 'https://timnathpainting.com',
        address: { '@type': 'PostalAddress', streetAddress: '4836 Becker Dr', addressLocality: 'Timnath', addressRegion: 'CO', postalCode: '80547', addressCountry: 'US' }
      },
      areaServed: { '@type': 'Place', name: `${n.name}, Timnath, CO` }
    },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqSchema }
  ]);

  const introParagraphs = n.intro.map(p =>
    `<p style="color:#5a5650;line-height:1.8;margin-bottom:18px;">${p}</p>`
  ).join('\n        ');

  const faqHtml = n.faqs.map(f => `
  <details style="border-bottom:1px solid #e4dacc;padding:0;margin:0;">
    <summary style="display:flex;align-items:center;justify-content:space-between;padding:16px 0;cursor:pointer;list-style:none;gap:16px;">
      <span style="display:flex;align-items:center;gap:10px;font-weight:600;font-size:15px;color:#2e2a20;"><i class="fa-solid fa-circle-dot" style="color:#AE360E;font-size:8px;flex-shrink:0;"></i>${f.q}</span>
      <span class="faq-toggle" style="font-size:12px;color:#AE360E;white-space:nowrap;flex-shrink:0;">See answer &#9660;</span>
    </summary>
    <div style="padding:0 0 16px 18px;color:#5a5650;font-size:15px;line-height:1.7;">${f.a}</div>
  </details>`).join('');

  const relatedLinks = n.relatedNeighborhoods.map(slug =>
    `<a href="/neighborhoods/${slug}/" style="display:inline-block;margin:4px 4px 4px 0;padding:5px 12px;background:#f4ede4;border-radius:4px;font-size:13px;color:#201B10;text-decoration:none;border:1px solid #e4dacc;">${NEIGHBORHOOD_NAMES[slug]}</a>`
  ).join('');

  const head = buildHead(n);

  return `<!DOCTYPE html>
<html lang="en">
${head}
<body>
<div class="page-wrapper">

<!-- HEADER -->

<section class="page-header">
  <div class="page-header__bg" style="background-image:url(/assets/images/backgrounds/timnath-hero.jpg);"></div>
  <div class="container">
    <h1 class="page-header__title">${n.heroTitle}</h1>
    <div class="wallox-breadcrumb"><ul class="wallox-breadcrumb__list list-unstyled">
      <li><a href="/index.html"><i class="fa-solid fa-house"></i> Home</a></li>
      <li><a href="/neighborhoods/">Neighborhoods</a></li>
      <li><span>${n.name}</span></li>
    </ul></div>
  </div>
</section>

<script type="application/ld+json">${schema}</script>

<section style="padding:80px 0;">
  <div class="container">
    <div class="row gutter-y-30">

      <!-- MAIN CONTENT -->
      <div class="col-lg-8">

        <div style="margin-bottom:32px;">
          <h1 style="font-size:32px;font-weight:700;color:#201B10;margin-bottom:10px;">${n.heroTitle}</h1>
          <p style="font-size:15px;color:#5a5650;margin-bottom:0;"><strong>${n.tagline}</strong></p>
        </div>

        ${introParagraphs}

        <hr style="border:none;border-top:1px dashed #ddd;margin:32px 0;">

        <div style="margin-bottom:32px;">
          <p style="font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#AE360E;margin-bottom:8px;">who we serve</p>
          <h2 style="font-size:24px;font-weight:700;color:#201B10;margin-bottom:16px;">Exterior Painting for ${n.name} Homeowners</h2>
          <p style="color:#5a5650;line-height:1.8;margin-bottom:16px;">${n.whoWeServe}</p>
        </div>

        <hr style="border:none;border-top:1px dashed #ddd;margin:32px 0;">

        <div style="margin-bottom:32px;">
          <p style="font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#AE360E;margin-bottom:8px;">local knowledge</p>
          <h2 style="font-size:24px;font-weight:700;color:#201B10;margin-bottom:16px;">What We Know About Painting in ${n.name}</h2>
          <p style="color:#5a5650;line-height:1.8;margin-bottom:16px;">${n.localNote}</p>
        </div>

        <hr style="border:none;border-top:1px dashed #ddd;margin:32px 0;">

        <div style="margin-bottom:32px;">
          <p style="font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#AE360E;margin-bottom:8px;">why choose us</p>
          <h2 style="font-size:24px;font-weight:700;color:#201B10;margin-bottom:20px;">Why ${n.name} Homeowners Choose Keystone Painting</h2>
          <ul style="list-style:none;padding:0;margin:0;">
            <li style="display:flex;align-items:flex-start;gap:14px;padding:16px 0;border-bottom:1px solid #e4dacc;"><div style="flex-shrink:0;width:36px;height:36px;background:#AE360E;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:14px;"><i class="fa-solid fa-shield-halved"></i></div><div><div style="font-weight:700;color:#201B10;margin-bottom:4px;">Licensed &amp; Insured in Colorado</div><div style="color:#5a5650;font-size:14px;line-height:1.6;">$1M general liability coverage. Certificates of insurance available on request within 24 hours.</div></div></li>
            <li style="display:flex;align-items:flex-start;gap:14px;padding:16px 0;border-bottom:1px solid #e4dacc;"><div style="flex-shrink:0;width:36px;height:36px;background:#AE360E;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:14px;"><i class="fa-solid fa-leaf"></i></div><div><div style="font-weight:700;color:#201B10;margin-bottom:4px;">No-VOC Products</div><div style="color:#5a5650;font-size:14px;line-height:1.6;">Approved Sherwin-Williams and Benjamin Moore applicator. Products and methods that protect your home and the environment.</div></div></li>
            <li style="display:flex;align-items:flex-start;gap:14px;padding:16px 0;border-bottom:1px solid #e4dacc;"><div style="flex-shrink:0;width:36px;height:36px;background:#AE360E;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:14px;"><i class="fa-solid fa-house"></i></div><div><div style="font-weight:700;color:#201B10;margin-bottom:4px;">HOA Color Expertise</div><div style="color:#5a5650;font-size:14px;line-height:1.6;">We handle ARC documentation, color samples, and approval submission. No paperwork headaches for you.</div></div></li>
            <li style="display:flex;align-items:flex-start;gap:14px;padding:16px 0;border-bottom:1px solid #e4dacc;"><div style="flex-shrink:0;width:36px;height:36px;background:#AE360E;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:14px;"><i class="fa-solid fa-clock"></i></div><div><div style="font-weight:700;color:#201B10;margin-bottom:4px;">Same-Day Response</div><div style="color:#5a5650;font-size:14px;line-height:1.6;">Every quote request gets a same-day response during business hours. On-site assessments scheduled fast.</div></div></li>
          </ul>
        </div>

        <hr style="border:none;border-top:1px dashed #ddd;margin:32px 0;">

        <div style="margin-bottom:32px;">
          <p style="font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#AE360E;margin-bottom:8px;">common questions</p>
          <h2 style="font-size:24px;font-weight:700;color:#201B10;margin-bottom:20px;">Frequently Asked Questions — Exterior Painting in ${n.name}</h2>
          <div class="kg-faq" style="margin-top:16px;">${faqHtml}</div>
        </div>

        <div style="padding:24px;background:#f4ede4;border-radius:8px;margin-bottom:32px;">
          <p style="font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#AE360E;margin-bottom:10px;">Other Timnath Neighborhoods</p>
          <div>${relatedLinks}</div>
        </div>

        <div style="background:#201B10;color:#f4ede4;border-radius:8px;padding:28px 32px;margin-top:16px;">
          <h4 style="color:#fff;margin:0 0 10px;font-size:20px;">Ready to Get a Free Quote in ${n.name}?</h4>
          <p style="margin:0;font-size:15px;line-height:1.6;color:rgba(255,255,255,0.8);">Call or text <a href="tel:9706703965" style="color:#AE360E;font-weight:700;">(970) 670-3965</a> or fill out the form below. We respond same-day and provide free on-site assessments.</p>
        </div>

      </div>

      <!-- SIDEBAR -->
      <div class="col-lg-4">

        <div style="background:#f4ede4;padding:28px;border-radius:8px;margin-bottom:24px;">
          <h4 style="margin-bottom:16px;color:#201B10;">Get a Free Quote</h4>
          <ul class="list-unstyled" style="line-height:2.4;margin-bottom:16px;">
            <li><i class="fa-solid fa-phone" style="color:#AE360E;margin-right:8px;"></i><a href="tel:9706703965" style="font-weight:700;font-size:18px;color:#201B10;">(970) 670-3965</a></li>
            <li><i class="fa-solid fa-envelope" style="color:#AE360E;margin-right:8px;"></i><a href="mailto:josh@timnathpainting.com" style="color:#5a5650;">josh@timnathpainting.com</a></li>
            <li><i class="fa-solid fa-location-dot" style="color:#AE360E;margin-right:8px;"></i><span style="color:#5a5650;">Based in Timnath, CO</span></li>
          </ul>
          <a href="/get-a-quote/" class="wallox-btn wallox-btn--base" style="display:block;text-align:center;">Request a Quote</a>
        </div>

        <div style="background:#201B10;color:#f4ede4;padding:28px;border-radius:8px;margin-bottom:24px;">
          <p style="color:#AE360E;margin-bottom:14px;font-size:16px;font-weight:600;">Why Keystone Painting</p>
          <ul class="list-unstyled" style="line-height:2.2;margin:0;">
            <li><i class="fa-solid fa-check" style="color:#AE360E;margin-right:8px;"></i>Licensed &amp; Insured</li>
            <li><i class="fa-solid fa-check" style="color:#AE360E;margin-right:8px;"></i>No-VOC Products</li>
            <li><i class="fa-solid fa-check" style="color:#AE360E;margin-right:8px;"></i>$1M General Liability</li>
            <li><i class="fa-solid fa-check" style="color:#AE360E;margin-right:8px;"></i>HOA Color Expertise</li>
            <li><i class="fa-solid fa-check" style="color:#AE360E;margin-right:8px;"></i>SW &amp; BM Approved</li>
            <li><i class="fa-solid fa-check" style="color:#AE360E;margin-right:8px;"></i>Free On-Site Quotes</li>
          </ul>
        </div>

        <div style="padding:28px;border:1px solid #e4dacc;border-radius:8px;margin-bottom:24px;">
          <p style="color:#201B10;margin-bottom:14px;font-size:15px;font-weight:600;">Exterior Painting in Timnath</p>
          <ul class="list-unstyled" style="margin:0;">
            <li><a href="/exterior-painting-timnath-co/index.html" style="display:block;padding:8px 0;color:#201B10;font-size:14px;text-decoration:none;border-bottom:1px solid #e4dacc;">Timnath, CO (city page)</a></li>
            <li><a href="/neighborhoods/timnath-ranch/" style="display:block;padding:8px 0;color:#201B10;font-size:14px;text-decoration:none;border-bottom:1px solid #e4dacc;">Timnath Ranch</a></li>
            <li><a href="/neighborhoods/serratoga-falls/" style="display:block;padding:8px 0;color:#201B10;font-size:14px;text-decoration:none;border-bottom:1px solid #e4dacc;">Serratoga Falls</a></li>
            <li><a href="/neighborhoods/timnath-lakes/" style="display:block;padding:8px 0;color:#201B10;font-size:14px;text-decoration:none;border-bottom:1px solid #e4dacc;">Timnath Lakes</a></li>
            <li><a href="/neighborhoods/wildwing/" style="display:block;padding:8px 0;color:#201B10;font-size:14px;text-decoration:none;border-bottom:1px solid #e4dacc;">Wildwing</a></li>
            <li><a href="/neighborhoods/trailside/" style="display:block;padding:8px 0;color:#201B10;font-size:14px;text-decoration:none;border-bottom:1px solid #e4dacc;">Trailside</a></li>
            <li><a href="/neighborhoods/harmony-club/" style="display:block;padding:8px 0;color:#AE360E;font-size:14px;font-weight:700;text-decoration:none;">Harmony Club &rarr;</a></li>
          </ul>
        </div>

        <div style="padding:28px;border:1px solid #e4dacc;border-radius:8px;">
          <p style="color:#201B10;margin-bottom:14px;font-size:15px;font-weight:600;">Exterior Painting in Other Cities</p>
          <div>
            <a href="/exterior-painting-windsor-co/index.html" style="display:inline-block;margin:4px 4px 4px 0;padding:5px 12px;background:#f4ede4;border-radius:4px;font-size:13px;color:#201B10;text-decoration:none;border:1px solid #e4dacc;">Windsor</a>
            <a href="/exterior-painting-fort-collins-co/index.html" style="display:inline-block;margin:4px 4px 4px 0;padding:5px 12px;background:#f4ede4;border-radius:4px;font-size:13px;color:#201B10;text-decoration:none;border:1px solid #e4dacc;">Fort Collins</a>
            <a href="/exterior-painting-loveland-co/index.html" style="display:inline-block;margin:4
            px 4px 4px 0;padding:5px 12px;background:#f4ede4;border-radius:4px;font-size:13px;color:#201B10;text-decoration:none;border:1px solid #e4dacc;">Loveland</a>
            <a href="/exterior-painting-greeley-co/index.html" style="display:inline-block;margin:4px 4px 4px 0;padding:5px 12px;background:#f4ede4;border-radius:4px;font-size:13px;color:#201B10;text-decoration:none;border:1px solid #e4dacc;">Greeley</a>
            <a href="/exterior-painting-severance-co/index.html" style="display:inline-block;margin:4px 4px 4px 0;padding:5px 12px;background:#f4ede4;border-radius:4px;font-size:13px;color:#201B10;text-decoration:none;border:1px solid #e4dacc;">Severance</a>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>

<!-- FOOTER -->

</div><!-- .page-wrapper -->
</body>
</html>`;
}

// -- Build neighborhood hub/index page -------------------------------------
function buildNeighborhoodIndex() {
  const cards = NEIGHBORHOODS.map(n => `
    <div class="col-md-4">
      <div style="background:#fff;border:1px solid #e4dacc;border-radius:8px;padding:28px;height:100%;display:flex;flex-direction:column;">
        <h3 style="font-size:18px;font-weight:700;color:#201B10;margin-bottom:8px;">${n.name}</h3>
        <p style="color:#5a5650;font-size:14px;line-height:1.6;flex:1;margin-bottom:16px;">${n.tagline}</p>
        <a href="/neighborhoods/${n.slug}/" style="font-size:14px;font-weight:700;color:#AE360E;text-decoration:none;">Exterior Painting in ${n.name} &rarr;</a>
      </div>
    </div>`).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Exterior Painting by Timnath Neighborhood | Keystone Painting</title>
<meta name="description" content="Neighborhood-specific exterior painting for Timnath Ranch, Serratoga Falls, Timnath Lakes, Wildwing, Trailside, and Harmony Club. Call (970) 670-3965.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://timnathpainting.com/neighborhoods/">
<link rel="apple-touch-icon" sizes="180x180" href="/assets/images/favicons-v2/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicons-v2/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/images/favicons-v2/favicon-16x16.png">
<link rel="manifest" href="/assets/images/favicons-v2/site.webmanifest">
<link rel="preload" href="/assets/fonts/outfit-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/plusjakarta-normal-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/css/fonts.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<link rel="preload" href="/assets/vendors/bootstrap/css/bootstrap.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<link rel="preload" href="/assets/css/wallox.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<link rel="preload" href="/assets/css/timnath-custom.css?v=20260514" as="style" onload="this.onload=null;this.rel='stylesheet'">
<link rel="preload" href="/assets/css/timnath-overrides.css?v=20260514" as="style" onload="this.onload=null;this.rel='stylesheet'">
<link rel="preload" href="/assets/vendors/fontawesome/webfonts/fa-solid-900.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/vendors/fontawesome/css/all.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<link rel="preload" href="/assets/vendors/wallox-icons/style.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<link rel="preload" href="/assets/css/icon-shim.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript>
<link rel="stylesheet" href="/assets/css/fonts.css">
<link rel="stylesheet" href="/assets/vendors/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" href="/assets/css/wallox.css">
<link rel="stylesheet" href="/assets/css/timnath-custom.css?v=20260514">
<link rel="stylesheet" href="/assets/css/timnath-overrides.css?v=20260514">
<link rel="stylesheet" href="/assets/vendors/fontawesome/css/all.min.css">
<link rel="stylesheet" href="/assets/vendors/wallox-icons/style.css">
<link rel="stylesheet" href="/assets/css/icon-shim.css">
</noscript>
<style>
:root{--wallox-font:"Plus Jakarta Sans",sans-serif;--wallox-text:#7E7C76;--wallox-text-dark:#2E2A20;--wallox-base:#AE360E;--wallox-gray:#F4EDE4;--wallox-white:#fff;--wallox-border-color:#E4DACC}
.container{width:100%;padding-right:15px;padding-left:15px;margin-right:auto;margin-left:auto}
@media(min-width:576px){.container{max-width:540px}}@media(min-width:768px){.container{max-width:720px}}@media(min-width:992px){.container{max-width:960px}}@media(min-width:1200px){.container{max-width:1140px}}@media(min-width:1400px){.container{max-width:1320px}}
.page-wrapper{position:relative;margin:0 auto;width:100%;min-width:300px;overflow:hidden}
.wallox-btn{display:inline-block;background:#AE360E;color:#fff;padding:15px 24px;font-weight:600;font-size:16px;border-radius:100px;text-decoration:none;text-align:center}
.main-header{background-color:#201B10!important}.main-header__inner{padding:0!important}.main-header__logo{display:none!important}
.main-header__right{display:flex;align-items:center}
.fa-solid,.fa-regular,.fa-brands,.fa{display:inline-block;min-width:1em;font-style:normal}
@media(max-width:1199px){.main-header__right__link{display:none!important}}@media(min-width:1200px){.mobile-nav__btn{display:none!important}}
.mobile-nav__btn span{display:block;width:30px;height:2px;background:#fff;margin-bottom:7px}.mobile-nav__btn span:last-child{margin-bottom:0}
.row{display:flex;flex-wrap:wrap;margin-right:-15px;margin-left:-15px}
.col-md-4{position:relative;width:100%;padding-right:15px;padding-left:15px}
@media(min-width:768px){.col-md-4{flex:0 0 33.333333%;max-width:33.333333%}}
.gutter-y-30>*{margin-bottom:30px}
</style>
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-K8ZXCK8V');</script>
<script src="https://cdn.usefathom.com/script.js" data-site="YNVVPFQV" defer></script>
</head>
<body>
<div class="page-wrapper">

<!-- HEADER -->

<section class="page-header">
  <div class="page-header__bg" style="background-image:url(/assets/images/backgrounds/timnath-hero.jpg);"></div>
  <div class="container">
    <h1 class="page-header__title">Exterior Painting by Timnath Neighborhood</h1>
    <div class="wallox-breadcrumb"><ul class="wallox-breadcrumb__list list-unstyled">
      <li><a href="/index.html"><i class="fa-solid fa-house"></i> Home</a></li>
      <li><span>Neighborhoods</span></li>
    </ul></div>
  </div>
</section>

<section style="padding:80px 0;">
  <div class="container">
    <div style="max-width:760px;margin-bottom:56px;">
      <p style="font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#AE360E;margin-bottom:8px;">Timnath, CO Neighborhoods</p>
      <h2 style="font-size:32px;font-weight:700;color:#201B10;margin-bottom:16px;">Neighborhood-Specific Exterior Painting in Timnath</h2>
      <p style="color:#5a5650;line-height:1.8;margin-bottom:0;">Every Timnath neighborhood has its own character � different siding profiles, HOA requirements, and environmental exposures. We've documented what we know about exterior painting in each community. Select your neighborhood below.</p>
    </div>
    <div class="row gutter-y-30">
      ${cards}
    </div>
  </div>
</section>

<!-- FOOTER -->

</div><!-- .page-wrapper -->
</body>
</html>`;
}

// -- Run --------------------------------------------------------------------
console.log('Building neighborhood pages...');

// Build each neighborhood page
for (const n of NEIGHBORHOODS) {
  write(`neighborhoods/${n.slug}/index.html`, buildNeighborhoodPage(n));
}

// Build the neighborhood index
write('neighborhoods/index.html', buildNeighborhoodIndex());

console.log(`\nDone. ${NEIGHBORHOODS.length} neighborhood pages + 1 index page built.`);
