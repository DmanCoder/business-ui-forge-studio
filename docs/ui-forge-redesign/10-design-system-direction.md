# Initial design-system direction

## Purpose

This is a conceptual direction for the **Crafted Evidence** system, not a final token specification. Claude Design and the implementation phase should refine values through content prototypes, responsive testing, and accessibility checks. The goal is a small, expressive system that supports editorial storytelling and robust product UI without becoming a collection of one-off art direction.

## System principles

1. Evidence determines emphasis.
2. Familiar interaction patterns carry the expressive typography safely.
3. A strict grid makes occasional visual breaks feel intentional.
4. Project content supplies most of the colour and visual novelty.
5. Flat surfaces, rules, and spacing do more work than shadows and containers.
6. Accessibility behaviour is part of the component definition.
7. Mobile hierarchy is authored, not mechanically stacked.

## Typography roles

Retain Instrument Serif and Instrument Sans during exploration.

- **Display/editorial serif:** Hero phrases, case chapter openings, selected quotes, and a small number of outcome numerals. Keep line lengths and word counts short.
- **Display sans:** Strong functional headings where maximum clarity is needed.
- **Body sans:** All long-form copy, summaries, forms, navigation, captions, and interface content.
- **Label sans:** Uppercase or compact labels used sparingly; do not letter-space long phrases.
- **Data/technical text:** Instrument Sans with tabular numerals first. Introduce a monospace only if real technical artefacts justify it.

### Heading scale philosophy

Use a fluid, role-based scale rather than page-specific arbitrary sizes. Initial conceptual range:

- Display/hero: `clamp(2.5rem, 6–8vw, 7rem)` depending on content and line count.
- H1 page title: `clamp(2.25rem, 5vw, 5rem)`.
- H2 section title: `clamp(1.75rem, 3vw, 3.25rem)`.
- H3 module title: `clamp(1.25rem, 2vw, 1.75rem)`.
- Small heading/eyebrow: body-sized with weight/case changes, not tiny text.

The semantic heading level must follow document structure, independent of visual role. Fix the current case-study H1-to-H3 skip.

### Body scale philosophy

- Default body should remain at least 16px, ideally 17–18px for marketing prose.
- Long-form reading can use 18–20px with approximately 60–72 characters per line.
- Metadata/captions should normally stay at 14px or above.
- Use line-height around 1.45–1.7 according to role; display faces require individual tuning.
- Never use low contrast or tiny size to make dense content appear premium.

## Spacing rhythm

Use a 4px base with an 8px working rhythm. A conceptual token ladder might include 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, and fluid section spacing above that.

- Tight spacing groups a label with its value.
- Standard spacing groups copy within a component.
- Large spacing separates distinct ideas.
- Section spacing should be responsive via `clamp()` but not uniformly enormous.
- Reduce the number of homepage sections before compressing their internal readability.

## Containers and grid

- **Wide canvas:** approximately 1440–1600px maximum for media and grid-breaking compositions.
- **Core container:** approximately 1200–1320px for navigation and structured sections.
- **Reading measure:** approximately 640–760px depending on body size.
- **Desktop:** 12 columns with 24–32px gutters.
- **Tablet:** 6 columns with 20–24px gutters.
- **Mobile:** 4 columns with 16–20px page gutters.

Grid tokens should be shared across hero, work, services, and cases. Full-bleed media must still align captions and controls to a safe container. Test the current navigation breakpoint: at 768px the desktop navigation technically fits but leaves only about 23px between logo and links, so a later compact/tablet state is warranted.

## Colour roles

### Foundation

- **Paper:** warm near-white for primary reading surfaces.
- **Paper muted:** slightly darker warm neutral for separation without boxes.
- **Ink:** deep blue-black for main text and dark fields.
- **Ink muted:** secondary dark surface.
- **Text secondary:** cool/warm grey that maintains at least WCAG AA contrast.

### Accent

- **Action cobalt:** darker than the current `#1e6fff`; must pass 4.5:1 for normal text both in its intended foreground/background pairing.
- **Bright cobalt:** may remain for large graphical fields, rules, or non-text emphasis where contrast requirements are met by the overlaid foreground.
- **Project accents:** content-scoped colours derived from project material, never promoted to global action colour.

The audit measured current `#1e6fff` on paper at roughly 4.18:1 and white on `#1e6fff` at roughly 4.40:1, both short of 4.5:1 for normal text. Choose final colour pairs by role, not one hex assumed to work everywhere.

### Semantic colours

Define success, warning, and error hues independently of brand cobalt. They require text, border, icon, and subtle-surface variants; never communicate form status by colour alone.

## Surfaces

- Default to open paper or ink fields.
- Use muted paper for grouped content before reaching for a bordered card.
- Use 1px rules to articulate structure.
- Use elevated surfaces only for overlays, menus, or genuinely layered interactions.
- Allow individual case studies to introduce project-specific backgrounds inside controlled boundaries.

## Border philosophy

Borders are a signature structural element: fine, deliberate, and aligned. Use stronger rules for major chapter changes and subtle rules for metadata. Do not surround every text block. Focus rings must be visually stronger than decorative rules and should use offset/contrast appropriate to both paper and ink surfaces.

## Radius philosophy

- 0–2px for editorial frames and structural panels.
- 4–6px for controls, media frames, and fields where a small softness aids usability.
- Larger radii only for genuinely circular controls or badges.
- Avoid universal 16–24px cards and excessive pills; they would push the brand toward generic SaaS styling.

## Shadow philosophy

Use almost no decorative shadow. Prefer contrast, overlap, and rules. Reserve one or two restrained shadow tokens for overlays/floating menus and possibly physical mockup depth. Shadows must not be the only boundary on low-contrast surfaces.

## Button families

### Primary

Filled accessible action colour, high-contrast label, 44px minimum height, clear hover/focus/pressed/disabled/loading states. Use for one dominant action per local region.

### Secondary

Transparent or surface-filled with an ink border. Equal target quality, visually quieter.

### Text/editorial link

Visible text link with underline or a strongly recognisable arrow/rule treatment. Do not rely on colour alone.

### Inverse variants

Defined explicitly for ink fields. Do not automatically invert an untested pair.

Avoid pill shapes unless the control represents a filter/state chip. Buttons should not animate position in a way that makes the target evade the pointer.

## Form styles

- Persistent visible labels; placeholders are examples, never labels.
- 44px minimum controls, generous text size, clear grouped fieldsets/legends.
- Explain why sensitive or optional information is requested.
- Show required/optional status consistently.
- Validate on blur/submit without clearing input; place errors adjacent to the field and provide an error summary for multi-error submissions.
- Preserve the current good behaviour of focusing the first invalid field.
- Project-type chips must expose selected state and meet touch target requirements.
- Native controls are acceptable when the full label increases the hit area; verify the focus indicator.
- Consent copy links directly to the completed Privacy page.
- Provide loading, success, network error, bot-check error, and retry states.
- Reduce the current enquiry form to essential qualification; defer detail to the response call/email.

## Navigation patterns

- Header has a paper and inverse/dark variant with consistent link order.
- Tablet gets an intentional compact state rather than waiting until links nearly collide.
- Mobile menu retains focus trapping, Escape dismissal, focus restoration, and scroll lock already present in the site.
- Current page is conveyed with more than colour alone where helpful.
- Breadcrumbs and article/case indexes use 44px hit areas even if their visual text is smaller.
- Sticky elements must not cover anchors, focused controls, or zoomed content.

## Card and content patterns

- **Project feature:** Large media, problem, role, evidence, outcome, explicit link.
- **Service path:** Number, buyer situation, outcome, representative deliverables, related proof.
- **Evidence item:** Claim/value/source/status; compact enough for strips or case facts.
- **Article row:** Topic, title, summary, updated date; no decorative thumbnail required.
- **Quote:** Full attribution and project context, never an anonymous fragment.
- **Artefact:** Image/media, caption, decision, and optional source/phase.

Do not force these into one universal card component. Share typography, spacing, rules, and states while preserving their distinct jobs.

## Icon style

Continue the bespoke approach if the small set remains maintainable: 1.5–2px outline, simple geometry, square optical canvas, consistent cap/join, and no mixed filled/outline families. Icons supplement visible labels. Technology logos remain brand assets, not the UI icon system.

## Image and media rules

- Define aspect-ratio roles and focal-point behaviour.
- Use responsive `sizes` and source dimensions with `next/image`.
- Provide alt text for meaningful content and empty alt for redundant decoration.
- Never embed essential copy into raster images.
- Video/animation requires controls, poster, caption/transcript as appropriate, no surprise audio, and reduced-motion/static fallback.
- Art direct crops rather than shrinking a desktop screenshot until unreadable.

## Motion principles

### Token direction

- Instant/disabled: `0ms` for reduced-motion transforms and non-essential sequences.
- Feedback: 120–180ms.
- Disclosure/reveal: 180–240ms.
- Project media transition: approximately 240–400ms only when the visual change needs it.
- Easing: one standard ease-out, one state-change curve; avoid a large easing library.

### Rules

- Motion must clarify input, state, hierarchy, or continuity.
- No scroll hijacking, custom cursor, auto-rotating testimonial, perpetual parallax, or layout-shifting hover.
- Animate opacity/transform selectively; avoid expensive filters and large continuous video backgrounds.
- Do not delay access to content to preserve choreography.
- `prefers-reduced-motion` removes non-essential movement and preserves all information.

The codebase currently applies a broad no-transition/no-animation rule. Replace it only after an approved motion matrix exists; do not simply delete the guard and add ad hoc transitions.

## Accessibility acceptance baseline

- WCAG 2.2 AA target for public pages and states.
- 4.5:1 normal text and 3:1 large text/UI component boundaries where applicable.
- Logical heading order and landmark structure.
- Visible keyboard focus and no keyboard traps.
- 44 by 44px target goal for primary/compact interactive controls, with WCAG exceptions assessed deliberately.
- Reflow at 320 CSS px and usable 200%/400% zoom.
- Reduced motion and forced-colours/high-contrast review.
- Forms expose names, purposes, errors, instructions, and status messages programmatically.
- Touch, mouse, keyboard, and screen-reader review of menus, galleries, tabs/disclosures, and validation.

## Tokenisation and governance

Express final tokens through Tailwind v4/theme CSS and semantic custom properties rather than scattering raw values. Separate primitive values from roles—for example, `--blue-700` versus `--color-action-bg`. Document allowed combinations, responsive behaviour, states, and content constraints next to each component.

Before implementation, prototype the hero, project feature, service path, form, mobile menu, long-form article, and case-study media sequence. These patterns cover most system pressure points and will reveal whether the proposed tokens work beyond a moodboard.
