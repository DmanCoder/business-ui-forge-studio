# Insights redesign — Mobbin research note

**Date:** 12 October 2026
**Scope:** `/insights`, the three published articles, and the category landing pages.
**Source:** Mobbin MCP (`search_sections`, `search_screens`), seven queries, 56 results returned, each image inspected. Links below are the canonical Mobbin URLs returned by the tools. Image URLs expire, so nothing is embedded here.

## 1. What the audit found

The pre-redesign pages were sound in voice and structure but visually underdeveloped:

- **Index.** A serif masthead, a "Browse by topic" link list, one typographic featured row and two text cells. No imagery anywhere, so the page read as a table of contents rather than a publication. Categories were separate routes with no search, facets, sorting, counts or empty state.
- **Articles.** A good header hierarchy (category, dates, reading time, serif H1, byline) and a strong "Short answer" idea, but the whole page sat in one 76rem column: TOC, summary, body, CTA, share and author stacked with identical hairline dividers. No lead media. Comparison tables were plain. Share controls still used legacy classes and a browser `alert()`.
- **Data.** Articles already live in a typed local module (`src/lib/insights/local.ts`) behind an async data layer, with computed reading time, categories derived from data, and `BlogPosting` + breadcrumb JSON-LD. There were no tags, no cover fields, and nothing searchable beyond the title.

Preserve: the ledger voice (meta labels, tabular numerals, hairlines, serif display), the Short answer, the in-body HTML figures, every URL, the JSON-LD, the newer/older links, the home page's text-only "Latest insights" rows. Recompose: everything else on the index and the article shell.

## 2. The most useful Mobbin references

### Index composition and cards

| Reference                | What works                                                                                                                              | Link                                                                   |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Fiasco — Insights grid   | Illustrated/photographed covers at one ratio, title then small category + minutes tags. Covers carry the page.                          | https://mobbin.com/sites/sections/df477caa-120a-4f19-a77e-6033b9809a71 |
| Fiasco — featured + grid | A lead story at double width with text beside it, then a uniform grid. Mixed cover types still read as one series.                      | https://mobbin.com/sites/sections/2374f5d7-5032-4f4e-b9a5-29c38045cee0 |
| Koto — Studio news       | A featured item with a right-hand column of secondaries, each with a type tag and date; dense but ordered.                              | https://mobbin.com/sites/sections/2bfdfddd-c306-4e76-9283-5c042304085c |
| Instrument — articles    | Meta line _above_ the cover (ARTICLE · 4 MINUTES), then image, then title with the summary run into the same paragraph. Very editorial. | https://mobbin.com/sites/sections/cf7b4f63-9585-414e-8c36-c3339c2054c0 |
| Maze — All articles      | A calm three-up grid with a single cover palette, category chip, title. Scales to any count.                                            | https://mobbin.com/sites/sections/e61a9b38-1dc3-4bf6-a32f-bb3c7024eecf |
| Face Formula — Journal   | Asymmetric, image-led masonry with tiny meta. Beautiful, but only works with photography.                                               | https://mobbin.com/sites/sections/dbc9921f-3b94-474b-b915-d632227d792f |
| MetaMask — blog          | Filter tabs above a two/three-column cover grid with pagination and a results-per-page control.                                         | https://mobbin.com/sites/sections/f690bd08-3a2b-4876-916d-818dbf632148 |

### Discovery: search, categories, facets, sorting

| Reference                   | What works                                                                                                                                                                                | Link                                                                                                                                              |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Claude — blog               | "Filter and sort" rail (Sort by, Category, Product, Use case) with a search field and grid/list toggle; illustrated covers on tinted blocks. The closest to a design-led filterable blog. | https://mobbin.com/sites/sections/3611151d-f476-4ba7-b5e7-5c155d8f5150                                                                            |
| Mistral — news              | One line: "Filter by category · 79 articles" with inline category links, search on the right. Minimal and honest about scale.                                                             | https://mobbin.com/sites/sections/7e408658-0b80-4344-8ae1-74f962cb392f                                                                            |
| Sequence — blog             | Featured row, then category chips with "All" first, then a compact list. Shows how the lead story and the filter row coexist.                                                             | https://mobbin.com/sites/sections/0d46fd8b-9863-45a7-9e6f-1ca259adc487                                                                            |
| Kajabi — Filter articles by | Search, "Sort by date", category chips, "Showing 588 items", "Clear All Filters"/"Reset All". The complete feature set in one toolbar.                                                    | https://mobbin.com/sites/sections/7e5fd686-022d-487f-b0fd-8b4da2cd61ac and https://mobbin.com/sites/sections/4e9604f9-9ccc-468c-b90b-521759baa2db |
| Dropbox — Resources         | Search + three dropdown facets + "Reset filters", heading with a count "(217)".                                                                                                           | https://mobbin.com/sites/sections/6ffea99b-fc22-4267-ac3e-aef73ca27a17                                                                            |
| Wise — blog                 | "Showing 434 articles" results label under select facets.                                                                                                                                 | https://mobbin.com/sites/sections/436a820a-9200-47e3-af1f-f1dec09f0217                                                                            |
| Function — All articles     | Centred pill filters ("Filter by: All …") above a photo grid; selected pill is solid.                                                                                                     | https://mobbin.com/sites/sections/a37c277a-7b6b-490b-acb0-27f897ddfd03                                                                            |
| Patreon — News              | Underlined text tabs for categories, search in the header.                                                                                                                                | https://mobbin.com/sites/sections/01caee51-0f60-4615-87de-2a2e67ef9b4a                                                                            |
| Upwork — Resource Center    | Tabs (All / …) over a featured card + grid.                                                                                                                                               | https://mobbin.com/sites/sections/04d81447-367c-4ace-9575-b69bcc4377ad                                                                            |
| Jasper — blog               | Left sidebar: search, sort, radio categories, "Clear Filters".                                                                                                                            | https://mobbin.com/sites/sections/810d4b42-8df6-419f-a30d-247605be4e93                                                                            |
| Sweatpals — Filters dialog  | Modal with chip facets, "Clear" and "Show 26 results" footer. The mobile model.                                                                                                           | https://mobbin.com/screens/9811faad-c1a7-414a-a9c6-e3f7eee75c07                                                                                   |
| HoneyBook — empty state     | "Want to try again?" with the active filters named and a "Reset filtering" action.                                                                                                        | https://mobbin.com/screens/b6c6ca9f-7c0a-435b-af0a-8b052c52c608                                                                                   |
| GetYourGuide — results      | Filter chips row + "122 results: …" status line.                                                                                                                                          | https://mobbin.com/screens/1ceb4c11-fd27-4054-90e3-792d0dd2d5ae                                                                                   |
| Magnific — active chips     | Removable active-filter chips with counts and "Clear all".                                                                                                                                | https://mobbin.com/screens/41c9b4d3-c4a9-41bc-9ca3-689531e7abb7                                                                                   |

### Article pages

| Reference                  | What works                                                                                                     | Link                                                                   |
| -------------------------- | -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| FARFETCH Tech — article    | Category label, bold headline, byline/date, wide lead image, vertical share rail. Clear top-of-page hierarchy. | https://mobbin.com/sites/sections/27c7bd89-e8e6-45de-a67f-4aaa5c22fc3a |
| Faire — article            | Serif headline, category pill, date line, share icons, then a wide hero image.                                 | https://mobbin.com/sites/sections/9e425155-32e3-4302-b2b3-b2781d4ec576 |
| Wise — article             | Italic standfirst between the byline and the body; quiet left-rule pull quote.                                 | https://mobbin.com/sites/sections/6b2b32fa-3147-46ee-a03b-27c1704fc107 |
| IKEA — article             | Full-bleed lead photo with the title beneath.                                                                  | https://mobbin.com/sites/sections/53a34728-f3c4-46e0-81b5-2daf235a5dc5 |
| Attio — article            | "On this page" rail beside the content with share links underneath.                                            | https://mobbin.com/sites/sections/7866659c-1438-4186-8ec4-500d137ba8b1 |
| Harvest — guide            | Left-hand numbered contents with the current section highlighted by a rule.                                    | https://mobbin.com/sites/sections/d8b28f9f-a640-4d0e-95a7-db737d105f1e |
| Better Stack — guide       | Dark hero with tags and byline, then "Contents" rail + body + CTA card.                                        | https://mobbin.com/sites/sections/e7e957c6-5a4a-4cd8-831b-7f0a65f19d87 |
| Dub — Terms                | Right-hand "On this page" with current item bold — proof the rail can be very quiet.                           | https://mobbin.com/sites/sections/825205b6-8aa3-4195-893d-0c348638a02e |
| Dropbox — Related Articles | Three illustrated covers with titles and bylines; the covers are a series.                                     | https://mobbin.com/sites/sections/3af6a5fe-ee5c-491d-871a-e2579f5efd05 |
| Miro — Read also           | A full-width CTA band directly before "Read also" cards.                                                       | https://mobbin.com/sites/sections/15ec4ad0-d294-479e-b8a4-029397fecd05 |
| Lemon Squeezy — Related    | Three cover cards followed by a plain list of further titles with dates.                                       | https://mobbin.com/sites/sections/e91d3577-88c1-42b4-8adb-64a460fd9ba9 |
| SSENSE — editorial         | Oversized display headline with a serif deck. Reference for the standfirst scale.                              | https://mobbin.com/sites/sections/4de98a06-dbff-4e54-83c6-a301c519bba0 |

## 3. What not to copy, and why

- **Photography-led layouts** (Face Formula, IKEA, Fiasco's portraits). The studio has no photography and must not invent any; covers have to be drawn.
- **Tinted colour blocks per card** (Claude, Mistral). Multi-colour tiles would fight the site's single-accent palette. One accent (cobalt), one stage (paper), hairlines.
- **Permanent filter sidebars** (Jasper, Claude). With three articles a sidebar is mostly empty and pushes covers to the right. A toolbar with an expandable panel keeps the artwork primary.
- **Dropdown-only facets** (Dropbox, Wise). They hide counts and need a click to see options; chips with counts show the shape of the library.
- **E-commerce density** (GetYourGuide, Magnific). Seven simultaneous filter chips, badges and sliders would read as a catalogue, not a journal.
- **Decorative hover motion.** Many references zoom covers on hover. The site bans animation; hover is an underline and a border change only.
- **Related-article cards with "Read more" buttons** (Gamma). The whole card is already a link; a button inside it is nested-interactive noise.

## 4. Three directions

### A. "Ledger magazine" — toolbar + featured + grid (chosen)

Masthead with the serif H1 and a facts row (articles, topics, author). One hairline toolbar: search, underlined category tabs with counts, a **Filters** control, then a status/sort row. Default view: the newest article at double width with its cover, then a cover grid. Any search or filter switches to a uniform grid. Filters open as an in-flow panel on desktop and a full-screen dialog on phones.

- _Advantages._ Covers are the first thing seen; the toolbar is one row at 1440; the empty and filtered states are obvious; it scales from 3 to 300 articles (featured only in the default view, paging after filters).
- _Drawbacks._ Needs a client component for discovery; the featured treatment disappears as soon as anything is filtered (deliberate, but a visible change).

### B. "Studio journal" — masthead + sticky filter rail + masonry

A left rail (search, sort, category radios, topic checkboxes, "Clear") beside a two-column masonry of covers at mixed ratios.

- _Advantages._ All controls visible at once; good for 50+ articles.
- _Drawbacks._ Empty rail with three articles; mixed ratios need hand-cropped art; the rail collapses to a drawer on mobile anyway, so two layouts to maintain.

### C. "Front page" — typographic lead + list, search hidden behind an icon

Keep the typographic featured row, add small square thumbnails to a list, put search behind a header icon that opens a command-palette overlay with suggestions and category shortcuts.

- _Advantages._ Lightest change; strong newspaper feel.
- _Drawbacks._ Fails the brief: discovery is hidden, facets have nowhere to live, thumbnails at list scale waste the artwork.

### Decision

**A.** It is the only direction where artwork, search and facets all stay visible without competing, where three articles look complete today, and where the same components (one cover ratio, one card, one explorer) carry a hundred articles later. It fits the audience — business owners evaluating a studio, based in Australia and worldwide — because the page answers "what do you know, and can I find the bit I need?" in one screen, without reading like a SaaS dashboard.

## 5. What was built from this

- **Covers:** three original SVG compositions on a shared "drafting sheet" stage, generated by `scripts/generate-insight-art.mjs` into `public/static/insights/art/` (3:2 cover, 5:2 wide, 1200×630 OG raster). No text, no logos, no prices.
- **Index:** `InsightsExplorer` (search, category tabs, Filters panel with Topics and a Reading-time facet that only appears once two buckets have articles, sort, status line, removable chips, Clear all, empty state, paging) over `lib/insights/discovery.ts`, a pure module the server also runs so the first HTML already matches the URL.
- **Articles:** header with category, dates, serif H1, standfirst, byline and topic links; wide lead media; sticky numbered contents rail with the current section marked; serif Short answer panel; numbered section openers; ledger tables with purposeful horizontal overflow on phones; ink "Next step" panel; related service + share; author footer; newer/older with thumbnails; related reading as cover cards.

## 6. Compactness refinement (13 October 2026)

A second pass on the index only, after the first build proved too tall for a three-article library. Mobbin was unavailable for this pass; the decisions lean on the Mistral one-line filter, the Sequence chip row and the Maze uniform grid already recorded above.

- **Hero.** Padding halved, the stats row removed, the headline sized to wrap on two lines at desktop widths, the supporting line moved beside it. At 1280×800 the hero now ends at 293px instead of 482px and the whole first row of covers is inside the viewport.
- **Toolbar.** One row from the lg breakpoint: search, category pills with data-derived counts, Filters, then the result count and sort. The count is one short label beside the sort control; the full description stays in an `aria-live` region for screen readers.
- **Filters.** Collapsed by default. Desktop: an anchored popover under the button (Escape, outside click and the button close it, selections persist). Below lg: the full-screen sheet with Clear and "Show N articles". Topics are a two-column checkbox list with counts; the "any of the selected" rule is unchanged.
- **One chip row.** Rendered only when a search, category, topic, reading-time or non-default sort is applied, with a single Clear all. The popover has no duplicate Clear.
- **Grid.** The featured section and "More articles" divider are gone. A uniform 16:9 cover grid (three columns from lg, two on tablets, one on phones); the newest article in the default view carries a "Latest" tag and a slightly larger title. One result renders as a single wide card with a max width; two results as two columns.
- **Microcopy.** The "Search covers…" line under the grid is now the search field's accessible description.
