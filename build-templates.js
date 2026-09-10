'use strict';
const { CLIENT, SERVICES } = require('./_build-data.js');

function htmlHead(title, desc, canonicalUrl, preloadImage, noindex = false) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="robots" content="${noindex ? 'noindex, nofollow' : 'index, follow'}">
${canonicalUrl ? `<link rel="canonical" href="${canonicalUrl}">` : ''}
${preloadImage ? `<link rel="preload" as="image" href="${preloadImage.replace(/\.(jpg|jpeg)$/i, '-mobile.webp')}" media="(max-width:800px)">
<link rel="preload" as="image" href="${preloadImage.replace(/\.(jpg|jpeg)$/i, '.webp')}" media="(min-width:801px)">` : ''}
<!-- Open Graph / Social Share -->
<meta property="og:type" content="website">
<meta property="og:site_name" content="Keystone Painting">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="https://timnathpainting.com/assets/images/social-share.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${desc}">
<meta name="twitter:image" content="https://timnathpainting.com/assets/images/social-share.png">
<link rel="apple-touch-icon" sizes="180x180" href="/assets/images/favicons-v2/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicons-v2/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/images/favicons-v2/favicon-16x16.png">
<link rel="manifest" href="/assets/images/favicons-v2/site.webmanifest">
<!-- Self-hosted fonts - eliminates Google Fonts external round-trips -->
<link rel="preload" href="/assets/fonts/outfit-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/plusjakarta-normal-latin.woff2" as="font" type="font/woff2" crossorigin>
<!-- All CSS async - critical styles are inlined below -->
<link rel="preload" href="/assets/css/fonts.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<link rel="preload" href="/assets/vendors/bootstrap/css/bootstrap.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<link rel="preload" href="/assets/css/wallox.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<link rel="preload" href="/assets/css/timnath-custom.css?v=20260514" as="style" onload="this.onload=null;this.rel='stylesheet'">
<link rel="preload" href="/assets/css/timnath-overrides.css?v=20260514" as="style" onload="this.onload=null;this.rel='stylesheet'">
<!-- Preload FontAwesome webfont to prevent header layout shift -->
<link rel="preload" href="/assets/vendors/fontawesome/webfonts/fa-solid-900.woff2" as="font" type="font/woff2" crossorigin>
<!-- Non-critical CSS - deferred async -->
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
/* ============================================================
   CRITICAL CSS - inlined to eliminate ALL render-blocking CSS
   ============================================================ */

/* 1. CSS variables (from wallox.css :root) */
:root{--wallox-font:"Plus Jakarta Sans",sans-serif;--wallox-text:#7E7C76;--wallox-text-dark:#2E2A20;--wallox-base:#AE360E;--wallox-gray:#F4EDE4;--wallox-white:#fff;--wallox-border-color:#E4DACC}

/* 2. Bootstrap container - minimal, so bootstrap.min.css can load async */
.container,.container-fluid{width:100%;padding-right:15px;padding-left:15px;margin-right:auto;margin-left:auto}
@media(min-width:576px){.container{max-width:540px}}
@media(min-width:768px){.container{max-width:720px}}
@media(min-width:992px){.container{max-width:960px}}
@media(min-width:1200px){.container{max-width:1140px}}
@media(min-width:1400px){.container{max-width:1320px}}
.d-none{display:none!important}.d-block{display:block!important}
@media(min-width:768px){.d-md-inline{display:inline!important}}

/* 3. Page wrapper */
.page-wrapper{position:relative;margin:0 auto;width:100%;min-width:300px;overflow:hidden}

/* 4. HERO SIZING - critical for LCP paint. Without this, hero collapses and image can't render. */
.main-slider-one{position:relative;overflow:hidden}
.main-slider-one__item{position:relative;padding-top:115px;padding-bottom:158px;height:803px;background-color:#F4EDE4}
@media(max-width:1350px){.main-slider-one__item{height:auto}}
@media(max-width:767px){.main-slider-one__item{padding-top:180px;padding-bottom:200px}}
/* Hero dark gradient overlay (from timnath-custom.css) */
.main-slider-one__item::before{content:"";position:absolute;inset:0;background:rgba(0,0,0,0);z-index:1}
.main-slider-one .container,.main-slider-one__content{position:relative;z-index:2}
/* Hero title text */
.main-slider-one__title__box{overflow:hidden}
.main-slider-one__title__text{display:block;color:#2E2A20;font-weight:800;font-size:80px;line-height:112%;letter-spacing:-.02em;margin:0;text-transform:capitalize}
@media(max-width:575px){.main-slider-one__title__text{font-size:50px}}

/* 5. CTA button */
.wallox-btn{display:inline-block;vertical-align:middle;border:none;outline:none!important;background-color:#2E2A20;color:#fff;font-family:var(--wallox-font,"Plus Jakarta Sans",sans-serif);padding:15px 24px;font-weight:600;font-size:16px;line-height:1.25;text-transform:capitalize;border-radius:100px;position:relative;overflow:hidden;text-align:center}
.wallox-btn--base{background:#AE360E;color:#fff}

/* 6. Header layout */
.main-header__right{display:flex;align-items:center}
.main-header--three .main-header__inner{padding:0}
@media(max-width:1199px){.main-header--three .main-header__inner{padding:10px 0}}
.main-header--three .main-menu .main-menu__list > li > a{color:#fff}
.main-header--three .main-header__logo{display:none}
@media(max-width:1199px){.main-header--three .main-header__logo{display:block}}
.main-header--three .main-header__nav{margin-left:0;margin-right:auto}
/* Mobile hamburger */
.mobile-nav__btn span{display:block;width:30px;height:2px;background:#fff;margin-bottom:7px}
.mobile-nav__btn span:last-child{margin-bottom:0}

/* ============================================================
   Existing critical overrides (unchanged)
   ============================================================ */
.main-header { background-color: #201B10 !important; }
.main-header__inner { padding: 0 !important; }
.main-header__logo { display: none !important; }
/* Preloader: JS controls dismiss (see wrapBody script). CSS fallback at 4s in case JS fails. */
@keyframes dismissPreloader{0%{opacity:1;visibility:visible}100%{opacity:0;visibility:hidden;pointer-events:none}}
.preloader{animation:dismissPreloader 500ms ease forwards;animation-delay:4000ms;}
/* .real-image: GSAP xPercent reveal removed. Images visible by default. */
.real-image { overflow: hidden; }
/* === STATIC HERO (no Owl carousel, no wallox.js dep for LCP) === */
/* Hero bg: immediately visible, no wallox opacity:0 initial state */
.hero-static .main-slider-one__bg { opacity: 1 !important; transform: none !important; transition: none !important; }
/* Hero bg img positioning (same as before) */
.hero-static .main-slider-one__bg img { position:absolute;top:-5%;left:0;width:100%;height:110%;object-fit:cover;object-position:center; }
/* CSS-only text entrance animations �" fire on load, no JS required */
@keyframes heroSlideUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:none; } }
.hero-static .main-slider-one__sub-title { animation: heroSlideUp 0.55s ease 0.15s both; }
.hero-static .main-slider-one__title__box:nth-child(1) h2 { animation: heroSlideUp 0.55s ease 0.3s both; }
.hero-static .main-slider-one__title__box:nth-child(2) h2 { animation: heroSlideUp 0.55s ease 0.45s both; }
.hero-static .main-slider-one__sub-text { animation: heroSlideUp 0.55s ease 0.55s both; }
.hero-static .main-slider-one__btn { animation: heroSlideUp 0.55s ease 0.7s both; }
/* Override wallox initial opacity:0 states so CSS animations control visibility */
.hero-static .main-slider-one__sub-title,
.hero-static .main-slider-one__title__box h2,
.hero-static .main-slider-one__btn { opacity: 0; }

/* CWV: Stabilize about-one layout */
.about-one { contain: layout; }
/* A11y: Darken about-one body text from #7E7C76 (3.86:1) to #666 (5.74:1) to pass WCAG AA contrast */
.about-one__top__text { color: #666 !important; }
/* A11y: FA icon space reservation - prevents CLS when FontAwesome loads async. */
.fa-solid, .fa-regular, .fa-brands, .fa {
  display: inline-block; min-width: 1em; font-style: normal;
}

/* Header: prevent both CTA button + hamburger showing at same time at mid-widths */
@media(max-width:1199px){.main-header__right__link{display:none!important}}
@media(min-width:1200px){.mobile-nav__btn{display:none!important}}

/* CWV: Tagline letter-spacing via CSS � eliminates fixTaglines JS setTimeout (which caused CLS) */
.sec-title__tagline { letter-spacing: 0.5px !important; word-spacing: normal !important; }
.sec-title__tagline .char, .sec-title__tagline .word { display: inline !important; letter-spacing: 0.5px !important; }
</style>
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-K8ZXCK8V');</script>
<!-- End Google Tag Manager -->
<!-- Feedbucket feedback widget -->
<script type="text/javascript">
 (function(k) {
 let s=document.createElement('script');s.defer=true;
 s.src="https://cdn.feedbucket.app/assets/feedbucket.js";
 s.dataset.feedbucket=k;document.head.appendChild(s);
 })('unHnhjucA9iBv9bu4nxg')
</script>
</head>`;
}

function htmlScripts() {
  // Removed unused vendor JS (confirmed 0 HTML hooks):
  // jquery-ui.js (463KB), isotope.js (37KB), tiny-slider.js (31KB),
  // slick.min.js (55KB), imagesloaded (7KB), circleType (5KB), lettering, circle-progress
  return `<script src="/assets/vendors/jquery/jquery-3.7.0.min.js"></script>
<script src="/assets/vendors/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="/assets/vendors/bootstrap-select/bootstrap-select.min.js"></script>
<!-- jarallax: never initialized on this site (0 elements with jarallax class or data-jarallax) -->
<script src="/assets/vendors/jquery-ajaxchimp/jquery.ajaxchimp.min.js"></script>
<script src="/assets/vendors/jquery-appear/jquery.appear.min.js"></script>
<script src="/assets/vendors/jquery-magnific-popup/jquery.magnific-popup.min.js"></script>
<script src="/assets/vendors/jquery-validate/jquery.validate.min.js"></script>
<!-- owl.carousel.min.js removed: no Owl usage anywhere after static hero replacement -->
<!-- GSAP (splittext+ScrollTrigger+gsap) + wallox-gsap.js removed:
     bwsplit_text() ran on window.load (~9s on throttled 4G) and refreshed the LCP measurement window -->
<script src="/assets/vendors/wow/wow.js"></script>
<script src="/assets/js/wallox.js"></script>
<script>
// Active nav: runs immediately + after 200ms to override wallox.js theme defaults
function setActiveNav() {
  var path = window.location.pathname.replace(/\\/index\\.html$/, '/').replace(/\\.html$/, '/').replace(/\\/?$/, '/');
  var items = document.querySelectorAll('.main-menu__list > li');
  items.forEach(function(li){ li.classList.remove('current'); });
  items.forEach(function(li){
    var a = li.querySelector('a');
    if (!a) return;
    var href = (a.getAttribute('href') || '').replace(/\\/index\\.html$/, '/').replace(/\\.html$/, '/').replace(/\\/?$/, '/');
    if (!href || href === '#/' || href === '#') return;
    if (path === href || (href.length > 1 && path.startsWith(href))) {
      li.classList.add('current');
    }
  });
}
setActiveNav();
setTimeout(setActiveNav, 200);
</script>`;
}

function topbar() { return ''; /* topbar now embedded in header partial */ }

function pageHeader(title, crumbs) {
  return `<section class="page-header">
  <div class="page-header__bg" style="background-image:url(/assets/images/backgrounds/timnath-hero.jpg);"></div>
  <div class="container">
    <h2 class="page-header__title">${title}</h2>
    <div class="wallox-breadcrumb"><ul class="wallox-breadcrumb__list list-unstyled">
      <li><a href="/index.html"><i class="fa-solid fa-house"></i> Home</a></li>
      ${crumbs}
    </ul></div>
  </div>
</section>`;
}

function mobileNav() {
  return `<div class="mobile-nav__wrapper">
  <div class="mobile-nav__overlay mobile-nav__toggler"></div>
  <div class="mobile-nav__content">
    <span class="mobile-nav__close mobile-nav__toggler"><i class="fa-solid fa-xmark"></i></span>
    <div class="logo-box"><a href="/index.html"><img src="/assets/images/logo-vertical-white.png" width="140" alt="${CLIENT.name}" style="display:block;margin:0 auto;" loading="lazy"></a></div>
    <div class="mobile-nav__container"></div>
    <ul class="mobile-nav__contact list-unstyled">
      <li><i class="fa-solid fa-envelope"></i><a href="mailto:${CLIENT.email}">${CLIENT.email}</a></li>
      <li><i class="fa-solid fa-phone"></i><a href="tel:${CLIENT.phoneTel}">${CLIENT.phone}</a></li>
    </ul>

  </div>
</div>
<a href="#" data-target="html" class="scroll-to-target scroll-to-top">
  <span class="scroll-to-top__text">back top</span>
  <span class="scroll-to-top__wrapper"><span class="scroll-to-top__inner"></span></span>
</a>`;
}

function contactFormSection() {
  return `<div class="testimonials-contact" style="
    position:relative;
    background-image: linear-gradient(rgba(20,15,10,0.72), rgba(20,15,10,0.72)), url(/assets/images/backgrounds/quote-bg.jpg);
    background-size:cover;
    background-position:center;
    padding:100px 0;
  ">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-8 text-center">
        <div class="wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="100ms">
          <span style="color:var(--wallox-base,#AE360E);font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Ready to Get Started?</span>
          <h3 style="color:#fff;margin-top:12px;margin-bottom:16px;">Get a Free Quote From Keystone Painting</h3>
          <p style="color:#ccc;font-size:16px;line-height:1.7;margin-bottom:40px;">Call or text Josh directly, or send an email. Every inquiry gets a personal response &mdash; usually same day.</p>
          <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:16px;">
            <a href="tel:${CLIENT.phoneTel}" style="display:inline-flex;align-items:center;gap:12px;padding:16px 32px;background:#AE360E;color:#fff;font-weight:700;font-size:17px;border-radius:100px;text-decoration:none;">
              <i class="fa-solid fa-phone"></i> ${CLIENT.phone}
            </a>
            <a href="mailto:${CLIENT.email}" style="display:inline-flex;align-items:center;gap:12px;padding:16px 32px;background:rgba(255,255,255,0.1);border:2px solid rgba(255,255,255,0.3);color:#fff;font-weight:700;font-size:17px;border-radius:100px;text-decoration:none;">
              <i class="fa-solid fa-envelope"></i> ${CLIENT.email}
            </a>
          </div>
          <p style="margin-top:24px;font-size:13px;color:#aaa;">Licensed &amp; Insured &bull; No-VOC Products &bull; $1M General Liability</p>
        </div>
      </div>
    </div>
  </div>
</div>`;
}

function faqBlock(faqs, groupName) {
  return `<div class="kg-faq" style="margin-top:16px;">
  ${faqs.map(f => `<details style="border-bottom:1px solid #e4dacc;padding:0;margin:0;">
    <summary style="display:flex;align-items:center;justify-content:space-between;padding:16px 0;cursor:pointer;list-style:none;gap:16px;">
      <span style="display:flex;align-items:center;gap:10px;font-weight:600;font-size:15px;color:#2e2a20;">
        <i class="fa-solid fa-circle-dot" style="color:#AE360E;font-size:8px;flex-shrink:0;"></i>${f.q}
      </span>
      <span class="faq-toggle" style="font-size:12px;color:#AE360E;white-space:nowrap;flex-shrink:0;">See answer &#9660;</span>
    </summary>
    <div style="padding:0 0 16px 18px;color:#5a5650;font-size:15px;line-height:1.7;">${f.a}</div>
  </details>`).join('\n  ')}
</div>
<style>
.kg-faq details[open] .faq-toggle { content: ''; }
.kg-faq details[open] > summary .faq-toggle::after { content: ''; }
.kg-faq details[open] .faq-toggle { color:#AE360E; }
.kg-faq details > summary::-webkit-details-marker { display:none; }
.kg-faq details > summary::marker { display:none; }
</style>`;
}

function serviceCarouselItems() {
  const items = SERVICES.map(s => `<div class="item"><div class="service-one__item">
    <div class="service-one__item__thumb" style="height:260px;overflow:hidden;"><img src="/assets/images/service/${s.img}" alt="${s.label} in Northern Colorado" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block;"></div>
    <div class="service-one__item__content">
      <h4 class="service-one__item__title"><a href="/${s.slug}/index.html">${s.label}</a></h4>
      <p class="service-one__item__tagline">${s.tagline}</p>
      <a href="/${s.slug}/index.html" class="service-one__item__link">Learn more &rarr;</a>
    </div>
  </div></div>`).join('\n');
  const areasBox = `<div class="item"><div class="service-one__item" style="background:#f4ede4;">
    <div class="service-one__item__thumb"><img src="/assets/images/service/areas-served-map.jpg" alt="Northern Colorado service area map" loading="lazy"></div>
    <div class="service-one__item__content">
      <h4 class="service-one__item__title"><a href="/areas-served/index.html">See Areas We Serve</a></h4>
      <p class="service-one__item__tagline">Serving Windsor, Timnath, Fort Collins, Loveland and more across Northern Colorado.</p>
      <a href="/areas-served/index.html" class="service-one__item__link">View all areas &rarr;</a>
    </div>
  </div></div>`;
  return items + '\n' + areasBox;
}

function wrapBody(content) {
  return `<body>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K8ZXCK8V"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
<!-- preloader removed: static hero is visible on first paint, no Owl carousel or opacity:0 initial states remain.
     jQuery fadeOut() at window.load was pushing LCP to ~9s by causing a display:none transition at that time.
     Preloader reinstated with CSS auto-dismiss (700ms delay, 500ms fade) - fires before window.load, no LCP impact. -->
<div class="preloader"><div class="preloader__image" style="background-image:url(/assets/images/logo-vertical-white.png);"></div></div>
<script>
// Hold preloader until all async CSS has loaded — prevents unstyled content flash
!function(){
  var p=document.querySelector('.preloader');
  if(!p)return;
  p.style.cssText='animation:none!important;opacity:1!important;visibility:visible!important;pointer-events:auto;';
  var links=[].slice.call(document.head.querySelectorAll('link[rel="preload"][as="style"]'));
  var n=links.length||1,done=0;
  function finish(){if(++done>=n){setTimeout(function(){p.style.transition='opacity 0.45s ease';p.style.opacity='0';setTimeout(function(){p.style.visibility='hidden';p.style.pointerEvents='none';},450);},30);}}
  links.forEach(function(l){
    if(l.sheet){finish();}
    else{l.addEventListener('load',finish);l.addEventListener('error',finish);}
  });
  setTimeout(function(){done=n-1;finish();},3500);
}();
</script>
<div class="page-wrapper">
${content}
</main>
<!-- FOOTER -->
</div>
${mobileNav()}
${htmlScripts()}
<script>
// Fix JS-driven inline transforms on about section at DOM ready (CSS handles it too but inline styles override CSS)
document.addEventListener("DOMContentLoaded", function fixTransforms() {
  var thumb = document.querySelector(".about-one__thumb__item.real-image");
  if (thumb) { thumb.style.transform = "none"; thumb.style.position = "static"; }
  var funfact = document.querySelector(".about-one__funfact");
  if (funfact) { funfact.style.transform = "none"; }
});
</script>
<script>
document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('quote-form');
  if (!form) return;
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    var btn = form.querySelector('button[type="submit"]');
    var orig = btn ? btn.textContent : '';
    if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }
    try {
      var res = await fetch('/submit', { method: 'POST', body: new FormData(form) });
      var data = await res.json();
      if (data.ok) {
        var thankYou = document.createElement('div');
        thankYou.style.cssText = 'padding:40px 24px;text-align:center;';
        thankYou.innerHTML = '<p style="color:#AE360E;font-size:22px;font-weight:700;margin-bottom:12px;">Thank you!</p><p style="color:rgba(255,255,255,0.85);font-size:15px;line-height:1.7;">We received your request and will be in touch within a few minutes.</p>';
        var note = form.parentElement && form.parentElement.querySelector('.contact-preview-note');
        if (note) note.style.display = 'none';
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: 'form_submit_success', form_type: 'quote_form' });
        form.replaceWith(thankYou);
      } else {
        if (btn) { btn.disabled = false; btn.textContent = orig; }
        alert('Something went wrong. Please call us at (970) 670-3965.');
      }
    } catch (err) {
      if (btn) { btn.disabled = false; btn.textContent = orig; }
      alert('Something went wrong. Please call us at (970) 670-3965.');
    }
  });
});
</script>
</body>
</html>`;
}

module.exports = { htmlHead, htmlScripts, topbar, pageHeader, mobileNav, contactFormSection, faqBlock, serviceCarouselItems, wrapBody };












