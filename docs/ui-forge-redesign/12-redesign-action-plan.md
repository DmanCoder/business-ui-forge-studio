# Redesign action plan

## Delivery principles

- Content truth and permissions gate visual proof.
- Fix public trust/compliance blockers before a visual relaunch.
- Validate hierarchy with real content before high-fidelity art direction.
- Build the system through representative pressure-test pages, not every page at once.
- Preserve the current technical, SEO, accessibility, and responsive strengths.
- Do not add CMS, analytics, animation, or service routes without an operating reason.

## Phase 0 — Immediate trust and hygiene

### Objective

Remove risks that should not wait for the redesign.

### Work

- Replace the public Privacy and Terms placeholders with approved content or temporarily remove them from public launch until approved.
- Decide the intended behaviour for `/testimonials`: no link/route, a redirect to Work, or publication only after the existing verification threshold is satisfied.
- Correct the duplicated homepage section number “07”.
- Correct case-study heading order.
- Select accessible action-colour pairings to replace failing/borderline cobalt text/button combinations.
- Review the smallest breadcrumb, contents, share, service-index, checkbox, and footer targets.
- Decide whether thin category pages remain indexed; remove from sitemap or apply `noindex` until useful.

### Exit criteria

- No public page contains bracketed legal placeholders or “not for production” language.
- Critical heading, contrast, route, and target-size issues have tracked resolutions.
- No fabricated testimonial or proof is introduced.

## Phase 1 — Research validation and content inventory

### Objective

Confirm the strategy and determine whether the evidence exists to support it.

### Work

- Run the standalone Mobbin brief with Claude Design.
- Interview the founder on target clients, profitable work, preferred future mix, capacity, and differentiation.
- Inventory candidate projects, permissions, roles, artefacts, client contacts, outcomes, and image rights.
- Confirm whether the founder's name, portrait, biography, and availability model can be public.
- Validate three service paths against actual demand and delivery capacity.
- Review current analytics/search-console/referral evidence if available; define privacy-appropriate measurement needs.
- Decide Contentful's role: real source of truth, phased future CMS, or dependency/proxy to remove.

### Deliverables

- Approved audience/problem hierarchy.
- Evidence and asset register.
- Project shortlist with proof strength.
- Service architecture decision.
- Mobbin findings and pattern decisions.
- Measurement plan and CMS decision.

### Exit criteria

- At least two external project candidates are permission-feasible, or the launch scope is explicitly adjusted.
- Positioning and service boundaries are approved.
- Unknowns that affect IA or content are resolved.

## Phase 2 — Content strategy and evidence production

### Objective

Create the real material the new visual system will amplify.

### Work

- Draft message hierarchy, page purposes, CTA language, and content outlines.
- Interview project stakeholders and write evidence sheets separating facts, reports, interpretations, and objectives.
- Draft two external cases and revise the UI Forge internal case with explicit self-initiated context.
- Obtain testimonial, logo, name, image, and outcome publication approval.
- Produce founder photography and project media against planned crop/state lists.
- Draft approved Privacy and Terms content with appropriate professional review.
- Simplify the enquiry information model to essentials.

### Deliverables

- Content-ready homepage and representative pages.
- Two to three case-study narratives and media plans.
- Founder content/imagery.
- Verified proof library.
- Legal content.
- Contact-form field and consent specification.

### Exit criteria

- High-fidelity design will use substantially real copy and assets.
- Every proof item has a source, qualification, and permission record.

## Phase 3 — Visual exploration

### Objective

Translate Crafted Evidence into a distinctive, testable system.

### Work

- Explore two or three executions within the chosen direction—not the three earlier strategic directions again.
- Test accessible cobalt alternatives, paper/ink surface balance, type scale, grid breaks, evidence labels, founder treatment, and project art direction.
- Build a real-content hero, selected-project module, service path, quote/result, founder block, and project-fit close.
- Prototype paper-to-ink transitions and the proposed motion matrix with reduced-motion versions.
- Compare at 390px, 768px, and 1440px from the beginning.

### Deliverables

- Mood/attribute boards with explicit avoid list.
- Responsive style tiles or key modules.
- Selected visual route and rationale.
- Initial token proposal.
- Imagery and capture direction.

### Exit criteria

- The direction remains recognisably UI Forge and passes basic contrast/readability checks.
- Stakeholders approve one execution based on business fit, not novelty alone.

## Phase 4 — Homepage concept and validation

### Objective

Validate positioning, proof order, rhythm, and conversion on the highest-impact page.

### Work

- Design the homepage blueprint with real content at desktop, tablet, and mobile.
- Prototype key project media and header/menu behaviour.
- Test 10–15 second comprehension, work discovery, founder recognition, and CTA expectation with representative buyers.
- Review page length and repeated arguments.
- Run an early accessibility/design review for focus order, contrast, type, zoom, target sizes, motion, and menu behaviour.

### Deliverables

- Approved responsive homepage concept.
- Test findings and revisions.
- Component/state gaps.
- Updated content requirements.

### Exit criteria

- Target users can describe offer, audience, difference, and next step.
- Work is found early; unsupported claims are absent; mobile is composed deliberately.

## Phase 5 — Work and case-study concept

### Objective

Prove the design system can carry the site's main credibility content.

### Work

- Design the Work listing with the actual launch inventory.
- Design one full flagship case using context, constraints, decisions, before/after, responsive, technical, outcome, handover, and CTA content.
- Prototype local navigation and any media comparison/gallery with keyboard and reduced-motion states.
- Define crop ratios, captions, evidence labels, video controls, and project-specific theme boundaries.
- Validate the experience with both non-technical and technical readers.

### Deliverables

- Responsive Work page.
- Complete representative case study.
- Project content/media schema.
- Reusable case chapter patterns and accessibility behaviours.

### Exit criteria

- UI Forge's role, decision quality, implementation depth, and outcome are clear without reading every word.
- The system works with one flagship and a small honest portfolio.

## Phase 6 — Remaining page and responsive validation

### Objective

Apply the approved language to the smallest page set justified by the IA.

### Work

- Design Services, Process, About, Insights index, article, Start a project, Thank you, Privacy, Terms, 404, and key empty/error states.
- Add individual service pages only if Phase 1/2 content passes the uniqueness threshold.
- Test at 320/390/768/1024/1440 widths plus 200% and 400% zoom/reflow scenarios.
- Validate long words, form errors, missing media, one/many items, unpublished testimonials, and sparse work inventory.
- Resolve the tablet navigation breakpoint rather than inheriting the current crowding.

### Deliverables

- Complete responsive screen set.
- State/edge-case matrix.
- Updated IA and redirect map.
- Accessibility findings and resolutions.

### Exit criteria

- No page-level horizontal overflow, clipped controls, inaccessible disclosure, or content-dependent breakage.
- Every page has a clear primary role and next step.

## Phase 7 — Design system and implementation specification

### Objective

Turn approved pages into a maintainable implementation contract.

### Work

- Finalise semantic colour, typography, space, grid, radius, border, shadow, and motion tokens.
- Specify components, variants, content constraints, responsive rules, and all interaction states.
- Create an accessibility acceptance matrix for navigation, galleries, forms, disclosures, validation, and media.
- Define content models for projects, evidence, quotes, service paths, insights, SEO, and assets.
- Decide analytics events/consent and whether any animation dependency is warranted.
- Map old routes to new and define canonical/sitemap/noindex behaviour.

### Deliverables

- Design-system specification.
- Component inventory and state matrix.
- Content schemas.
- Motion/reduced-motion matrix.
- SEO/redirect/measurement plan.
- Implementation backlog with acceptance criteria.

### Exit criteria

- Engineers can implement without inventing missing responsive/state behaviour.
- No system decision depends on an unavailable asset or unapproved claim.

## Phase 8 — Development

### Objective

Implement the redesign incrementally in the existing stack while preserving working foundations.

### Recommended sequence

1. Semantic tokens, fonts, layout/container primitives, links/buttons, focus and motion foundations.
2. Header, mobile navigation, footer, and shared CTA.
3. Image/media and evidence components.
4. Homepage.
5. Work listing and representative case.
6. Services, Process, and About.
7. Insights and article templates.
8. Enquiry form, reCAPTCHA/Netlify integration, Thank you, and failure states.
9. Legal, 404, redirects, metadata, sitemap, robots, and structured data.
10. Remaining cases and content population.

### Repository-specific safeguards

- Keep App Router and existing SEO primitives unless there is a demonstrated defect.
- Preserve tested legacy 308 redirects.
- Maintain Netlify's form discovery endpoint and verify the hidden-field contract.
- Do not expose environment values; test reCAPTCHA with the existing optional path.
- Use typed content models regardless of local or Contentful source.
- Replace the blanket no-animation CSS only with approved motion/reduced-motion tokens.
- Continue `next/image` and define correct `sizes`; review the custom Cache-Control rule for `/_next/image` because the build/dev tooling warns about it.
- Avoid adding a heavy component or motion dependency for a small number of behaviours.

### Exit criteria

- Typecheck, lint, production build, automated tests, and content validation pass.
- Feature work matches design/state specifications at all target widths.

## Phase 9 — QA and acceptance

### Functional

- All routes, links, redirects, menus, accordions/tabs, media, forms, consent, spam protection, error/retry, and Thank you states.
- Netlify form detected and submissions verified in a safe staging environment.
- Metadata, canonical/hreflang, OG/Twitter, JSON-LD, sitemap, and robots inspected.

### Accessibility

- Automated scans plus keyboard, screen reader, touch, zoom/reflow, reduced-motion, and high-contrast/forced-colours checks.
- Heading/landmark order, accessible names, target sizes, focus visibility/order, status/error announcements, media alternatives, and colour contrast.

### Visual/responsive

- 320, 390, 768, 1024, 1280, and 1440+ widths; common browser engines and representative real devices.
- Long/short content, one/many projects, absent testimonial, image failure, slow connection, and system font fallback.
- Compare full-page captures for unintended rhythm and overflow.

### Performance and resilience

- Core Web Vitals/lab checks, image payloads, font loading, JS budget, video behaviour, hydration, and no-JS/basic-content expectations.
- Validate caching/headers on actual Netlify preview, not only local development.

### Content/legal

- Proof sources/permissions, spelling, dates, client names, result qualifiers, legal approval, privacy wording, entity/contact details, and link integrity.

### Exit criteria

- No open severity-one or severity-two accessibility, legal, form, routing, or data-loss issue.
- Performance and visual deviations are documented and approved.

## Phase 10 — Launch and learning

### Work

- Freeze/backup content and record current route/metadata baselines.
- Deploy a Netlify preview and perform final stakeholder/client-permission review.
- Run redirect/canonical/sitemap/form smoke tests immediately before and after production release.
- Monitor forms, 404s, Core Web Vitals, search indexing, and agreed conversion events.
- Review enquiries qualitatively: relevant project cited, perceived service, objections, and content gaps.
- Schedule 2-week, 6-week, and 3-month checks; update evidence claims at an agreed cadence.

### Rollback readiness

- Keep the previous deploy recoverable through the hosting platform.
- Maintain an explicit redirect map and content export.
- Separate launch-critical changes from optional animation/experiments so the latter can be disabled without reverting the whole site.

## Prioritised backlog

### P0 — Before any redesign launch

1. Approved Privacy and Terms.
2. Honest founder identity/operating model decision.
3. Permissioned case-study content and proof register.
4. Accessible action colour and core interaction states.
5. Correct heading structure and public route behaviour.
6. Fully verified enquiry flow and consent.

### P1 — Core redesign

1. Homepage hierarchy and shorter rhythm.
2. Work listing and at least two meaningful cases.
3. Three-path Services model.
4. Founder-led About and artefact-led Process.
5. Simplified enquiry form.
6. Responsive/motion system and complete QA.

### P2 — After evidence and operating capacity grow

1. Individual service pages.
2. More project cases and filtering.
3. Public testimonial collection/route.
4. Mature topic taxonomy.
5. Experiments, richer project media, or privacy-appropriate optimisation.

## Key decisions requiring the founder

- Which work can be named, shown, measured, and attributed?
- Is personal identity/portrait publication acceptable and sustainable?
- Which three project types are strategically wanted—not merely technically possible?
- What post-launch support promise can reliably be maintained?
- What qualifies a lead, and which form questions are genuinely required before the first reply?
- Will Contentful be operated as a real CMS?
- Which measurement tools and consent approach fit the site's audience and legal obligations?

## Definition of done

The redesign is complete when it is truthful, distinctive, accessible, responsive, technically maintainable, and supported by enough real evidence to justify its visual confidence—not simply when every page has new styling.
