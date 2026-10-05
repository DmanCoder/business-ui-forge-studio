# Page-by-page audit

## Reading this inventory

Each route records its purpose, likely visitor, calls to action, structure, useful current qualities, issues and redesign opportunity. Shared header/footer findings are documented once, then route-specific observations follow.

## Shared shell

**Components:** sticky header, desktop navigation, full-screen mobile menu, skip link, footer CTA, footer link ledger, global ProfessionalService/WebSite JSON-LD.

**Strengths:** clear active state; excellent mobile focus management; consistent CTA; strong closing statement; contact and response-time reassurance.

**Issues:** 768px desktop nav is crowded; many footer links have text-height hit areas; every page gets the same large closing CTA even where the page already ends in an equivalent CTA; legal links lead to public stubs.

**Opportunity:** use a compact header that adapts before 768px becomes crowded; vary final CTA context by journey; make footer service links deep-link to the correct service; retain the mobile menu’s editorial character.

---

## 1. Home — `/`

- **Purpose:** Position the studio, explain problems/services/process, introduce work and route visitors to enquiry.
- **Primary visitor:** Australian SME/founder evaluating a website or digital-product partner.
- **Primary CTA:** Start a project.
- **Secondary CTA:** View our work; deeper links to Services, Process, About and Insights.
- **Major sections:** hero and studio metadata; positioning statement; six problems; six capabilities; platform recommendation; selected work; seven-phase process; founder-led difference; scoping/investment; latest insights.
- **Reusable components:** `Header`, `Footer`, `Eyebrow`, `Cta`, `SelectedWork`, `LatestInsights`, `StudioImage`.
- **Interactions:** sticky nav, responsive menu, internal navigation links and work/article cards. No animation or carousels.
- **Content strengths:** precise founder-led proposition; platform-neutral advice; clear process; honest self-classification of the only project.
- **Design strengths:** distinctive serif hero; excellent whitespace; coherent editorial grid; controlled colour.
- **UX/conversion issues:** approximately 12,700px on mobile; service/platform/process messages repeat; one internal project cannot support the volume of claims; strongest trust proof appears late; section index repeats “07.”
- **Accessibility/responsive issues:** small inline mobile targets; primary colour contrast; 768px header crowding. No horizontal overflow.
- **Missing content:** external client work, outcomes, testimonials, named founder, portrait, client marks and project-fit signal.
- **Redesign opportunity:** a seven-to-eight-section proof-led homepage: position → proof → work → service fit → founder/process → insight → contact.

## 2. Services — `/services`

- **Purpose:** Explain the full service catalogue and platform choices.
- **Primary visitor:** Prospect who knows broadly what they need or needs help choosing an approach.
- **Primary CTA:** Start a project.
- **Secondary CTA:** Six service-index anchors.
- **Major sections:** header; service index; Websites; Landing pages/campaigns; E-commerce; Digital products; Mobile applications; Ongoing care; closing CTA.
- **Reusable components:** `Eyebrow`, `Cta`, `StudioImage`, service assets.
- **Interactions:** anchor index scrolls to numbered service sections.
- **Strengths:** candid platform comparisons; deliverables are explicit; copy acknowledges when a higher-cost approach is unnecessary.
- **Issues:** 8,653px desktop and ~9,291px mobile; six equal categories dilute the core offer; technology/platform detail overwhelms outcomes; repetitive “description + note + deliverables + image” structure.
- **Responsive/accessibility:** no overflow; index targets are often 38px high on mobile; multi-line labels create uneven two-column rows.
- **Trust/missing content:** no service-specific case studies, results, indicative fit, FAQs or proof.
- **Redesign opportunity:** organise around three needs—websites/e-commerce, digital products, ongoing growth—and treat platforms as implementation options. Create deeper service pages only where casework and search demand justify them.

## 3. Work — `/work`

- **Purpose:** Present published case studies and set expectations for evidence quality.
- **Primary visitor:** High-intent prospect assessing craft and relevant experience.
- **Primary CTA:** Read the single case study.
- **Secondary CTA:** Global Start a project CTA.
- **Major sections:** page header/index count; project row; “How this index works” honesty statement.
- **Interactions:** entire project row is a link.
- **Strengths:** transparent internal-project label; useful project metadata; strong imagery and readable card hierarchy.
- **Issues:** one entry makes the page feel empty; “001 published” magnifies the gap; the honesty-policy section explains absence rather than demonstrating value.
- **Trust/missing content:** external client context, sectors, results, testimonials, filters/tags only if future volume needs them.
- **Redesign opportunity:** lead with a flagship external project, mix immersive and compact cards, expose one outcome per card, keep status labels but move publishing policy to a subtle note.

## 4. Internal case study — `/work/ui-forge-studio-website`

- **Purpose:** Document the studio’s own rebuild and demonstrate design/development thinking.
- **Primary visitor:** Prospect looking for process depth and technical credibility.
- **Primary CTA:** Start a project at the end.
- **Secondary CTA:** Work breadcrumb; related work when available.
- **Major sections:** breadcrumb; hero/meta; hero image; overview; challenge; goals; approach; design/build; gallery; outcomes; CTA.
- **Interactions:** primarily reading; static responsive imagery.
- **Strengths:** unusually candid context; detailed method; credible technical stack; strong captions and alt text; status is unambiguous.
- **Issues:** about 8,137px desktop / 8,996px mobile; no client perspective; outcomes are mostly shipped features; screenshot gallery feels documentary rather than transformative; Approach cards use `h3` after `h1` without an `h2`.
- **Conversion/trust issue:** a self-case-study cannot replace client evidence.
- **Redesign opportunity:** keep as a “studio R&D” story, add before/after architecture/visual comparison, performance/accessibility evidence, decision annotations and a shorter narrative. Do not feature it above real client work once available.

## 5. Process — `/process`

- **Purpose:** Reduce delivery anxiety by explaining seven phases and outputs.
- **Primary visitor:** Prospect evaluating working style and project risk.
- **Primary CTA:** Start a project.
- **Major sections:** hero; process-map illustration; seven phase cards; closing CTA.
- **Strengths:** plain language; every phase includes “You get”; launch/support are not afterthoughts.
- **Issues:** the linear seven-phase story reads as universal even though project types vary; no examples of actual artefacts or typical client responsibilities; repeated card treatment.
- **Missing content:** feedback cadence, decision rights, revision model, realistic timing bands and examples of deliverables.
- **Redesign opportunity:** keep the seven-phase logic but show three milestone groups and real artefacts. Explain where website, e-commerce and product engagements differ.

## 6. About — `/about`

- **Purpose:** Explain founder-led model, working style, location and ownership stance.
- **Primary visitor:** Prospect deciding whether a small remote studio feels credible and compatible.
- **Primary CTA:** Start a project.
- **Secondary CTA:** See how we work; ownership Insight article.
- **Major sections:** intro; founder note; studio artefact; client benefits; remote working; how projects run; location card; ownership; CTAs.
- **Strengths:** honest about size and remote model; assets/ownership stance is strong; practical benefits translate the founder-led claim.
- **Issues:** founder is not named; “The founder” signature looks unfinished; no portrait, biography specifics, past work or independent credential; artefact illustration avoids the very human evidence the page needs.
- **Redesign opportunity:** name and show the founder, give a concise experience timeline, show genuine working artefacts and state the collaboration model without over-explaining remote work.

## 7. Insights index — `/insights`

- **Purpose:** Demonstrate expertise and support organic discovery.
- **Primary visitor:** Business owner researching web decisions before contacting a studio.
- **Primary CTA:** Read the featured article.
- **Secondary CTA:** Topic filters and remaining articles.
- **Major sections:** editorial header/topics; featured article; article list.
- **Strengths:** relevant plain-language subjects; excellent reading hierarchy; articles directly answer sales objections.
- **Issues:** only three published articles; topic counts of one and two make category navigation feel premature; no email capture; all pieces are decision guides, with no project lessons or point of view on craft.
- **Redesign opportunity:** keep one Insights hub, delay indexable category archives until each has depth, add project/process notes and route contextual articles into service/case-study journeys.

## 8. Article — `/insights/what-affects-the-cost-of-a-website`

- **Purpose:** Explain price drivers and improve proposal literacy.
- **Primary visitor:** Budget-conscious prospect comparing quotes.
- **Primary CTA:** Start a project.
- **Secondary CTA:** Table of contents, adjacent/related articles, About.
- **Sections:** metadata/byline; TOC; four main sections and subtopics; “How we quote” callout; CTA; share/byline; adjacent/related articles.
- **Strengths:** useful, specific and commercially relevant; anticipates common objections; proposal CTA is contextually appropriate.
- **Issues:** generic “The founder” byline; no example ranges or anonymised scenarios; long reading page; compact share targets.
- **Redesign opportunity:** add three illustrative scope scenarios and a downloadable/project-brief next step without turning the article into a price promise.

## 9. Article — `/insights/website-ownership-and-hosting-explained`

- **Purpose:** Build trust by clarifying ownership, hosting and handover.
- **Primary visitor:** Prospect concerned about lock-in or recovering from a poor provider relationship.
- **Primary CTA:** Start a project with ownership discussed up front.
- **Secondary CTA:** TOC, related platform article and About.
- **Strengths:** strong studio differentiator; practical checklist; directly supports About and proposal trust.
- **Issues:** no downloadable checklist; founder remains anonymous; the legal pages do not yet reinforce this promise.
- **Redesign opportunity:** create a compact ownership checklist and link to completed legal/service terms once available.

## 10. Article — `/insights/custom-website-wordpress-or-webflow`

- **Purpose:** Help visitors choose an implementation approach without platform tribalism.
- **Primary visitor:** Prospect comparing platform proposals.
- **Primary CTA:** Ask for a recommendation.
- **Secondary CTA:** TOC, related cost/ownership articles.
- **Strengths:** balanced trade-offs; clear comparison table; supports platform-neutral positioning.
- **Issues:** article omits Shopify/HubSpot despite service emphasis; large table requires horizontal scrolling on mobile; custom build is still framed most favourably by the studio selling it.
- **Responsive:** table is 426px inside a 335px `overflow-x:auto` parent; page does not overflow.
- **Redesign opportunity:** turn the comparison into a responsive decision matrix/cards and state disqualifiers for each option.

## 11. Topic archive — `/insights/categories/ownership-and-support`

- **Purpose:** Filter Insights by topic.
- **Primary visitor:** Search or returning visitor interested in ownership/support.
- **Primary CTA:** Read the one article.
- **Strengths:** consistent archive UI and accurate counts.
- **Issues:** one-article indexable page is thin, adds little beyond the article and fragments authority.
- **Recommendation:** remove from sitemap/indexation until the topic has meaningful depth, or fold topics into client-side filters on `/insights`.

## 12. Topic archive — `/insights/categories/websites`

- **Purpose:** Filter website-related guidance.
- **Primary visitor:** Visitor researching website planning and platform choices.
- **Primary CTA:** Read one of two articles.
- **Strengths:** easy comparison and consistent cards.
- **Issues:** still thin at two entries; duplicate archive copy; no distinct topic introduction.
- **Recommendation:** same as above; only retain an indexable route when it can become a useful landing page with unique guidance.

## 13. Start a project — `/start-a-project`

- **Purpose:** Qualify and capture project enquiries.
- **Primary visitor:** High-intent prospect ready to describe a project.
- **Primary CTA:** Send enquiry.
- **Secondary CTA:** Email directly; Privacy policy.
- **Major sections:** page intro; three-step “What happens next”; email/remote note; three fieldsets; consent; optional reCAPTCHA; response promise.
- **Interactions:** text inputs, textareas, toggle chips, validation, consent, submission and success redirect.
- **Strengths:** no-jargon framing; response-time promise; validation focuses first error; errors use `role=alert`; chip pressed state works; next steps are explained before effort is requested.
- **Issues:** long initial form; project type, timeline and budget chip groups lack an explicit labelled group/radiogroup pattern; budget ladder may attract or deter inconsistently; no nearby social proof; global footer repeats the same CTA.
- **Redesign opportunity:** two-step progressive qualification, saved/visible progress, clearer “best fit” guidance, a compact proof quote/result and a reassuring privacy summary.

## 14. Thank you — `/thank-you`

- **Purpose:** Confirm receipt and prepare the lead for discovery.
- **Primary visitor:** Person who has just submitted an enquiry.
- **Primary CTA:** Back to home.
- **Major sections:** confirmation; response expectation; four preparation prompts.
- **Strengths:** useful next-step guidance and clear expectation.
- **Issues:** no calendar/availability route, no reference number, no link to Work/Process; direct access is possible without a submission (correctly noindexed).
- **Redesign opportunity:** offer two useful actions—review relevant work and prepare for discovery—without adding scheduling unless the operating process supports it.

## 15. Privacy — `/privacy`

- **Purpose:** Explain collection, use, storage and deletion of personal data.
- **Primary visitor:** Form user, client or compliance reviewer.
- **Primary CTA:** None; linked from consent/footer.
- **Current state:** four structural sections containing bracketed placeholders and an internal note explicitly saying not to publish.
- **Critical issue:** publicly reachable placeholder legal content directly contradicts the site’s trust/ownership positioning.
- **Recommendation:** complete with qualified legal input before production. If completion is impossible, do not expose a pretend policy; block the form launch until a real policy exists.

## 16. Terms — `/terms`

- **Purpose:** Set service engagement, payment, ownership/handover and care-plan expectations.
- **Primary visitor:** Prospect or client checking commercial terms.
- **Primary CTA:** None.
- **Current state:** public structural stub with internal notes and placeholders.
- **Critical issue:** same as Privacy; this is a launch blocker.
- **Recommendation:** publish real terms aligned with proposal/contract practice, or remove the public link until legally valid content is approved.

## 17. Testimonials conditional route — `/testimonials`

- **Purpose when enabled:** Present verified client feedback after four substantive testimonials exist.
- **Current visitor experience:** generic custom 404.
- **Strength:** the threshold and verification gate prevent fabricated social proof and a weak one-quote page.
- **Issue:** the source route and metadata exist, but the public URL offers nothing while disabled; anyone following an old/manual link sees an error.
- **Recommendation:** keep it out of navigation/sitemap as it is now. Consider redirecting to `/work` until the threshold is reached, then launch only with linked case studies and permissioned attribution.

## 18. 404 state — unknown routes

- **Purpose:** Recover visitors from missing or moved content.
- **Primary CTA:** Home.
- **Secondary CTAs:** Services, Insights, Start a project.
- **Strengths:** on-brand copy and sensible escape routes; correctly noindexed.
- **Issues:** no search, Work link or context about a moved page; global footer makes the error page long.
- **Redesign opportunity:** add Work as the likely highest-value recovery path and keep the footer compact on error states.

## Pages to combine, simplify, defer or create

### Simplify

- Home: reduce repeated service/process copy.
- Services: regroup into three client needs.
- About: compress remote-working explanation and add human evidence.
- Process: group phases and show artefacts.
- Long Insights articles: retain depth, improve navigation/targets and use more visual examples.

### Defer or deindex

- Topic archive pages until content depth justifies indexation.
- Testimonials until the verified threshold is met.

### Create when evidence exists

- Additional real case studies.
- Focused service pages for websites/e-commerce, digital products and ongoing care.
- A compact FAQ/project-fit section (not necessarily a standalone page).

### Do not create yet

- A generic Team page for a one-person studio.
- A pricing page without defensible ranges.
- Separate pages for every technology.
- A large Insights taxonomy with only three articles.
