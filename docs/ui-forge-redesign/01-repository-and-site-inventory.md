# Repository and site inventory

## Audit basis

The repository was inspected before the live site. The active workspace already had a development server running from the repository at `http://localhost:3000`, and that instance was used for the visual audit.

Running `npm run dev` from this audit shell could not access the existing dependency installation, so an isolated copy was created under `/tmp` and installed from `package-lock.json` without changing the repository. In that copy:

- `npm run typecheck` passed.
- `npm run lint` passed.
- `npm run build` passed and generated 23 static/dynamic route entries.
- Next.js warned that the custom `Cache-Control` header on `/_next/image(.*)` can break development behaviour.
- The isolated dev watcher hit `EMFILE: too many open files` and failed to index locale routes, so it was not used for the site audit.
- `npm ci` reported 34 dependency advisories (2 moderate, 31 high, 1 critical). These are installation-level findings only; no dependency audit or upgrade was requested or performed.

The repository’s intended local command remains:

```bash
npm install
npm run dev
# http://localhost:3000
```

## Stack

| Area | Current implementation | Audit observation |
|---|---|---|
| Framework | Next.js 16.2.10, App Router, Turbopack | Locale-scoped pages under `src/app/[locale]`; clean public paths are rewritten internally to `/en/*`. |
| UI runtime | React 19.2.7 / React DOM 19.2.7 | Server components by default; client components used for the menu, form, reCAPTCHA and preview helpers. |
| Language | TypeScript 5.9 | Strict configuration and typed content models. |
| Package manager | npm with `package-lock.json` | Node `>=20.9`; `.nvmrc` specifies Node 24. |
| Styling | Tailwind CSS 4 through PostCSS plus `src/app/globals.css` | Custom `@theme` tokens, 62.5% root rem convention and mostly arbitrary-value utility classes. |
| Hosting | Netlify with `@netlify/plugin-nextjs` | `netlify.toml` controls build/plugin settings; the enquiry form uses Netlify Forms. |
| CMS | Contentful dependencies and a guarded GraphQL proxy exist | Published Insights and case studies currently come from typed local modules. Comments state the Contentful space still contains legacy guitar content and must not yet replace local data. |
| Images | `next/image`, static PNG/SVG assets, Contentful and Pexels remote patterns | Case studies have typed intrinsic sizes and alt text. Most service visuals are custom static SVGs. |
| Fonts | `next/font/google` | Instrument Serif 400 normal/italic for display; Instrument Sans 400/500/600 for body/UI. |
| Icons | Bespoke React SVG components | No icon package; social and utility icons live under `src/components/Icons`. |
| Animation | No animation library | `globals.css` explicitly prohibits visual animation/transitions; reCAPTCHA transitions are disabled; reduced-motion overrides are present. |
| Analytics | None shipped | Copy mentions analytics hookup as part of projects, but no analytics integration is present in this website. |
| Forms | React enquiry form → Netlify static form endpoint | Optional Google reCAPTCHA verification API; honeypot; client validation; thank-you route. |
| SEO | Next metadata, canonicals, hreflang, Open Graph/Twitter, JSON-LD, sitemap, robots and redirects | Strong foundation; production indexing depends on environment configuration. |

## Routing model

`next.config.js` rewrites clean URLs to locale-scoped App Router pages:

```text
/services  → internal /en/services
/work      → internal /en/work
```

Canonicals stay locale-free. `ALLOWED_LOCALES` currently contains only `en`. Legacy BlackBoltGuitar routes return permanent `308` redirects. Live checks confirmed:

| Legacy route | Redirect |
|---|---|
| `/about-me` | `/about` |
| `/contact` | `/start-a-project` |
| `/blogs` | `/insights` |
| `/categories/websites` | `/insights/categories/websites` |
| `/en/about-me` | `/about` |

## Public route inventory

The sitemap contains 13 indexable routes. Five additional utility, conditional or error states were audited, for 18 meaningful route states total.

| # | Public route/state | Type | Index state | Source |
|---:|---|---|---|---|
| 1 | `/` | Home | Sitemap/indexable | `src/app/[locale]/page.tsx` |
| 2 | `/services` | Services hub | Sitemap/indexable | `src/app/[locale]/services/page.tsx` |
| 3 | `/work` | Work index | Sitemap/indexable | `src/app/[locale]/work/page.tsx` |
| 4 | `/work/ui-forge-studio-website` | Internal case study | Sitemap/indexable | Dynamic route + `src/lib/caseStudies/local.ts` |
| 5 | `/process` | Process | Sitemap/indexable | `src/app/[locale]/process/page.tsx` |
| 6 | `/about` | Studio/about | Sitemap/indexable | `src/app/[locale]/about/page.tsx` |
| 7 | `/insights` | Insights index | Sitemap/indexable | `src/app/[locale]/insights/page.tsx` |
| 8 | `/insights/what-affects-the-cost-of-a-website` | Article | Sitemap/indexable | Dynamic route + local article data |
| 9 | `/insights/website-ownership-and-hosting-explained` | Article | Sitemap/indexable | Dynamic route + local article data |
| 10 | `/insights/custom-website-wordpress-or-webflow` | Article | Sitemap/indexable | Dynamic route + local article data |
| 11 | `/insights/categories/ownership-and-support` | Topic archive | Sitemap/indexable | Dynamic category route |
| 12 | `/insights/categories/websites` | Topic archive | Sitemap/indexable | Dynamic category route |
| 13 | `/start-a-project` | Lead form | Sitemap/indexable | `src/app/[locale]/start-a-project/page.tsx` |
| 14 | `/thank-you` | Form success | `noindex, nofollow` | `src/app/[locale]/thank-you/page.tsx` |
| 15 | `/privacy` | Legal stub | `noindex, nofollow` | `src/app/[locale]/privacy/page.tsx` |
| 16 | `/terms` | Legal stub | `noindex, nofollow` | `src/app/[locale]/terms/page.tsx` |
| 17 | `/testimonials` | Conditional route; currently 404 | `noindex, nofollow` | Publishes only after four verified testimonials or in labelled demo mode. |
| 18 | Unknown route | Custom 404 | `noindex` | `src/app/not-found.tsx` |

System routes also include `/api/cms-proxy`, `/api/verify-recaptcha`, `/robots.txt`, `/sitemap.xml` and the generated icon route.

One additional local article (`how-to-brief-a-web-designer`) is present but unpublished, so its slug correctly does not resolve or enter the sitemap.

## Page/content architecture

### Static content

- `src/content/home.ts`
- `src/content/services.ts`
- `src/content/process.ts`
- `src/content/about.ts`
- `src/content/work.ts`
- `src/content/start-project.ts`

This keeps marketing copy outside page components but still requires code deployment for content changes.

### Insights

- Typed source data: `src/lib/insights/local.ts`
- Data access: `src/lib/insights/index.ts`
- Reusable renderers: `InsightBlocks`, `InsightCard`, `FeaturedInsight`, `LatestInsights`, `TableOfContents`
- Current production data source: local TypeScript content
- Intended future source: Contentful behind the same async data-access interface

### Case studies and testimonials

- Verified/internal source: `src/lib/caseStudies/local.ts`
- Clearly labelled fictional preview data: `src/lib/caseStudies/demo.ts`
- Publishing and honesty gates: `src/lib/caseStudies/index.ts`
- Real published studies: one internal project
- Verified testimonials: zero
- Dedicated testimonials threshold: four verified quotes

The content model is thoughtfully defensive: demo studies are labelled, noindexed and excluded unless `SHOW_DEMO_CONTENT=true`.

## Component architecture

### Shared shell

- `Header` — sticky desktop navigation and full-screen mobile dialog with focus management.
- `Footer` — global closing CTA, navigation ledgers, contact details and legal links.
- `RootLayout` — fonts, skip link, shell and sitewide structured data.

### Current design-system primitives

- `Cta`
- `Eyebrow`
- `Spark`
- `StudioImage`
- `Container` (legacy/shared)
- Shared button, rich-text, image, caption, embed and form-field components retained for Contentful-compatible content.

### Domain components

- Work: `SelectedWork`, `CaseStudyRow`, `CaseStudyMediaFigure`, `RelatedWork`, `TestimonialsSection`, `TestimonialQuote`, demo labelling.
- Insights: featured/latest cards, body block renderer and table of contents.
- Forms: `StartProjectForm` and `Recaptcha`.

## Current design tokens

### Colour

- Paper `#faf9f6`
- Ink `#0b1220`
- Blue `#1e6fff`
- Deep blue `#1554cb`
- Soft blue `#7fa8ff`
- Muted text `#555d6a`
- Dark-surface muted text `#8a93a3`
- Line `#e8e6e0`
- Edge `#c9c6bd`

### Layout

- Breakpoints: 500, 768, 1024, 1280 and 1536px.
- `container-site`: maximum 1440px with fluid gutters.
- `container-prose`: 760px reading measure.
- `container-narrow`: 980px.
- Section padding uses viewport-aware `clamp()` values.
- 12-column grids appear on larger layouts; mobile collapses to a single or two-column editorial flow.

### Typography

- Display serif for hero statements, large case-study names and large numerals.
- Sans for body, navigation, section headings and controls.
- Monospace/tabular-numeral utility voice for indices and metadata.
- Uppercase, tracked `meta-label`/eyebrow style.

### Surfaces/components

- Minimal `0.2rem` radius on most controls.
- Almost no shadows.
- Hairline dividers and large blank fields establish hierarchy.
- Dark ink bands provide contrast on the homepage and footer.
- Primary blue is used for CTAs, emphasis and indices.

## SEO and discovery

Strengths:

- Locale-free canonical URLs with `en` and `x-default` alternates.
- ProfessionalService, WebSite, WebPage, BlogPosting, Breadcrumb and CreativeWork JSON-LD builders.
- Generated sitemap from published content only.
- Demo case studies and conditional testimonials kept out of indexing.
- Permanent legacy redirects.
- Article adjacency, related articles and topic routes.

Risks/gaps:

- `robots.txt` disallows the entire site whenever `NEXT_PUBLIC_ENVIRONMENT !== "production"`; deployment configuration is therefore critical.
- Topic pages are very thin at one and two articles but are currently indexed.
- Legal pages are noindexed but publicly reachable with internal placeholder language.
- The founder name and region are deliberately empty, weakening Person/local relevance until confirmed.

## Lead generation

The `/start-a-project` form collects:

- name, email, organisation and existing URL;
- project type;
- business, need, goals, functionality and audience;
- timeline, budget, referral source and extra detail;
- privacy consent.

Client validation focuses the first invalid field and exposes alerts. Submission optionally verifies reCAPTCHA, posts URL-encoded data to the Netlify-registered `project-inquiry` form and routes to `/thank-you`.

The form is robust but long for a first contact. The redesign should retain lead quality while using progressive disclosure or a shorter qualification sequence.

## Repository/documentation observations

- `README.md` still links to several design, audit and migration documents that are currently deleted in the working tree. These deletions pre-dated this audit and were not changed.
- The codebase still contains a broad set of legacy/shared Contentful and social-embed components that are not central to the current editorial pages.
- No redesign code, dependencies or source components were changed during this audit.
