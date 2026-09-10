'use strict';
// One-shot patch: replaces the exterior-painting SERVICE_DATA entry with expanded content
// Run from repo root: node patch-exterior-content.js
// Safe to delete after running.

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '_build-data.js');
let content = fs.readFileSync(filePath, 'utf8');

const OLD_START = "  'exterior-painting': {";
const OLD_END   = "  'hoa-painting':";

const startIdx = content.indexOf(OLD_START);
const endIdx   = content.indexOf(OLD_END);

if (startIdx === -1 || endIdx === -1) {
  console.error('Could not find section boundaries. Aborting.');
  process.exit(1);
}

const newSection = `  'exterior-painting': {
    title: 'Exterior Painting in Northern Colorado',
    metaTitle: 'Exterior Painting Northern Colorado | Keystone Painting',
    metaDesc: "Exterior painting built for Colorado's climate. Licensed, eco-certified, 7-10 year coatings. Northern Colorado homes. (970) 236-8271",
    tagline: "Built for Colorado's Climate",
    heroTitle: 'Exterior Painting in Northern Colorado That Lasts 10+ Years',
    intro: \`Northern Colorado sees 28+ freeze-thaw cycles every year. UV radiation hits 10-15% harder at altitude. Wood siding expands and contracts with temperature swings that can exceed 60 degrees in a single day. Cheap paint jobs fail in 3-4 years here.

Keystone Painting builds exterior painting systems that last 7-10 years using premium prep, Sherwin-Williams and Benjamin Moore coatings, and methods designed specifically for Zone 5b conditions. We are Licensed, Insured, and using premium eco-friendly, no-VOC products by Sherwin Williams and Benjamin Moore. $1M general liability coverage.\`,
    process: \`Every project starts with a full surface assessment. We identify substrate issues, previous coating failures, and moisture problems before prep begins.

<strong>Surface Preparation:</strong> We scrape all loose and peeling paint, sand smooth transitions, repair wood rot and damaged trim, caulk all gaps and joints with premium elastomeric sealants, and pressure wash to remove dirt, mildew, and chalking.

<strong>Coating Application:</strong> We use Sherwin-Williams Duration, Emerald, or SuperPaint, and Benjamin Moore Aura or Regal Select. Two-coat minimum on all surfaces. Three coats on south and west exposures where UV is most intense.

<strong>Project Management:</strong> You get a dedicated project lead, progress updates throughout the job, and full site cleanup. No subcontractors. No volume rushing.\`,
    sidingTypes: [
      { type: 'Fiber Cement (HardiePlank / HardieBoard)', desc: 'The most common siding in newer Northern Colorado HOA communities. Holds paint extremely well when primed with an alkyd or 100% acrylic masonry primer. Must be clean and fully dry before coating. 7\u201310 year system lifespans are realistic with proper prep.' },
      { type: 'Wood / Cedar', desc: "Natural wood demands oil-based primer on every bare surface. Checks, splits, and open grain get caulked with flexible elastomeric sealant. Colorado's dry climate pulls moisture out of wood faster than coastal climates \u2014 older wood siding requires more prep time, and we factor that into every quote." },
      { type: 'T1-11 Plywood', desc: 'Common on older homes and outbuildings. The vertical grooves trap moisture and debris year-round. Requires aggressive cleaning and an elastomeric or 100% acrylic topcoat that can bridge hairline cracks without peeling.' },
      { type: 'Vinyl Siding', desc: 'Paintable with the correct adhesion primer. Color selection matters here \u2014 going significantly darker than the original factory color can cause thermal expansion stress and may void manufacturer warranties. We assess this before quoting and advise accordingly.' },
      { type: 'Stucco', desc: 'Takes paint well and holds up to Colorado climate when prepared correctly. Surface cracks are addressed with elastomeric caulk or flexible patching compound before any topcoat. We use masonry primer as the base coat on all stucco surfaces.' },
    ],
    whyUs: \`Our crew is owned, not subcontracted. That matters more than most homeowners realize \u2014 it means the same people who show up day one are there day five. No phone-tag with subs, no quality drop-off when we get busy and send whoever is available.

We use premium eco-friendly, no-VOC products by Sherwin Williams and Benjamin Moore exclusively � covering application practices, environmental compliance, and chemical handling \u2014 not just a marketing badge. It is also why we have access to Sherwin-Williams and Benjamin Moore contractor programs that most local painters do not.

$1M general liability coverage means that if something goes wrong on your property, you are protected. We provide a certificate of insurance within 24 hours to any HOA board or property manager who requests one.\`,
    timeline: \`Most residential exterior painting projects in Northern Colorado take 3\u20135 business days, weather-dependent.

<strong>Day 1 &mdash; Prep:</strong> Surface assessment, pressure washing, scraping all loose paint, caulking gaps and joints, spot priming bare surfaces. This is the most important day on the job. Prep determines how long the paint lasts.

<strong>Days 2\u20133 &mdash; First Coat:</strong> Top-to-bottom application. Trim is cut in before rolling or spraying field areas. South and west exposures are scheduled for morning application to avoid midday heat blistering.

<strong>Days 3\u20134 &mdash; Second Coat:</strong> Full second coat on all surfaces. Three coats on high-UV exposures. Detail work on trim, fascia, and soffits.

<strong>Final Day &mdash; Cleanup &amp; Walkthrough:</strong> Site cleanup, touch-ups, and a final walkthrough with you before any invoice is issued. You do not need to be home during the project \u2014 we coordinate access at the quote stage and send photos throughout.\`,
    relatedServices: [
      { label: 'HOA Painting', slug: 'hoa-painting', desc: 'Board-approved color matching and documentation for HOA compliance.' },
      { label: 'Fence Staining', slug: 'fence-staining', desc: 'Penetrating stains that protect wood grain through Colorado summers.' },
      { label: 'Exterior Staining', slug: 'exterior-staining', desc: 'Deck and siding stain systems for natural wood surfaces.' },
      { label: 'Commercial Painting', slug: 'commercial-painting', desc: 'After-hours scheduling, minimal disruption, $1M liability.' },
    ],
    faqs: [
      { q: 'How long does exterior paint last in Colorado?', a: 'Budget paint jobs typically last 3-4 years in Northern Colorado due to freeze-thaw cycles and high UV exposure. Premium systems with proper surface prep and high-grade acrylic or elastomeric coatings last 7-10 years. We use Sherwin-Williams Duration and Benjamin Moore Aura \u2014 both formulated for extreme temperature cycling and UV resistance.' },
      { q: 'What prep work is required for exterior painting in Northern Colorado?', a: 'All loose and failing paint must be scraped to stable substrate. Wood siding requires sanding, rot repair, and bare wood priming with oil or shellac-based primers. All gaps, joints, and seams need premium elastomeric caulking. Surfaces are pressure washed to remove dirt, mildew, and chalk. Skipping any of these steps leads to premature failure.' },
      { q: 'Do you handle HOA color approval for exterior painting?', a: 'Yes. Many Northern Colorado communities require HOA approval before exterior color changes. We help navigate the approval process, provide color samples that meet HOA guidelines, and submit all required documentation on your behalf. Most approvals take 2-4 weeks, which we build into project timelines.' },
      { q: 'What does exterior painting cost in Northern Colorado?', a: 'Most premium exterior painting projects for $650K+ homes range from $8,000-$18,000+ depending on home size, siding type, and surface condition. Call (970) 236-8271 for an accurate quote based on your specific home.' },
      { q: 'What is the best time of year to paint a home exterior in Northern Colorado?', a: 'Spring (April\u2013May) and fall (September\u2013October) are ideal \u2014 temperatures between 50\u201385\u00b0F, lower wind, and manageable UV. Summer works but west and south-facing surfaces can blister if paint is applied in direct midday sun above 90\u00b0F. We schedule around weather and communicate any delays proactively.' },
      { q: 'Do I need to be home while you are painting?', a: 'No. Most homeowners give us gate access, secure their pets, and head to work. We coordinate access at the quote stage, send progress photos throughout the project, and request a final walkthrough before we leave.' },
      { q: 'Can you paint over existing paint without stripping everything?', a: 'Yes, when the existing paint is stable and properly adhered. We scrape all loose and failing areas, feather the edges, and prime bare spots. Full stripping is only required when there is widespread adhesion failure, lead paint remediation, or significant substrate damage. We tell you which situation you are in during the initial assessment.' },
      { q: 'Do you repair wood rot before painting?', a: 'Yes. Minor rot and damaged trim are repaired during prep \u2014 this is part of our standard process, not an add-on. Extensive structural damage may be referred to a carpenter, but we handle everything that is paint-adjacent.' },
      { q: 'What warranty do you offer on exterior painting?', a: 'We stand behind our work. If paint fails due to workmanship issues \u2014 peeling, adhesion failure, excessive fading \u2014 within the first year, we return and fix it. Sherwin-Williams Duration carries a Lifetime Limited warranty when applied by a certified contractor, which we are.' },
      { q: 'Will the color look the same on my house as on the color chip?', a: 'Not always. Color appearance changes with light conditions, surface area, and surrounding landscaping. We recommend buying a test quart and painting a 2-foot swatch in both direct sun and shade on your home before finalizing. We hold off on the full coating order until you have seen it on the house.' },
    ],
  },
  `;

content = content.substring(0, startIdx) + newSection + content.substring(endIdx);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Done. Patched exterior-painting section.');
