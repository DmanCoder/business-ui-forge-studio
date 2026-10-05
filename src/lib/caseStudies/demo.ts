// -------------- CASE STUDIES — DEMO CONTENT SOURCE --------------
// Clearly fictional demonstration content, used ONLY while demo mode is on
// (SHOW_DEMO_CONTENT=true — see src/config/flags.ts). Purpose: populate and
// test every case-study and testimonial layout before real client work is
// approved for publication.
//
// Hard rules for every entry in this file:
//   - `isDemo: true` with a visible `demoLabel` — badges render everywhere.
//   - `status: 'concept'` and `noIndex: true` — never indexed, never in the
//     sitemap, never emitted as CreativeWork JSON-LD.
//   - Fictional brands only. No real companies, people, logos or screenshots.
//   - No invented metrics, results, awards or star ratings. Outcomes are
//     framed as what the concept demonstrates, never as measured business
//     results.
//   - Sample testimonials keep `verified: false` and are never attributed to
//     realistic personal names.
// These entries stay local — they must never be created in Contentful.

import type { CaseStudySource, Testimonial } from './types';

const NORTHLINE_PHYSIO: CaseStudySource = {
  slug: 'northline-physio-demo',
  title: 'Northline Physio',
  seoTitle: 'Northline Physio — Demo Case Study | UI Forge Studio',
  metaDescription:
    'Demonstration content: a concept redesign for a fictional physiotherapy clinic, created to preview the UI Forge Studio case-study format. Not a real client engagement.',
  summary:
    'A concept redesign for a local physiotherapy clinic focused on clearer service discovery, stronger practitioner trust and a simpler path to booking.',
  status: 'concept',
  statusNote: 'Fictional demo brand',
  clientName: 'Northline Physio — Fictional demo brand',
  projectType: 'Healthcare website redesign',
  industry: 'Physiotherapy and allied health',
  year: 'Demo',
  services: [
    'UX strategy',
    'Website design',
    'Next.js development',
    'Content structure',
    'Local SEO foundations',
  ],
  platforms: ['Next.js', 'Contentful'],
  technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
  heroMedia: {
    src: '/static/work/demo/northline-physio-cover.svg',
    alt: 'Original demonstration cover for the fictional Northline Physio concept: an abstract clinic-website layout with a service list, practitioner panels and a booking action, clearly labelled as a demo.',
    caption:
      'Original demonstration artwork — an abstract layout study for the fictional clinic, not a screenshot of client work.',
    width: 1600,
    height: 1000,
  },
  gallery: [
    {
      src: '/static/work/demo/northline-physio-demo-desktop-1.svg',
      alt: 'Original demonstration homepage for the fictional Northline Physio clinic: a service headline, an image panel and three service cards. Fictional demo concept, not client work.',
      caption: 'Demo homepage concept — original artwork for the fictional clinic.',
      width: 1600,
      height: 1000,
    },
    {
      src: '/static/work/demo/northline-physio-demo-desktop-2.svg',
      alt: 'Original demonstration booking page for the fictional Northline Physio clinic: an appointment stepper, a details form and a visit-summary panel. Fictional demo concept, not client work.',
      caption: 'Demo booking flow — original artwork for the fictional clinic.',
      width: 1600,
      height: 1000,
    },
    {
      src: '/static/work/demo/northline-physio-demo-mobile.svg',
      alt: 'Original demonstration responsive views for the fictional Northline Physio clinic: three phone screens for home, services and booking. Fictional demo concept, not client work.',
      caption: 'Demo responsive views — original artwork for the fictional clinic.',
      width: 1500,
      height: 1000,
    },
    {
      src: '/static/work/demo/northline-physio-demo-detail.svg',
      alt: 'Original demonstration design-system specimen for the fictional Northline Physio clinic: colour swatches, a type scale and component chips in the clinic accent. Fictional demo concept, not client work.',
      caption: 'Demo design-system specimen — original artwork for the fictional clinic.',
      width: 1400,
      height: 1050,
    },
  ],
  featured: true,
  featuredOrder: 2,
  workPageOrder: 2,
  overview: [
    {
      t: 'p',
      x: 'Northline Physio is a fictional suburban physiotherapy clinic invented for this demonstration: a small team of practitioners covering sports rehabilitation, chronic pain and post-surgical recovery, with most new patients arriving through local search and word of mouth.',
    },
    {
      t: 'p',
      x: 'The concept explores how UI Forge Studio would approach a clinic of this shape — reorganising services around patient needs, building practitioner credibility and making booking the obvious next step on every page.',
    },
  ],
  challenge: [
    {
      t: 'p',
      x: 'The fictional clinic’s website had unclear navigation, dense service pages and weak mobile booking pathways. New visitors could not quickly understand which practitioner or service matched their needs, and the booking action disappeared below long blocks of clinical copy.',
    },
    {
      t: 'p',
      x: 'Because most visits happened on a phone between appointments, the mobile experience mattered most — and it was the weakest part of the imagined starting point.',
    },
  ],
  goals: [
    'Make services easier to compare, grouped around what the patient needs rather than clinical terminology.',
    'Build practitioner credibility with clear profiles, qualifications and areas of focus.',
    'Improve mobile booking visibility so the next step is always one tap away.',
    'Create a flexible content structure the clinic could maintain without a developer.',
    'Strengthen local-search foundations with structured service and business metadata.',
  ],
  approach: [
    {
      label: 'Information architecture',
      body: 'Simplified the imagined site map from a dozen overlapping clinical pages to a small set of need-based entry points, so a first-time visitor can find “their” problem in one step.',
    },
    {
      label: 'Service grouping',
      body: 'Grouped services around user needs — recover from an injury, manage ongoing pain, prepare for or recover from surgery — with plain-language summaries before any clinical detail.',
    },
    {
      label: 'Practitioner trust',
      body: 'Created practitioner-led trust sections: profile, qualifications and treatment focus presented consistently, so choosing a practitioner feels informed rather than random.',
    },
    {
      label: 'Booking pathways',
      body: 'Added clear booking actions to every service and practitioner view, kept persistent and reachable on mobile without covering content.',
    },
    {
      label: 'Content templates',
      body: 'Designed reusable service and article templates so new treatments and advice content slot into the same structure without redesign.',
    },
    {
      label: 'Local SEO planning',
      body: 'Planned structured local-business and service metadata so each service area could earn its own search presence honestly.',
    },
  ],
  outcomes: [
    'The final concept demonstrates how a clearer service structure, stronger practitioner presentation and more direct booking pathways could improve the clinic’s digital experience.',
    'Because Northline Physio is a fictional brand, no business results are claimed — the value of the concept is the format and the reasoning it makes visible.',
  ],
  testimonialId: 'demo-sample-1',
  relatedSlugs: ['meridian-motors-demo', 'ui-forge-studio-website'],
  isDemo: true,
  demoLabel: 'Demo case study',
  published: true,
  noIndex: true,
  publishedAt: '2026-07-15',
};

const MERIDIAN_MOTORS: CaseStudySource = {
  slug: 'meridian-motors-demo',
  title: 'Meridian Motors',
  seoTitle: 'Meridian Motors — Demo Case Study | UI Forge Studio',
  metaDescription:
    'Demonstration content: a concept website for a fictional independent automotive workshop, created to preview the UI Forge Studio case-study format. Not a real client engagement.',
  summary:
    'A concept website for an independent automotive workshop designed to make services, trust signals and quote requests easier to navigate.',
  status: 'concept',
  statusNote: 'Fictional demo brand',
  clientName: 'Meridian Motors — Fictional demo brand',
  projectType: 'Automotive service website',
  industry: 'Automotive servicing',
  year: 'Demo',
  services: [
    'Discovery',
    'UX design',
    'Responsive web design',
    'WordPress planning',
    'Conversion-focused forms',
  ],
  platforms: ['WordPress'],
  technologies: ['WordPress', 'PHP', 'JavaScript'],
  heroMedia: {
    src: '/static/work/demo/meridian-motors-cover.svg',
    alt: 'Original demonstration cover for the fictional Meridian Motors concept: an abstract workshop-website layout with a service hierarchy, credentials panel and quote-request form, clearly labelled as a demo.',
    caption:
      'Original demonstration artwork — an abstract layout study for the fictional workshop, not a screenshot of client work.',
    width: 1600,
    height: 1000,
  },
  gallery: [
    {
      src: '/static/work/demo/meridian-motors-demo-desktop-1.svg',
      alt: 'Original demonstration homepage for the fictional Meridian Motors garage: a servicing headline, an image panel and three service cards. Fictional demo concept, not client work.',
      caption: 'Demo homepage concept — original artwork for the fictional garage.',
      width: 1600,
      height: 1000,
    },
    {
      src: '/static/work/demo/meridian-motors-demo-desktop-2.svg',
      alt: 'Original demonstration service-booking page for the fictional Meridian Motors garage: a booking stepper, a details form and a booking-summary panel. Fictional demo concept, not client work.',
      caption: 'Demo service-booking flow — original artwork for the fictional garage.',
      width: 1600,
      height: 1000,
    },
    {
      src: '/static/work/demo/meridian-motors-demo-mobile.svg',
      alt: 'Original demonstration responsive views for the fictional Meridian Motors garage: three phone screens for home, services and booking. Fictional demo concept, not client work.',
      caption: 'Demo responsive views — original artwork for the fictional garage.',
      width: 1500,
      height: 1000,
    },
    {
      src: '/static/work/demo/meridian-motors-demo-detail.svg',
      alt: 'Original demonstration design-system specimen for the fictional Meridian Motors garage: colour swatches, a type scale and component chips in the garage accent. Fictional demo concept, not client work.',
      caption: 'Demo design-system specimen — original artwork for the fictional garage.',
      width: 1400,
      height: 1050,
    },
  ],
  featured: true,
  featuredOrder: 3,
  workPageOrder: 3,
  overview: [
    {
      t: 'p',
      x: 'Meridian Motors is a fictional independent automotive workshop invented for this demonstration: a family-run business handling logbook servicing, diagnostics and repairs, competing with dealer service centres on trust and price.',
    },
    {
      t: 'p',
      x: 'The concept explores a service-business pattern UI Forge Studio sees often — a workshop whose reputation is strong in person but invisible online, and whose enquiries arrive with too little information to quote accurately.',
    },
  ],
  challenge: [
    {
      t: 'p',
      x: 'The fictional workshop relied heavily on phone enquiries, while its digital experience made it difficult to understand available services, workshop credentials and the information needed for a quote.',
    },
    {
      t: 'p',
      x: 'Every quote request started a back-and-forth about vehicle details the website could have collected up front, and nothing on the imagined site explained why this workshop over the dealer down the road.',
    },
  ],
  goals: [
    'Make core services immediately clear from the first screen.',
    'Present trust and workshop credentials without inflated claims.',
    'Improve quote-request quality by asking for the right details up front.',
    'Support future service-area landing pages without restructuring.',
    'Make content easy for the owner to maintain after handover.',
  ],
  approach: [
    {
      label: 'Service-first hierarchy',
      body: 'Created a homepage hierarchy that leads with the services drivers actually search for, each with a plain description and an honest indication of what affects price.',
    },
    {
      label: 'Vehicle and service content',
      body: 'Added concise vehicle and service information structured for scanning — what is included, how long it takes, when it is needed.',
    },
    {
      label: 'Qualified quote form',
      body: 'Structured the quote form around useful workshop details — vehicle, service history, symptoms — so the first reply can be a quote, not a question.',
    },
    {
      label: 'Reusable templates',
      body: 'Planned reusable service and location templates so the workshop could add service-area pages as the business grows.',
    },
    {
      label: 'Ownership and handover',
      body: 'Designed a straightforward ownership and handover model on familiar WordPress patterns, so the business is not dependent on a developer for routine updates.',
    },
  ],
  outcomes: [
    'The concept shows how a clearer service hierarchy and better-qualified enquiry flow could reduce uncertainty before a customer contacts the workshop.',
    'Because Meridian Motors is a fictional brand, no enquiry or revenue results are claimed — and no real manufacturer names or logos appear anywhere in the concept.',
  ],
  testimonialId: 'demo-sample-2',
  relatedSlugs: ['apex-sprint-lab-demo', 'northline-physio-demo'],
  isDemo: true,
  demoLabel: 'Demo case study',
  published: true,
  noIndex: true,
  publishedAt: '2026-07-15',
};

const APEX_SPRINT_LAB: CaseStudySource = {
  slug: 'apex-sprint-lab-demo',
  title: 'Apex Sprint Lab',
  seoTitle: 'Apex Sprint Lab — Demo Case Study | UI Forge Studio',
  metaDescription:
    'Demonstration content: a concept sports-performance web application for a fictional product, created to preview the UI Forge Studio case-study format. Not a real client engagement.',
  summary:
    'A concept product experience for sprint coaches and athletes to plan sessions, log sprint data and review training progress.',
  status: 'concept',
  statusNote: 'Fictional demo product',
  clientName: 'Apex Sprint Lab — Fictional demo product',
  projectType: 'Sports performance web application',
  industry: 'Athlete performance technology',
  year: 'Demo',
  services: [
    'Product strategy',
    'UX architecture',
    'Interface design',
    'Next.js application development',
    'Design system',
  ],
  platforms: ['Responsive web application'],
  technologies: ['Next.js', 'TypeScript', 'Supabase'],
  heroMedia: {
    src: '/static/work/demo/apex-sprint-lab-cover.svg',
    alt: 'Original demonstration cover for the fictional Apex Sprint Lab concept: an abstract training-application layout with a session plan, sprint timing rows and a progress panel, clearly labelled as a demo.',
    caption:
      'Original demonstration artwork — an abstract product-interface study for the fictional application, not a screenshot of client work.',
    width: 1600,
    height: 1000,
  },
  gallery: [
    {
      src: '/static/work/demo/apex-sprint-lab-demo-desktop-1.svg',
      alt: 'Original demonstration interface for the fictional Apex Sprint Lab app: a dark application shell with a sidebar, a plan-to-review workflow and placeholder session rows — a concept UI with no real performance data. Fictional demo concept, not client work.',
      caption: 'Demo application shell — a concept UI with no real data, for the fictional app.',
      width: 1600,
      height: 1000,
    },
    {
      src: '/static/work/demo/apex-sprint-lab-demo-desktop-2.svg',
      alt: 'Original demonstration marketing homepage for the fictional Apex Sprint Lab app: a dark hero headline, an image panel and three feature cards. Fictional demo concept, not client work.',
      caption: 'Demo marketing homepage — original artwork for the fictional app.',
      width: 1600,
      height: 1000,
    },
    {
      src: '/static/work/demo/apex-sprint-lab-demo-mobile.svg',
      alt: 'Original demonstration responsive views for the fictional Apex Sprint Lab app: three dark phone screens for home, plan and session. Fictional demo concept, not client work.',
      caption: 'Demo responsive views — original artwork for the fictional app.',
      width: 1500,
      height: 1000,
    },
    {
      src: '/static/work/demo/apex-sprint-lab-demo-detail.svg',
      alt: 'Original demonstration design-system specimen for the fictional Apex Sprint Lab app: colour swatches, a type scale and component chips on a dark theme. Fictional demo concept, not client work.',
      caption: 'Demo design-system specimen — original artwork for the fictional app.',
      width: 1400,
      height: 1050,
    },
  ],
  featured: true,
  featuredOrder: 4,
  workPageOrder: 4,
  overview: [
    {
      t: 'p',
      x: 'Apex Sprint Lab is a fictional product invented for this demonstration: a focused web application for sprint coaches and their athletes to plan sessions, capture times and distances at the track, and review progress over a season.',
    },
    {
      t: 'p',
      x: 'The concept explores how UI Forge Studio approaches product work — defining workflows before screens, and designing a system that stays fast and legible on a phone in direct sunlight between reps.',
    },
  ],
  challenge: [
    {
      t: 'p',
      x: 'Sprint training data is often split between spreadsheets, notes and general-purpose fitness applications that do not reflect sprint-specific workflows — flying starts, split distances, rest ratios and session intent all get flattened into generic “workouts”.',
    },
    {
      t: 'p',
      x: 'Coaches lose time re-entering data, and athletes rarely see their progression in a form that means anything at the track.',
    },
  ],
  goals: [
    'Make session planning easier and repeatable for coaches.',
    'Support sprint-specific distances, timing methods and rest structures.',
    'Keep athlete progress understandable without a spreadsheet.',
    'Create a scalable coach-and-athlete structure for squads of any size.',
    'Design for fast mobile use at the track, one-handed.',
  ],
  approach: [
    {
      label: 'Workflow definition',
      body: 'Defined athlete and coach workflows first — plan, run, record, review — so every screen serves a moment that actually happens at training.',
    },
    {
      label: 'Session structure',
      body: 'Structured sessions around sprint-training categories — acceleration, max velocity, speed endurance — instead of generic exercise lists.',
    },
    {
      label: 'Timing components',
      body: 'Created reusable timing and result components that handle distances, splits and wind notes consistently across the concept.',
    },
    {
      label: 'Mobile-first logging',
      body: 'Designed a mobile-first session logging experience with large touch targets and instant state changes — usable trackside without ceremony.',
    },
    {
      label: 'Progressive analytics',
      body: 'Planned progressive analytics and programme management so insight deepens over a season without burying the day-to-day workflow.',
    },
  ],
  outcomes: [
    'The concept demonstrates how a focused product architecture could make sprint-session planning and athlete data easier to use at the track.',
    'Because Apex Sprint Lab is a fictional product, no usage or performance results are claimed — the concept exists to preview how UI Forge Studio documents product work.',
  ],
  testimonialId: 'demo-sample-3',
  relatedSlugs: ['ui-forge-studio-website', 'northline-physio-demo'],
  isDemo: true,
  demoLabel: 'Demo case study',
  published: true,
  noIndex: true,
  publishedAt: '2026-07-15',
};

export const DEMO_CASE_STUDIES: CaseStudySource[] = [
  NORTHLINE_PHYSIO,
  MERIDIAN_MOTORS,
  APEX_SPRINT_LAB,
];

/**
 * Sample testimonials — placeholder voices used to preview the testimonial
 * layouts. Never attributed to realistic personal names, never verified,
 * always labelled. Replaced by real client-approved quotes as they arrive.
 */
export const DEMO_TESTIMONIALS: Testimonial[] = [
  {
    id: 'demo-sample-1',
    quote:
      'The process felt organised from the beginning. Each decision was explained clearly, and the final direction made the website much easier to understand.',
    authorName: 'Sample client',
    authorRole: 'Business owner',
    companyName: 'Fictional healthcare project',
    caseStudySlug: 'northline-physio-demo',
    verified: false,
    featuredOnHome: true,
    featuredOrder: 1,
    displayOnTestimonialsPage: true,
    isDemo: true,
    demoLabel: 'Sample testimonial',
  },
  {
    id: 'demo-sample-2',
    quote:
      'UI Forge Studio brought structure to a project that previously felt scattered. The service pages, enquiry flow and mobile layout now feel like one consistent system.',
    authorName: 'Sample client',
    authorRole: 'Workshop manager',
    companyName: 'Fictional automotive project',
    caseStudySlug: 'meridian-motors-demo',
    verified: false,
    featuredOnHome: true,
    featuredOrder: 2,
    displayOnTestimonialsPage: true,
    isDemo: true,
    demoLabel: 'Sample testimonial',
  },
  {
    id: 'demo-sample-3',
    quote:
      'The strongest part of the engagement was the combination of design thinking and technical implementation. The product decisions were practical, not just visual.',
    authorName: 'Sample client',
    authorRole: 'Product founder',
    companyName: 'Fictional sports technology project',
    caseStudySlug: 'apex-sprint-lab-demo',
    verified: false,
    featuredOnHome: true,
    featuredOrder: 3,
    displayOnTestimonialsPage: true,
    isDemo: true,
    demoLabel: 'Sample testimonial',
  },
  {
    id: 'demo-sample-4',
    quote:
      'Communication was direct, the handover was clear, and the system was designed so it could be maintained after launch rather than becoming dependent on the developer.',
    authorName: 'Sample client',
    authorRole: 'Project stakeholder',
    companyName: 'Demonstration content',
    verified: false,
    featuredOnHome: false,
    featuredOrder: 4,
    displayOnTestimonialsPage: true,
    isDemo: true,
    demoLabel: 'Sample testimonial',
  },
];
