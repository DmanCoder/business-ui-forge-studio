# UI Forge Studio

Founder-led Australian digital studio website — websites, e-commerce, web applications and
mobile apps, designed and built by the same hands.

Built with **Next.js 16 (App Router, Turbopack)**, **React 19**, **TypeScript**,
**Tailwind CSS v4**, **Contentful** (Insights articles), deployed on **Netlify**.

## Getting started

Requires Node.js ≥ 20.9 (see `.nvmrc` — Node 24 LTS recommended).

```bash
nvm use
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build (Turbopack)
npm run start      # serve the production build
npm run lint       # ESLint (flat config)
npm run typecheck  # tsc --noEmit
npm run prettify   # Prettier write
```

## Environment variables

Create `.env.local`:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_BASE_URL` | Canonical origin, e.g. `https://uiforgestudio.com.au`. Required in production for canonicals/sitemap/OG. A `localhost` value is ignored outside `next dev` (hosted builds fall back to the production origin) so a misconfigured deploy can never emit localhost canonicals. |
| `NEXT_PUBLIC_ENVIRONMENT` | `production` on the production deploy **only**; anything else (including the Netlify `*.netlify.app` preview) enables preview behaviour: `noindex, nofollow` meta + `X-Robots-Tag`, `Disallow: /` robots.txt and no sitemap reference. Set it in the Netlify production context, never in deploy-preview or branch contexts. |
| `NEXT_PUBLIC_CONTENTFUL_SPACE_ID` | Contentful space for Insights articles. |
| `NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN` | Contentful delivery token. |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | reCAPTCHA site key (project-inquiry form). Optional in dev — the form skips reCAPTCHA when unset. |
| `RECAPTURE_PRIVATE_API_KEY` | reCAPTCHA secret, server-side verification only. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Overrides the default `hello@uiforgestudio.com.au`. |
| `SHOW_DEMO_CONTENT` | `true` merges clearly-labelled fictional demo case studies and sample testimonials (`src/lib/caseStudies/demo.ts`) into `/`, `/work` and `/testimonials` so layouts can be designed and tested. Server-side only (read at build/render — rebuild after changing it). Unset/`false` in production unless the preview is intentional: demo pages are always labelled and noindexed, but they are publicly reachable while enabled. |

A template with every variable is provided in `.env.example` — copy it to
`.env.local` and fill in real values (never commit `.env.local`).

## Architecture

- `src/app/[locale]/…` — locale-scoped App Router routes (currently `en` only; clean
  URLs like `/services` are rewritten to `/en/services` internally, canonicals use the
  clean URLs).
- `src/config/site.ts` — brand, contact, navigation single source of truth.
- `src/content/…` — static page copy modules.
- `src/lib/seo.ts` — metadata + JSON-LD builders (Organization, WebSite, WebPage,
  Service, BlogPosting, Breadcrumb).
- `src/lib/insights/…` — Insights data layer. Currently serves typed local article
  content; swap to Contentful once entries exist (see `docs/CONTENTFUL-MIGRATION.md`).
- `src/components/ui|layout|insights|forms` — design-system primitives, chrome, insights
  UI, project-inquiry form.
- Design tokens: `src/app/globals.css` (`@theme`), documented in
  `docs/UI-FORGE-DESIGN-SYSTEM.md`. Note: `html { font-size: 62.5% }`, so `1.6rem = 16px`.

## Forms

The project-inquiry form (`/start-a-project`) posts URL-encoded data to
`/__forms.html` (Netlify Forms static registration file in `public/`), with optional
reCAPTCHA verification via `/api/verify-recaptcha`, then routes to `/thank-you`.
The Netlify form name is `project-inquiry`.

## Docs

- `docs/UI-FORGE-REBUILD-AUDIT.md` — rebuild audit + route migration map
- `docs/UI-FORGE-DEPENDENCY-UPGRADE.md` — Next 14→16 upgrade record
- `docs/UI-FORGE-DESIGN-RESEARCH.md` — Mobbin research + direction
- `docs/UI-FORGE-DESIGN-SYSTEM.md` — tokens and component rules
- `docs/CONTENTFUL-MIGRATION.md` — CMS follow-up work before production
- `docs/site-upgrade/` — October 2026 full-site audit, SEO strategy, design research,
  implementation record and content roadmap

## Pre-launch checklist (external actions)

- Have the Privacy Policy, Website Terms and Disclaimer reviewed by an Australian lawyer;
  the current noindex pages are tailored interim drafts, not legal advice.
- Set the founder name (`src/config/site.ts` `FOUNDER_NAME`) and, if confirmed, the
  studio region.
- Create the Contentful Insights entries (or keep the local fallback) — see
  `docs/CONTENTFUL-MIGRATION.md`.
- Set production env vars on Netlify (`NEXT_PUBLIC_BASE_URL`, `NEXT_PUBLIC_ENVIRONMENT=production`, reCAPTCHA keys). Leave `SHOW_DEMO_CONTENT` unset (or `false`) so the labelled demo case studies and sample testimonials never reach production; set it to `true` only on a deliberate preview deploy, and redeploy after changing it (the flag is read at build time).
- Verify the `project-inquiry` form appears in the Netlify Forms dashboard after the
  first deploy.
- Add a real GA/analytics property if analytics are wanted (none are shipped by default).
