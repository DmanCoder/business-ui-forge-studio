# UI Forge Studio — Visual & Supporting Graphics Audit

Audit date: 8 October 2026
Codebase: `main` at `4cf2759` ("clean up v2")
Scope: every public route, desktop (1440×900) and mobile (375×812), plus the local asset library and the generator that produces it.
Status: **audit only — nothing was changed.**

> How the site was inspected. The production domain `uiforgestudio.com.au` did not respond from the audit machine (connection timed out on both the apex and `www`). The Netlify preview `ui-forge-studio-agency.netlify.app` was reachable and its hero markup is byte-identical to the local build of this commit, so all screenshots and measurements were taken from the local `next dev` server on port 3000 with demo content off (`SHOW_DEMO_CONTENT` unset), which is the production configuration. Full-page screenshots were taken after a scroll pass so lazy images loaded.

---

## 1. Executive summary

The site's editorial system is strong and should not be touched: the display serif, the ledger numbering, the hairlines, the paper/ink bands and the restrained blue all read as a considered premium product. The weakness is not the absence of graphics. It is that the graphics that exist are **a separate, slightly wrong visual family bolted onto a correct one**, and that the only real project evidence on the site is **out of date**.

Five findings drive everything below.

1. **The project evidence contradicts the site.** All three case-study screenshots (`/static/work/*.png`) show the previous iteration: the old four-point "spark" logo, the headline "Websites and digital products *forged* around your business", and a different lead paragraph. They appear on the homepage, on `/work` and on the case study whose status line says "The site you are reading now". A visitor who scrolls from the current hero to the Selected work section sees two different brands. This is the single most damaging visual on the site and the cheapest to fix.

2. **The graphic family does not match the UI it sits in.** Every generated SVG uses Georgia / Helvetica / SF Mono instead of Instrument Serif / Instrument Sans, a brighter blue (`#1e6fff`) than the UI (`#1554cb`) and the logo (`#1F45E0`), pill-radius buttons where the site's CTA is a 2px-radius rectangle, and the old "+" spark motif that the 7 October logo change retired. The About artefact literally labels a Georgia "Aa" as "Instrument Serif", and the token panels print `radius.pill = 999px` and `blue: #1e6fff`, neither of which is true of the site. Because the graphics are *specimens of the studio's own craft*, these inaccuracies undercut the exact claim they are there to support.

3. **The homepage hero is a text-only first screen with the graphic below the fold.** At 1440×900 the signature composition begins at 898px, so the first impression is headline + two buttons + a blank right half. The signature itself is a generic wireframe (placeholder text bars, three empty cards) rather than evidence of capability, and at 375px it shrinks to 335px wide with illegible 3px labels.

4. **The service graphics are mislabelled.** One SVG titled "Landing pages and campaigns" is used for both *Website redesign* and *HubSpot websites*. The other graphics carry baked-in names ("Websites", "E-commerce", "Digital products", "Ongoing care") that do not match the service names beside them, and they are numbered 01–06 for seven services. Seven service detail pages, each 6,400–6,700px tall on desktop and over 10,000px on mobile, contain no image at all.

5. **Visual rhythm is back-loaded.** On the homepage, four consecutive text-only sections (Statement, Problems, What we build, Platform) sit between the hero graphic and the single project screenshot, then four more text-only sections follow it. The page is 10,962px tall on desktop with two images.

The recommended first pass is five changes, in this order: (1) re-shoot and extend the project evidence, (2) rebuild the hero as a responsive HTML/CSS "Design → Build" specimen using the real type and tokens, (3) correct and complete the service graphic family and reuse it on service detail pages, (4) add one "right platform" decision diagram, (5) a consistency batch across article covers, the About artefacts, the process map on mobile and the Start-a-project schematic. Everything else is deliberately left text-only.

---

## 2. Existing visual asset inventory

### 2.1 Generated static artwork (`scripts/generate-static-assets.mjs` → `public/static`)

| Asset | Path | Size | Intrinsic | Used on | Verdict |
| --- | --- | --- | --- | --- | --- |
| Homepage signature | `brand/homepage-signature.svg` | 12KB | 1600×1000 | `/` below hero copy | **Rework** (replace with HTML/CSS composition) |
| Start-a-project schematic | `brand/start-a-project.svg` | 4KB | 1000×760 | `/start-a-project`, desktop only (`hidden lg:block`) | **Remove** (duplicates the adjacent 3-step list) |
| Studio artefacts | `about/studio-artefacts.svg` | 8KB | 1080×1350 | `/about` founder column | **Retain, correct facts, re-render** |
| Process map | `process/project-map.svg` | 8KB | 1600×680 | `/process` above phase ledger | **Retain on ≥768px; replace with vertical variant below** |
| Websites | `services/websites.svg` | 8KB | 1200×750 | `/services` row 01 | **Rework** (strip header band, fix fonts/blue) |
| Landing pages | `services/landing-pages.svg` | 8KB | 1200×750 | `/services` rows 02 **and** 04 | **Replace with two new diagrams** |
| E-commerce | `services/ecommerce.svg` | 8KB | 1200×750 | `/services` row 03 | **Rework** (as Websites) |
| Digital products | `services/digital-products.svg` | 8KB | 1200×750 | `/services` row 05 | **Rework** |
| Mobile apps | `services/mobile-apps.svg` | 8KB | 1200×750 | `/services` row 06 | **Rework** |
| Ongoing care | `services/ongoing-care.svg` | 8KB | 1200×750 | `/services` row 07 | **Rework** (green "OK" rows read as fabricated status) |
| Insight covers ×3 | `insights/*-cover.svg` | 4–8KB | 1200×800 | article header | **Rework** (crop to diagram, drop duplicate title) |
| Insight OG ×3 | `insights/*-og.png` (+svg) | 37–43KB | 1200×630 | `og:image` only | Retain; regenerate with real fonts |
| Demo project art ×15 | `work/demo/*.svg` | 88KB total | various | only when `SHOW_DEMO_CONTENT=true` | Not in production; leave |

### 2.2 Real screenshots (`public/static/work`)

| File | Size | Dimensions | Used on | Problem |
| --- | --- | --- | --- | --- |
| `ui-forge-studio-home-desktop.png` | 264KB | 2880×1800 | `/` Selected work, `/work`, case-study hero, `og:image` | Shows previous site (spark logo, "forged" headline) |
| `ui-forge-studio-insights-desktop.png` | 216KB | 2880×1800 | case study gallery | Previous site; old article title "What affects the cost of a website project" |
| `ui-forge-studio-home-mobile.png` | 132KB | 750×1624 | case study gallery | Previous site; caption claims "Mobile is designed, not shrunk" over stale art |

### 2.3 Brand

| Item | Notes |
| --- | --- |
| `src/components/brand/Logo.tsx` + `public/static/brand/logo/*.svg` | Current lockup: U-frame with cobalt bar, serif wordmark. Fill `#1F45E0` (logo) vs `#1554cb` (UI `--color-blue`). |
| `src/components/ui/Spark.tsx` | Old four-point spark. Not rendered anywhere. The generated assets still use a *different* "+" cross spark from `asset-lib.mjs`. Three sparks, one retired brand. |
| `src/app/icon.svg`, favicons | Current U-frame mark. Correct. |

### 2.4 Reusable rendering components

- `StudioImage` (`src/components/media/StudioImage.tsx`) renders manifest assets via `next/image`, SVG `unoptimized`.
- `CaseStudyMediaFigure` / `CaseStudyRow` render project media with a 1px line border and optional caption.
- No component exists for an HTML/CSS composition, browser frame, phone frame or annotation. This gap is the main reason the graphics drifted from the UI: they could not use the site's fonts or tokens.

### 2.5 Measured image presence per route (desktop)

| Route | Page height | Images | Text-only sections in a row (max) |
| --- | --- | --- | --- |
| `/` | 10,962px | 2 | 4 |
| `/work` | 2,948px | 1 | 1 |
| `/work/ui-forge-studio-website` | 8,139px | 3 (all stale) | 4 |
| `/services` | 10,963px | 7 | 1 |
| `/services/web-design-development` (typical) | 6,548px | 0 | 8 |
| `/process` | 4,092px | 1 | 7 (the phase ledger) |
| `/about` | 4,326px | 1 | 3 |
| `/insights` | 2,193px | 0 | n/a |
| `/insights/[slug]` | 7,206px | 1 | n/a (long-form) |
| `/start-a-project` | 3,299px | 1 (desktop only) | n/a |

---

## 3. Site-wide findings

### A. Visual balance

- **Desktop heroes are intentionally sparse but the right 45% is empty on every page.** Headlines are capped at 14–18ch, which is correct for reading, but on `/`, `/work`, `/services`, `/process`, `/about`, `/insights` and `/start-a-project` the area to the right of the H1 is blank paper. On the homepage this is the one place where the emptiness reads as *unfinished* rather than *restrained*, because the page is making a capability claim. On the other pages it is acceptable.
- **The eye has no destination in the first viewport of the homepage.** The signature graphic starts at 898px on a 900px-tall viewport.
- **Mobile layouts are considered.** Stacking, type scale and rhythm hold up. The only mobile failures are graphics that were composed for 1200–1600px and are shown at 335px: the signature, the process map and every service graphic become illegible decoration.

### B. Visual storytelling

A visitor can read what the studio does within seconds. A visitor cannot *see* any of it:

| Question | Answered by text | Answered by a visual |
| --- | --- | --- |
| What does UI Forge build? | Yes | Partially (services page only) |
| Design and development happen together | Yes, repeatedly | Weakly (signature's two panels + a spark) |
| Difference between website / store / app / mobile app | Yes | Yes on `/services`; not on `/` or detail pages |
| How the process works | Yes | Yes (`/process` map; home rail is typographic) |
| What "founder-led" means | Yes | Partially (About artefacts) |
| Quality of the studio's UI capability | Claimed | **Contradicted** by stale screenshots |

### C. Trust and credibility

- The honesty posture (no fake logos, quotes, metrics, portraits) is correct and must be preserved. The site already enforces it in code (`src/lib/caseStudies/index.ts`).
- The strongest truthful evidence available is the site itself and its documented system: real type scale, real tokens, real routes, real responsive behaviour, real Lighthouse-grade decisions. None of that is currently shown as a *crop of the real thing*; it is shown as a *drawing of a generic thing*.
- Wrong facts inside craft specimens are a credibility leak: Georgia labelled as Instrument Serif; `#1e6fff` where the site uses `#1554cb`; `radius.pill 999px` where buttons are 2px; `uiforge.studio` on covers where the domain is `uiforgestudio.com.au`; the caption "DESIGN PRECISION · TECHNICAL IMPLEMENTATION · CRAFTED OUTCOMES" under the signature is the kind of agency slogan the copy elsewhere avoids.

### D. Distinctiveness

- The editorial page system is distinctive. The graphics are not: browser-chrome wireframes with grey text bars and three empty cards are the default output of every "web studio illustration" prompt. The blueprint registration corners and the tick ruler are the only distinctive moves and they are used on every asset regardless of purpose, which dilutes them.
- Nothing crosses into cliché territory (no blobs, glass cards, floating laptops, anvils). The risk is blandness, not kitsch.

### E. Visual rhythm

Homepage sequence today (D = dark band, ▣ = image):

```
Hero(text) → ▣signature → facts → Statement → Problems → Build(7 rows+matrix) → Platform → Work ▣ → D Process → Why → Scoping → Insights → D Footer
```

Two images in thirteen movements, both wireframe/screenshot of the same thing. Recommended rhythm after the first pass:

```
Hero(text+▣specimen) → facts → Statement → Problems → Build → ▣Platform diagram → Work ▣▣(current) → D Process → Why(▣micro) → Scoping → Insights → D Footer
```

### F. Consistency (existing graphics vs UI)

| Property | Site UI | Generated graphics | Match |
| --- | --- | --- | --- |
| Display face | Instrument Serif | Georgia | ✗ |
| Body/label face | Instrument Sans | Helvetica / Arial | ✗ |
| Mono | ui-monospace | SF Mono / Menlo | ~ |
| Accent blue | `#1554cb` | `#1e6fff` | ✗ |
| Logo cobalt | `#1F45E0` | — | ✗ (third blue) |
| Button radius | 2px | 999px (pill) | ✗ |
| Hairline | 1px `#e8e6e0`, section rules `#c9c6bd` | 1.5–2px | ~ |
| Brand motif | U-frame + bar | "+" cross spark | ✗ |
| Label voice | 12px 600 uppercase 0.16em sans | 13px mono uppercase 0.18em | ~ |
| Numbering | `01` tabular sans / display serif | serif "01" in Georgia | ~ |
| Depth | none | offset "backing plate" on signature | ✗ |

The graphics are internally consistent with each other (one generator, one primitive set) and that is worth keeping. They are inconsistent with the page around them, and the cure is to render them with the page's own fonts and tokens.

### G. Accessibility and performance

- All assets are static. No animation anywhere. Correct.
- Alt text is thorough, arguably too long for decorative compositions (the signature alt is 48 words). Where a graphic repeats adjacent copy it should be `alt=""`.
- SVGs are 4–12KB; PNG screenshots 132–264KB and served through `next/image`. No performance problem. The hero signature is not `priority`, which is fine while it sits below the fold, but a hero-level visual must be `priority` or inline.
- Labels inside SVGs become unreadable below ~600px rendered width. Any graphic that carries meaning must either have a mobile variant or be rebuilt in HTML so the text reflows.

### H. SEO/content

- Service and insight headings are HTML, not baked into images. Good.
- The insight cover repeats the H1 as SVG text directly beneath the real H1. Harmless for crawlers, redundant for readers.
- Moving graphics to HTML/CSS means their labels become crawlable text; wrap decorative compositions in `aria-hidden="true"` so screen readers and crawlers do not see duplicated or meaningless strings.

---

## 4. Homepage section-by-section audit

Format for each: need a visual? / problem it solves / what it depicts / format / placement / mobile / priority.

### 4.1 Hero
- **Need a visual?** Yes. This is the only section where "text + buttons + blank" is read as a gap rather than restraint.
- **Problem solved:** first-screen evidence that the studio designs *and* builds, at the quality claimed.
- **Depicts:** see §5 and §6.
- **Format:** HTML/CSS composition using live tokens (see §6).
- **Placement:** right of the headline in a 7/5 grid from 1280px; below the copy at 768–1279px; compact variant below the CTAs on mobile.
- **Priority:** Critical.

### 4.2 Studio facts ledger
- Text-only. Correct as is.

### 4.3 Statement ("Design and development in the same hands")
- Text-only. Correct. This statement is doing visual work as a typographic set piece and should stay alone on its band.

### 4.4 Problems we solve
- **Need a visual?** No. The six problems are short, scannable and gain nothing from six icons or a fragmented-UI composition. A "broken site" illustration would be a cliché and would pull the eye away from the copy. **Keep typography-led.** Priority: Low (leave).

### 4.5 What we build
- **Need a visual?** Not in the first pass. The seven-row ledger plus the eight-cell platform matrix is already the densest section on the page; adding seven specimens would turn it into a card grid and damage the editorial feel.
- **If visuals are added later (P2):** three small *family* specimens (Websites · Commerce · Applications) in the left 4-column rail beside the ledger, each a 2:1 crop of the reworked service diagram family, with the rows grouped under them. Not seven, not icons.
- **Priority:** Low/Medium.

### 4.6 The right platform
- **Need a visual?** Yes. This is the section whose entire point ("you do not choose the technology") is easiest to show and hardest to say.
- **Problem solved:** reassurance; shows that the recommendation is a function of business inputs, not studio preference.
- **Depicts:** a left-to-right decision path: *What you tell us* (business, editing needs, integrations, commerce, workflow, budget, growth) → *What we weigh* (four criteria) → *What you receive* (one recommendation from a labelled set: Next.js, WordPress, Webflow, HubSpot, Shopify, React Native, custom application). The customer's side is emphasised; the platform list is deliberately small and muted.
- **Format:** HTML/CSS (three columns of ledger-style cells with hairline connectors).
- **Placement:** full width below the heading/body/steps row, replacing nothing.
- **Mobile:** three stacked groups with a vertical connector; labels remain real text.
- **Priority:** High.

### 4.7 Selected work
- **Need a visual?** It already has one. It is wrong.
- **Problem solved:** credibility. Current screenshots show a retired logo and headline.
- **Depicts (new):** the current homepage at 1440 (cover), plus a desktop+mobile pair, plus one *design-system crop* (type scale, four colour chips, three tokens taken from `globals.css`, rendered as HTML).
- **Format:** PNG screenshots for the real pages (re-shot from this commit), HTML for the system crop.
- **Placement:** cover in the existing `CaseStudyRow` slot; pair and crop live on the case study.
- **Mobile:** cover only.
- **Priority:** Critical.

### 4.8 How we work (dark rail)
- **Need a visual?** No additional one. The typographic rail is the best-composed section on the page and the full map lives on `/process`.
- **Fix:** align group labels with the process map. Home says "Plan & design / Build & launch / After launch"; the map says "DESIGN / DEVELOPMENT / CARE". Pick one vocabulary (recommend the home wording, which is plainer) and regenerate the map labels.
- **Priority:** Low (label alignment only).

### 4.9 Why UI Forge Studio
- **Need a visual?** A small one, optional.
- **Problem solved:** makes the differentiator ("same hands") visible rather than restated for the third time.
- **Depicts:** two rows, hairline-boxed. Row A "Typical": `Brief → Designer → Hand-off → Developer → Build` with a gap marked between Designer and Developer. Row B "UI Forge": `Brief → Designer = Developer → Build`, one cell spanning both roles. No illustration, just ledger cells and one connector style.
- **Format:** HTML/CSS, 2 rows × 5 cells; roughly 120px tall on desktop.
- **Placement:** under the body copy in the left 5-column rail (the rail currently has 300px of empty space below "More about the studio").
- **Mobile:** stacks to two short rows, still legible.
- **Priority:** Medium.

### 4.10 Scoping and investment
- **Need a visual?** No. The seven cost variables are listed in one sentence; the linked article carries the diagram. A "what moves the price" graphic here would start to look like a pricing tier. **Keep text-led.** Optional P3: break the inline list of variables into a 2-column hairline list so it scans. That is layout, not a graphic.

### 4.11 Insights
- **Need covers on cards?** No. Three articles, text-led rows that already carry category, date and reading time. Covers at this volume add maintenance per article (an SVG, an OG crop, alt text) for no comprehension gain. Revisit at ~10 articles. Priority: Leave.

---

## 5. Three hero visual directions

The claim to communicate: *UI Forge Studio combines design thinking and production-quality frontend development in one coherent process.*

### Direction A — Design → Build system specimen (evolves the current signature)

**Concept.** Two panels that are visibly the *same thing* at two stages: a designed page fragment on the left and the system that produced it on the right, joined by a single hairline and one annotation. Not a wireframe: the left panel uses real words set in Instrument Serif and the real CTA component; the right panel shows the real type scale, the four real colour chips and three real tokens.

**Why it fits.** It is the only direction that can be made entirely from true material today. It demonstrates craft by *being* the craft, which matches the "the site is the deliverable" positioning of the case study.

**Exact contents.**
- Left panel (browser-framed, 3:2): eyebrow `01 · DESIGN`; a two-line serif headline such as "Clear site. Real work." (real words, no lorem); a one-line muted sans sentence; the real primary + secondary `Cta`; beneath, three ledger rows `01 / 02 / 03` with short labels (Discover / Design / Build) rather than blank cards.
- Seam: one vertical hairline with the label `SAME HANDS` set vertically, or a single `=` glyph in the display serif. No spark.
- Right panel (plain card, no backing plate): `02 · BUILD`; type scale rows `Display 10.4rem / Heading 4rem / Body 1.6rem` with real glyphs; four chips `paper · ink · blue · line` with the real hex values; three tokens `--color-blue #1554cb`, `--spacing 0.4rem`, `motion none`; a 375 / 768 / 1280 breakpoint ruler.
- Below both: one caption line in the ledger voice, e.g. `Designed and built by the same person · Next.js · zero animation`. No slogans.

**Desktop composition (≥1280).**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ FOUNDER-LED DIGITAL STUDIO · AUSTRALIA                                      │
│                                                                             │
│ Custom websites            ┌───────────────────────┐  ┌──────────────────┐ │
│ and digital                │ ● ● ●  ─────────      │  │ 02 · BUILD       │ │
│ products, designed         │ 01 · DESIGN           │  │ Display   Ag     │ │
│ and built around           │ Clear site.           │  │ Heading   Ag     │ │
│ your business.             │ Real work.            │ =│ Body      Ag     │ │
│                            │ one muted sentence    │  │ ■ ■ ■ ■  chips   │ │
│ Lead paragraph (52ch)      │ [Start]  [View work]  │  │ --color-blue …   │ │
│ [Start a project] [Work]   │ 01 Discover ───────── │  │ --spacing   …    │ │
│                            │ 02 Design  ───────── │  │ motion    none   │ │
│                            │ 03 Build   ───────── │  │ 375 ·768 ·1280   │ │
│                            └───────────────────────┘  └──────────────────┘ │
│ ─────────────────────────────────────────────────────────────────────────── │
│ MODEL  Founder-led   BASE  Australia · remote   CRAFT …   RESPONSE …        │
└─────────────────────────────────────────────────────────────────────────────┘
```

Grid: headline + lead + CTAs in columns 1–7; composition in columns 8–12, top-aligned with the headline's cap height. The headline keeps its current size; the composition's height is tied to the headline block, not the other way round.

**Mobile composition (<768).**

```
┌─────────────────────────┐
│ EYEBROW                 │
│ Headline (4 lines)      │
│ Lead                    │
│ [Start a project]       │
│ [View our work]         │
│ ┌─────────────────────┐ │
│ │ 01 · DESIGN         │ │
│ │ Clear site.         │ │
│ │ Real work.          │ │
│ │ [Start] [Work]      │ │
│ ├─────────────────────┤ │
│ │ 02 · BUILD          │ │
│ │ Ag  Display 4.6rem  │ │
│ │ ■ ■ ■ ■             │ │
│ │ motion none         │ │
│ └─────────────────────┘ │
│ MODEL / BASE / …        │
└─────────────────────────┘
```

On mobile the two panels stack inside one frame, the type-scale rows drop to one, the ruler is removed and all text remains real text at ≥12px.

**Replaces or evolves current?** Replaces `homepage-signature.svg` in the page. The SVG can remain as the social/OG image source.

**Implementation.** A server component `HeroSpecimen` (`src/components/home/HeroSpecimen.tsx`) built from `div`s, the existing `Cta`, `Eyebrow` and `meta-label` utilities, and a small inline SVG for the browser chrome dots and ruler. `aria-hidden="true"` on the whole figure with a one-sentence `sr-only` description. No images requested.

**Complexity:** Medium.
**Risks:** self-referential (a page showing a page) can feel navel-gazing if the inner headline is too similar to the outer one — use different, shorter words. Must be careful that the inner `Cta`s are not real links (render as `span`s with the same classes).

### Direction B — Responsive digital product composition

**Concept.** One strong desktop interface and one mobile view of the same product, with four small system annotations (grid, component, breakpoint, performance).

**Why it fits.** This is the classic portfolio-grade hero and the direction the earlier redesign blueprint (docs/ui-forge-redesign/08) assumed. It communicates range and real UI quality instantly.

**Exact contents.** Desktop frame (16:10) showing a real product screen; phone frame (19.5:9) overlapping its lower-right corner by ~20%; annotations: `12-col grid`, `component · ledger row`, `375 → 1440`, `LCP < 2.5s` (only if measured and true).

**Desktop composition.** Same 7/5 split as A; the composition overflows the right gutter by ~60px to interrupt the grid.
**Mobile composition.** Phone frame only, 70% width, right-aligned, with two annotations.
**Replaces current?** Yes.
**Implementation.** Two real screenshots inside HTML device frames (`DeviceFrame` component), annotations as HTML.
**Complexity:** Medium (frames) — but **the only real product available today is this website**, which makes B a picture of the page the visitor is already looking at.
**Risks:** generic device-mockup feel; cannot be truthful until a client product is approved for publication. Recommended as the *future state* of the hero slot once client work exists, not as the first pass.

### Direction C — UI Forge system blueprint

**Concept.** A five-node relationship diagram in the editorial/technical idiom: *Business problem → Content & UX → Interface & design system → Development & platform → Launch & performance*, with "one person" bracketed across all five.

**Why it fits.** It expresses the process-as-one-system idea without needing project imagery, and it reuses the process-map vocabulary.

**Exact contents.** Five hairline cells on one spine; under each, two or three ledger labels (e.g. under Platform: `Next.js · Shopify · HubSpot`); a single bracket spanning all five labelled `SAME HANDS`.
**Desktop composition.** Full-width band directly under the hero copy (where the signature sits now), 240px tall.
**Mobile composition.** Vertical spine, five rows.
**Replaces current?** Yes.
**Implementation.** HTML/CSS; could share markup with the process map replacement.
**Complexity:** Low.
**Risks:** reads as a process diagram, which the page already has twice (home rail, process page). Abstract; shows *that* there is a system, not *what quality* the studio produces. Weakest at demonstrating craft.

---

## 6. Recommended hero direction

**Direction A, built in HTML/CSS, with the slot designed to accept Direction B later.**

Reasons:
1. It is truthful today without any client work.
2. It fixes the four factual inconsistencies (font, blue, radius, motif) by construction, because it is rendered with the site's own tokens.
3. It reflows on mobile instead of shrinking; every label stays legible.
4. It costs zero image bytes and can be `priority`-free because it is DOM.
5. When the first client project is published, the right-hand column can swap to a `ProjectComposition` (Direction B) with no layout change: both occupy columns 8–12 at ~3:2.

Implementation note for the next prompt: keep the H1, lead, CTAs and the facts ledger exactly as they are; change only the grid (`lg:grid-cols-12` wrapping the headline block in `lg:col-span-7` and the specimen in `lg:col-span-5 lg:col-start-8`), remove the full-width `<figure>` with `HOMEPAGE_SIGNATURE`, and add the specimen component. Keep `HOMEPAGE_SIGNATURE` in the manifest for OG use only.

---

## 7. Page-by-page visual opportunities

### 7.1 `/services`

Current: seven service rows, each with description, note, deliverables and a 1200×750 graphic in the right 8 columns. The family is consistent and the diagrams are mostly good *ideas* (purchase path, app shell + components, phone trio + kit, monitoring + timeline). The problems are labelling, fonts, mobile and two gaps.

| Service row | Graphic shown | Baked-in title | Fit | Action |
| --- | --- | --- | --- | --- |
| 01 Web design & development | websites.svg | "Websites" | Good idea (desktop + phone + site tree + breakpoints) | Strip header; keep diagram |
| 02 Website redesign | landing-pages.svg | "Landing pages and campaigns" | **Wrong subject** | New diagram: *Keep / Improve / Replace* audit columns → redirect map → new build |
| 03 Shopify development | ecommerce.svg | "E-commerce" | Good (product → cart → checkout) | Strip header; add a small "theme path / Hydrogen path" fork at the left |
| 04 HubSpot websites | landing-pages.svg | "Landing pages and campaigns" | **Wrong subject, duplicate** | New diagram: *Modules* (hero, feature, form, CTA) assembled into pages → *Form → Contact record → Campaign report* |
| 05 Web applications | digital-products.svg | "Digital products" | Good (shell + workflow + components) | Strip header |
| 06 Mobile applications | mobile-apps.svg | "Mobile applications" | Adequate; three phones are near-identical | Strip header; make the three screens genuinely different (list, detail, form) |
| 07 Website maintenance | ongoing-care.svg | "Ongoing care" | Risky: green "OK" status rows look like a live dashboard | Strip header; replace OK rows with a *care calendar* (monthly checks as tick marks) and a *handover* cell to echo "no lock-in" |

Cross-cutting: remove the `SERVICE / 0n` header band, serif title and descriptor from all seven (the row already shows the numeral and name in real type). This reclaims ~30% of each graphic's height, which is what makes them legible at 335px on mobile. Replace fonts/blue/radius per §9. Render as HTML/CSS components (`ServiceDiagram` with a `variant` prop) or regenerate as SVG with the fonts installed for generation — HTML is recommended so the same component can appear at two sizes.

### 7.2 Service detail pages (`/services/[slug]`)

Currently zero images across 6,400–6,700px of desktop text and eight consecutive text sections. One graphic per page is enough; it must be the *same* diagram the visitor saw on `/services` (recognition, not novelty).

Placement: between the header lead row and the dark "Who it is for" band, full width inside `container-site`, hairline border, with a ledger caption. On mobile the diagram-only variant stays legible.

Page-specific contents, all drawn from the existing service graphic family:
- Web design & development: responsive site anatomy (desktop + phone + site tree + breakpoints).
- Website redesign: keep / improve / replace columns → redirect map.
- Shopify development: product → cart → checkout, with the theme / Hydrogen fork.
- HubSpot websites: module library → page → form → contact → report.
- Web applications: app shell + workflow + component kit.
- Mobile applications: shared system → iOS + Android screens.
- Website maintenance: care calendar + monitoring + handover.

Optional second visual on `web-design-development` only: the Platform decision diagram (§4.6) in section 04 "Choosing the right website platform", replacing nothing — it shares the component with the homepage.

### 7.3 `/process`

The map is good on desktop: the grouped brackets, the blue design numerals and the single spine express "one line" well. Fix three things:
1. Mobile: at 375px the 1600×680 SVG renders ~160px tall with 3px labels. Hide the image below 768px and show a vertical HTML variant (seven rows on one left spine, group brackets as side labels), or simply hide it and let the phase ledger carry the content.
2. Vocabulary: "DESIGN / DEVELOPMENT / CARE" vs the homepage's "Plan & design / Build & launch / After launch". Use one.
3. Fonts and blue per §9.

No new graphics. The seven-phase ledger below the map should stay typographic; a per-phase illustration would add seven images for no comprehension gain.

### 7.4 `/about`

The artefact approach is effective and honest; keep it. Correct it:
- "Aa — Instrument Serif / Instrument Sans" is set in Georgia and Helvetica. Rendered as HTML it would be true.
- Token panel: `blue: "#1e6fff"` → `#1554cb`; `radius.pill = 999` → `radius 2px`; `export const` pseudo-code → plain `--color-blue`, `--spacing`, `motion: none` lines that match `globals.css`.
- The browser artefact's "site" is a wireframe; replace with a 1:1 crop of the current homepage hero (real screenshot) so "the work, not a photo" shows the work.

Real founder photograph: **optional, not recommended as a requirement.** The previous redesign docs (06, 08) assumed a portrait; the current honesty constraint only forbids *fake* portraiture. A plain, documentary photograph (working environment, natural light, no stock styling) would materially improve trust **on About only**, placed in the founder's-note column above the ledger, with the artefacts composition moved below the ledger at 3:2. If the founder prefers not to be pictured, the artefact approach already does the job; do not add a silhouette or avatar placeholder.

### 7.5 Case study (`/work/ui-forge-studio-website`)

A design/development case study must show the work. Today it shows three stale screenshots and ~4,000px of prose. Recommended evidence set, all truthful from the repository:

1. **Hero cover**: current homepage at 1440, re-shot from this commit (replaces the stale file).
2. **Responsive pair**: 1440 and 375 renders of the same page side by side in plain hairline frames (no device chrome) — reuse `CaseStudyMediaFigure` ×2 in a 2-column grid.
3. **Design-system crop** (HTML): type scale (display / heading / body with real sizes), colour chips with hex, spacing base, "motion: none". This is the Build panel of the hero specimen reused at full width.
4. **Content architecture** (HTML diagram): the real route tree — Home, Work (+ case studies), Services (+7), Process, About, Insights (+ articles, categories), Start a project — annotated "typed local content → CMS-ready". A sitemap is exactly the kind of artefact a business reader understands.
5. **Decision ledger figure** (optional): the existing "What changed" ledger already does this in text. Leave.
6. **Before/after**: only if screenshots of the *earlier single-product website* mentioned in "The challenge" exist. The October 4 screenshots in `docs/ui-forge-redesign/screenshots` are the pre-logo-change iteration of this same design, not a true "before", and would read as a trivial comparison. Skip unless the real before exists.
7. **Code**: none. The prose already names the stack; a code screenshot would be decoration.

Mobile: items 1 and 3 only; the pair collapses to the 375 render.

**Future client projects plug into the same format:** cover (16:10 desktop screenshot) → responsive pair → one system crop (their palette/type) → one architecture or journey diagram → outcomes ledger. Five slots, same components, project colour allowed only inside the frames.

### 7.6 `/work` index

Fine once the cover is current. When a second project exists, the alternating full-width rows will carry themselves. No change.

### 7.7 `/insights` and article pages

- Index: no covers (see §4.11).
- Article cover: the 3:2 crop leaves the lower 55% of the frame empty, repeats the H1 in Georgia directly under the real H1, carries the "+" spark twice, says `uiforge.studio`, and the tiny diagram is the only useful part. Recommended: drop the title, brand mark and footer from the on-page cover; crop to the diagram at 2:1 (`1200×600`); correct fonts and blue; or better, move the diagram into the article body next to the section it explains (cost factors under "The factors that move the price"; three architectures under the comparison; ownership layers under the layers section). The OG image keeps its title treatment because social cards need one.
- Long articles: only the three existing diagrams are warranted. Do not add diagrams to "How to brief a web designer" (draft) unless a section genuinely needs one (a brief checklist could be a hairline table, which is layout, not a graphic).

### 7.8 `/start-a-project`

The "Brief to proposal" schematic duplicates the "What happens next" list immediately above it, is hidden on mobile, and sits under a sticky column where it is rarely seen. **Remove it.** The page's visual job is the form, and the form is well set. If something must fill the column on tall desktop viewports, a two-line ledger ("Average reply: within two business days · Read by: the founder") is more useful than a diagram.

---

## 8. Existing graphics: retain / rework / remove

| Asset | Decision | What changes |
| --- | --- | --- |
| Homepage signature | **Replace** in page; retain SVG for OG | HTML/CSS `HeroSpecimen` per §6 |
| Services ×6 | **Rework** | Strip header band; real fonts/blue/radius; diagram-only; HTML component |
| Landing-pages (shared) | **Remove** from both rows | Two new diagrams: Redesign, HubSpot |
| Process map | **Retain** ≥768px, rework labels/fonts | Vertical HTML variant or hidden <768px |
| About artefacts | **Retain** | Correct facts; real fonts; real screenshot inside the browser artefact |
| Insight covers | **Rework** | Diagram-only 2:1 or moved in-body; fix domain |
| Insight OG | **Retain** | Regenerate with Instrument fonts installed for sharp |
| Start-a-project schematic | **Remove** | — |
| Case-study PNG ×3 | **Replace** | Re-shoot from current commit at 2880×1800 and 750×1624 |
| `Spark.tsx` | **Delete** | Unused; motif retired |
| `asset-lib.mjs` forgeSpark | **Retire** | Replace with the U-frame mark where a mark is needed (OG only); graphics otherwise carry no mark |
| Demo art ×15 | **Leave** | Production-off |

---

## 9. UI Forge Visual Support System

### 9.1 Principle

Graphics are **specimens and diagrams of true things**, rendered with the same tokens as the page. If a graphic cannot be made from something real (the site, its system, its routes, its process, a published project), it is not made.

### 9.2 Style

Editorial, technical, precise, restrained, useful. One accent. No depth, shadow, gradient, blur, motion or texture. No mascots, no metaphors, no forge imagery. The ledger voice (numbered, labelled, hairlined) applies inside graphics exactly as it does outside them.

### 9.3 Rendering rule

- **In-page graphics are HTML/CSS** (server components) with small inline SVG only for lines, arrows and rulers. This guarantees Instrument Serif/Sans, the real blue, the real radius, text reflow on mobile and crawlable/`aria-hidden` control.
- **Raster/SVG files are for off-site surfaces only** (OG images, email). Keep `scripts/generate-static-assets.mjs` for those, with `P.blue = '#1554cb'` and the Instrument fonts installed on the generating machine so sharp renders them.
- Real screenshots are PNG at 2× (`2880×1800` desktop, `750×1624` mobile), served via `next/image` with a 1px `--color-line` border, never inside device chrome.

### 9.4 Geometry

| Element | Rule |
| --- | --- |
| Frames (browser, card, phone) | 1px `--color-edge` (#c9c6bd) outer; 1px `--color-line` (#e8e6e0) inner rules. Never 2px. |
| Corner radius | 0 for frames and cards; 2px for buttons (matches `Cta`); 16px outer / 12px inner for phone frames only. No pills. |
| Browser chrome | 32px bar on `--color-paper`, three 6px dots in `--color-edge`, one 40%-width address pill in `--color-line`, one hairline below. Nothing else. |
| Phone frame | 1px edge, 16px radius, 44px status area with a 36×4 notch in `--color-line`; no hardware buttons, no bezel shading. |
| Grid inside graphics | 12 columns at 1px `--color-line`, shown at 40% opacity, only when the graphic is *about* layout. |
| Rulers | 1px `--color-edge`, ticks 4px/8px, labels in mono 11px. Reserved for hero and case-study system crops. |
| Registration corners | Retire from in-page graphics; keep on OG images as the one "blueprint" cue. |
| Connectors | 1px `--color-edge`, straight or single-elbow; open 6px arrowhead, same colour. Blue connectors only for the *chosen* path in a decision diagram. |
| Annotations | `meta-label` utility (12px 600 uppercase 0.16em `--color-muted`), leader line 1px edge, 8px gap. Max 4 per graphic. |
| Numbering | `01` tabular sans, `--color-blue` when the number is the index of a group, `--color-muted-dark` when it is a sub-item. Display-serif numerals only in the process map. |
| Depth | None. No offset backing plates, no shadows, no overlaps that imply stacking except the deliberate collage on About. |

### 9.5 Colour

Use the existing palette only: paper `#faf9f6`, white panels `#ffffff`, line `#e8e6e0`, edge `#c9c6bd`, muted `#555d6a`, muted-dark `#8a93a3`, ink `#0b1220`, blue `#1554cb`, blue-wash `#e8f0ff`.

- Blue is a *state*, not a decoration: one active cell, one chosen path, one primary button per graphic. Never more than two blue elements in view.
- Blue-wash is the only permitted placeholder fill (image areas inside interface specimens) and should cover less than 15% of a graphic.
- Dark compositions use ink with `white/15` hairlines, exactly like the dark bands on the site.
- Decide the logo blue: either change the lockup's cobalt `#1F45E0` to `#1554cb`, or document that the mark alone uses cobalt and nothing else does. Graphics never use `#1F45E0` or `#1e6fff`.
- Green/red: only for genuinely measured pass/fail data on a real project. Never in a generic "care" illustration.

### 9.6 Typography

- Display words inside graphics: Instrument Serif at the site's display scale or smaller; always real words, two lines maximum, never lorem.
- Labels and annotations: Instrument Sans via `meta-label`.
- Tokens, codes, breakpoints: `--font-mono` 12–13px, muted; limit to three lines per graphic.
- Minimum rendered text size in any graphic: 11px on mobile. If a label would fall below that, the graphic needs a mobile variant, not a smaller font.

### 9.7 Density

| Category | Elements in view | Text lines | Blue elements |
| --- | --- | --- | --- |
| Hero specimen | 2 panels, ≤12 sub-elements | ≤10 | ≤2 |
| Service diagram | 1 primary frame + ≤2 supports | ≤8 | 1 |
| Homepage micro-graphic (Why, Platform) | ≤10 cells | ≤10 | 1 |
| Article in-body diagram | 1 idea, ≤6 items | ≤8 | 1 |
| Case-study evidence | 1 screenshot or 1 crop | caption only | n/a |
| Article OG | title + 1 diagram + mark | ≤6 | 1 |

### 9.8 Visual categories (the reusable family)

1. **Interface specimens** — real or representative UI inside the browser/phone frame rules. Hero, services (websites, commerce, app, mobile), About site artefact.
2. **System diagrams** — process, decision, architecture, journey. Process map, Platform decision, Why "same hands", HubSpot module flow, redesign keep/improve/replace, content architecture.
3. **Project evidence** — real screenshots, responsive pairs, system crops. Case studies, Selected work.
4. **Editorial figures** — in-body article diagrams and OG covers.
5. **Micro-graphics** — ≤120px-tall ledger diagrams used inside a text section (Why). Use sparingly; never as bullets or icons.

Shared components to build: `Frame` (browser | phone | card), `Annotation`, `Connector` (inline SVG), `Ledger` cells (already exist as patterns), `SystemCrop` (type scale + chips + tokens), `DeviceFrame` for Direction B later.

---

## 10. Priority matrix

| Priority | Page / section | Current issue | Recommended visual | Why it matters | Effort | Reuse potential |
| --- | --- | --- | --- | --- | --- | --- |
| **P0** | `/`, `/work`, case study — project evidence | Screenshots show retired logo and headline | Re-shoot at this commit; add responsive pair + HTML system crop + route-tree diagram on the case study | Only real proof on the site currently contradicts the brand | Low (re-shoot) / Medium (crop + tree) | High: defines the evidence format for every future project |
| **P0** | `/` hero | Text-only first screen; wireframe below the fold; illegible on mobile; wrong fonts/blue/radius | `HeroSpecimen` HTML/CSS, Direction A, 7/5 split | Highest-traffic impression; carries the design+build claim | Medium–High | High: Build panel reused as the case-study system crop; slot accepts a project composition later |
| **P0** | `/services` graphics | One graphic serves two services; titles mismatch; fonts/blue/radius; illegible mobile | Strip header bands; two new diagrams; HTML `ServiceDiagram` family | Factual mislabelling on a sales page | Medium | High: same component on 7 detail pages |
| **P1** | `/services/[slug]` | Zero images; 8 text sections in a row | One service diagram under the lead, full width | Breaks visual fatigue; recognition from index page | Low once P0 services done | High |
| **P1** | `/` The right platform | Text-only; the key reassurance is unseen | Decision-path diagram (inputs → criteria → recommendation) | Shows the customer does not choose the stack | Medium | Medium: reused in web-design decision section |
| **P1** | Article covers | Empty lower half; duplicated title; wrong domain; Georgia | Diagram-only 2:1 or move in-body; fix facts | Visible on every article; cheap | Low | Medium |
| **P1** | `/about` artefacts | Georgia labelled Instrument Serif; wrong tokens | Re-render as HTML with real screenshot crop | A craft specimen must be accurate | Low | Medium: shares `SystemCrop` |
| **P2** | `/process` map on mobile | ~160px tall, illegible; vocabulary differs from home | Vertical HTML variant below 768px; align labels | Mobile users get decoration not information | Low | Low |
| **P2** | `/` Why UI Forge | Rail has 300px empty under copy; claim restated 3× | "Typical vs UI Forge" two-row micro-graphic | Makes the differentiator visible once | Low | Low |
| **P2** | `/` What we build | Text-heavy but intentional | Optional three family specimens in the left rail | Mild rhythm gain | Medium | Medium |
| **P2** | `/about` founder photo | None (by policy) | Optional real documentary photograph | Trust, only if founder wants visibility | Low (if photo exists) | Low |
| **P3** | `/start-a-project` schematic | Duplicates adjacent list; hidden on mobile | Remove | Clutter | Trivial | — |
| **P3** | `/` Problems we solve | Text-only | None — leave | Text is stronger | — | — |
| **P3** | `/` Scoping | Text-only | None — leave | Text is stronger | — | — |
| **P3** | `/insights` cards | Text-only | None at 3 articles | Maintenance cost > gain | — | — |
| **P3** | `/` How we work | Typographic rail | None; align group labels only | Already strong | Trivial | — |

---

## 11. First implementation sprint

Five changes, in order. Each is specified so it can be the next implementation prompt without another exploratory pass.

### Sprint item 1 — Project evidence (P0, Low/Medium)

1. Re-shoot with Playwright at this commit (production env vars, port 3100): `/` at 1440×900 full-page cropped to the first 1800px → `ui-forge-studio-home-desktop.png` 2880×1800 @2×; `/` at 375 → `ui-forge-studio-home-mobile.png` 750×1624; `/insights/what-affects-the-cost-of-a-website` at 1440 → `ui-forge-studio-insights-desktop.png`. Overwrite the three files; update `alt`/`caption` strings in `src/lib/caseStudies/local.ts` to describe the current headline ("designed and built").
2. Add a `SystemCrop` server component (type scale rows with real `clamp()` values, four chips with hex from `globals.css`, three tokens, "motion: none") and render it in the case study's Design & build section as the first figure, with caption "The system as shipped — values read from the stylesheet."
3. Add a `RouteTree` HTML diagram (real routes from `src/config/site.ts` and the content modules) in the Approach → Content architecture position, caption "Content architecture: typed local modules behind an async layer."
4. Convert the gallery to a 2-column responsive pair on ≥768px (desktop + mobile renders), stacked on mobile.
5. Update `updatedAt`.

### Sprint item 2 — Hero specimen (P0, Medium/High)

1. Create `src/components/home/HeroSpecimen.tsx` per §5 Direction A and §9 rules; `aria-hidden="true"` with an `sr-only` sentence.
2. In `src/app/[locale]/page.tsx`: wrap the headline, lead and CTAs in `lg:col-span-7`; place the specimen in `lg:col-span-5 lg:col-start-8 self-start`; remove the full-width signature `<figure>`; keep the facts ledger.
3. Mobile: specimen renders as the stacked variant beneath the CTAs with `mt-[4rem]`.
4. Verify: no element taller than the headline block at 1440; zero `transition`/`animation` computed styles (existing Playwright pattern); Lighthouse LCP unchanged or better (no image request in hero).

### Sprint item 3 — Service graphic family (P0, Medium)

1. Build `ServiceDiagram` with variants `websites | redesign | shopify | hubspot | webapp | mobile | care` per §7.1, using `Frame`, `Connector`, `Annotation`.
2. Replace `SERVICE_ASSETS` usage in `/services` with the component (diagram-only, no header band); keep `SERVICE_ASSETS` only if OG use is wanted later.
3. Render the same component on each `/services/[slug]` between the lead row and the dark band, with a `meta-label` caption.
4. Mobile: variants must pass the 11px minimum; drop secondary supports (site tree, kit) below 500px.

### Sprint item 4 — Platform decision diagram (P1, Medium)

1. `PlatformDecision` component: three ledger columns — *What you tell us* (7 inputs), *What we weigh* (editing control · flexibility · performance · running cost), *What you receive* (one highlighted "Recommendation" cell above a muted list of seven platform names). Connectors converge into the recommendation cell; the chosen path is the only blue.
2. Place full width under the existing three steps on `/`; reuse in section 04 of `web-design-development`.
3. Mobile: stack the three groups with a vertical connector.

### Sprint item 5 — Consistency batch (P1/P2/P3, Low)

1. Article covers: crop to diagram at 2:1 or move in-body; remove title/mark/footer; set domain; real fonts and blue; regenerate OG PNGs with Instrument fonts installed.
2. About artefacts: re-render as HTML (`SystemCrop` + real screenshot crop + grid cell); correct every token value.
3. Process map: vertical HTML variant below 768px; align group vocabulary with the homepage rail.
4. Remove the Start-a-project schematic and `START_PROJECT_VISUAL`; delete `Spark.tsx`.
5. `asset-lib.mjs`: set `blue` to `#1554cb`, retire `forgeSpark` and `pill`; this keeps the generator honest for the OG images that remain.

---

## 12. Asset / component reuse plan

| Component | Built in | Reused by |
| --- | --- | --- |
| `Frame` (browser / phone / card) | Sprint 2 | Services ×7, About artefact, case-study pair |
| `SystemCrop` | Sprint 1 | Hero Build panel, About, every future case study |
| `Connector` / `Annotation` | Sprint 3 | Platform decision, Why micro-graphic, route tree, process vertical map |
| `ServiceDiagram` | Sprint 3 | `/services`, 7 detail pages, optional What-we-build family specimens |
| `PlatformDecision` | Sprint 4 | `/`, web-design service page |
| `RouteTree` | Sprint 1 | Case studies (any project), optionally Website redesign diagram |
| `CaseStudyMediaFigure` (existing) | — | Pair layout; keep border/caption rules |
| `generate-static-assets.mjs` | existing | OG images only, after token fix |

Future client project: cover PNG + pair PNGs + `SystemCrop` with the project's values + one `RouteTree` or journey diagram. No new art style per project; project colour appears only inside frames.

---

## 13. Mobile considerations

- Every in-page graphic must have a defined <768px behaviour: reflow (HTML), simplified variant, or hidden with the content carried by adjacent text. "Scale the desktop SVG down" is no longer an accepted outcome anywhere on the site.
- Hero: stacked specimen under the CTAs; the first mobile screen remains headline + lead + CTAs (unchanged from today).
- Services: diagram-only variants, ≤2 frames, labels ≥11px.
- Process: vertical spine variant or hidden; the ledger already carries the seven phases.
- Case study: cover + 375 render + system crop; skip the pair.
- Platform decision: three stacked groups.
- Article figures: in-body diagrams reflow because they are HTML; OG images are never rendered on-page.

---

## 14. Accessibility and performance considerations

- No animation of any kind, in line with the standing mandate; verify with the existing computed-style Playwright check after each sprint item.
- Decorative compositions (hero specimen, Why micro-graphic, service diagrams that repeat adjacent copy) get `aria-hidden="true"` plus a single `sr-only` sentence. Diagrams that carry information not in the text (Platform decision, route tree) are real semantic lists/tables under the hood so screen readers get the content.
- Real screenshots keep descriptive `alt`; captions describe the decision, not the picture.
- Contrast: `--color-muted` on paper passes AA; `--color-muted-dark` (#8a93a3) does not for small text — use it only for indices ≥13px or decorative labels inside `aria-hidden` figures.
- Performance: moving the hero and services from `<img>` to DOM removes 7–8 image requests from the two heaviest pages. Screenshots stay `next/image` with correct `sizes`; the case-study cover is the only `priority` image. Keep every PNG under 300KB at 2×.
- High-contrast / forced-colors mode: hairlines rendered as borders survive; hairlines rendered as background colour do not. Use `border`, never `bg-edge` 1px gaps, inside graphics.

---

## 15. Deliberately text-only

These stay as typography and should not receive graphics in any pass:

- Homepage Statement band.
- Problems we solve.
- Scoping and investment.
- Insights cards and the Insights index.
- How we work rail on the homepage (label alignment only).
- The seven-phase ledger on `/process`.
- Service detail sections: Who it is for, Problems, Scope, How it runs, Why us, FAQs, Related guidance.
- About: The practical difference, Location and ways of working, Ownership.
- Start a project (after the schematic is removed).
- Footer project prompt.

---

## If we only make five visual changes, what should they be, in what order, and why?

1. **Replace the stale project screenshots and add a system crop + route tree to the case study.** Today the only real evidence shows a retired brand; this is the fastest credibility fix and it establishes the evidence format every future project will use. Files: three PNGs re-shot at this commit; new `SystemCrop` and `RouteTree` components; `local.ts` captions updated.

2. **Rebuild the hero's right half as a responsive HTML/CSS Design → Build specimen.** It gives the first screen a visual destination, proves the design+build claim with the site's real type and tokens, reflows on mobile, costs no image bytes, and leaves a slot that accepts a real project composition later. Grid change 7/5 at ≥1280; signature SVG retired from the page.

3. **Correct and complete the service graphic family and reuse it on the seven detail pages.** Removes a factual mislabelling (one "Landing pages" graphic serving two services), fixes fonts/blue/radius by rendering in HTML, strips the baked-in headers so diagrams are legible on mobile, and ends the zero-image state of seven long sales pages with one recognisable diagram each.

4. **Add the Platform decision diagram to the homepage and the web-design service page.** It is the one message the site repeats in prose that is materially clearer as a diagram ("you tell us; we weigh; you receive one recommendation"), and it adds the missing visual beat between What we build and Selected work.

5. **Run the consistency batch: article covers, About artefacts, process map on mobile, remove the Start-a-project schematic, fix the generator's blue and retire the spark.** Individually small, together they remove every remaining place where a craft specimen states something untrue about the craft (Georgia labelled Instrument Serif, `#1e6fff`, pill radius, `uiforge.studio`, the retired motif) and every remaining graphic that is illegible at 375px.

Do not add anything to Problems, Scoping, Insights cards or the process ledger; their restraint is part of what makes the rest land.
