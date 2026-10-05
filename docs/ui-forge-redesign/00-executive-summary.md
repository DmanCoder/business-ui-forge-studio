# UI Forge Studio redesign — executive summary

## What the current website communicates

UI Forge Studio presents itself as an independent, founder-led Australian digital studio that keeps design and frontend development in the same hands. It sells custom websites, e-commerce, campaign pages, web applications, mobile applications and ongoing care, while promising plain-language platform advice, direct senior collaboration and client ownership of core business assets.

The current visual identity is a restrained “editorial ledger”: Instrument Serif statements, Instrument Sans utility copy, off-white paper, dark ink, electric blue, numbered sections, hairline dividers, almost-square controls and no animation. The work feels considered and honest, but the sales story is much stronger than the evidence currently available to support it.

## Biggest strengths

- Clear founder-led positioning and a credible “design + development in the same hands” differentiator.
- Strong editorial typography, consistent layout rules and unusually disciplined visual restraint.
- Plain-language service, process, ownership and platform guidance.
- Sound responsive foundations: no horizontal overflow at 390, 768 or 1440px in the audited routes.
- Good structural SEO, metadata, JSON-LD, sitemap, clean canonicals and legacy redirects.
- Honest content policy: fictional demo projects and unverified testimonials are not presented as client work.
- Solid interaction fundamentals in the mobile menu and enquiry-form validation.

## Biggest weaknesses

- The portfolio contains one internal project and no published client work, measurable results, client logos or verified testimonials. The site asks for trust before it can show enough proof.
- The homepage is overlong—approximately 12,700px at a 390px viewport—and repeats the same ledger rhythm through many sections.
- The service offer is too broad for the proof on display. Six equally weighted service categories make a small founder-led studio look unfocused rather than versatile.
- `/privacy` and `/terms` publicly expose internal “not for production” placeholder copy. This is the most urgent trust and launch-readiness issue.
- `/testimonials` resolves to the generic 404 while its source route still exists; the conditional strategy is sensible, but the public path currently has no value.
- The founder remains unnamed (“The founder”), there is no portrait or meaningful human signal, and the About page relies on an artefact illustration instead.
- Blue on paper is 4.18:1 and white on the primary blue is 4.40:1, narrowly failing WCAG AA for normal-size text. Small blue labels and 14–16px button text need a darker accessible action colour.
- The homepage section index repeats “07” for both Scoping and Insights; case-study approach cards jump from `h1` to `h3`; several mobile link targets are below 44px.
- The no-motion rule protects accessibility, but removing every transition also removes useful feedback and makes the experience feel more static than intentionally calm.

## Biggest opportunity

Evolve the existing editorial foundation into a proof-led studio experience: fewer claims, more visible work, richer case-study storytelling, stronger founder presence, explicit commercial evidence and a shorter, more decisive path from “this is my problem” to “this studio has solved it.” The redesign should feel like the work of a precise design engineer—not a generic creative-agency template or a SaaS dashboard.

## Recommended direction

**Direction A — Crafted Evidence**

Keep the recognisable paper/ink editorial system, serif voice, disciplined grid and founder-led clarity. Add stronger image-led casework, project outcomes, warm documentary details, darker accessible cobalt, a limited family of proof modules and subtle functional motion. The result should feel more mature, more human and more commercially credible without pretending the studio is larger than it is.

This direction beats the more technical dark-mode concept and the warmer people-first concept because it preserves existing brand equity, is realistic to implement in the current Next.js/Tailwind architecture, and directly solves the core problem: trust through evidence.

## Top five redesign priorities

1. **Fix trust blockers before visual exploration:** complete legal pages, name the founder, correct section numbering, resolve colour contrast and decide the public treatment of `/testimonials`.
2. **Make the portfolio the centre of gravity:** publish real client work, use outcome-led cards and build editorial case studies with context, process, responsive artefacts, stack and results.
3. **Narrow and clarify the offer:** organise the service story around three client needs rather than six technologies or delivery formats.
4. **Shorten and re-sequence the homepage:** lead with positioning, proof, selected work, service fit, founder/process trust and one decisive conversion section.
5. **Add human and commercial credibility:** founder identity, real working artefacts, client voices, verifiable numbers, clear response expectations and a lower-friction first-contact path.

## Audit scope at a glance

- Local URL: `http://localhost:3000`
- 18 routes or meaningful route states audited, including utility, legal, conditional and 404 states.
- Desktop at 1440×1000, tablet at 768×1024 and mobile at 390×844.
- Mobile menu, focus return, Escape handling, anchor/navigation patterns, responsive table, form validation and chip state tested.
- 12 Dribbble references reviewed and visually screened.
- Type-check, lint and production build passed in an isolated copy using the repository’s lockfile.
- No redesign implementation was performed.
