# Full-site audit

Audit date: 6 October 2026

## Scope and method

The repository, current production reference, route tree, static content, forms, API routes,
metadata, schema, sitemap, robots behaviour, redirects, Netlify configuration, images, design
tokens and existing research documents were reviewed. The live homepage was also inspected in a
browser at the supplied Netlify URL. The repository remains authoritative where the live build and
local source differ.

The application is Next.js 16 App Router, React 19, TypeScript and Tailwind CSS 4, hosted on
Netlify. Insights and case studies currently use typed local content behind asynchronous data
layers. The enquiry form posts to Netlify Forms and can load Google reCAPTCHA when configured. No
general analytics or advertising pixels are currently shipped.

## Major original problems

### Launch and trust

- `/privacy` and `/terms` visibly contained bracketed placeholders and “not for production” copy.
- `/disclaimer` redirected to the homepage rather than serving a relevant policy.
- The About page still cannot name the founder because the repository has no verified founder name.
- The work index has one verified internal case study. This is honest, but cannot substitute for
  permissioned external work.

### Search architecture

- Six commercially distinct services competed on one long `/services` page.
- Footer service links all returned visitors to `/services`, so high-intent paths had no dedicated
  destination.
- Page titles such as “Services”, “Work” and “Process” were unique but weak search signals.
- Thin one- or two-article topic archives were emitted in the sitemap.
- Canonical and sitemap origin fell back to localhost when the production environment variable was
  absent, despite the repository identifying `uiforgestudio.com.au` as the intended domain.
- Preview protection depended on robots plus host-specific Netlify rules whose host patterns were
  not a reliable path-based header configuration.

### Content and conversion

- The homepage explained capabilities well but did not route each capability into a relevant
  buying journey.
- Service content mixed buyer needs, technologies and deliverables at the same hierarchy.
- The global footer repeated a large “Next step” sales block after pages that already ended with a
  contextual call to action.
- The project form asked separate questions for business, need, goals, functionality and additional
  detail. The combined effort was longer than necessary for an initial qualification step.

### Design and accessibility

- The editorial ledger direction is distinctive and worth preserving: display serif, tabular
  indices, fine rules, restrained surfaces and no decorative motion.
- The original action blue was below the preferred 4.5:1 threshold for normal text on paper and for
  white text on the blue fill. The action blue needed to be darker by role.
- Some compact controls were close to, but not consistently at, the 44px target size.
- The mobile menu already has strong focus trapping, Escape handling, focus restoration and scroll
  lock. Those behaviours were preserved.
- Horizontal scrolling was already contained on comparison tables; no global overflow issue was
  found in the earlier route review.

### Legal and data handling

- Legal content did not reflect the actual Netlify form, optional reCAPTCHA, absence of analytics,
  global service-provider processing or request rights.
- The old Terms page incorrectly implied it would become a detailed project contract. Website terms
  and client engagement terms need separate jobs.
- No cookie banner is warranted by the current code: there is no advertising or general analytics
  stack. reCAPTCHA is conditional and its script loads only when configured. This decision must be
  revisited if analytics or marketing technology is added.

## Public route inventory after implementation

Every canonical below is absolute on `https://uiforgestudio.com.au`. Preview builds are noindexed
at metadata, robots and response-header layers.

| Route | Purpose and audience | H1 / title / intent | Indexing and schema | Primary CTA and linking | Remaining fact or opportunity |
| --- | --- | --- | --- | --- | --- |
| `/` | Position the studio for Australian business owners, founders and marketing leads. | “Custom websites and digital products…” / Australian web design and development studio / broad commercial. | Index; WebPage, ProfessionalService, WebSite. | Start a project; links to Work and every service family. | Add external proof when permissioned. |
| `/services` | Help buyers choose the right engagement before choosing technology. | Design and development services… / web design and development services Australia / commercial hub. | Index; WebPage, Breadcrumb. | Get a project recommendation; links to seven service pages. | Watch page depth as service pages mature. |
| `/services/web-design-development` | Custom website strategy, design and build for Australian businesses. | Custom websites designed and built as one system / web design and development Australia. | Index; WebPage, Service, Breadcrumb. | Discuss a website project; links to Process and platform/cost articles. | Add a relevant client case study. |
| `/services/website-redesign` | Redesign and migration for outdated or constrained websites. | Redesign without losing what works / website redesign services Australia. | Index; WebPage, Service, Breadcrumb. | Discuss a redesign; links to ownership and platform guidance. | Add an anonymised migration checklist or case when available. |
| `/services/shopify-development` | Theme-led and selective Hydrogen work for retailers. | Shopify stores built around how customers buy / Shopify development Australia. | Index; WebPage, Service, Breadcrumb. | Discuss a Shopify project. | Add real store proof before making performance claims. |
| `/services/hubspot-websites` | Content Hub website, module and landing-page work for HubSpot teams. | HubSpot websites connecting content, campaigns and customer data / HubSpot website development Australia. | Index; WebPage, Service, Breadcrumb. | Discuss a HubSpot website. | Confirm any future partner/certification claim before publishing it. |
| `/services/web-app-development` | Portals, dashboards and workflow products for founders and teams. | Web applications that make a workflow clearer / web app development Australia. | Index; WebPage, Service, Breadcrumb. | Discuss a web application. | Add product proof and clarify backend responsibility per proposal. |
| `/services/mobile-app-development` | Cross-platform product design and React Native delivery. | One considered mobile product across iOS and Android / React Native app development Australia. | Index; WebPage, Service, Breadcrumb. | Discuss a mobile product. | Add real app proof before claiming store or adoption outcomes. |
| `/services/website-maintenance` | Maintenance, support and planned improvement for maintainable sites. | Website care with a clear owner and plan / website maintenance Australia. | Index; WebPage, Service, Breadcrumb. | Discuss website support. | Publish response or support windows only when commercially agreed. |
| `/work` | Present verified evidence without fake portfolio volume. | Verified work, documented end to end / web design and development case studies. | Index; WebPage, Breadcrumb. | Read case study; contextual project enquiry in footer. | Only one internal published project; external client proof is the largest trust gap. |
| `/work/ui-forge-studio-website` | Demonstrate the studio’s own strategy, system and implementation. | UI Forge Studio—designing and building our own site / internal case study. | Index; CreativeWork, Breadcrumb. | Start a project. Links to related work when it exists. | Keep screenshots and claims current after major releases. |
| `/process` | Reduce delivery risk by explaining decisions and outputs. | You always know what is happening / website design and development process. | Index; WebPage, Breadcrumb. | Start a project. | Add real artefacts and project-type variations when available. |
| `/about` | Make the founder-led operating model understandable. | A studio where design and development are the same conversation / founder-led studio. | Index; WebPage, Breadcrumb. | Start a project; links to Process and ownership article. | Founder name, biography and portrait still require owner confirmation. |
| `/insights` | Answer pre-sale website and platform questions in plain language. | Insights / website design and digital product insights. | Index; WebPage, Breadcrumb. | Read featured article; links into service journeys. | Publish on a sustainable cadence; do not create thin topics. |
| `/insights/what-affects-the-cost-of-a-website` | Explain commercial scope and quote differences. | Article title / informational with commercial transition. | Index; BlogPosting, Breadcrumb. | Start a project; links to web design service and Process. | Add illustrative scenarios only if they remain clearly non-quotes. |
| `/insights/website-ownership-and-hosting-explained` | Reduce lock-in risk and support trust. | Article title / ownership and hosting guidance. | Index; BlogPosting, Breadcrumb. | Start a project; links to About and maintenance service. | Consider a downloadable checklist later. |
| `/insights/custom-website-wordpress-or-webflow` | Help buyers compare implementation approaches. | Article title / platform comparison. | Index; BlogPosting, Breadcrumb. | Ask for a recommendation; links to web design service. | A future update can add Shopify and HubSpot without forcing them into this three-way comparison. |
| `/insights/categories/websites` | Thin topic filter with two articles. | Websites / topic archive. | Noindex, follow; WebPage and Breadcrumb; excluded from sitemap. | Read an article or return to Insights. | Make indexable only after unique topic guidance and sufficient depth exist. |
| `/insights/categories/ownership-and-support` | Thin topic filter with one article. | Ownership and support / topic archive. | Noindex, follow; WebPage and Breadcrumb; excluded from sitemap. | Read the article. | Same threshold as above. |
| `/start-a-project` | Capture enough detail for a useful founder response. | Tell us about your project / start a web design or development project. | Index; WebPage, Breadcrumb. | Send enquiry; privacy link and direct email alternative. | Confirm Netlify Forms and reCAPTCHA configuration in production. |
| `/thank-you` | Confirm submission and set expectations. | Thanks. Your enquiry is with us / enquiry received. | Noindex, nofollow. | Back to Home; preparation checklist. | Could link to a relevant service based on form state only with a robust handoff mechanism. |
| `/privacy` | Explain current website data handling. | Privacy policy. | Noindex, nofollow; WebPage, Breadcrumb. | Email for privacy requests. | Lawyer review; confirm final business identity and provider configuration. |
| `/terms` | Set website-use rules separately from client contracts. | Website terms of use. | Noindex, nofollow; WebPage, Breadcrumb. | Contact for questions. | Lawyer review; confirm governing jurisdiction if a state/territory is to be named. |
| `/disclaimer` | Set realistic boundaries around information, technology and outcomes. | Website disclaimer. | Noindex, nofollow; WebPage, Breadcrumb. | Contact for corrections or questions. | Lawyer review. |
| `/testimonials` | Conditional verified-feedback route. | Only renders once the verified threshold is met, or as a noindex labelled demo. | 404 in normal production until enough verified content; excluded from sitemap. | Work and Start a project when active. | Keep disabled until real, permissioned quotes meet the threshold. |
| unknown route | Recover from an invalid or moved URL. | Branded 404. | Noindex. | Home, Services, Insights, Start a project. | Add Work as a recovery link in a future small refinement. |

## APIs, utilities and non-page routes

- `/api/verify-recaptcha`: POST-only server verification. It now fails closed when the secret is
  absent and URL-encodes the token and secret.
- `/api/cms-proxy`: Contentful GraphQL proxy with host validation; the public Insights data layer
  deliberately remains local because the configured CMS content is not ready.
- `/robots.txt`: disallows preview environments and points production to the sitemap.
- `/sitemap.xml`: emits static indexable routes, seven service pages, published articles,
  indexable case studies and the testimonials page only when verified content qualifies.
- `/__forms.html`: static Netlify form registration matching the live form’s reduced field set.

## Implementation decisions resolved

1. The homepage now targets a truthful broad intent: Australian web design and development, with
   custom websites as the clearest entry point and product work still visible.
2. `/services` is a hub. Seven pages are justified by distinct buyer intent and substantially
   different decision guidance, not by city or keyword substitution.
3. The editorial system remains the core design direction. The work needed stronger content
   architecture, accessible colour roles and deeper page composition—not a trend-driven reset.
4. Trust is built through transparent status labels, a detailed internal case study, platform
   trade-offs, ownership guidance, process detail and the founder-led operating model.
5. Australia-wide local relevance is legitimate. A city landing page is not: the repository leaves
   `STUDIO_REGION` intentionally blank.
6. The current lack of analytics does not justify a cookie banner. reCAPTCHA disclosure and a
   future-review trigger are included in the Privacy policy.
7. Legal pages are now useful interim drafts, but they remain marked for lawyer and owner review in
   the implementation documentation.
