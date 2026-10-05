# Current-site audit

## Method

The site was reviewed from source and at `http://localhost:3000` as a visitor would experience it.

- Desktop: 1440×1000
- Tablet: 768×1024
- Mobile: 390×844
- Core navigation, mobile menu, focus handling, form validation, selection chips, responsive tables, legacy redirects and all meaningful routes were checked.
- Scores reflect the present site, not the quality of the codebase in isolation.

## Brand, positioning and audience

### Current positioning

UI Forge sells a broad design-and-development engagement with one founder accountable from discovery through support. The most differentiated propositions are:

1. design and development are performed by the same person;
2. the client does not need to choose a platform before asking for help;
3. project decisions are explained in plain language;
4. essential accounts and assets stay client-owned;
5. ongoing care is optional rather than a lock-in mechanism.

### Services actually represented

- Custom and marketing websites
- WordPress, Webflow and HubSpot CMS websites
- Landing pages and campaigns
- Shopify and Hydrogen e-commerce
- Web applications, portals, dashboards and booking systems
- React Native mobile applications
- Maintenance, monitoring, hosting and ongoing improvements

### Likely target audiences

The copy appears aimed at Australian SMEs, founder-led businesses, professional services, local service organisations, growing e-commerce brands and teams that need a portal or internal tool. It is less suited to enterprise procurement because it lacks team depth, governance evidence and enterprise casework; it is less suited to very early micro-businesses because the recommended custom path and long qualification form signal a considered project investment.

### Current personality

- Premium but understated
- Technical without code-culture posturing
- Editorial and process-led
- Honest, calm and pragmatic
- Boutique/founder-led rather than agency-scale
- More serious than playful

### Trust assessment

The site creates trust through writing quality, process transparency, ownership policy, visual discipline and technical detail. It loses trust through missing external evidence:

- no verified testimonials;
- no client logos;
- no named founder;
- no founder portrait or documentary studio imagery;
- one portfolio entry, which is the site itself;
- no client outcomes or commercial metrics;
- public legal stubs containing internal notes;
- no published project starting range or qualification expectations beyond budget chips in the form.

The result is “credible thinking, unproven delivery.”

## Scorecard

| Category | Score | Rationale |
|---|---:|---|
| 1. First impression | 7/10 | The hero immediately feels crafted and more premium than a template. The restrained editorial system is memorable, but the breadth of services and absence of client proof make the studio feel earlier-stage than the polish suggests. |
| 2. Hero section | 7/10 | Strong headline, clear Australian/founder context and two useful CTAs. The phrase “forged around your business” is ownable. The generic lead and abstract design/build specimen do not answer “what have you achieved for businesses like mine?” |
| 3. Navigation | 8/10 | Simple, sticky and consistent. Active states work; the mobile dialog traps focus, closes on Escape and returns focus. At exactly 768px the desktop navigation fits with only ~23px between logo and nav, making the breakpoint visually cramped. |
| 4. Typography | 8/10 | Instrument Serif and Sans create a distinctive editorial voice with clear responsive sizing. Long pages use the same heading/ledger formula too often. Case-study content jumps from `h1` to `h3` in the Approach area. |
| 5. Colour system | 6/10 | Paper/ink/cobalt is coherent and mature. The main blue is 4.18:1 on paper, and white on blue is 4.40:1—both narrowly below WCAG AA for normal text. Blue is also used for small labels. |
| 6. Spacing and layout | 7/10 | Containers, measures, grid and section spacing are consistent. The hero has excellent breathing room. Repetition of large section pads and full-width hairlines creates excessive page length and a uniform “section after section” cadence. |
| 7. Components | 7/10 | CTA, eyebrow, metadata ledgers, cards, form fields and article blocks are consistent. Service and project systems are maintainable. The system lacks a richer proof component family, and several inline/toc/share controls have small mobile targets. |
| 8. Imagery and visuals | 5/10 | Service SVGs and the internal case-study screenshots are bespoke and properly described. The site remains dominated by text and interface artefacts. There is no real client photography, team/founder signal or varied work imagery. |
| 9. Motion | 4/10 | Zero motion removes distraction and respects reduced-motion needs. It also removes useful affordance, hover easing, state continuity and narrative pacing. The redesign should use a small functional motion vocabulary with a no-motion fallback. |
| 10. Conversion | 6/10 | “Start a project” is clear and repeated; response time and next steps are explicit. The form qualifies leads well but is long, proof is not adjacent to the strongest asks, and the site asks for a substantial enquiry before showing client outcomes. |
| 11. Portfolio/case studies | 3/10 | The internal project is unusually honest and well documented, with strong alt text, approach and technical detail. A buyer cannot infer success with external clients from one self-authored project; there are no business results, quotes, before/after evidence or related work. |
| 12. Content | 7/10 | Clear, concrete, non-jargony and stronger than typical agency copy. The service catalogue is too broad, the homepage repeats propositions, category archives are thin, and founder/legal placeholders weaken authority. |
| 13. Accessibility | 7/10 | Skip link, semantic navigation, focus-visible treatment, mobile focus management, labels, errors, alt text and reduced-motion rules are present. Contrast failures, small touch targets, case-study heading skips and ungrouped chip controls remain. |
| 14. Responsive quality | 8/10 | No horizontal overflow at tested breakpoints. Hero type scales well, tables scroll in a contained region, cards collapse logically and mobile menu is excellent. Page length, cramped 768px navigation and sub-44px service/toc/share targets need attention. |

**Overall: 6.6/10.** The site has a strong system and good writing, but its credibility and conversion ceiling is set by proof, focus and launch-readiness rather than by visual polish.

## Evidence screenshots

These are development-environment captures; the Next.js development indicator may be visible at the lower edge.

- [Desktop homepage](./screenshots/desktop-home.png)
- [Tablet homepage](./screenshots/tablet-home.png)
- [Mobile homepage](./screenshots/mobile-home.png)
- [Mobile menu](./screenshots/mobile-menu.png)
- [Mobile services](./screenshots/mobile-services.png)
- [Desktop case study](./screenshots/desktop-case-study.png)
- [Desktop Insights](./screenshots/desktop-insights.png)
- [Mobile start-project page](./screenshots/mobile-start-project.png)
- [Desktop form validation](./screenshots/desktop-form-validation.png)

## Detailed findings

### First impression and hero

What works:

- The off-white canvas and serif statement immediately distinguish the site from dark neon “developer agency” conventions.
- “Founder-led digital studio · Australia” sets scale and location honestly.
- The primary and secondary actions reflect the two highest-intent journeys.
- The design/build specimen supports the same-hands proposition.

What limits it:

- The lead lists output categories rather than naming the best-fit customer or commercial change.
- The specimen is self-referential; real project imagery or a compact proof reel would do more persuasive work.
- Hero credibility metadata describes the operating model, not evidence: “Founder-led,” “Australia,” “Design + development” and response time are useful, but no result or client signal appears.

Redesign implication: retain the typographic idea, shorten the explanation and put a credible project/result in the first viewport or immediately below it.

### Navigation

Desktop navigation is easy to scan and the CTA remains visible. Mobile navigation is one of the strongest parts of the site: large indexed links, clear state, strong contrast, a full-width CTA, focus trap, Escape support and focus return.

Issues:

- `md` switches to the six-item desktop layout at 768px, where spacing is visibly tight.
- Footer service links all go to `/services` rather than directly to the relevant anchor.
- No direct contact/email path appears in the desktop header, which is acceptable, but the main CTA must therefore remain low-friction.

### Typography and hierarchy

The serif/sans pairing should survive the redesign. It has brand value and supports the “crafted” positioning. Improvements should focus on editorial variety rather than wholesale replacement:

- create at least three section compositions rather than using the same eyebrow + heading + ledger;
- reduce line-height and display size only where they create excessive mobile height;
- introduce results numerals, captions and quotes as distinct voices;
- convert case-study section labels into a semantically correct `h2` structure;
- fix the duplicated homepage “07” index.

### Colour and contrast

Measured contrast ratios:

| Pair | Ratio | Result for normal text |
|---|---:|---|
| Ink `#0b1220` on paper `#faf9f6` | 17.78:1 | Pass |
| Muted `#555d6a` on paper | 6.31:1 | Pass |
| Soft blue `#7fa8ff` on ink | 7.98:1 | Pass |
| Muted dark `#8a93a3` on ink | 6.05:1 | Pass |
| Blue `#1e6fff` on paper | 4.18:1 | Fail AA normal text |
| White on blue `#1e6fff` | 4.40:1 | Fail AA normal text |

Use the existing deep blue (or a refined accessible cobalt) for normal-size action text and button fills; reserve the brighter blue for large display accents, rules and non-text decoration.

### Layout and page rhythm

The wide editorial canvas and 12-column system are strong. The problem is rhythm, not alignment. The homepage passes through problems, services, platform choice, work, process, why, scoping and Insights using similar spacing and border logic. On mobile it reaches roughly 12,700px.

The redesign should:

- reduce the homepage to seven or eight decisive movements;
- combine platform guidance with services;
- move detailed problem/service inventories to dedicated pages;
- alternate immersive casework, compact proof bands, split narratives and quieter text sections;
- ensure every section introduces new evidence or advances a decision.

### Components

Keep:

- strong CTA silhouette;
- eyebrow/index system in reduced use;
- metadata ledgers for case studies;
- controlled prose containers;
- crisp inputs and chip styling;
- inline article navigation.

Add:

- outcome badge/stat with source/context;
- client/sector credibility strip;
- before/after module;
- project scope/stack/results summary;
- founder proof card;
- testimonial/quote format that avoids carousels and star ratings;
- compact service-fit cards;
- visual process checkpoints;
- explicit “what happens after enquiry” panel near final CTA.

### Imagery

The current visuals are consistent but too inward-looking. Future imagery should prioritise:

1. real project interfaces at desktop and mobile;
2. project-specific art direction rather than one generic device-mockup style;
3. annotated details showing design/development craft;
4. restrained founder/workspace/documentary photography;
5. process artefacts such as sitemaps, prototypes, component specimens and performance evidence;
6. client brand marks only with permission.

Avoid stock teams, generic laptops, floating glass cards and decorative 3D objects unrelated to actual work.

### Motion

The current system intentionally contains no visual transitions. That is defensible for accessibility but too absolute for a premium portfolio experience. A redesigned system can remain calm while allowing:

- 120–180ms colour/underline feedback;
- 180–240ms image-mask or caption reveals when a card enters focus/hover;
- one restrained hero or project media loop only when it conveys the work;
- sticky case-study media transitions;
- no scroll hijacking, cursor replacement, parallax dependence or autoplay sound;
- a complete `prefers-reduced-motion` path that presents the same information instantly.

### Conversion

Strengths:

- CTA label is direct and consistent.
- Response time is explicit.
- The start page explains what happens next before the form.
- Form validation is usable: empty submit focuses `#sp-name`, shows four alert messages and prevents transmission.
- Project-type chips report `aria-pressed` state and toggle correctly.

Friction:

- The form asks up to 13 questions before the first conversation.
- No client quote, outcome or reassurance sits immediately beside the form.
- The budget range begins under $2,500 while the site otherwise positions custom work as premium; this can confuse qualification.
- Primary CTA treatment repeats at page and global-footer level without changing the message.

Recommendation: use a two-step form—fit and contact first, project detail second—or keep one page with clearly optional progressive sections. State typical fit or starting investment only when the studio can stand behind it.

### Portfolio

The internal case study is structurally strong: context, challenge, goals, approach, design/build, outcomes, screenshots and technical details. Its weaknesses are evidentiary:

- the client and provider are the same entity;
- outcomes are implementation outputs, not business effects;
- there is no before/after;
- there is no testimonial;
- related work cannot render with one project;
- work index metadata says “001 published,” highlighting scarcity.

Do not hide this. Keep it as an internal project, but it should not carry the homepage alone once client work is available.

### Content

The voice is strong: specific, calm and honest. Preserve this. Tighten repetition and narrow the service claim.

High-impact content corrections:

- publish the founder’s real name, role, experience evidence and a genuine image;
- replace legal stubs before any production launch;
- correct section numbering;
- reconcile README links to deleted documentation;
- decide whether thin category pages deserve indexation before the article library grows;
- clarify which services are core, adjacent or partner-delivered;
- explain realistic project fit and why the studio sometimes says no.

### Accessibility

Verified strengths:

- skip-to-content link;
- accessible nav labels and active states;
- mobile modal semantics, focus trap, Escape close and focus return;
- clear form labels and described error messages;
- focus-first-error behaviour;
- meaningful image alt text;
- no missing `alt` attributes on audited rendered pages;
- controlled reading measure;
- reduced-motion override;
- scrollable mobile comparison table avoids whole-page overflow.

Issues:

- contrast failures noted above;
- case-study heading skip;
- chip groups use a paragraph label and a group of toggle buttons rather than a named radiogroup/fieldset pattern;
- several service-index links are 38px tall at mobile;
- article table-of-contents links, breadcrumbs and share controls can be 17–32px tall;
- desktop/footer inline links often rely on text-height targets;
- the share controls are visually small and appear late in long articles;
- `role="dialog"` is always present on the hidden mobile menu; acceptable in practice, but `inert`/conditional mounting would make the off-state more explicit.

### Responsive quality

No route in the targeted mobile set produced horizontal page overflow. The custom-platform article’s 426px comparison table sits inside a 335px `overflow-x:auto` wrapper, which is the correct containment pattern.

Observed viewport-specific concerns:

- Mobile homepage: strong hero wrap at 46px, but extreme total length.
- Tablet 768px: full desktop nav appears, with limited breathing room.
- Mobile services: two-column index is readable, though multi-line labels create uneven rows and 38px targets.
- Mobile case study: 36px title is controlled; metadata and long body produce an approximately 9,000px page.
- Mobile article: 32px title is readable; table containment works; TOC/share controls need larger hit areas.
- Mobile enquiry: content stacks correctly, but the page reaches approximately 5,100px before the global footer.

## Priority findings

### P0 — launch/trust blockers

1. Replace legal stubs.
2. Confirm production environment/robots configuration.
3. Set founder identity or remove placeholder bylines.
4. Fix primary colour contrast.

### P1 — redesign-defining

1. Publish external case studies and outcomes.
2. Narrow service hierarchy.
3. Rebuild homepage around proof and reduce length.
4. Add human founder evidence.
5. Redesign work index and case-study media storytelling.

### P2 — quality refinements

1. Correct heading hierarchy and duplicated numbering.
2. Increase mobile targets.
3. Refine the 768px header breakpoint.
4. Group chip controls semantically.
5. Introduce restrained functional motion.
