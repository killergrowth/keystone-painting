'use strict';
// Patches HOA, fence staining, exterior staining, and commercial painting SERVICE_DATA
// Run: node patch-remaining-pages.js — safe to delete after.

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '_build-data.js');
let content = fs.readFileSync(filePath, 'utf8');

// ─── HOA PAINTING ─────────────────────────────────────────────────────────────
const HOA_OLD_START = "  'hoa-painting': {";
const HOA_OLD_END   = "  'commercial-painting':";
const hoaStart = content.indexOf(HOA_OLD_START);
const hoaEnd   = content.indexOf(HOA_OLD_END);

const newHoa = `  'hoa-painting': {
    title: 'HOA Painting in Northern Colorado',
    metaTitle: 'HOA Painting Northern Colorado | Keystone Painting',
    metaDesc: "HOA painting specialists in Northern Colorado. Color coordination, documentation, multi-unit scheduling. Call Keystone Painting: (970) 236-8271",
    tagline: 'HOA Color Compliance Made Simple',
    heroTitle: 'HOA Painting in Northern Colorado \u2014 Color Approval to Final Coat',
    intro: \`HOA painting projects require a level of coordination most painting contractors are not set up for. Color approval documentation, multi-unit scheduling that minimizes resident disruption, and precise color matching across dozens of homes \u2014 these are requirements, not extras.

Keystone Painting has worked with HOAs across Timnath, Windsor, and Severance. We understand the approval process, carry $1M general liability insurance with COI on request, and deliver consistent color results across every building we touch.\`,
    process: \`HOA projects begin with a meeting with the property manager or board to confirm scope, color palette, scheduling requirements, and documentation needs.

<strong>Color Coordination:</strong> We work directly with HOA architectural review committees to confirm approved colors, obtain approval letters, and document color specifications for every structure.

<strong>Scheduling:</strong> Multi-unit projects are sequenced to minimize resident disruption. We communicate project timelines directly with affected residents when requested.

<strong>Execution:</strong> Same prep and coating standards as every Keystone Painting project. No shortcuts because the client is an HOA instead of an individual homeowner.\`,
    propertyTypes: [
      { type: 'Single-Family HOA Homes', desc: 'The most common HOA project in Timnath and Windsor. We handle color sample submission, approval documentation, and precise color matching across every home in the community \u2014 so the neighborhood looks intentional, not patchwork.' },
      { type: 'Townhomes and Attached Units', desc: 'Shared wall structures require careful masking and crew coordination to avoid paint transfer between units. We sequence townhome projects unit-by-unit to minimize resident disruption while maintaining color consistency across the row.' },
      { type: 'Multi-Unit Apartment Buildings', desc: 'Large-scale repaints require industrial staging, after-hours flexibility, and reliable crew scheduling. We bring the same owned crew to every day of a multi-unit project \u2014 no rotating subs, no quality inconsistency between buildings.' },
      { type: 'Common Areas and Amenity Structures', desc: 'Clubhouses, mailbox stations, fencing, pergolas, and signage structures are part of the HOA\\'s visual standard. We treat common area work with the same color precision and prep standards as the homes themselves.' },
    ],
    whyUs: \`HOA boards have one core concern: consistency. Every home in the community needs to look the same, and any variation \u2014 even a slight color shift from unit to unit \u2014 gets flagged by residents and can create compliance problems with the governing documents.

We eliminate that risk. We use spectrophotometer color matching and coordinate directly with Sherwin-Williams and Benjamin Moore reps to lock in exact color codes for every project. When we come back the following year for additional units, the color is right.

Our $1M general liability policy covers multi-unit projects. Certificates of insurance are available within 24 hours to any property manager or board that requests one. We have never had a board wait on a COI from us.\`,
    timeline: \`HOA project timelines depend on unit count, but here is how a standard Timnath or Windsor neighborhood project runs.

<strong>Week 1 \u2014 Color Approval:</strong> We submit color samples and documentation to the architectural review committee. Most Northern Colorado HOAs turn approvals in 2\u20134 weeks. We build this into the project timeline and never start coating without written approval in hand.

<strong>Week 2\u20133 \u2014 Prep:</strong> Pressure washing, scraping, caulking, and priming across all approved units. We work sequentially through the community to keep the timeline predictable for residents.

<strong>Weeks 3\u20135 \u2014 Coating:</strong> Two-coat minimum on all surfaces. We document color codes used for each unit for future reference.

<strong>Final \u2014 Walkthrough:</strong> Board representative or property manager walkthrough before any final invoice is issued. We address any punch list items same-day.\`,
    relatedServices: [
      { label: 'Exterior Painting', slug: 'exterior-painting', desc: '7\u201310 year systems for individual homes in Northern Colorado.' },
      { label: 'Commercial Painting', slug: 'commercial-painting', desc: 'After-hours scheduling, $1M liability, no subcontractors.' },
      { label: 'Fence Staining', slug: 'fence-staining', desc: 'Community fence staining for HOA common areas and individual lots.' },
    ],
    faqs: [
      { q: 'Do you handle HOA color approval documentation?', a: 'Yes. We work with HOA architectural review committees to confirm approved colors, provide color samples, and submit all required documentation. We have worked with dozens of local HOAs in Timnath, Windsor, and Severance and know their standards and timelines.' },
      { q: 'Can you coordinate multi-unit HOA projects?', a: 'Yes. We sequence multi-unit projects to minimize resident disruption and maintain consistent scheduling. Property managers receive regular progress updates. We coordinate resident communications when required.' },
      { q: 'Do you provide certificates of insurance for HOA projects?', a: 'Yes. Keystone Painting carries $1M general liability insurance. Certificates of insurance are provided on request, typically within 24 hours.' },
      { q: 'What does HOA exterior painting cost?', a: 'HOA painting costs depend on number of units, building size, surface condition, and color change requirements. We provide per-unit pricing and bulk project estimates. Call (970) 236-8271 for a site assessment and quote.' },
      { q: 'How do you ensure color consistency across multiple units?', a: 'We use spectrophotometer color matching and lock in exact Sherwin-Williams or Benjamin Moore color codes at the start of the project. Every unit is painted from the same batch formula. When we return for future phases, we pull the documented color codes to match exactly.' },
      { q: 'Can you work with an HOA property management company?', a: 'Yes. Most of our HOA work is coordinated through property management companies. We handle all communication, documentation, and scheduling through the property manager and only escalate to the board when approval decisions require it.' },
      { q: 'Do you paint common areas and amenity structures?', a: 'Yes. Clubhouses, mailbox stations, fencing, pergolas, and community signage are all in scope. We apply the same color standards and prep process to common areas as we do to the homes themselves.' },
      { q: 'What happens if residents complain about scheduling or disruption?', a: 'We communicate project timelines proactively and sequence work to minimize disruption. If a resident has a specific scheduling conflict, we work around it where possible. Property managers are updated daily during active phases.' },
    ],
  },
  `;

content = content.substring(0, hoaStart) + newHoa + content.substring(hoaEnd);

// ─── COMMERCIAL PAINTING ───────────────────────────────────────────────────────
const COMM_OLD_START = "  'commercial-painting': {";
const COMM_OLD_END   = "  'fence-staining':";
const commStart = content.indexOf(COMM_OLD_START);
const commEnd   = content.indexOf(COMM_OLD_END);

const newComm = `  'commercial-painting': {
    title: 'Commercial Painting in Northern Colorado',
    metaTitle: 'Commercial Painting Northern Colorado | Keystone Painting',
    metaDesc: "Commercial painting in Northern Colorado. After-hours scheduling, minimal disruption, $1M liability. Call Keystone Painting: (970) 236-8271",
    tagline: 'After-Hours Scheduling. Zero Disruption.',
    heroTitle: 'Commercial Painting in Northern Colorado \u2014 Built Around Your Schedule',
    intro: \`Keystone Painting provides commercial painting in Northern Colorado for strip malls, office buildings, and multi-family properties along the I-25 corridor. We specialize in after-hours scheduling, use commercial-grade coatings built for Colorado\\'s 28+ annual freeze-thaw cycles, and carry $1M general liability insurance with certificates available on request.

Your commercial property takes the same beating from Colorado\\'s climate as any home. But unlike residential work, your repaint cannot shut down your business for two weeks.\`,
    process: \`We start with a site assessment and schedule consultation. Most commercial clients need after-hours or weekend work to avoid disrupting operations. We accommodate that.

<strong>Surface Prep:</strong> Pressure wash, scrape failing coatings, repair substrate damage, prime bare wood or metal, caulk every penetration. Colorado\\'s climate demands this foundation \u2014 shortcuts fail within two years.

<strong>Coating Selection:</strong> We use elastomeric and commercial-grade coatings from Sherwin-Williams and Benjamin Moore. Elastomeric coatings bridge hairline cracks and flex with temperature swings. Industrial acrylics resist UV degradation through Colorado\\'s 300+ sunny days per year.

<strong>Documentation:</strong> Certificates of insurance available within 24 hours. We coordinate with property managers on access, security, and scheduling requirements.\`,
    buildingTypes: [
      { type: 'Retail and Strip Mall Exteriors', desc: 'Storefronts and retail centers along the I-25 corridor need coatings that hold up to high UV and freeze-thaw cycles without peeling or fading within two years. We schedule retail projects after hours and on weekends to avoid disrupting business operations.' },
      { type: 'Office Buildings', desc: 'Office exterior repaints require COI documentation and often coordination with building management companies. We handle both. Elastomeric coatings on office buildings bridge hairline cracks in EIFS and stucco exteriors that are common after Colorado winters.' },
      { type: 'Multi-Family and Apartment Complexes', desc: 'Large multi-family repaints require consistent color matching across multiple buildings and phased scheduling to avoid displacing residents. We bring owned crews \u2014 not subs \u2014 to every phase of a multi-family project.' },
      { type: 'Industrial and Warehouse Exteriors', desc: 'Metal panels, concrete block, and corrugated steel all require specific primer and topcoat systems. We specify industrial-grade coatings rated for Northern Colorado\\'s UV intensity and temperature extremes.' },
    ],
    whyUs: \`Commercial painting bids are easy to get. Reliable execution is harder to find. Most commercial painting contractors in Northern Colorado use subcontractors, which means the crew on day one may not be the crew on day five. Quality variation and scheduling gaps are the result.

Keystone Painting brings an owned crew to every commercial project. The same people who assess the job are the ones who do the work. We do not pass commercial projects off to subs when we get busy.

We carry $1M general liability insurance and workers\\' compensation on all crew members. COI is available within 24 hours. For property management companies that need to be listed as additional insured, we accommodate that at no cost.\`,
    timeline: \`Commercial project timelines depend on building size and schedule constraints, but here is how a standard Northern Colorado commercial repaint runs.

<strong>Week 1 \u2014 Assessment and Scheduling:</strong> On-site assessment, scope confirmation, COI delivery, and schedule build. We identify any after-hours or weekend requirements and lock in access protocols with building management.

<strong>Weeks 1\u20132 \u2014 Prep:</strong> Pressure washing, scraping, substrate repairs, priming. We work around your operating hours. Most prep can be completed during evening shifts.

<strong>Weeks 2\u20133 \u2014 Coating:</strong> First and second coat application. Elastomeric systems require specific dry times between coats that we factor into the schedule. We do not rush dry times.

<strong>Final \u2014 Punch List:</strong> Property manager walkthrough, punch list documentation, and touch-up completion before invoice.\`,
    relatedServices: [
      { label: 'HOA Painting', slug: 'hoa-painting', desc: 'Multi-unit HOA coordination with full color documentation.' },
      { label: 'Exterior Painting', slug: 'exterior-painting', desc: 'Residential exterior systems rated for 7\u201310 years.' },
    ],
    faqs: [
      { q: 'Can you paint after hours or on weekends?', a: 'Yes. Keystone Painting schedules commercial crews for evenings, overnight shifts, and weekends in Northern Colorado. Retail storefronts, medical offices, and multi-family buildings often require after-hours work. We coordinate site access, lighting requirements, and security protocols before beginning.' },
      { q: 'Do you provide certificates of insurance for commercial projects?', a: 'Yes. We carry $1M general liability insurance and provide COI on request, typically within 24 hours. We also carry workers\\' compensation for all crew members. We can list property management companies as additional insured.' },
      { q: 'What coatings do you use for commercial properties?', a: 'We specify elastomeric and industrial-grade acrylics from Sherwin-Williams and Benjamin Moore for commercial properties. Elastomeric coatings bridge hairline cracks and flex with temperature swings. We do not use residential-grade paints on commercial projects.' },
      { q: 'What does commercial painting cost per square foot?', a: 'Commercial painting in Northern Colorado typically costs $2.50\u2013$5.50 per square foot for standard exteriors with good existing paint. Complex projects with substrate repairs, elastomeric coatings, or difficult access run higher. We provide detailed written quotes after site assessment.' },
      { q: 'Do you work with property management companies?', a: 'Yes. Most of our commercial work is coordinated with property management companies. We handle documentation, scheduling, and access coordination through the property manager and provide regular progress updates throughout the project.' },
      { q: 'Can you paint EIFS or stucco commercial exteriors?', a: 'Yes. EIFS and stucco are common on commercial buildings along the I-25 corridor. Hairline cracks are addressed with elastomeric caulk before coating. We use elastomeric topcoats that bridge minor crack movement and resist Colorado freeze-thaw cycles.' },
      { q: 'Do you handle large multi-building commercial projects?', a: 'Yes. We have completed multi-building projects across apartment complexes and office parks in Northern Colorado. We bring owned crews to every phase \u2014 not subcontractors \u2014 so color consistency and quality standards hold across every building.' },
    ],
  },
  `;

content = content.substring(0, commStart) + newComm + content.substring(commEnd);

// ─── FENCE STAINING ────────────────────────────────────────────────────────────
const FENCE_OLD_START = "  'fence-staining': {";
const FENCE_OLD_END   = "  'exterior-staining':";
const fenceStart = content.indexOf(FENCE_OLD_START);
const fenceEnd   = content.indexOf(FENCE_OLD_END);

const newFence = `  'fence-staining': {
    title: 'Fence Staining in Northern Colorado',
    metaTitle: 'Fence Staining Northern Colorado | Keystone Painting',
    metaDesc: "Professional fence staining in Northern Colorado. Penetrating stains, proper prep, 3-5 year protection. Call Keystone Painting: (970) 236-8271",
    tagline: 'Penetrating Protection. Not Just Color.',
    heroTitle: 'Fence Staining in Northern Colorado \u2014 Built to Survive Colorado\\'s Weather',
    intro: \`Colorado\\'s UV index, freeze-thaw cycles, and wind-driven moisture destroy untreated or poorly stained fences faster than almost anywhere in the country. Solid stains peel. Clear sealers wear off in one season. Penetrating semi-transparent stains \u2014 applied to properly prepared wood \u2014 last 3\u20135 years and protect the wood from the inside out.

Keystone Painting uses penetrating oil-based and water-based stains from premium manufacturers, applied after proper cleaning, sanding, and wood brightening. We do not brush stain over dirty, weathered wood and call it done.\`,
    process: \`Every fence project begins with a condition assessment \u2014 existing coating type, wood species, weathering, and moisture content all affect product selection and prep requirements.

<strong>Preparation:</strong> Power washing removes dirt, mildew, and failing stain. Wood brightener restores the wood\\'s natural pH and opens the grain to accept stain. Sanding addresses rough surfaces and gray weathered wood.

<strong>Stain Application:</strong> We use penetrating semi-transparent or semi-solid stains that absorb into the wood rather than forming a film on top. Film-forming stains peel. Penetrating stains do not.

<strong>Product Selection:</strong> Stain type, sheen level, and UV protection are selected based on wood species, sun exposure, and existing finish.\`,
    woodTypes: [
      { type: 'Cedar', desc: 'The most common fence material in Northern Colorado HOA communities. Cedar is naturally rot-resistant but dries out fast at altitude. Semi-transparent penetrating stains let the grain show while keeping moisture out. We recommend restaining every 3\u20134 years on cedar in full-sun exposures.' },
      { type: 'Pine and Spruce', desc: 'Less dense than cedar and more prone to checking and splitting without regular stain maintenance. Pine fences benefit from semi-solid stains that provide heavier UV protection while still penetrating the wood fiber. South and west-facing pine sections need the most attention.' },
      { type: 'Pressure-Treated Lumber', desc: 'Pressure-treated wood must fully dry before staining \u2014 typically 6\u201312 months after installation for new construction. We test moisture content before any product goes on. Staining too early causes adhesion failure and premature peeling.' },
      { type: 'Weathered and Gray Wood', desc: 'Gray, silvery fence wood is not just a cosmetic problem. UV exposure has broken down the surface fibers and closed the grain. We apply a wood brightener and light sanding before staining to open the grain and restore the wood\\'s ability to accept penetrating product.' },
    ],
    whyUs: \`Most homeowners try to stain their own fence at least once. They buy a semi-transparent from the hardware store, roll it on, and two years later it looks worse than before \u2014 because the wood was not clean, the grain was not open, or the product was a film-former instead of a penetrating stain.

We eliminate that outcome. We prep the wood correctly, select the right product for the wood species and condition, and apply it in the right weather window. Staining in direct midday sun or when rain is forecast within 48 hours ruins the result. We schedule around both.

Our work comes with a workmanship guarantee. If the stain fails early due to our application, we come back and address it.\`,
    timeline: \`Fence staining projects in Northern Colorado typically take 1\u20132 days, depending on fence length and prep condition.

<strong>Day 1 \u2014 Prep:</strong> Power washing to remove dirt, mildew, and failing stain. Application of wood brightener on weathered or gray wood. Allow to dry completely \u2014 typically 24\u201348 hours before stain application.

<strong>Day 2 \u2014 Stain Application:</strong> First coat of penetrating stain applied by brush, roller, or airless sprayer depending on fence profile. Second coat applied wet-on-wet on new or bare wood, or after dry time on previously stained surfaces.

<strong>Dry and Cure:</strong> Most penetrating stains are dry to touch within 2\u20134 hours and fully cured within 24\u201348 hours. We advise keeping pets and sprinklers off the fence during cure time.\`,
    relatedServices: [
      { label: 'Exterior Painting', slug: 'exterior-painting', desc: '7\u201310 year exterior paint systems for your home.' },
      { label: 'Exterior Staining', slug: 'exterior-staining', desc: 'Deck, siding, and natural wood staining services.' },
      { label: 'HOA Painting', slug: 'hoa-painting', desc: 'Community fence and exterior painting for HOA properties.' },
    ],
    faqs: [
      { q: 'How long does fence stain last in Colorado?', a: 'Penetrating semi-transparent stains last 3\u20135 years on properly prepared wood in Northern Colorado. Solid stains and paints often fail sooner because they form a film that peels under freeze-thaw stress. UV exposure at altitude accelerates degradation, so south and west-facing sections may need restaining sooner.' },
      { q: 'Should I use oil-based or water-based stain on my fence?', a: 'Both work well when properly selected for the wood species and condition. Oil-based stains penetrate deeper on dense woods and aged surfaces. Water-based stains dry faster, have lower VOC content, and are easier to clean up. We recommend specific products after assessing your fence\\' wood type, current condition, and sun exposure.' },
      { q: 'Does the fence need to be cleaned before staining?', a: 'Yes. Power washing removes dirt, mildew, and old failing stain. For weathered gray wood, we apply a wood brightener to restore the wood\\'s natural color and pH before staining. Skipping cleaning means the stain bonds to surface contamination instead of wood fibers and fails early.' },
      { q: 'What does fence staining cost in Northern Colorado?', a: 'Fence staining typically costs $2\u2013$5 per linear foot depending on fence height, condition, number of sides, and stain type. A 150-foot privacy fence in average condition runs $600\u2013$1,200. Call (970) 236-8271 for an accurate estimate.' },
      { q: 'Can I stain a new fence right away?', a: 'Not if it is pressure-treated. PT lumber needs 6\u201312 months to fully dry before staining. Staining too early traps moisture and causes the stain to fail within a season. For new cedar or pine fences, we test moisture content first and only proceed when the wood is ready.' },
      { q: 'How do I know when my fence needs to be restained?', a: 'The water test: splash water on the fence. If it beads up, the stain is still protecting the wood. If it soaks in within seconds, the stain has worn off and the wood is exposed. Gray, silvery color is another sign \u2014 it means UV has broken down the surface fibers and the wood needs treatment.' },
      { q: 'Do you stain HOA community fences?', a: 'Yes. HOA community fence staining is one of our most common commercial and multi-family projects. We coordinate scheduling and color approval with property managers and provide COI on request.' },
    ],
  },
  `;

content = content.substring(0, fenceStart) + newFence + content.substring(fenceEnd);

// ─── EXTERIOR STAINING ─────────────────────────────────────────────────────────
const STAIN_OLD_START = "  'exterior-staining': {";
const STAIN_OLD_END   = '\n};\n\nconst CITY_DATA';
const stainStart = content.indexOf(STAIN_OLD_START);
const stainEnd   = content.indexOf(STAIN_OLD_END);

const newStain = `  'exterior-staining': {
    title: 'Exterior Staining in Northern Colorado',
    metaTitle: 'Exterior Staining Northern Colorado | Keystone Painting',
    metaDesc: "Exterior staining for wood siding, decks & trim in Northern Colorado. Premium penetrating stains, proper prep. Call (970) 236-8271",
    tagline: 'Penetrating Stains for Lasting Protection',
    heroTitle: 'Exterior Staining in Northern Colorado \u2014 Wood That Lasts',
    intro: \`Log homes, cedar siding, wood decks, and natural wood trim all require staining \u2014 not painting \u2014 to maintain their appearance and structural integrity in Colorado\\'s climate. Paint traps moisture in wood and eventually peels. Penetrating stains work with the wood, allowing it to breathe while protecting against UV degradation, moisture intrusion, and freeze-thaw damage.

Keystone Painting specializes in exterior staining for natural wood surfaces across Northern Colorado. We use premium penetrating oil and water-based stains and prepare surfaces properly before any product touches the wood.\`,
    process: \`Exterior staining projects begin with a full surface assessment \u2014 existing finish type, wood species and condition, moisture content, and exposure level all drive product selection.

<strong>Preparation:</strong> All surfaces are cleaned thoroughly \u2014 power washing, mildew treatment, and wood brightening where needed. Failed existing stain is stripped or sanded. Bare wood is allowed to dry completely before application.

<strong>Stain Application:</strong> We use penetrating stains from Defy, Armstrong Clark, TWP, and Ready Seal \u2014 products specifically formulated for Colorado\\'s UV intensity and freeze-thaw cycles. Application method is selected based on surface profile.

<strong>Two-Coat Application:</strong> Most exterior staining projects require two coats \u2014 a wet-on-wet application on new wood or a second coat after proper dry time on previously stained surfaces.\`,
    surfaceTypes: [
      { type: 'Log Homes', desc: 'Log homes require the most preparation of any exterior staining project. Existing failed stain must be stripped by hand, sanding, or chemical stripping depending on the coating type. We use oil-based penetrating stains specifically formulated for large-diameter log profiles, applied with brush work to ensure full penetration into the wood.' },
      { type: 'Cedar and Wood Siding', desc: 'Cedar siding is the most common exterior staining surface in Northern Colorado. We select stain opacity \u2014 clear, semi-transparent, or semi-solid \u2014 based on the existing condition of the wood and the homeowner\\'s preference for grain visibility. Colorado\\'s UV intensity means semi-transparent or semi-solid stains are typically the right choice for long-term protection.' },
      { type: 'Wood Decks', desc: 'Deck surfaces take far more abuse than vertical siding \u2014 foot traffic, UV, standing water, and freeze-thaw cycling all attack horizontal surfaces. We use deck-specific penetrating stains rated for horizontal applications and always include the deck railing and fascia boards in the scope.' },
      { type: 'Pergolas and Arbors', desc: 'Overhead structures are often forgotten until the wood splits and grays beyond recovery. We stain pergolas and arbors on the same prep-and-penetrate system we use for siding, with particular attention to end-grain surfaces where water intrusion starts.' },
      { type: 'Shake Siding', desc: 'Cedar shake and shingle siding requires brush application to get stain into the overlapping joints where moisture collects. We apply by brush on all shake siding \u2014 never sprayed only \u2014 to ensure full coverage behind each course.' },
    ],
    whyUs: \`Exterior staining is a specialty, not a side service. The difference between a stain job that lasts 5 years and one that fails in 18 months comes down to three things: surface prep, product selection, and application timing.

We test wood moisture before any product goes on. We select stain formulations based on wood species, existing coating condition, and UV exposure \u2014 not just whatever is on the shelf. And we do not stain in direct midday sun or within 48 hours of rain. Application timing in Colorado\\'s climate matters more than most contractors acknowledge.

We use premium eco-friendly, no-VOC products by Sherwin Williams and Benjamin Moore that meet Colorado\\'s VOC compliance standards. For homeowners in HOA communities, we coordinate color approval before any stain product is opened.\`,
    timeline: \`Exterior staining timelines depend on surface area and wood condition, but here is how a standard Northern Colorado project runs.

<strong>Day 1 \u2014 Assessment and Prep:</strong> We assess the existing finish, test moisture content, and begin cleaning. Power washing and mildew treatment are completed on day one. Wood brightener is applied where needed and allowed to work overnight.

<strong>Day 2 \u2014 Dry and Inspect:</strong> Wood must be fully dry before staining \u2014 we confirm moisture levels are in the acceptable range before proceeding. On log homes with deep checking, we caulk any open splits with stainable caulk.

<strong>Day 2\u20133 \u2014 Stain Application:</strong> First coat applied by brush, roller, or sprayer depending on surface profile. Log homes and shake siding are always brush-applied for penetration. Flat siding can be sprayed and back-brushed.

<strong>Final Coat and Cure:</strong> Second coat applied after appropriate dry time. Most penetrating stains cure within 24\u201348 hours for light use and 72 hours for full weather exposure.\`,
    relatedServices: [
      { label: 'Exterior Painting', slug: 'exterior-painting', desc: '7\u201310 year paint systems for non-wood or previously painted surfaces.' },
      { label: 'Fence Staining', slug: 'fence-staining', desc: 'Penetrating stain systems for all fence types in Northern Colorado.' },
      { label: 'HOA Painting', slug: 'hoa-painting', desc: 'Color coordination and multi-unit work for HOA communities.' },
    ],
    faqs: [
      { q: 'What types of exterior surfaces can be stained?', a: 'We stain wood siding (cedar, pine, redwood, T1-11), log homes, wood decks, pergolas, fences, wood trim, and shake siding. Each surface type requires specific stain formulation and prep approach. Composite or PVC surfaces are not candidates for staining.' },
      { q: 'How do I know if my wood needs staining or painting?', a: 'Natural wood with visible grain that has previously been stained should be restained. Wood that has been painted should be repainted. Converting from paint to stain requires full paint removal \u2014 a major project. If you are unsure, we assess the existing finish during our on-site evaluation.' },
      { q: 'How often does exterior wood need to be restained in Colorado?', a: 'Northern Colorado\\'s UV intensity and freeze-thaw cycles accelerate coating breakdown. Most exterior staining lasts 3\u20135 years with premium products and proper prep. South and west-facing surfaces may need attention sooner. Annual inspection catches early signs of failure before water intrusion causes wood damage.' },
      { q: 'What does exterior staining cost in Northern Colorado?', a: 'Exterior staining costs vary significantly based on surface area, wood species, condition, and accessibility. Deck staining typically runs $1.50\u2013$3.50 per square foot. Log home exteriors vary by complexity. Call (970) 236-8271 for an on-site assessment and accurate quote.' },
      { q: 'Can you stain a log home?', a: 'Yes. Log home staining is one of our more involved projects because it requires full strip prep on failed existing coatings, checking of all log checks and joints, and brush application to ensure stain penetrates around the full log profile. We use oil-based penetrating products specifically formulated for log construction.' },
      { q: 'What is the best stain product for Colorado conditions?', a: 'We use Armstrong Clark, TWP (Total Wood Preservative), Defy Extreme, and Ready Seal depending on the application. All are penetrating formulations rated for Colorado's UV intensity and freeze-thaw cycling. We do not use hardware-store deck stains on log homes or shake siding.' },
      { q: 'Do you prep and stain decks?', a: 'Yes. Deck staining includes cleaning, brightening, and sanding the deck surface, then applying a penetrating deck stain rated for horizontal use. We include railings, balusters, and fascia boards in every deck stain project \u2014 not just the deck boards.' },
      { q: 'How long do I need to stay off the deck after staining?', a: 'Most penetrating deck stains are dry to light foot traffic in 4\u20138 hours and ready for normal use in 24\u201348 hours. We advise keeping pets and furniture off for 24 hours and avoiding sprinklers or heavy rain for 48 hours after application.' },
    ],
  },


`;
content = content.substring(0, stainStart) + newStain + content.substring(stainEnd);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Done. Patched HOA, commercial, fence staining, and exterior staining.');
