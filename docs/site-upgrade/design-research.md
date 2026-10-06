# Design research

Research date: 6 October 2026

## Method and limits

The review combined the live UI Forge Studio site, the repository design system, current agency
search results and 22 Dribbble references. Dribbble shots are visual prompts, not evidence of
usability, accessibility or production quality. No single composition was copied. The useful
patterns were tested against UI Forge Studio's real constraints: one verified internal case study,
founder-led delivery, no verified testimonials or client logos, and an intentional zero-animation
position.

## References reviewed

### Detailed reference set

The earlier project research contains full notes on hero, navigation, typography, colour, grid,
portfolio treatment, services, social proof, calls to action, mobile implications and unsuitable
patterns for these twelve sources:

1. [Good Code — Creative Agency Website](https://dribbble.com/shots/26340265-Creative-Agency-Website)
2. [Obys](https://dribbble.com/shots/27263832-Obys)
3. [Klimt Creations — Creative Boutique Studio Website](https://dribbble.com/shots/25449100-Creative-Boutique-Studio-Website)
4. [Zonda Studio — Agency Website Design](https://dribbble.com/shots/27263222-Agency-Website-Design)
5. [Anna — Creative Agency Website Design & Development](https://dribbble.com/shots/26971519-Creative-Lab-Website-Design-Development)
6. [Opndoo Studio — Digital Solutions Agency Website](https://dribbble.com/shots/26207805-Digital-solutions-agency-website)
7. [Oripio — Creative Agency Website](https://dribbble.com/shots/27326751-Creative-Agency-Website)
8. [Topnotch Studio — Creative Digital Studio](https://dribbble.com/shots/27724166-Creative-Digital-Studio-Website-Design)
9. [Moksha Labs — Modern Agency Web Design](https://dribbble.com/shots/27151087-Creative-Studio-Website-Modern-Agency-Web-Design)
10. [Ali MD Ibrahim — Creative Digital Agency Landing Page](https://dribbble.com/shots/27203583-Creative-Digital-Agency-Landing-Page-UI)
11. [Zain's Studio — Agency Mobile App Design](https://dribbble.com/shots/27084858-Agency-mobile-app-design)
12. [Jigarr — Creative Agency Website Design](https://dribbble.com/shots/27113970-Creative-Agency-Website-Design)

The full per-reference analysis is retained in
[`docs/ui-forge-redesign/04-dribbble-research.md`](../ui-forge-redesign/04-dribbble-research.md).

### Current pattern check

Ten additional recent references were reviewed to check whether the conclusions still held:

13. [Studio 09 — Creative Agency Website Design](https://dribbble.com/shots/27669926-Studio-09-Creative-Agency-Website-Design-Brutalism-website)
14. [Modern Creative Agency Design](https://dribbble.com/shots/27776571-Creative-Studio-Modern-Creative-Agency-Design-Landing-Page)
15. [Pulse Studio Landing Page](https://dribbble.com/shots/27397826-Pulse-Studio-Landing-Page-Creative-Agency-Website-UI-UX)
16. [Agency Website Design](https://dribbble.com/shots/27406060-Agency-website-design)
17. [Brutalist Creative Agency Landing Page](https://dribbble.com/shots/26558573-Landing-Page-Creative-Agency-Brutalist-Layout-Bold-Typography)
18. [Digital Agency & Creative Studio Landing Page](https://dribbble.com/shots/27716473-Digital-Agency-Creative-Studio-Landing-Page)
19. [Agency Website Design](https://dribbble.com/shots/27263222-Agency-Website-Design)
20. [Modern Digital Agency Landing Page](https://dribbble.com/shots/27170051-Modern-Digital-Agency-Landing-Page)
21. [Neo Brutalism Website](https://dribbble.com/shots/27391165-Neo-Brutalism-website)
22. [Neo-brutalist Web Agency Concept](https://dribbble.com/shots/27042799-Neo-brutalist-web-agency-landing-page-concept)

## Patterns observed

The strongest work repeatedly used a small set of behaviours:

- one clear proposition before a list of capabilities;
- work or concrete evidence early in the journey;
- disciplined contrast between expressive display type and functional body type;
- a restrained foundation with one recognisable action colour;
- editorial or asymmetric composition supported by a consistent grid;
- services expressed as decisions or outcomes, not a cloud of technologies;
- human/founder presence or credible process where client logos were not the primary proof;
- fewer, larger project surfaces rather than generic card mosaics;
- calm, context-specific calls to action placed after useful information;
- mobile content reprioritisation rather than simply shrinking desktop geometry.

Common failure modes were equally consistent: huge type that hid meaning, illegible low-contrast
dark themes, generic SaaS cards, decorative metrics, unverified logo walls, overly cinematic
portfolios with no project reasoning, and animation used to compensate for weak hierarchy.

## What was adopted

UI Forge Studio already had an ownable editorial-ledger language, so the work evolves that system
instead of replacing it:

- The display serif, functional sans, tabular labels, section numbers and fine rules remain the
  visual grammar.
- The homepage proposition is more direct, and capability labels become useful service routes.
- The Services hub and new service pages use longer editorial sequences: fit, problem, deliverable,
  decision guidance, process, trust, questions and a tailored next action.
- Dark contrast is reserved for high-value section changes instead of becoming the whole brand.
- Cobalt remains the action signal, but its values are darker for readable text and buttons.
- Generic repeated sales banners give way to one compact global contact path plus page-specific
  calls to action.
- Trust is carried by transparent constraints, detailed process, platform trade-offs, ownership
  guidance and the internal case study—not simulated scale.
- Touch targets and form controls have a 44px minimum where relevant.

## What was rejected

- No gradients, glassmorphism, decorative blobs or floating product cards were added.
- No client logos, testimonials, project results, ratings, awards or numerical badges were
  invented.
- No motion was introduced. The zero-animation principle remains accurate and supports the site's
  calm, fast and content-led character.
- The site was not converted to a dark-first cinematic portfolio; that would reduce everyday
  legibility and overstate the available visual work.
- Brutalist scale was not used at the expense of line length, clear headings or mobile reading.
- Services were not reduced to unexplained technology names, nor presented as a dense card grid.

## Final direction

The resulting direction is **editorial proof with practical buying guidance**. Premium quality
comes from typographic discipline, precise spacing, honest content depth and clear decision paths.
It remains recognisably UI Forge Studio: warm paper surfaces, ink typography, cobalt action,
ledger-like rules and a direct founder-led voice. The evolution is substantial in architecture and
page composition without pretending that visual novelty is a substitute for proof.

The next material design upgrade depends on owner-supplied assets: a founder portrait and biography,
permissioned external work, project imagery and verified feedback. Those should be integrated into
the same editorial system rather than added as a generic logo or testimonial carousel.
