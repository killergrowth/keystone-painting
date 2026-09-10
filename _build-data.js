'use strict';

const CLIENT = {
  name: 'Keystone Painting',
  phone: '(970) 670-3965',
  phoneTel: '9706703965',
  email: 'josh@paintkeystone.com',
  street: '417 Main Street Unit 2 #101',
  city: 'Windsor',
  state: 'CO',
  zip: '80550',
  facebook: 'https://www.facebook.com/profile.php?id=61591570377897',
  instagram: 'https://instagram.com/timnathpainting',
  tagline: 'Northern Colorado\'s Premium Painting Contractor',
  description: 'Premium painting contractor serving Windsor, Timnath, Severance & Northern Colorado. Licensed, insured, No-VOC Products.. Call or text (970) 670-3965.',
};

const SERVICES = [
  { label: 'Exterior Painting',   slug: 'exterior-painting',   icon: 'fa-solid fa-house',             img: 'img-4932-exterior.jpg', tagline: 'Coatings built to handle Colorado freeze-thaw cycles &mdash; rated for 7-10 years.' },
  { label: 'HOA Painting',        slug: 'hoa-painting',        icon: null,          img: 'photo-hoa-painting.jpg', tagline: 'Board-approved color matching and documentation for HOA compliance.' },
  { label: 'Commercial Painting', slug: 'commercial-painting', icon: 'fa-solid fa-building',  img: 'photo-commercial-painting.jpg', tagline: 'Minimal disruption scheduling. Crew-owned, not subcontracted.' },
  { label: 'Fence Staining',      slug: 'fence-staining',      icon: null,        img: 'photo-fence-staining.jpg', tagline: 'Oil-based penetrating stains that protect wood grain through Colorado summers.' },
  { label: 'Exterior Staining',   slug: 'exterior-staining',   icon: null,              img: 'photo-exterior-staining.jpg', tagline: 'Deck and siding stain systems applied by applicators using premium eco-friendly, no-VOC products by Sherwin Williams and Benjamin Moore.' },
];

const CITIES = [
  { label: 'Timnath',     slug: 'timnath-co' },
  { label: 'Windsor',     slug: 'windsor-co' },
  { label: 'Severance',   slug: 'severance-co' },
  { label: 'Fort Collins', slug: 'fort-collins-co' },
  { label: 'Loveland',    slug: 'loveland-co' },
  { label: 'Greeley',     slug: 'greeley-co' },
  { label: 'Wellington',  slug: 'wellington-co' },
  { label: 'Johnstown',   slug: 'johnstown-co' },
];

const SERVICE_DATA = {

  'exterior-painting': {
    title: 'Exterior Painting in Northern Colorado',
    metaTitle: 'Exterior Painting Northern Colorado | Keystone Painting',
    metaDesc: "Exterior painting built for Colorado\'s climate. Licensed, eco-certified, 7-10 year coatings. Northern Colorado homes. (970) 670-3965",
    tagline: "Built for Colorado\'s Climate",
    heroTitle: 'Exterior Painting in Northern Colorado That Lasts 10+ Years',
    intro: `Northern Colorado sees 28+ freeze-thaw cycles every year. UV radiation hits 10-15% harder at altitude. Wood siding expands and contracts with temperature swings that can exceed 60 degrees in a single day. Cheap paint jobs fail in 3-4 years here.

Keystone Painting builds exterior painting systems that last 7-10 years using premium prep, Sherwin-Williams and Benjamin Moore coatings, and methods designed specifically for Zone 5b conditions. We are Licensed, Insured, and using premium eco-friendly, no-VOC products by Sherwin Williams and Benjamin Moore. $1M general liability coverage.`,
    process: `Every project starts with a full surface assessment. We identify substrate issues, previous coating failures, and moisture problems before prep begins.

<strong>Surface Preparation:</strong> We scrape all loose and peeling paint, sand smooth transitions, repair wood rot and damaged trim, caulk all gaps and joints with premium elastomeric sealants, and pressure wash to remove dirt, mildew, and chalking.

<strong>Coating Application:</strong> We use Sherwin-Williams Duration, Emerald, or SuperPaint, and Benjamin Moore Aura or Regal Select. Two-coat minimum on all surfaces. Three coats on south and west exposures where UV is most intense.

<strong>Project Management:</strong> You get a dedicated project lead, progress updates throughout the job, and full site cleanup. No subcontractors. No volume rushing.`,
    sidingTypes: [
      { type: 'Fiber Cement (HardiePlank / HardieBoard)', desc: 'The most common siding in newer Northern Colorado HOA communities. Holds paint extremely well when primed with an alkyd or 100% acrylic masonry primer. Must be clean and fully dry before coating. 7–10 year system lifespans are realistic with proper prep.' },
      { type: 'Wood / Cedar', desc: "Natural wood demands oil-based primer on every bare surface. Checks, splits, and open grain get caulked with flexible elastomeric sealant. Colorado\'s dry climate pulls moisture out of wood faster than coastal climates &mdash; older wood siding requires more prep time, and we factor that into every quote." },
      { type: 'T1-11 Plywood', desc: 'Common on older homes and outbuildings. The vertical grooves trap moisture and debris year-round. Requires aggressive cleaning and an elastomeric or 100% acrylic topcoat that can bridge hairline cracks without peeling.' },
      { type: 'Vinyl Siding', desc: 'Paintable with the correct adhesion primer. Color selection matters here &mdash; going significantly darker than the original factory color can cause thermal expansion stress and may void manufacturer warranties. We assess this before quoting and advise accordingly.' },
      { type: 'Stucco', desc: 'Takes paint well and holds up to Colorado climate when prepared correctly. Surface cracks are addressed with elastomeric caulk or flexible patching compound before any topcoat. We use masonry primer as the base coat on all stucco surfaces.' },
    ],
    whyUs: `Our crew is owned, not subcontracted. That matters more than most homeowners realize &mdash; it means the same people who show up day one are there day five. No phone-tag with subs, no quality drop-off when we get busy and send whoever is available.

We use premium eco-friendly, no-VOC products by Sherwin Williams and Benjamin Moore exclusively � covering application practices, environmental compliance, and chemical handling &mdash; not just a marketing badge. It is also why we have access to Sherwin-Williams and Benjamin Moore contractor programs that most local painters do not.

$1M general liability coverage means that if something goes wrong on your property, you are protected. We provide a certificate of insurance within 24 hours to any HOA board or property manager who requests one.`,
    timeline: `Most residential exterior painting projects in Northern Colorado take 3–5 business days, weather-dependent.

<strong>Prep Phase:</strong> Surface assessment, pressure washing, scraping all loose paint, caulking gaps and joints, spot priming bare surfaces. This is the most important day on the job. Prep determines how long the paint lasts.

<strong>Days 2–3 &mdash; First Coat:</strong> Top-to-bottom application. Trim is cut in before rolling or spraying field areas. South and west exposures are scheduled for morning application to avoid midday heat blistering.

<strong>Days 3–4 &mdash; Second Coat:</strong> Full second coat on all surfaces. Three coats on high-UV exposures. Detail work on trim, fascia, and soffits.

<strong>Final Day &mdash; Cleanup &amp; Walkthrough:</strong> Site cleanup, touch-ups, and a final walkthrough with you before any invoice is issued. You do not need to be home during the project &mdash; we coordinate access at the quote stage and send photos throughout.

We provide regular updates throughout your project and are available by phone or text at any stage. You will never wonder where things stand.`,
    relatedServices: [
      { label: 'HOA Painting', slug: 'hoa-painting', desc: 'Color approval documentation and multi-unit scheduling for HOA communities.' },
      { label: 'Commercial Painting', slug: 'commercial-painting', desc: 'After-hours scheduling, $1M liability, owned crew — not subcontractors.' },
      { label: 'Fence Staining', slug: 'fence-staining', desc: 'Penetrating stains for cedar, pine, and pressure-treated fences.' },
      { label: 'Exterior Staining', slug: 'exterior-staining', desc: 'Deck, log home, and wood siding stain systems for natural wood surfaces.' },
    ],
    faqs: [
      { q: 'How long does exterior paint last in Colorado?', a: 'Budget paint jobs typically last 3-4 years in Northern Colorado due to freeze-thaw cycles and high UV exposure. Premium systems with proper surface prep and high-grade acrylic or elastomeric coatings last 7-10 years. We use Sherwin-Williams Duration and Benjamin Moore Aura &mdash; both formulated for extreme temperature cycling and UV resistance.' },
      { q: 'What prep work is required for exterior painting in Northern Colorado?', a: 'All loose and failing paint must be scraped to stable substrate. Wood siding requires sanding, rot repair, and bare wood priming with oil or shellac-based primers. All gaps, joints, and seams need premium elastomeric caulking. Surfaces are pressure washed to remove dirt, mildew, and chalk. Skipping any of these steps leads to premature failure.' },
      { q: 'Do you handle HOA color approval for exterior painting?', a: 'Yes. Many Northern Colorado communities require HOA approval before exterior color changes. We help navigate the approval process, provide color samples that meet HOA guidelines, and submit all required documentation on your behalf. Most approvals take 2-4 weeks, which we build into project timelines.' },
      { q: 'What does exterior painting cost in Northern Colorado?', a: 'Most premium exterior painting projects for $650K+ homes range from $8,000-$18,000+ depending on home size, siding type, and surface condition. Call or text (970) 670-3965 for an accurate quote based on your specific home.' },
      { q: 'What is the best time of year to paint a home exterior in Northern Colorado?', a: 'Spring (April–May) and fall (September–October) are ideal &mdash; temperatures between 50–85°F, lower wind, and manageable UV. Summer works but west and south-facing surfaces can blister if paint is applied in direct midday sun above 90°F. We schedule around weather and communicate any delays proactively.' },
      { q: 'Do I need to be home while you are painting?', a: 'No. Most homeowners give us gate access, secure their pets, and head to work. We coordinate access at the quote stage, send progress photos throughout the project, and request a final walkthrough before we leave.' },
      { q: 'Can you paint over existing paint without stripping everything?', a: 'Yes, when the existing paint is stable and properly adhered. We scrape all loose and failing areas, feather the edges, and prime bare spots. Full stripping is only required when there is widespread adhesion failure, lead paint remediation, or significant substrate damage. We tell you which situation you are in during the initial assessment.' },
      { q: 'Do you repair wood rot before painting?', a: 'Yes. Minor rot and damaged trim are repaired during prep &mdash; this is part of our standard process, not an add-on. Extensive structural damage may be referred to a carpenter, but we handle everything that is paint-adjacent.' },
      { q: 'What warranty do you offer on exterior painting?', a: 'We stand behind our work. If paint fails due to workmanship issues &mdash; peeling, adhesion failure, excessive fading &mdash; within the first year, we return and fix it. Sherwin-Williams Duration carries a Lifetime Limited warranty when applied by a certified contractor, which we are.' },
      { q: 'Will the color look the same on my house as on the color chip?', a: 'Not always. Color appearance changes with light conditions, surface area, and surrounding landscaping. We recommend buying a test quart and painting a 2-foot swatch in both direct sun and shade on your home before finalizing. We hold off on the full coating order until you have seen it on the house.' },
    ],
  },
    'hoa-painting': {
    title: 'HOA Painting in Northern Colorado',
    metaTitle: 'HOA Painting Northern Colorado | Keystone Painting',
    metaDesc: "HOA painting specialists in Northern Colorado. Color coordination, documentation, multi-unit scheduling. Call Keystone Painting: (970) 670-3965",
    tagline: 'HOA Color Compliance Made Simple',
    heroTitle: 'HOA Painting in Northern Colorado &mdash; Color Approval to Final Coat',
    intro: `HOA painting projects require a level of coordination most painting contractors are not set up for. Color approval documentation, multi-unit scheduling that minimizes resident disruption, and precise color matching across dozens of homes &mdash; these are requirements, not extras.

Keystone Painting has worked with HOAs across Timnath, Windsor, and Severance. We understand the approval process, carry $1M general liability insurance with COI on request, and deliver consistent color results across every building we touch.`,
    process: `HOA projects begin with a meeting with the property manager or board to confirm scope, color palette, scheduling requirements, and documentation needs.

<strong>Color Coordination:</strong> We work directly with HOA architectural review committees to confirm approved colors, obtain approval letters, and document color specifications for every structure.

<strong>Scheduling:</strong> Multi-unit projects are sequenced to minimize resident disruption. We communicate project timelines directly with affected residents when requested.

<strong>Execution:</strong> Same prep and coating standards as every Keystone Painting project. No shortcuts because the client is an HOA instead of an individual homeowner.`,
    propertyTypes: [
      { type: 'Single-Family HOA Homes', desc: 'The most common HOA project in Timnath and Windsor. We handle color sample submission, approval documentation, and precise color matching across every home in the community &mdash; so the neighborhood looks intentional, not patchwork.' },
      { type: 'Townhomes and Attached Units', desc: 'Shared wall structures require careful masking and crew coordination to avoid paint transfer between units. We sequence townhome projects unit-by-unit to minimize resident disruption while maintaining color consistency across the row.' },
      { type: 'Multi-Unit Apartment Buildings', desc: 'Large-scale repaints require industrial staging, after-hours flexibility, and reliable crew scheduling. We bring the same owned crew to every day of a multi-unit project &mdash; no rotating subs, no quality inconsistency between buildings.' },
      { type: 'Common Areas and Amenity Structures', desc: 'Clubhouses, mailbox stations, fencing, pergolas, and signage structures are part of the HOA\'s visual standard. We treat common area work with the same color precision and prep standards as the homes themselves.' },
    ],
    whyUs: `HOA boards have one core concern: consistency. Every home in the community needs to look the same, and any variation &mdash; even a slight color shift from unit to unit &mdash; gets flagged by residents and can create compliance problems with the governing documents.

We eliminate that risk. We use spectrophotometer color matching and coordinate directly with Sherwin-Williams and Benjamin Moore reps to lock in exact color codes for every project. When we come back the following year for additional units, the color is right.

Our $1M general liability policy covers multi-unit projects. Certificates of insurance are available within 24 hours to any property manager or board that requests one. We have never had a board wait on a COI from us.`,
    timeline: `HOA project timelines depend on unit count, but here is how a standard Timnath or Windsor neighborhood project runs.

<strong>Color Approval Phase:</strong> We submit color samples and documentation to the architectural review committee. Most Northern Colorado HOAs turn approvals in 2–4 weeks. We build this into the project timeline and never start coating without written approval in hand.

<strong>Prep Phase:</strong> Pressure washing, scraping, caulking, and priming across all approved units. We work sequentially through the community to keep the timeline predictable for residents.

<strong>Coating Phase:</strong> Two-coat minimum on all surfaces. We document color codes used for each unit for future reference.

<strong>Final &mdash; Walkthrough:</strong> Board representative or property manager walkthrough before any final invoice is issued. We address any punch list items same-day.

We provide regular updates throughout your project and are available by phone or text at any stage. You will never wonder where things stand.`,
    relatedServices: [
      { label: 'Exterior Painting', slug: 'exterior-painting', desc: '7–10 year paint systems built for Colorado\'s freeze-thaw cycles.' },
      { label: 'Commercial Painting', slug: 'commercial-painting', desc: 'After-hours scheduling, $1M liability, owned crew — not subcontractors.' },
      { label: 'Fence Staining', slug: 'fence-staining', desc: 'Penetrating stains for cedar, pine, and pressure-treated fences.' },
      { label: 'Exterior Staining', slug: 'exterior-staining', desc: 'Deck, log home, and wood siding stain systems for natural wood surfaces.' },
    ],
    faqs: [
      { q: 'Do you handle HOA color approval documentation?', a: 'Yes. We work with HOA architectural review committees to confirm approved colors, provide color samples, and submit all required documentation. We have worked with dozens of local HOAs in Timnath, Windsor, and Severance and know their standards and timelines.' },
      { q: 'Can you coordinate multi-unit HOA projects?', a: 'Yes. We sequence multi-unit projects to minimize resident disruption and maintain consistent scheduling. Property managers receive regular progress updates. We coordinate resident communications when required.' },
      { q: 'Do you provide certificates of insurance for HOA projects?', a: 'Yes. Keystone Painting carries $1M general liability insurance. Certificates of insurance are provided on request, typically within 24 hours.' },
      { q: 'What does HOA exterior painting cost?', a: 'HOA painting costs depend on number of units, building size, surface condition, and color change requirements. We provide per-unit pricing and bulk project estimates. Call or text (970) 670-3965 for a site assessment and quote.' },
      { q: 'How do you ensure color consistency across multiple units?', a: 'We use spectrophotometer color matching and lock in exact Sherwin-Williams or Benjamin Moore color codes at the start of the project. Every unit is painted from the same batch formula. When we return for future phases, we pull the documented color codes to match exactly.' },
      { q: 'Can you work with an HOA property management company?', a: 'Yes. Most of our HOA work is coordinated through property management companies. We handle all communication, documentation, and scheduling through the property manager and only escalate to the board when approval decisions require it.' },
      { q: 'Do you paint common areas and amenity structures?', a: 'Yes. Clubhouses, mailbox stations, fencing, pergolas, and community signage are all in scope. We apply the same color standards and prep process to common areas as we do to the homes themselves.' },
      { q: 'What happens if residents complain about scheduling or disruption?', a: 'We communicate project timelines proactively and sequence work to minimize disruption. If a resident has a specific scheduling conflict, we work around it where possible. Property managers are updated daily during active phases.' },
    ],
  },
    'commercial-painting': {
    title: 'Commercial Painting in Northern Colorado',
    metaTitle: 'Commercial Painting Northern Colorado | Keystone Painting',
    metaDesc: "Commercial painting in Northern Colorado. After-hours scheduling, minimal disruption, $1M liability. Call Keystone Painting: (970) 670-3965",
    tagline: 'After-Hours Scheduling. Zero Disruption.',
    heroTitle: 'Commercial Painting in Northern Colorado &mdash; Built Around Your Schedule',
    intro: `Keystone Painting provides commercial painting in Northern Colorado for strip malls, office buildings, and multi-family properties along the I-25 corridor. We specialize in after-hours scheduling, use commercial-grade coatings built for Colorado\'s 28+ annual freeze-thaw cycles, and carry $1M general liability insurance with certificates available on request.

Your commercial property takes the same beating from Colorado\'s climate as any home. But unlike residential work, your repaint cannot shut down your business for two weeks.`,
    process: `We start with a site assessment and schedule consultation. Most commercial clients need after-hours or weekend work to avoid disrupting operations. We accommodate that.

<strong>Surface Prep:</strong> Pressure wash, scrape failing coatings, repair substrate damage, prime bare wood or metal, caulk every penetration. Colorado\'s climate demands this foundation &mdash; shortcuts fail within two years.

<strong>Coating Selection:</strong> We use elastomeric and commercial-grade coatings from Sherwin-Williams and Benjamin Moore. Elastomeric coatings bridge hairline cracks and flex with temperature swings. Industrial acrylics resist UV degradation through Colorado\'s 300+ sunny days per year.

<strong>Documentation:</strong> Certificates of insurance available within 24 hours. We coordinate with property managers on access, security, and scheduling requirements.`,
    buildingTypes: [
      { type: 'Retail and Strip Mall Exteriors', desc: 'Storefronts and retail centers along the I-25 corridor need coatings that hold up to high UV and freeze-thaw cycles without peeling or fading within two years. We schedule retail projects after hours and on weekends to avoid disrupting business operations.' },
      { type: 'Office Buildings', desc: 'Office exterior repaints require COI documentation and often coordination with building management companies. We handle both. Elastomeric coatings on office buildings bridge hairline cracks in EIFS and stucco exteriors that are common after Colorado winters.' },
      { type: 'Multi-Family and Apartment Complexes', desc: 'Large multi-family repaints require consistent color matching across multiple buildings and phased scheduling to avoid displacing residents. We bring owned crews &mdash; not subs &mdash; to every phase of a multi-family project.' },
      { type: 'Industrial and Warehouse Exteriors', desc: 'Metal panels, concrete block, and corrugated steel all require specific primer and topcoat systems. We specify industrial-grade coatings rated for Northern Colorado\'s UV intensity and temperature extremes.' },
    ],
    whyUs: `Commercial painting bids are easy to get. Reliable execution is harder to find. Most commercial painting contractors in Northern Colorado use subcontractors, which means the crew on day one may not be the crew on day five. Quality variation and scheduling gaps are the result.

Keystone Painting brings an owned crew to every commercial project. The same people who assess the job are the ones who do the work. We do not pass commercial projects off to subs when we get busy.

We carry $1M general liability insurance and workers\' compensation on all crew members. COI is available within 24 hours. For property management companies that need to be listed as additional insured, we accommodate that at no cost.`,
    timeline: `Commercial project timelines depend on building size and schedule constraints, but here is how a standard Northern Colorado commercial repaint runs.

<strong>Assessment &amp; Scheduling:</strong> On-site assessment, scope confirmation, COI delivery, and schedule build. We identify any after-hours or weekend requirements and lock in access protocols with building management.

<strong>Prep Phase:</strong> Pressure washing, scraping, substrate repairs, priming. We work around your operating hours. Most prep can be completed during evening shifts.

<strong>Coating Phase:</strong> First and second coat application. Elastomeric systems require specific dry times between coats that we factor into the schedule. We do not rush dry times.

<strong>Final &mdash; Punch List:</strong> Property manager walkthrough, punch list documentation, and touch-up completion before invoice.

We provide regular updates throughout your project and are available by phone or text at any stage. You will never wonder where things stand.`,
    relatedServices: [
      { label: 'Exterior Painting', slug: 'exterior-painting', desc: '7–10 year paint systems built for Colorado\'s freeze-thaw cycles.' },
      { label: 'HOA Painting', slug: 'hoa-painting', desc: 'Color approval documentation and multi-unit scheduling for HOA communities.' },
      { label: 'Fence Staining', slug: 'fence-staining', desc: 'Penetrating stains for cedar, pine, and pressure-treated fences.' },
      { label: 'Exterior Staining', slug: 'exterior-staining', desc: 'Deck, log home, and wood siding stain systems for natural wood surfaces.' },
    ],
    faqs: [
      { q: 'Can you paint after hours or on weekends?', a: 'Yes. Keystone Painting schedules commercial crews for evenings, overnight shifts, and weekends in Northern Colorado. Retail storefronts, medical offices, and multi-family buildings often require after-hours work. We coordinate site access, lighting requirements, and security protocols before beginning.' },
      { q: 'Do you provide certificates of insurance for commercial projects?', a: 'Yes. We carry $1M general liability insurance and provide COI on request, typically within 24 hours. We also carry workers\' compensation for all crew members. We can list property management companies as additional insured.' },
      { q: 'What coatings do you use for commercial properties?', a: 'We specify elastomeric and industrial-grade acrylics from Sherwin-Williams and Benjamin Moore for commercial properties. Elastomeric coatings bridge hairline cracks and flex with temperature swings. We do not use residential-grade paints on commercial projects.' },
      { q: 'What does commercial painting cost per square foot?', a: 'Commercial painting in Northern Colorado typically costs $2.50–$5.50 per square foot for standard exteriors with good existing paint. Complex projects with substrate repairs, elastomeric coatings, or difficult access run higher. We provide detailed written quotes after site assessment.' },
      { q: 'Do you work with property management companies?', a: 'Yes. Most of our commercial work is coordinated with property management companies. We handle documentation, scheduling, and access coordination through the property manager and provide regular progress updates throughout the project.' },
      { q: 'Can you paint EIFS or stucco commercial exteriors?', a: 'Yes. EIFS and stucco are common on commercial buildings along the I-25 corridor. Hairline cracks are addressed with elastomeric caulk before coating. We use elastomeric topcoats that bridge minor crack movement and resist Colorado freeze-thaw cycles.' },
      { q: 'Do you handle large multi-building commercial projects?', a: 'Yes. We have completed multi-building projects across apartment complexes and office parks in Northern Colorado. We bring owned crews to every phase &mdash; not subcontractors &mdash; so color consistency and quality standards hold across every building.' },
    ],
  },
    'fence-staining': {
    title: 'Fence Staining in Northern Colorado',
    metaTitle: 'Fence Staining Northern Colorado | Keystone Painting',
    metaDesc: "Professional fence staining in Northern Colorado. Penetrating stains, proper prep, 3-5 year protection. Call Keystone Painting: (970) 670-3965",
    tagline: 'Penetrating Protection. Not Just Color.',
    heroTitle: 'Fence Staining in Northern Colorado &mdash; Built to Survive Colorado\'s Weather',
    intro: `Colorado\'s UV index, freeze-thaw cycles, and wind-driven moisture destroy untreated or poorly stained fences faster than almost anywhere in the country. Solid stains peel. Clear sealers wear off in one season. Penetrating semi-transparent stains &mdash; applied to properly prepared wood &mdash; last 3–5 years and protect the wood from the inside out.

Keystone Painting uses penetrating oil-based and water-based stains from premium manufacturers, applied after proper cleaning, sanding, and wood brightening. We do not brush stain over dirty, weathered wood and call it done.`,
    process: `Every fence project begins with a condition assessment &mdash; existing coating type, wood species, weathering, and moisture content all affect product selection and prep requirements.

<strong>Preparation:</strong> Power washing removes dirt, mildew, and failing stain. Wood brightener restores the wood\'s natural pH and opens the grain to accept stain. Sanding addresses rough surfaces and gray weathered wood.

<strong>Stain Application:</strong> We use penetrating semi-transparent or semi-solid stains that absorb into the wood rather than forming a film on top. Film-forming stains peel. Penetrating stains do not.

<strong>Product Selection:</strong> Stain type, sheen level, and UV protection are selected based on wood species, sun exposure, and existing finish.`,
    woodTypes: [
      { type: 'Cedar', desc: 'The most common fence material in Northern Colorado HOA communities. Cedar is naturally rot-resistant but dries out fast at altitude. Semi-transparent penetrating stains let the grain show while keeping moisture out. We recommend restaining every 3–4 years on cedar in full-sun exposures.' },
      { type: 'Pine and Spruce', desc: 'Less dense than cedar and more prone to checking and splitting without regular stain maintenance. Pine fences benefit from semi-solid stains that provide heavier UV protection while still penetrating the wood fiber. South and west-facing pine sections need the most attention.' },
      { type: 'Pressure-Treated Lumber', desc: 'Pressure-treated wood must fully dry before staining &mdash; typically 6–12 months after installation for new construction. We test moisture content before any product goes on. Staining too early causes adhesion failure and premature peeling.' },
      { type: 'Weathered and Gray Wood', desc: 'Gray, silvery fence wood is not just a cosmetic problem. UV exposure has broken down the surface fibers and closed the grain. We apply a wood brightener and light sanding before staining to open the grain and restore the wood\'s ability to accept penetrating product.' },
    ],
    whyUs: `Most homeowners try to stain their own fence at least once. They buy a semi-transparent from the hardware store, roll it on, and two years later it looks worse than before &mdash; because the wood was not clean, the grain was not open, or the product was a film-former instead of a penetrating stain.

We eliminate that outcome. We prep the wood correctly, select the right product for the wood species and condition, and apply it in the right weather window. Staining in direct midday sun or when rain is forecast within 48 hours ruins the result. We schedule around both.

Our work comes with a workmanship guarantee. If the stain fails early due to our application, we come back and address it.`,
    timeline: `Fence staining projects in Northern Colorado typically take 1–2 days, depending on fence length and prep condition.

<strong>Prep Phase:</strong> Power washing to remove dirt, mildew, and failing stain. Application of wood brightener on weathered or gray wood. Allow to dry completely &mdash; typically 24–48 hours before stain application.

<strong>Stain Application:</strong> First coat of penetrating stain applied by brush, roller, or airless sprayer depending on fence profile. Second coat applied wet-on-wet on new or bare wood, or after dry time on previously stained surfaces.

<strong>Cure &amp; Ready to Use:</strong> Most penetrating stains are dry to touch within 2–4 hours and fully cured within 24–48 hours. We advise keeping pets and sprinklers off the fence during cure time.

We provide regular updates throughout your project and are available by phone or text at any stage. You will never wonder where things stand.`,
    relatedServices: [
      { label: 'Exterior Painting', slug: 'exterior-painting', desc: '7–10 year paint systems built for Colorado\'s freeze-thaw cycles.' },
      { label: 'HOA Painting', slug: 'hoa-painting', desc: 'Color approval documentation and multi-unit scheduling for HOA communities.' },
      { label: 'Commercial Painting', slug: 'commercial-painting', desc: 'After-hours scheduling, $1M liability, owned crew — not subcontractors.' },
      { label: 'Exterior Staining', slug: 'exterior-staining', desc: 'Deck, log home, and wood siding stain systems for natural wood surfaces.' },
    ],
    faqs: [
      { q: 'How long does fence stain last in Colorado?', a: 'Penetrating semi-transparent stains last 3–5 years on properly prepared wood in Northern Colorado. Solid stains and paints often fail sooner because they form a film that peels under freeze-thaw stress. UV exposure at altitude accelerates degradation, so south and west-facing sections may need restaining sooner.' },
      { q: 'Should I use oil-based or water-based stain on my fence?', a: 'Both work well when properly selected for the wood species and condition. Oil-based stains penetrate deeper on dense woods and aged surfaces. Water-based stains dry faster, have lower VOC content, and are easier to clean up. We recommend specific products after assessing your fence\' wood type, current condition, and sun exposure.' },
      { q: 'Does the fence need to be cleaned before staining?', a: 'Yes. Power washing removes dirt, mildew, and old failing stain. For weathered gray wood, we apply a wood brightener to restore the wood\'s natural color and pH before staining. Skipping cleaning means the stain bonds to surface contamination instead of wood fibers and fails early.' },
      { q: 'What does fence staining cost in Northern Colorado?', a: 'Fence staining typically costs $2–$5 per linear foot depending on fence height, condition, number of sides, and stain type. A 150-foot privacy fence in average condition runs $600–$1,200. Call or text (970) 670-3965 for an accurate estimate.' },
      { q: 'Can I stain a new fence right away?', a: 'Not if it is pressure-treated. PT lumber needs 6–12 months to fully dry before staining. Staining too early traps moisture and causes the stain to fail within a season. For new cedar or pine fences, we test moisture content first and only proceed when the wood is ready.' },
      { q: 'How do I know when my fence needs to be restained?', a: 'The water test: splash water on the fence. If it beads up, the stain is still protecting the wood. If it soaks in within seconds, the stain has worn off and the wood is exposed. Gray, silvery color is another sign &mdash; it means UV has broken down the surface fibers and the wood needs treatment.' },
      { q: 'Do you stain HOA community fences?', a: 'Yes. HOA community fence staining is one of our most common commercial and multi-family projects. We coordinate scheduling and color approval with property managers and provide COI on request.' },
    ],
  },
    'exterior-staining': {
    title: 'Exterior Staining in Northern Colorado',
    metaTitle: 'Exterior Staining Northern Colorado | Keystone Painting',
    metaDesc: "Exterior staining for wood siding, decks & trim in Northern Colorado. Premium penetrating stains, proper prep. Call or text (970) 670-3965",
    tagline: 'Penetrating Stains for Lasting Protection',
    heroTitle: 'Exterior Staining in Northern Colorado &mdash; Wood That Lasts',
    intro: `Log homes, cedar siding, wood decks, and natural wood trim all require staining &mdash; not painting &mdash; to maintain their appearance and structural integrity in Colorado\'s climate. Paint traps moisture in wood and eventually peels. Penetrating stains work with the wood, allowing it to breathe while protecting against UV degradation, moisture intrusion, and freeze-thaw damage.

Keystone Painting specializes in exterior staining for natural wood surfaces across Northern Colorado. We use premium penetrating oil and water-based stains and prepare surfaces properly before any product touches the wood.`,
    process: `Exterior staining projects begin with a full surface assessment &mdash; existing finish type, wood species and condition, moisture content, and exposure level all drive product selection.

<strong>Preparation:</strong> All surfaces are cleaned thoroughly &mdash; power washing, mildew treatment, and wood brightening where needed. Failed existing stain is stripped or sanded. Bare wood is allowed to dry completely before application.

<strong>Stain Application:</strong> We use penetrating stains from Defy, Armstrong Clark, TWP, and Ready Seal &mdash; products specifically formulated for Colorado\'s UV intensity and freeze-thaw cycles. Application method is selected based on surface profile.

<strong>Two-Coat Application:</strong> Most exterior staining projects require two coats &mdash; a wet-on-wet application on new wood or a second coat after proper dry time on previously stained surfaces.`,
    surfaceTypes: [
      { type: 'Log Homes', desc: 'Log homes require the most preparation of any exterior staining project. Existing failed stain must be stripped by hand, sanding, or chemical stripping depending on the coating type. We use oil-based penetrating stains specifically formulated for large-diameter log profiles, applied with brush work to ensure full penetration into the wood.' },
      { type: 'Cedar and Wood Siding', desc: 'Cedar siding is the most common exterior staining surface in Northern Colorado. We select stain opacity &mdash; clear, semi-transparent, or semi-solid &mdash; based on the existing condition of the wood and the homeowner\'s preference for grain visibility. Colorado\'s UV intensity means semi-transparent or semi-solid stains are typically the right choice for long-term protection.' },
      { type: 'Wood Decks', desc: 'Deck surfaces take far more abuse than vertical siding &mdash; foot traffic, UV, standing water, and freeze-thaw cycling all attack horizontal surfaces. We use deck-specific penetrating stains rated for horizontal applications and always include the deck railing and fascia boards in the scope.' },
      { type: 'Pergolas and Arbors', desc: 'Overhead structures are often forgotten until the wood splits and grays beyond recovery. We stain pergolas and arbors on the same prep-and-penetrate system we use for siding, with particular attention to end-grain surfaces where water intrusion starts.' },
      { type: 'Shake Siding', desc: 'Cedar shake and shingle siding requires brush application to get stain into the overlapping joints where moisture collects. We apply by brush on all shake siding &mdash; never sprayed only &mdash; to ensure full coverage behind each course.' },
    ],
    whyUs: `Exterior staining is a specialty, not a side service. The difference between a stain job that lasts 5 years and one that fails in 18 months comes down to three things: surface prep, product selection, and application timing.

We test wood moisture before any product goes on. We select stain formulations based on wood species, existing coating condition, and UV exposure &mdash; not just whatever is on the shelf. And we do not stain in direct midday sun or within 48 hours of rain. Application timing in Colorado\'s climate matters more than most contractors acknowledge.

We use premium eco-friendly, no-VOC products by Sherwin Williams and Benjamin Moore that meet Colorado\'s VOC compliance standards. For homeowners in HOA communities, we coordinate color approval before any stain product is opened.`,
    timeline: `Exterior staining timelines depend on surface area and wood condition, but here is how a standard Northern Colorado project runs.

<strong>Assessment &amp; Prep Phase:</strong> We assess the existing finish, test moisture content, and begin cleaning. Power washing and mildew treatment are completed on day one. Wood brightener is applied where needed and allowed to work overnight.

<strong>Dry &amp; Inspect:</strong> Wood must be fully dry before staining &mdash; we confirm moisture levels are in the acceptable range before proceeding. On log homes with deep checking, we caulk any open splits with stainable caulk.

<strong>Stain Application:</strong> First coat applied by brush, roller, or sprayer depending on surface profile. Log homes and shake siding are always brush-applied for penetration. Flat siding can be sprayed and back-brushed.

<strong>Final Coat &amp; Cure:</strong> Second coat applied after appropriate dry time. Most penetrating stains cure within 24–48 hours for light use and 72 hours for full weather exposure.

We provide regular updates throughout your project and are available by phone or text at any stage. You will never wonder where things stand.`,
    relatedServices: [
      { label: 'Exterior Painting', slug: 'exterior-painting', desc: '7–10 year paint systems built for Colorado\'s freeze-thaw cycles.' },
      { label: 'HOA Painting', slug: 'hoa-painting', desc: 'Color approval documentation and multi-unit scheduling for HOA communities.' },
      { label: 'Commercial Painting', slug: 'commercial-painting', desc: 'After-hours scheduling, $1M liability, owned crew — not subcontractors.' },
      { label: 'Fence Staining', slug: 'fence-staining', desc: 'Penetrating stains for cedar, pine, and pressure-treated fences.' },
    ],
    faqs: [
      { q: 'What types of exterior surfaces can be stained?', a: 'We stain wood siding (cedar, pine, redwood, T1-11), log homes, wood decks, pergolas, fences, wood trim, and shake siding. Each surface type requires specific stain formulation and prep approach. Composite or PVC surfaces are not candidates for staining.' },
      { q: 'How do I know if my wood needs staining or painting?', a: 'Natural wood with visible grain that has previously been stained should be restained. Wood that has been painted should be repainted. Converting from paint to stain requires full paint removal &mdash; a major project. If you are unsure, we assess the existing finish during our on-site evaluation.' },
      { q: 'How often does exterior wood need to be restained in Colorado?', a: 'Northern Colorado\'s UV intensity and freeze-thaw cycles accelerate coating breakdown. Most exterior staining lasts 3–5 years with premium products and proper prep. South and west-facing surfaces may need attention sooner. Annual inspection catches early signs of failure before water intrusion causes wood damage.' },
      { q: 'What does exterior staining cost in Northern Colorado?', a: 'Exterior staining costs vary significantly based on surface area, wood species, condition, and accessibility. Deck staining typically runs $1.50–$3.50 per square foot. Log home exteriors vary by complexity. Call or text (970) 670-3965 for an on-site assessment and accurate quote.' },
      { q: 'Can you stain a log home?', a: 'Yes. Log home staining is one of our more involved projects because it requires full strip prep on failed existing coatings, checking of all log checks and joints, and brush application to ensure stain penetrates around the full log profile. We use oil-based penetrating products specifically formulated for log construction.' },
      { q: 'What is the best stain product for Colorado conditions?', a: 'We use Armstrong Clark, TWP (Total Wood Preservative), Defy Extreme, and Ready Seal depending on the application. All are penetrating formulations rated for Colorado\'s UV intensity and freeze-thaw cycling. We do not use hardware-store deck stains on log homes or shake siding.' },
      { q: 'Do you prep and stain decks?', a: 'Yes. Deck staining includes cleaning, brightening, and sanding the deck surface, then applying a penetrating deck stain rated for horizontal use. We include railings, balusters, and fascia boards in every deck stain project &mdash; not just the deck boards.' },
      { q: 'How long do I need to stay off the deck after staining?', a: 'Most penetrating deck stains are dry to light foot traffic in 4–8 hours and ready for normal use in 24–48 hours. We advise keeping pets and furniture off for 24 hours and avoiding sprinklers or heavy rain for 48 hours after application.' },
    ],
  },


};

const CITY_DATA = {
  'timnath-co': {
    label: 'Timnath',
    state: 'CO',
    context: 'Fast-growing community along the I-25 corridor with high-end new construction and HOA neighborhoods',
    intro: `Timnath is one of the fastest-growing communities in Northern Colorado, with new construction neighborhoods and established HOA communities spreading east of I-25. The homes here are newer and premium &mdash; and the expectation for exterior appearance matches. Colorado\'s 28+ freeze-thaw cycles and intense UV exposure hit every home in Timnath the same way, regardless of age. Paint systems that aren't designed for Zone 5b conditions fail early.\n\nKeystone Painting is based here. We know the neighborhoods, the HOA requirements, and the local conditions better than anyone. Licensed, Insured, and using premium eco-friendly, no-VOC products by Sherwin Williams and Benjamin Moore. $1M general liability coverage.`,
    faqs: [
      { q: 'Do you serve the Timnath area?', a: 'Yes &mdash; we serve Timnath. Our home base is Windsor, CO. We serve all neighborhoods in Timnath including newer HOA communities east of I-25. We\x27re on-site in Timnath regularly and can typically schedule faster here than in other cities.' },
      { q: 'Do you work with HOAs in Timnath?', a: 'Yes. Many Timnath neighborhoods have HOA color approval requirements. We handle the approval documentation, provide color samples, and submit to the architectural review committee on your behalf. Most HOA approvals in this area take 2–4 weeks, which we build into every project timeline.' },
      { q: 'How long does exterior paint last on new construction in Timnath?', a: 'Builder-grade paint applied on new construction homes typically lasts 4–6 years before visible chalking, fading, and edge failures appear. We install premium Sherwin-Williams and Benjamin Moore systems rated for 7–10 years using proper prep and two-coat minimum application.' },
      { q: 'Can you match existing HOA-approved colors?', a: 'Yes. We use spectrophotometer color matching and work directly with Sherwin-Williams and Benjamin Moore reps to replicate existing approved colors precisely. Accurate color matching is essential for HOA compliance and multi-unit consistency.' },
      { q: 'How far in advance should I book exterior painting in Timnath?', a: 'Spring and early summer slots fill 4–8 weeks out in Timnath. We recommend contacting us in March or April for May–June scheduling. We do accept late-season projects through October when weather permits.' },
    ],
  },
  'windsor-co': {
    label: 'Windsor',
    state: 'CO',
    context: 'Established and growing community with lakefront properties, HOA neighborhoods, and premium residential builds',
    intro: `Windsor combines established neighborhoods near Lake Windsor with newer HOA communities growing along the US-34 and I-25 corridors. The range of home styles &mdash; from lakefront properties to newer planned communities &mdash; means painting needs vary widely. What doesn\'t vary is Colorado\'s climate: 28+ freeze-thaw cycles per year, intense UV at altitude, and temperature swings that push coating systems to their limits.\n\nKeystone Painting serves all of Windsor with the same licensed, insured crew � using premium eco-friendly, no-VOC products by Sherwin Williams and Benjamin Moore � that we bring to every project. No subcontractors. No volume rushing. Premium Sherwin-Williams and Benjamin Moore coatings with $1M general liability coverage.`,
    faqs: [
      { q: 'Do you serve Windsor, CO?', a: 'Yes. Keystone Painting serves all of Windsor including neighborhoods near Lake Windsor, Eastman Park, and newer communities along Harmony Road and the I-25 corridor. We\'re in Windsor regularly and can provide on-site quotes quickly.' },
      { q: 'Do you handle HOA color approvals in Windsor?', a: 'Yes. Windsor has a number of HOA communities with strict color approval requirements. We handle the full documentation process &mdash; color samples, approval submissions, and compliance letters &mdash; on your behalf.' },
      { q: 'What exterior paint should I use on my Windsor home?', a: 'We specify Sherwin-Williams Duration, Emerald, or Benjamin Moore Aura for Windsor exteriors. These are 100% acrylic latex coatings formulated for Colorado\'s UV intensity and freeze-thaw cycling. Builder-grade or budget paints fail 2–3 years faster in this climate.' },
      { q: 'How long does exterior painting take in Windsor?', a: 'Most residential exterior painting projects in Windsor take 3–5 days from first day of prep to final coat. Larger homes, significant repair work, or HOA multi-unit projects run longer. We provide specific timelines during the quoting process.' },
      { q: 'Do you offer fence staining in Windsor?', a: 'Yes. Fence staining is one of our most common services in Windsor. We use penetrating oil and water-based stains that protect wood from Windsor\'s UV exposure and moisture cycles. Most fences need restaining every 3–5 years.' },
    ],
  },
  'severance-co': {
    label: 'Severance',
    state: 'CO',
    context: 'Small but rapidly growing town north of Windsor with new residential development and rural properties',
    intro: `Severance has grown rapidly over the past decade, with new residential subdivisions filling in around its rural roots north of Windsor. Whether you have a newer build in a planned community or an older home on a larger lot, Northern Colorado\'s climate treats every home the same &mdash; freeze-thaw cycles, high-altitude UV, and wind-driven moisture test exterior paint systems every single year.\n\nKeystone Painting serves Severance with full exterior and interior painting, fence staining, and commercial work. Licensed, Insured, and using premium eco-friendly, no-VOC products by Sherwin Williams and Benjamin Moore. $1M general liability. We bring the same standards to every project regardless of size.`,
    faqs: [
      { q: 'Does Keystone Painting serve Severance, CO?', a: 'Yes. We serve Severance and the surrounding Weld County communities. Severance is within our standard service area and we\'re able to schedule projects there without travel surcharges.' },
      { q: 'How does Colorado\'s climate affect exterior paint in Severance?', a: 'Northern Colorado sees 28+ freeze-thaw cycles annually. UV radiation at altitude is 10–15% more intense than at sea level. These factors degrade budget exterior coatings in 3–4 years. We use premium paint systems rated for 7–10 years and apply proper prep including pressure washing, scraping, caulking, and spot priming before any topcoat.' },
      { q: 'Do you do fence staining in Severance?', a: 'Yes. Fence staining is common in Severance where newer homes have cedar and pine fencing. We use penetrating semi-transparent stains that protect the wood grain through Northern Colorado winters and summers, lasting 3–5 years with proper prep.' },
      { q: 'Can you paint the exterior of an older farmhouse or rural property in Severance?', a: 'Yes. Older homes and rural properties often have more prep work involved &mdash; failed paint, wood rot, compromised caulk, and weathered surfaces. We assess all of this upfront and factor it into the quote. We don\'t charge extra for thorough prep; we treat it as part of every project.' },
      { q: 'How do I get a quote for exterior painting in Severance?', a: 'Call or text (970) 670-3965 or use the contact form on this page. We schedule on-site assessments in Severance and provide written quotes within 24 hours of the visit. We respond to all inquiries within a few minutes during business hours.' },
    ],
  },
  'fort-collins-co': {
    label: 'Fort Collins',
    state: 'CO',
    context: 'Larimer County seat with a diverse housing stock ranging from historic Craftsman homes to newer neighborhoods',
    intro: `Fort Collins is the largest city in Northern Colorado and has one of the most diverse housing stocks in the region &mdash; historic Craftsman and Victorian homes in Old Town, mid-century builds in established neighborhoods, and newer subdivisions spreading south and east. Each era of construction comes with its own set of coating challenges. Historic homes require careful prep, lead paint awareness, and specialty primers. Newer builds need proper topcoat systems, not just builder repaints.\n\nKeystone Painting serves Fort Collins with the same standards we apply everywhere &mdash; Licensed, Insured, and using premium eco-friendly, no-VOC products by Sherwin Williams and Benjamin Moore. $1M general liability. No subcontractors.`,
    faqs: [
      { q: 'Does Keystone Painting serve Fort Collins?', a: 'Yes. We serve all areas of Fort Collins including Old Town, Midtown, and newer developments in southeast Fort Collins. Fort Collins is within our standard service area with no travel surcharges.' },
      { q: 'Can you paint historic homes in Old Town Fort Collins?', a: 'Yes. Older homes in Old Town require special attention &mdash; lead paint testing and containment on pre-1978 homes, oil-based primers for chalky or bare wood surfaces, and careful prep to avoid damaging historic trim detail. We\'re experienced with the specific challenges of older Fort Collins housing stock.' },
      { q: 'How long does exterior paint last on Fort Collins homes?', a: 'Most Fort Collins homes see the same Northern Colorado climate as the rest of the region &mdash; 28+ freeze-thaw cycles, intense UV, and temperature swings. Budget paint fails in 3–4 years. Premium systems using Sherwin-Williams Duration or Benjamin Moore Aura last 7–10 years with proper prep.' },
      { q: 'Do you offer commercial painting in Fort Collins?', a: 'Yes. We provide commercial exterior and interior painting for Fort Collins businesses, including strip malls, office buildings, and multi-family properties. We schedule around business hours and provide COI within 24 hours.' },
      { q: 'What Fort Collins neighborhoods do you serve?', a: 'We serve all of Fort Collins &mdash; Old Town, Midtown, Fossil Creek, Harmony, Rigden Farm, Sidehill, and new developments in southeast and southwest Fort Collins. Call or text (970) 670-3965 for availability in your specific neighborhood.' },
    ],
  },
  'loveland-co': {
    label: 'Loveland',
    state: 'CO',
    context: 'Mid-sized Larimer County city with established neighborhoods, growing south end, and scenic Front Range setting',
    intro: `Loveland sits along the Front Range at the foot of the Big Thompson Canyon &mdash; scenic, but that also means direct UV exposure, wind, and temperature swings that challenge exterior paint systems year-round. The city has a mix of established mid-century neighborhoods near downtown and newer developments spreading south and east toward Johnstown. Both require proper exterior coating systems to survive Northern Colorado\'s climate.\n\nKeystone Painting serves Loveland with the same crew using premium eco-friendly, no-VOC products by Sherwin Williams and Benjamin Moore, thorough prep that protects every project for 7–10 years. Licensed, Insured, $1M general liability.`,
    faqs: [
      { q: 'Does Keystone Painting serve Loveland, CO?', a: 'Yes. Loveland is within our standard service area. We serve all areas of Loveland including established neighborhoods near downtown, the south end near the Centerra area, and outlying properties.' },
      { q: 'How does the Front Range climate affect exterior paint in Loveland?', a: 'Loveland\'s location at the base of the Big Thompson Canyon means increased wind exposure on top of Northern Colorado\'s standard UV and freeze-thaw cycles. Paint systems need to be flexible enough to handle thermal cycling and tough enough to resist UV degradation. We specify coatings rated for exactly these conditions.' },
      { q: 'Do you stain fences and decks in Loveland?', a: 'Yes. Fence and deck staining is common in Loveland. We use penetrating semi-transparent stains that protect wood from UV damage and moisture, typically lasting 3–5 years. Decks on the south or west side of homes in Loveland may need attention sooner due to sun exposure.' },
      { q: 'Can you paint older Loveland homes?', a: 'Yes. We handle older homes with the appropriate prep &mdash; scraping to stable substrate, oil-based or shellac primers on bare wood, elastomeric caulking on all gaps, and pressure washing before any coating goes on. Thorough prep is the difference between a 4-year job and a 10-year system.' },
      { q: 'How do I get a painting quote in Loveland?', a: 'Call or text (970) 670-3965 or fill out the quote form on this page. We schedule on-site assessments in Loveland and provide written quotes within 24 hours. We respond to all quote requests within minutes during business hours.' },
    ],
  },
  'greeley-co': {
    label: 'Greeley',
    state: 'CO',
    context: 'Weld County seat and agricultural hub with a large and diverse housing stock',
    intro: `Greeley is the Weld County seat and one of the larger cities in Northern Colorado, with a housing stock that ranges from older neighborhoods near downtown to newer developments spreading west and south. The agricultural and industrial roots of the city mean many properties have seen harder use than typical residential homes &mdash; and Colorado\'s climate doesn\'t take it easy on any of them. UV radiation, freeze-thaw cycles, and wind-driven dust and moisture accelerate coating breakdown across the region.\n\nKeystone Painting serves Greeley with the same standards: Licensed, Insured, and using premium eco-friendly, no-VOC products by Sherwin Williams and Benjamin Moore. $1M general liability.`,
    faqs: [
      { q: 'Does Keystone Painting serve Greeley, CO?', a: 'Yes. We serve Greeley and the surrounding Weld County area. Greeley is within our standard service area.' },
      { q: 'Do you paint commercial properties in Greeley?', a: 'Yes. We provide commercial exterior and interior painting in Greeley for office buildings, retail properties, and multi-family housing. We schedule around business operations and carry $1M general liability with COI available on request.' },
      { q: 'How do you prep older Greeley homes for exterior painting?', a: 'Older homes in Greeley often have multiple layers of failed paint, weathered wood, and outdated caulking. We scrape all loose and peeling material to stable substrate, repair damaged wood, apply appropriate primers, and re-caulk all joints before any topcoat goes on. There are no shortcuts in prep.' },
      { q: 'What exterior paint works best in Greeley\'s climate?', a: 'We specify Sherwin-Williams Duration, Emerald, or Benjamin Moore Aura for Greeley exteriors. These 100% acrylic coatings are formulated for high UV exposure and thermal cycling. They outperform budget paints by 3–5 years in Northern Colorado conditions.' },
      { q: 'Do you offer fence and deck staining in Greeley?', a: 'Yes. Fence and deck staining is available in Greeley. We use penetrating oil and water-based stains that protect wood from Greeley\'s UV exposure and moisture cycles, typically lasting 3–5 years per application.' },
    ],
  },
  'wellington-co': {
    label: 'Wellington',
    state: 'CO',
    context: 'Small town north of Fort Collins with rural properties and newer residential subdivisions',
    intro: `Wellington sits at the northern end of the I-25 corridor, a small town that has grown considerably with families looking for more space north of Fort Collins. The mix here includes acreage properties, older ranch-style homes, and newer subdivision builds. All of them share the same Northern Colorado climate conditions &mdash; and the same need for coating systems that actually hold up to freeze-thaw cycles, wind, and intense UV radiation at altitude.\n\nKeystone Painting serves Wellington with no travel surcharge and the same full-service approach: Licensed, Insured, and using premium eco-friendly, no-VOC products by Sherwin Williams and Benjamin Moore. $1M general liability. We bring the prep and the product to make it last.`,
    faqs: [
      { q: 'Does Keystone Painting serve Wellington, CO?', a: 'Yes. Wellington is within our standard service area. We serve residential and commercial properties in Wellington with no travel surcharge.' },
      { q: 'Can you paint acreage properties and outbuildings in Wellington?', a: 'Yes. Rural properties, detached garages, barns, and outbuildings are within our scope. We assess each structure and apply appropriate coatings &mdash; exterior latex for residential structures, and elastomeric or industrial coatings for metal buildings and agricultural structures where appropriate.' },
      { q: 'How does wind affect exterior paint in Wellington?', a: 'Wellington is exposed to consistent Front Range winds that accelerate paint breakdown, especially on north and west-facing surfaces. Wind-driven moisture and debris abrade coating surfaces over time. This makes proper prep &mdash; scraping, priming, and caulking &mdash; even more important than it is in more sheltered locations.' },
      { q: 'Do you stain fences and decks in Wellington?', a: 'Yes. Fence and deck staining is common in Wellington where wood fencing is standard on acreage and suburban properties alike. We use penetrating stains that hold up to Northern Colorado\'s weather cycles, lasting 3–5 years per application.' },
      { q: 'How do I book exterior painting in Wellington?', a: 'Call or text (970) 670-3965 or submit the quote form on this page. We schedule on-site assessments in Wellington and provide written quotes within 24 hours of the visit.' },
    ],
  },
  'johnstown-co': {
    label: 'Johnstown',
    state: 'CO',
    context: 'Fast-growing I-25 corridor community with newer residential developments and commercial growth',
    intro: `Johnstown has grown significantly along the I-25 corridor between Loveland and Greeley, with newer residential neighborhoods and commercial development continuing to expand. Most homes here are newer builds &mdash; but newer doesn\'t mean immune to Colorado\'s climate. Freeze-thaw cycles, intense UV, and temperature swings that can exceed 60°F in a single day stress even recently applied builder-grade paint systems.\n\nKeystone Painting serves Johnstown with the same approach: thorough prep, premium Sherwin-Williams and Benjamin Moore coatings rated for 7–10 years, and a crew using premium eco-friendly, no-VOC products by Sherwin Williams and Benjamin Moore. Licensed, Insured, $1M general liability.`,
    faqs: [
      { q: 'Does Keystone Painting serve Johnstown, CO?', a: 'Yes. Johnstown is within our standard service area. We serve residential and commercial properties throughout Johnstown.' },
      { q: 'How long does builder paint last on newer Johnstown homes?', a: 'Builder-grade paint applied during construction typically shows chalking, fading, and edge failures within 4–6 years in Northern Colorado. We replace it with premium two-coat systems using Sherwin-Williams Duration or Benjamin Moore Aura &mdash; rated for 7–10 years with proper surface prep.' },
      { q: 'Do you do HOA exterior painting in Johnstown?', a: 'Yes. Several Johnstown communities have HOA requirements for exterior painting. We handle color approval documentation, provide compliant color samples, and submit to architectural review committees. We\'ve worked with HOAs throughout Northern Colorado and understand the approval process.' },
      { q: 'What commercial painting services do you offer in Johnstown?', a: 'We provide commercial exterior and interior painting for Johnstown businesses &mdash; retail, office, and multi-family properties. We schedule around business operations and carry $1M general liability insurance with COI available on request.' },
      { q: 'How do I get a painting quote in Johnstown?', a: 'Call or text (970) 670-3965 or fill out the quote form on this page. We provide on-site assessments in Johnstown and written quotes within 24 hours. We respond to all inquiries within minutes during business hours.' },
    ],
  },
};

module.exports = { CLIENT, SERVICES, CITIES, SERVICE_DATA, CITY_DATA };
