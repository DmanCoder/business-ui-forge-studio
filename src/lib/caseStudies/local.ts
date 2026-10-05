// -------------- CASE STUDIES — LOCAL CONTENT SOURCE --------------
// Real projects only. Every fact below must be verifiable — from this
// repository, its docs, or client-approved material. No invented clients,
// quotes, metrics, or outcomes. Classification rules:
//   completed | in-progress — client work, only with the client's approval
//   internal               — the studio's own products, labelled as such
//   concept                — clearly labelled, never shown with a testimonial
// Proposal-only or unverifiable work must NOT be added.

import type { CaseStudySource, Testimonial } from './types';

/**
 * The studio's own website — an internal project, documented end-to-end in
 * /docs (rebuild audit, design research, design system, no-animation audit).
 * Every claim in this entry is verifiable in this repository.
 */
const UI_FORGE_STUDIO_SITE: CaseStudySource = {
  slug: 'ui-forge-studio-website',
  title: 'UI Forge Studio — designing and building our own site',
  seoTitle: 'Case study: the UI Forge Studio website | UI Forge Studio',
  metaDescription:
    'How UI Forge Studio designed and built its own website: an editorial design system with zero animation, a typed CMS-ready content layer, structured SEO, and accessibility as a default.',
  summary:
    'Our own site, rebuilt from the ground up: an editorial design system with zero animation, a typed CMS-ready content layer, and the same standards we apply to client work.',
  status: 'internal',
  statusNote: 'The site you are reading now',
  projectType: 'Studio website',
  industry: 'Design & development studio',
  year: '2026',
  services: ['Design system', 'Website design', 'Development', 'SEO', 'Accessibility'],
  platforms: ['Next.js'],
  technologies: ['Next.js App Router', 'React Server Components', 'TypeScript', 'Tailwind CSS'],
  heroMedia: {
    src: '/static/work/ui-forge-studio-home-desktop.png',
    alt: 'UI Forge Studio homepage at desktop width: the serif hero headline “Websites and digital products forged around your business”, plain-language lead, and Start a project call to action.',
    caption: 'The homepage hero — display serif statement, plain-language lead, one clear action.',
    width: 2880,
    height: 1800,
  },
  gallery: [
    {
      src: '/static/work/ui-forge-studio-insights-desktop.png',
      alt: 'An Insights article page at desktop width, showing the editorial article header with category label, date, reading time and author line above the article body.',
      caption:
        'The same editorial system carries the Insights articles: ledger metadata, controlled measure, no decoration.',
      width: 2880,
      height: 1800,
    },
    {
      src: '/static/work/ui-forge-studio-home-mobile.png',
      alt: 'UI Forge Studio homepage on a 375-pixel-wide mobile viewport, with the hero headline and calls to action stacked in a single column.',
      caption: 'Mobile is designed, not shrunk — hierarchy and reading order are re-set at 375px.',
      width: 750,
      height: 1624,
    },
  ],
  featured: true,
  featuredOrder: 1,
  workPageOrder: 1,
  overview: [
    {
      t: 'p',
      x: 'UI Forge Studio needed what every client needs: a site that explains the work plainly, earns trust, and is easy to maintain. Rather than describe how we build, this project shows it — the site you are reading is the deliverable, and this case study documents the decisions behind it.',
    },
    {
      t: 'p',
      x: 'The engagement covered the full scope we offer clients: strategy and content, a design system, design and development, SEO architecture, accessibility, and a content model that can grow without a rebuild.',
    },
  ],
  challenge: [
    {
      t: 'p',
      x: 'The starting point was an earlier single-product website whose codebase had accumulated the usual debt: a heavy client-side state layer, animation libraries loaded from CDNs, content locked to an old CMS structure, and a handful of long-standing SEO and security defects.',
    },
    {
      t: 'p',
      x: 'The harder problem was credibility without shortcuts. A new studio has no archive of client logos or testimonials to lean on — and we had ruled out fabricating any. The site had to feel premium and trustworthy using only what was true: the thinking, the writing, the craft of the site itself.',
    },
  ],
  goals: [
    'Present the studio in plain language a business owner can act on, without agency clichés.',
    'Build a premium editorial design system that works with zero animation — instant states only.',
    'Keep every claim on the site honest: no fake clients, metrics, portraits, or testimonials.',
    'Structure content in a typed, CMS-ready layer so pages never need a rebuild when the CMS arrives.',
    'Ship with search and accessibility handled as defaults, not add-ons.',
  ],
  approach: [
    {
      label: 'Research',
      body: 'A structured research pass across premium studio and agency sites (documented in the repo) established the editorial direction: large display type, ledger-style metadata, hairline dividers, and restraint instead of decoration.',
    },
    {
      label: 'Design system',
      body: 'A small token set — paper, ink, one blue, two hairline tones — with a display serif for statements and a tabular-numeral “ledger” voice for metadata. Documented so every new page starts consistent.',
    },
    {
      label: 'No-animation accessibility',
      body: 'Motion was removed as a design constraint, not an afterthought: no transitions, reveals, carousels, or parallax anywhere. Hierarchy, spacing, and typography do the work; every interactive state updates instantly.',
    },
    {
      label: 'Development',
      body: 'Rebuilt on the Next.js App Router with React Server Components and TypeScript throughout. The legacy state library, animation dependencies, and dead product code were removed rather than carried over.',
    },
    {
      label: 'Content architecture',
      body: 'Page copy, insights articles, and case studies live in typed local content modules behind an async data layer, so a headless CMS can replace the source later without touching a single page.',
    },
    {
      label: 'SEO & migration',
      body: 'Clean locale-free canonicals with hreflang, JSON-LD for the organisation, pages, articles and breadcrumbs, a generated sitemap, and permanent redirects mapping every legacy URL to its new home.',
    },
  ],
  designAndBuild: [
    {
      t: 'p',
      x: 'The design system treats the page like a well-set document: a numbered ledger of sections, credits-style metadata tables, and full-width hairlines instead of cards and shadows. Dark “ink” bands are used sparingly for contrast, and the single accent blue is reserved for actions and indices.',
    },
    {
      t: 'p',
      x: 'During the rebuild we also fixed defects inherited from the previous codebase — an inverted API host allowlist, a sitemap that emitted relative URLs, CMS credentials exposed to the client, and diverging locale configurations — each documented in the rebuild audit.',
    },
    {
      t: 'ul',
      x: [
        'Server components by default; client JavaScript only where interaction requires it.',
        'A reusable block renderer shared by insights articles and case studies.',
        'Netlify-native enquiry form with server-side verification.',
        'Security headers, cache policy, and image optimisation configured at the platform level.',
      ],
    },
  ],
  outcomes: [
    'A consistent editorial design system documented in the repository and applied across every route.',
    'Zero animation site-wide, verified in a dedicated audit — premium feel carried by typography and composition.',
    'A typed content layer that is CMS-ready: swapping in Contentful requires no page changes.',
    'Structured SEO across the site: canonicals, hreflang, JSON-LD, sitemap, and complete legacy redirects.',
    'Every pre-existing security and SEO defect found in the audit was fixed during the rebuild.',
  ],
  published: true,
  publishedAt: '2026-07-15',
};

export const LOCAL_CASE_STUDIES: CaseStudySource[] = [UI_FORGE_STUDIO_SITE];

/**
 * Verified client testimonials only. Empty until real, client-approved
 * quotes exist — placeholder or unverified quotes must never be added.
 * Follow the verification workflow in docs/UI-FORGE-CASE-STUDY-CONTENTFUL.md
 * before adding an entry, and only then set `verified: true`.
 */
export const LOCAL_TESTIMONIALS: Testimonial[] = [];
