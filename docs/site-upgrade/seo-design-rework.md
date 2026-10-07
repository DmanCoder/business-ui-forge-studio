# SEO, copywriting and design rework — implementation record

Date: 7 October 2026
Brief: `ui-forge-seo-design-rework.md` (supplied by the owner)

## What changed

### Technical SEO

- `buildMetadata` now uses the page title verbatim (`title.absolute`); every route supplies a full
  title with the brand suffix, so the root layout template never doubles it.
- hreflang is a self-referencing `en-AU` + `x-default` pair (previously `en`). No other regional
  variants exist and none were invented.
- `BASE_URL` (`src/config/site.ts`) ignores a `localhost` value outside `next dev`. The Netlify
  preview was observed emitting `<link rel="canonical" href="http://localhost:3000">`; a hosted
  build now falls back to `https://uiforgestudio.com.au`.
- Site-wide JSON-LD is `Organization` (was `ProfessionalService`, a LocalBusiness subtype that
  expects a postal address the remote-first studio does not publish). `WebSite`, `WebPage`,
  `Service`, `BreadcrumbList`, `BlogPosting` and `CreativeWork` are unchanged in shape.
- `BlogPosting.author` carries the visible byline, a job title and the About URL; `dateModified`
  is emitted from each article's `updated` field, which was set for the three edited articles.
- Legal pages are indexable again (no `noindex`) and listed in the sitemap at low priority.
- Staging: `ui-forge-studio-agency.netlify.app` serves `noindex, nofollow` (meta + header) and
  `Disallow: /` because `NEXT_PUBLIC_ENVIRONMENT` is not `production` there. That is correct for a
  preview host. Production must set `NEXT_PUBLIC_ENVIRONMENT=production` and
  `NEXT_PUBLIC_BASE_URL=https://uiforgestudio.com.au` in the Netlify production context only.

### Copy and metadata

- Unique SEO titles, meta descriptions and search-clear H1s on every public page, per the brief's
  intent map. Brand-led lines were kept as supporting statements (About, Process).
- Service pages: all seven now carry page-specific section headings (`sections` on each
  `ServicePage`), a page-specific service note, descriptive related-service links and
  "Read: …" article links. Internal component structure is unchanged.
- Generic anchors replaced site-wide: "Explore this service", "Read the article", "Read the case
  study", "See the full process", "All insights", "Explore services".
- Home: tightened problem headings, descriptive service anchors, simpler platform H2, selected-work
  heading for a single published project, and the "How we work" copy from the brief.
- Insights: article titles/H1s updated, a "Short answer" block after the header, a related-service
  block and a related-reading list (same category first, then other articles), a summary table in
  the platform comparison, and contextual links to the redesign, Shopify, custom-website and
  maintenance pages.
- Case study: H1/title per the brief and a "What changed" ledger (`outcomeLedger`) replacing the
  plain outcome list. No performance scores were added.

### Design

- `src/components/home/ProcessRail.tsx` — one `<ol>` of seven stages. 01–06 in two labelled groups
  (Plan & design / Build & launch) on a three-column desktop rail with a subtle desktop-only
  connector, two columns on tablet, a vertical number/content timeline on mobile. 07 Support is a
  full-width closing band with the process link. Dark band, hairlines, no gradients, shadows or
  animation.
- `src/components/services/ServiceIndex.tsx` — a ledger of seven real links with one-line
  descriptors: label column (3/12) + two-column row grid (9/12) on desktop, single stacked ledger on
  mobile. The eighth cell is a small "Not sure which service fits?" prompt so the final desktop row
  is never half empty.
- Insights index now lists supporting articles in a two-column ledger under the featured story.

## Verification

See the final report in the session summary: typecheck, lint, Prettier, production build, and a
Playwright pass over every public route at 375, 768, 1280 and 2000px (one H1, one `<main>`,
canonical/hreflang/robots, JSON-LD parses, no horizontal overflow, no broken internal links).

## Not done / owner decisions

- Founder name and bio: `FOUNDER_NAME` is still empty, so bylines read "The founder". Fill it in
  `src/config/site.ts` when the founder is comfortable being named.
- New Insights articles from the brief's backlog are recorded in `content-roadmap.md`, not written.
- Core Web Vitals were not measured in this pass; no performance claims were added anywhere.
