# Layout balance and orphan-grid audit

Audit date: 6 October 2026

## Scope and deployment comparison

The local route tree, all array-driven and reusable collections, the current production build and
the earlier site-upgrade documents were reviewed. Browser automation inspected every intended
public route at 375, 430, 768, 1024, 1280, 1440, 1728 and 1920 pixels.

The Netlify reference is not behind the previous full-site pass. It currently has the seven service
routes, service-specific footer links, Disclaimer, shorter enquiry form, updated homepage numbering
and reduced global CTA treatment described in the implementation summary. Local source is still
authoritative. The layout fixes in this document are new local changes and will differ from Netlify
until the owner deploys them; this task does not deploy.

## Issues and resolutions

| Route | Section | Original problem and breakpoints | Chosen solution | Why the result is intentional | Browser reference |
| --- | --- | --- | --- | --- | --- |
| `/services` | Service index | Seven links ended 2/2/2/1 at 375–430px, 3/3/1 at 768px and 6/1 from 1024px upward. The final maintenance link looked like missing content. | Mobile is a one-column ledger. At 768–1024px the index is two columns with `07` as a centred, full-width closing row. From 1280px, a 12-column grid creates four equal items followed by three equal items. | Every row occupies the available width. The long web-design label has adequate room and the design remains a ruled editorial index rather than a card grid. | Live `/services` recorded at 1440px before editing; local checked at all eight widths after editing. |
| `/` | How we work | Seven process steps ended 2/2/2/1 at 768px and 4/3 from 1024px upward, visually implying a missing fourth step. | Steps `01–06` form 2-column tablet rows and 3-column desktop rows. `07 Support` is a full-width closure band containing the process link and the visible label “After launch · ongoing”. | The composition now expresses six delivery stages followed by an ongoing relationship instead of disguising seven items as a generic matrix. Source and keyboard order remain `01–07`. | Live homepage section recorded at 1440px before editing; local checked at 768px and 1440px after editing. |
| `/start-a-project` | Project type, timeline and budget choices | Uncontrolled flex wrapping changed with every width. Budget produced 5/1 at 768px and at 1440px upward; project types shifted between 4/3/3, 3/2/2/3 and other incidental rows. | All option groups use one column below 640px and a fixed two-column grid above it. Buttons fill their cell and keep natural DOM order. | Counts 10, 4 and 6 now resolve as 5×2, 2×2 and 3×2. Narrow screens use a deliberate readable stack rather than cramped labels. | Row occupancy measured at all eight widths before and after editing. |
| `/work/ui-forge-studio-website` | Project credit ledger | Six credits used four desktop columns, ending 4/2 from 768px upward. | The ledger chooses columns from the actual credit count: the current six-credit project displays 3/3; two and four-credit projects retain 2- and 4-column options. | The rule handles the verified current content without baking in a six-item-only selector and remains suitable as future real projects add or omit fields. | Live route measured at 768–1920px; local result visually checked at 1440px. |
| unknown route / 404 | Recovery actions | Four actions wrapped 3/1 at 430px. | Below 640px the actions use a 2×2 grid with equal-width controls; wider screens return to the compact flex row. | The recovery choices feel complete at both phone widths without shrinking labels or changing source order. | Live 404 measured at all eight widths; local 430px screenshot checked after editing. |
| Site-wide footer | Closing project prompt | Services, individual service pages, Process, About, case studies, Testimonials and Start a project could place a page-specific conversion action immediately before the generic global project prompt. Start a project also pointed straight back to the form. | The large footer prompt is now a small route-aware client component. It is omitted where a route already owns its closing action, and on Start a project and Thank you. The persistent footer navigation, email and compact contact path always remain. | Each page gets one clear closing conversion moment while general content and index pages retain the useful global prompt. | Presence/absence checked on Home, Services, one service, About, Process, Work, one case study, Insights, Start a project, Thank you and Privacy. |

## Audited sections that did not require changes

- Homepage facts (four), platform matrix (eight), problems and capabilities use balanced grids or
  full-width ledger rows.
- Homepage selected work and the Work index already feature the single verified internal case
  study as a full-width editorial project rather than an incomplete card grid.
- Insights already uses one featured article followed by full-width supporting ledger rows; three
  articles do not create a missing card slot.
- Service detail pages use consistent counts: four fit statements, three problem columns, four
  decision cells, four approach steps, four studio reasons, four visible FAQs and two related
  links. The remaining collections are vertical ledgers.
- About, Process detail, legal pages, article content and category archives use narrative columns
  or vertical rules rather than count-sensitive card grids.
- Footer service navigation is vertical, points to all seven dedicated service routes and includes
  Privacy, Terms and Disclaimer.

## Numbering and content integrity

Homepage peer sections are sequential `01–08`; no duplicated top-level number remains. Process
step numbering stays semantically separate and runs `01–07`. No content, testimonial, project,
metric or decorative filler was added to balance a layout. The zero-animation position and current
metadata/schema output are unchanged.

## Verification

- Every intended public route was rendered at all eight target widths after implementation.
- No horizontal overflow, missing H1 or broken rendered image was detected.
- The only automated under-filled-row flags remaining are deliberate full-width final rows in the
  service index and process summary; their final items occupy the full grid width.
- Form groups resolve to one-per-row on narrow phones and exact pairs at every wider audited width.
- TypeScript, ESLint, Prettier and a production Next.js build passed. The repository has no unit or
  E2E test script.

## Manual review recommendation

Before deployment, review the two intentional closure treatments—the centred `07 Website
maintenance` row at 768–1024px and the full-width `07 Support` band—in the browsers and devices
most representative of the studio's audience. They passed the specified viewport checks, but this
last preference is art direction rather than a functional defect.
