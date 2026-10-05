# Standalone Claude Design + Mobbin research brief

## Your role and assignment

Act as a senior digital art director, product designer, UX strategist, and evidence-minded researcher. Use Mobbin to conduct a second, deeper visual/interaction research round for **UI Forge Design**, then turn the findings into a refined, implementation-ready creative brief.

Do not begin by redesigning screens. First understand the business, test the proposed art direction against relevant patterns, record why each reference is applicable, and reject patterns that create the wrong customer perception. This document contains all context required; you should not need other audit files.

## Business context

UI Forge Design is a founder-led Australian digital studio working remotely with SMEs, founders, marketing teams, and product/operations teams. It combines design and development through the same senior hands. Current capabilities span:

- marketing and content websites;
- WordPress, Webflow, and HubSpot implementations;
- landing/campaign experiences;
- Shopify and Hydrogen commerce;
- web applications, portals, and dashboards;
- React Native/mobile product work;
- ongoing support and iterative improvement.

The business should not be positioned as an unlimited full-service agency. Its credible difference is connected design/development, practical platform-neutral advice, direct founder accountability, plain-language communication, client ownership, and responsible handover/support.

The website must:

1. establish a memorable, premium studio position;
2. make real work and decision quality the primary proof;
3. reassure non-technical buyers without hiding developer capability;
4. explain broad capability as three clear service paths;
5. convert good-fit visitors into project enquiries;
6. support search discovery through useful insights;
7. remain maintainable by a small founder-led business.

## Current site and technical context

The production codebase is Next.js App Router, React, TypeScript, Tailwind CSS v4, `next/image`, custom icons, Netlify forms/deployment, and some Contentful dependencies. Current case studies and insights are local typed content. The site has solid metadata, canonical/hreflang, JSON-LD, sitemap, robots, and redirect foundations. No analytics or animation library is currently present.

The current brand uses warm paper, deep ink, cobalt blue, Instrument Serif, Instrument Sans, sharp rules, square geometry, and editorial numbering. It feels restrained, premium, technical, and generally clear. Preserve useful equity unless research demonstrates a better reason to change it.

## Most important audit findings

### Strengths

- Distinctive paper/ink/cobalt editorial foundation.
- Strong serif/sans pairing and generally good hierarchy.
- Plain-language content and unusually honest ownership/platform guidance.
- Good responsive foundations with no page-level horizontal overflow in reviewed routes.
- Accessible mobile-menu fundamentals: focus management, Escape close, focus return, and scroll lock.
- Enquiry validation focuses the first invalid field and exposes helpful errors.
- Good SEO/structured-data foundation.
- A sensible policy of not publishing unverified testimonials.

### Weaknesses and risks

- Only one substantial public case study, and it is the studio's own site. There is not enough external client proof.
- No named founder or portrait is visible; the byline is generic, weakening accountability.
- The mobile homepage is approximately 12,700px long and repeats ownership, platform, process, and capability arguments.
- The service list is broader than the available evidence supports.
- Privacy and Terms are currently placeholder/stub content with bracketed fields and are a launch/trust blocker.
- The `/testimonials` route returns a generic 404 because the publication threshold is not met.
- Current action cobalt has borderline/failing normal-text contrast in common pairings: `#1e6fff` on warm paper is about 4.18:1; white on `#1e6fff` is about 4.40:1.
- The experience is entirely static because global CSS removes all transitions/animations. This is safe but eliminates useful feedback and continuity.
- Some inline, breadcrumb, table-of-contents, and share controls are smaller than a strong 44px touch-target goal.
- The enquiry form is long and may create avoidable friction.
- Tablet navigation technically fits at 768px but is crowded.
- Case-study heading structure skips from H1 to H3 in one reviewed path.
- Category pages are thin but indexable.

### Current-site score summary

- First impression 7/10
- Hero 7/10
- Navigation 8/10
- Typography 8/10
- Colour 6/10
- Layout/spacing 7/10
- Components 7/10
- Imagery/visual evidence 5/10
- Motion 4/10
- Conversion 6/10
- Portfolio/case studies 3/10
- Content 7/10
- Accessibility 7/10
- Responsive quality 8/10
- Overall: approximately 6.6/10

## Recommended creative direction

The working concept is **Crafted Evidence**: a proof-led editorial experience for a founder-led studio where design and development remain connected.

It should feel:

- exact, human, quietly confident, and authored;
- premium without fashion-agency obscurity;
- technically capable without cyber/developer-portfolio clichés;
- warm without becoming a generic beige consultancy;
- visually expressive through real work, not invented 3D or abstract AI imagery.

The desired perception is:

> This is a senior, hands-on partner who can explain the trade-offs, make the work beautiful, build it responsibly, and leave us with something we confidently own.

### Proposed visual language

- Evolve the existing warm paper, deep ink, and cobalt palette; use a darker accessible cobalt for action.
- Retain Instrument Serif and Instrument Sans through exploration unless comparison proves a meaningful upgrade.
- Use strict shared grids, fine rules, editorial pacing, and occasional evidence-driven grid breaks.
- Prefer flat surfaces, spacing, and borders to generic rounded elevated cards.
- Use squared or 2–6px corners; reserve pills for actual filters/states.
- Bring in real project captures, responsive states, process artefacts, a founder portrait, and verified client material.
- Use annotations/evidence labels only when they add context such as role, scope, result type, or decision.
- Add restrained feedback and narrative transitions with a complete reduced-motion version.

### Proposed homepage cadence

1. Outcome-led position plus flagship project evidence.
2. Compact verified proof strip.
3. Two to four selected projects.
4. Buyer problems translated into outcomes.
5. Three service paths: websites & commerce, digital products, ongoing care.
6. Founder-led advantage and direct accountability.
7. Delivery process shown through real artefacts.
8. Verified quote/result when available.
9. Compact insights coda if publishing is active.
10. Strong project-fit/contact close.

### Proposed portfolio model

Case studies should combine context, constraints, major decisions, before/after evidence, visual design, responsive behaviour, implementation details, results with evidence labels, verified testimonial, handover/ownership, and a relevant next action. Work should be shown through large, legible media rather than a wall of equal cards or tiny device mockups.

### Content constraints

Do not design as if the studio already has many clients, testimonials, or statistics. Use clearly marked content placeholders in concepts and specify the evidence required. The recommended launch content target is two external permissioned case studies plus the existing internal studio-site case, a real founder identity/portrait, verified claims, and completed legal pages.

## Mobbin research method

For each category below:

1. Select 3–6 highly relevant Mobbin flows/screens, prioritising recent production interfaces over speculative concepts.
2. Capture product/company, platform, screen/flow, direct Mobbin reference where available, and date/version if shown.
3. Explain why the pattern maps to this founder-led agency—not merely why it looks good.
4. Record hierarchy, content density, interaction, responsive implications, accessibility risks, and implementation complexity.
5. Compare at least two competing approaches.
6. Choose, adapt, or reject the pattern with reasons.

Mobbin is strongest for interaction and conversion patterns, not agency art direction. Translate product patterns carefully and keep the editorial identity intact.

## Research categories and questions

### 1. Premium service and outcome-led heroes

- How do high-trust service/product pages explain outcome, audience, proof, and action inside the opening region?
- What amount of supporting copy remains scannable?
- Where does evidence appear relative to the CTA?
- How can one project visual prove capability without resembling a SaaS dashboard collage?
- What changes on mobile: order, scale, proof density, and CTA placement?

### 2. Selected-work and content-gallery structures

- How do premium experiences prioritise one flagship item while keeping more inventory discoverable?
- When are editorial lists, asymmetric grids, carousels, or horizontal galleries justified?
- How are category, role, status, and outcome shown without clutter?
- What makes a project target obvious on touch and keyboard?
- Which gallery patterns remain understandable with one to three items?

### 3. Case-study storytelling and progressive disclosure

- Do strong experiences show the entire story linearly, progressively reveal it, or use a sticky local index?
- How are context, challenge, decision, implementation, and outcome differentiated?
- How can facts remain visible without becoming a dashboard?
- Which before/after and media-comparison patterns are accessible without drag-only interaction?
- How should long case pages recover navigation and CTA on mobile?

### 4. Trust, logos, testimonials, and evidence

- How is proof attached to the claim it supports?
- What is the clearest treatment for one strong quote versus many quotes?
- How do interfaces expose attribution, source, date, result status, or verification without legalistic clutter?
- What alternatives work when logos/testimonials are not yet available?
- Which social-proof patterns feel manipulative, inflated, or anonymous?

### 5. Founder and human-presence modules

- How do small premium businesses introduce the accountable person without turning the entire brand into an influencer profile?
- Which combinations of portrait, biography, credentials, values, and role feel most trustworthy?
- How can direct involvement and limited capacity be framed as quality signals?
- What portrait crops and content order work on narrow screens?

### 6. Service selection and comparison

- How do users compare three service paths without a large pricing table?
- Which patterns explain “best for”, outcomes, deliverables, constraints, and relevant proof efficiently?
- When do tabs, accordions, comparison rows, or separate pages help or hide information?
- How can platform options stay subordinate to the buyer's situation?

### 7. Process, timelines, and artefacts

- Which step/timeline patterns communicate progress and responsibility rather than generic agency theatre?
- How can selecting a stage update an artefact accessibly?
- What remains visible when motion is disabled?
- What density works on mobile without a long stack of repeated cards?

### 8. Contact and lead-capture flows

- What is the minimum information needed before a useful first reply?
- When do single-page, multi-step, conditional, or conversational forms improve completion?
- How are budget, timeline, project type, privacy, file upload, and optional details framed without anxiety?
- How do the best forms show error summaries, field errors, loading, bot-check, success, retry, response time, and alternative contact?
- Which mobile keyboard/input/autofill patterns reduce effort?

### 9. Mobile navigation and CTA recovery

- Which menu structures preserve a premium tone while retaining familiar behaviour?
- How are long labels, contact details, social links, and a primary CTA ordered?
- When is a sticky header or bottom CTA genuinely helpful versus obstructive?
- How are focus, close, back, scroll lock, and current location handled?

### 10. Editorial long-form and insight pages

- How are reading measure, table of contents, progress, related content, author identity, and updated date balanced?
- When is a sticky contents panel useful, and how does it collapse on mobile?
- How can topic-relevant service CTAs appear without interrupting the answer?
- What share/copy-link patterns provide adequate targets and feedback?

### 11. Motion, transition, and interaction feedback

- Which transitions clarify state or continuity rather than merely add polish?
- What durations and easing feel premium but responsive?
- How do galleries, menus, accordions, tabs, media, and form states behave with reduced motion?
- Which patterns create performance, vestibular, or discoverability risk?

### 12. Editorial design-system patterns

- How do systems combine display typography with functional UI safely?
- How are borders, surface changes, annotations, captions, and project-specific colour tokenised?
- How do they prevent responsive layouts from becoming endless bordered cards?
- Which focus, error, empty, loading, and disabled states need explicit art direction?

## Non-negotiable constraints

- Target WCAG 2.2 AA and design visible focus, keyboard, zoom/reflow, contrast, target-size, reduced-motion, and error behaviour from the outset.
- No unsupported logos, metrics, client names, outcomes, or quotes.
- No scroll hijacking, custom cursor, gesture-only gallery, autoplay testimonial, or surprise audio.
- Do not make essential content hover-dependent.
- Keep implementation realistic in the existing Next.js/React/Tailwind stack; do not assume a heavy animation framework is required.
- Respect the business's small content and maintenance capacity.
- Treat mobile as a recomposition, not a compressed desktop board.
- Use a darker action cobalt that passes relevant contrast pairings; bright cobalt may remain decorative.

## Avoid

- Copying one product, agency, or Mobbin pattern as a complete visual answer.
- Blindly applying bento grids, oversized type, marquees, or horizontal scrolling because they are fashionable.
- Turning the experience into a SaaS dashboard.
- Sacrificing navigation, reading, form usability, or performance for visual novelty.
- Using a Mobbin reference without explaining why it fits this business and content.
- Generic AI-agency aesthetics: blue-purple gradients, glass cards, floating browser windows, anonymous 3D objects, or synthetic team imagery.
- Generic beige-consultancy aesthetics that erase UI Forge's technical confidence.
- Dark cinematic styling across every page.
- Fabricated social proof or layouts that look empty without fabricated proof.
- Replacing plain language with vague phrases such as “digital experiences that transform brands”.

## Expected output

Return one self-contained research and design package with:

1. **Executive recommendation** — what the research changed, confirmed, or rejected.
2. **Research log** — references grouped by the 12 categories, with screenshots/links where permitted and relevance notes.
3. **Pattern comparison** — at least two approaches for each high-impact category, with usability, accessibility, conversion, brand-fit, content, and implementation trade-offs.
4. **Rejected patterns** — specific patterns and why they are wrong for UI Forge.
5. **Refined Crafted Evidence direction** — positioning hierarchy, visual principles, imagery, typography, colour, grid, surfaces, proof devices, and motion.
6. **Homepage concept** — responsive section architecture with content/evidence requirements and key states.
7. **Work listing and case-study concept** — listing system, project-card anatomy, long-form case architecture, media behaviour, evidence labels, related work, and CTA.
8. **Mobile concept** — hero, navigation, project evidence, service comparison, process, forms, sticky behaviour, targets, density, and reduced motion.
9. **Initial design system** — roles/tokens, core components, variants, states, content rules, accessibility acceptance criteria, and motion matrix.
10. **Contact-flow recommendation** — field/content model, progressive disclosure decision, validation/error/success states, privacy context, and mobile considerations.
11. **Content and asset gap list** — prioritised items needed before high fidelity or launch.
12. **Final implementation brief** — screen/page list, component list, responsive requirements, motion requirements, content dependencies, acceptance criteria, and questions requiring stakeholder decision.

For every recommendation, distinguish **observed pattern**, **inference**, and **proposal**. End with a short decision checklist that UI Forge can approve before visual design proceeds.
