# SOP â€” Keystone Painting (paintkeystone.com)
Last updated: 2026-09-24

---

## Quick Reference

| Field | Value |
|-------|-------|
| Client | Keystone Painting |
| Owner | Josh Funk (josh@paintkeystone.com) |
| Live URL | https://paintkeystone.com |
| Staging URL | https://staging.paintkeystone.com |
| CF Pages Project | `keystone-painting` |
| CF Pages Subdomain | `timnath-painting.pages.dev` â† legacy, ignore |
| GitHub Repo | `killergrowth/keystone-painting` |
| Local Path | `C:\Users\KillerGrowth\.openclaw\workspace\sites\keystone-painting\` |
| sites.json ID | `keystone-painting` |
| Domain Registrar | Cloudflare (proxied, orange cloud) |
| Phone | (970) 670-3965 |
| Address | Timnath, CO 80547 |

---

## Business Context

Keystone Painting is a residential exterior painting and fence staining contractor in Northern Colorado. Core services: exterior painting, fence/deck staining. Service area: Timnath, Windsor, Severance, Fort Collins, Loveland, Greeley, and the I-25 corridor.

Brand differentiators:
- 7â€“10 year paint systems engineered for Northern Colorado's climate
- Eco-friendly, no-VOC products (Sherwin Williams + Benjamin Moore)
- $2M liability coverage, licensed and insured
- Climate-specific expertise (28+ freeze-thaw cycles/year, 10â€“15% higher UV)

Brand tone: Straightforward, credibility-forward. Lead with facts, not hype.

---

## Site Architecture

This is a **partials-based build**. Source files live at the site root. Never edit `dist/` directly â€” it's generated on every build.

```
keystone-painting/
  _partials/
    head.html       â† shared <head> (CSS, meta, scripts)
    footer.html     â† shared footer
    blog-post.html  â† blog post template
    blog-index.html â† blog listing template
    blog-featured.html
  assets/
    css/
      keystone-custom.css    â† site-specific styles (was timnath-custom.css)
      keystone-overrides.css â† theme overrides (was timnath-overrides.css)
    images/
      backgrounds/
        keystone-hero.jpg / .webp       â† main hero images
        keystone-hero-2.jpg / .webp     â† secondary hero
        keystone-hero-2-mobile.webp
  blog-posts/         â† markdown source for all blog content
  build.js            â† main build script â€” generates all pages into dist/
  build-templates.js  â† shared HTML templates (htmlHead, etc.)
  _build-data.js      â† client config (name, phone, address, schema data)
  _neighborhood-data.js, _windsor-neighborhood-data.js
  dist/               â† BUILD OUTPUT â€” never edit directly, gitignored
```

### Build Command
```
cd C:\Users\KillerGrowth\.openclaw\workspace\sites\keystone-painting
node build.js
```

---

## Standard Deploy Flow

Always follow **SOP-WEB-BUILD.md** for the full process. Keystone-specific notes below.

### Deploy to staging
```powershell
$env:CLOUDFLARE_API_TOKEN = "<token from credentials.md>"
$env:CLOUDFLARE_ACCOUNT_ID = "27cafbbee6f8e1db0d9499405d4755c1"
npx wrangler pages deploy ./dist --project-name keystone-painting --branch staging
```
Staging URL: **https://staging.paintkeystone.com**

### Deploy to production (main)
```powershell
$env:CLOUDFLARE_API_TOKEN = "<token from credentials.md>"
$env:CLOUDFLARE_ACCOUNT_ID = "27cafbbee6f8e1db0d9499405d4755c1"
npx wrangler pages deploy ./dist --project-name keystone-painting --branch main
```
Live URL: **https://paintkeystone.com**

âš ï¸ **Never deploy to production without Tyler B approval.**
âš ï¸ **Always run `node build.js` before deploying â€” never deploy stale dist.**

---

## Cloudflare Pages â€” Known Quirk

The CF Pages project name is `keystone-painting` but the auto-assigned pages.dev subdomain is `timnath-painting.pages.dev` â€” this is a legacy artifact from when the project was originally created under the old brand name. **This cannot be changed.** The subdomain is internal plumbing only; nobody sees it. The live domain is `paintkeystone.com` and staging is `staging.paintkeystone.com` (custom domain alias added 2026-09-24).

Do not try to "fix" the pages.dev subdomain â€” it's cosmetic and not worth a full project recreation.

---

## Timnath â†’ Keystone Brand History (IMPORTANT)

This client was previously called **Timnath Painting** and rebranded to **Keystone Painting**. The rebrand is complete as of 2026-09-24. Here's what that means when working on this site:

### âœ… Timnath references that are FINE to keep
- Blog posts targeting "Timnath, CO" as a **service area city** (e.g. `/exterior-painting-timnath-co/`, HOA painting posts targeting Timnath)
- Meta descriptions that include "Timnath" in a city list alongside Windsor, Severance, etc.
- The `/areas-served/timnath-co/` page and neighborhood pages (`/neighborhoods/timnath-lakes/`, `/neighborhoods/timnath-ranch/`)
- Any content where Timnath is referenced as a location, not a brand

### âŒ Timnath references that should NOT exist
- "Timnath Painting" as a brand name anywhere on the site
- "Timnath's most trusted painting contractor" (brand framing)
- CSS files named `timnath-*.css` â€” they have been renamed to `keystone-*.css`
- Images named `timnath-hero-*` â€” renamed to `keystone-hero-*`
- The brand migration blog post "timnath-painting-is-now-keystone-painting" â€” deleted 2026-09-24
- `Timnath-Painting-Norther-Colorado.jpg` â€” renamed to `Keystone-Painting-Northern-Colorado.jpg`

### Custom domains on the CF project
- `paintkeystone.com` âœ…
- `www.paintkeystone.com` âœ…
- `staging.paintkeystone.com` âœ… (added 2026-09-24)
- `timnathpainting.com` â€” still pointing to this project (old brand domain, keep as redirect target)
- `www.timnathpainting.com` â€” same

---

## Logo Assets

Keystone has two official logo versions, each in three colors. All live in `assets/images/`.

| File | Description | Used in |
|------|-------------|---------|
| `keystone-logo-red-horizontal.png` | Horizontal — icon left, text right — RED | Nav (top bar + main header) |
| `keystone-logo-white-horizontal.png` | Horizontal — icon left, text right — WHITE | Preloader, footer |
| `keystone-logo-black-horizontal.png` | Horizontal — icon left, text right — BLACK | Available, not currently used |
| `keystone-logo-red-vertical.png` | Vertical — icon top, text below — RED | Available |
| `keystone-logo-white-vertical.png` | Vertical — icon top, text below — WHITE | Available |
| `keystone-logo-black-vertical.png` | Vertical — icon top, text below — BLACK | Available |

**The logo icon is a shield/mountain mark** — a badge shape with a white window + mountain range silhouette inside. This is the correct Keystone logo. The old "key+paintbrush" icon was a previous draft and should never be used.

Logo refs in source:
- `_partials/header.html` — nav (both top bar and sticky header)
- `_partials/footer.html` — footer
- `build-templates.js` — preloader + inner-page logo box

There is also a `keystone-logos/` subfolder in `assets/images/` containing older versioned files (v1, v2). **Do not use these.** They exist as historical artifacts. The correct files are the ones listed above in the root of `assets/images/`.

---
## Pending Items (as of 2026-09-24)

- **Timnath logo surfacing on the Keystone site** â€” not yet tracked down. Likely in a theme template, CSS background-image, or asset that wasn't caught in the 2026-09-24 cleanup. Hunt this down before next deploy.
- **About page bio** (TIM-001) â€” Josh wants: "I'm Josh, a Colorado local, and..." â€” not yet done. Tyler B to confirm if still relevant.
- **About page headshots** (TIM-002) â€” Josh wants real headshots. Waiting on Josh to upload to Drive: https://drive.google.com/drive/folders/1Jai_Ag_8168rcZRpHx9WjcuC8scp5S4B
- **Drive audit** â€” SA auth was erroring during 2026-09-24 session. Drive folders for Timnath/Keystone not yet verified clean.

---

## Contact Form

Contact form uses a Cloudflare Pages Function (`functions/submit.js`). Form submissions go via Gmail API using the service account `openclaw-agent@killergrowth.iam.gserviceaccount.com`. Cloudflare Turnstile is implemented for spam protection.

---

## Key Files to Know

| File | Purpose |
|------|---------|
| `build.js` | Main build â€” generates all pages, blog, sitemap |
| `build-templates.js` | Shared HTML templates (htmlHead, nav, footer wrappers) |
| `_build-data.js` | Client config: name, phone, address, schema, review data |
| `_partials/head.html` | Shared `<head>` block â€” CSS, meta, preloads |
| `_partials/footer.html` | Footer markup + nav links |
| `blog-posts/` | Markdown source for all blog content |
| `_redirects` | 301 redirects â€” never remove entries, only add |
| `functions/submit.js` | Contact form handler (CF Pages Function) |
| `sitemap.xml` | Auto-generated by `build.js` â€” never edit manually |

---

## Notes

- Blog posts are built from `.md` files in `blog-posts/`. Add new posts there; `build.js` picks them up automatically.
- Neighborhood pages are generated from `_neighborhood-data.js` and `_windsor-neighborhood-data.js` via `build-neighborhood-pages.js`.
- The `dist/` folder is gitignored. Cloudflare Pages does not auto-deploy from GitHub â€” all deploys are manual via wrangler.
- Always run the build before deploying. The build also regenerates `sitemap.xml`.
- After any deploy, update `lastPublished` in `References/sites.json`.

