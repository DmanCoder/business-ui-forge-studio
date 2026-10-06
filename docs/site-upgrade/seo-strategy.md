# SEO strategy

Strategy date: 6 October 2026

## Positioning and primary intent

The homepage targets the broad, truthful commercial position **Australian web design and
development studio**. Its job is to explain the combined design-and-development model, show the
range from custom websites to digital products, establish Australia-wide availability and move a
visitor into the right service, proof or enquiry path.

The strategy does not claim a city or physical office. No verified location is present in the
repository, so city and suburb landing pages would be misleading. Australia-wide relevance is
supported through Australian English, an Australian service area, locally framed buyer guidance
and clear contact details.

## Keyword and intent map

The terms below are intent clusters, not instructions to repeat exact phrases. Page copy uses the
language naturally and includes platform terms only where they help a buyer make a decision.

| Cluster | Intent | Primary page | Supporting page or content |
| --- | --- | --- | --- |
| web design agency Australia; website design Australia; web development Australia; custom website development | Broad commercial investigation | `/` and `/services/web-design-development` | `/services`, cost and platform articles |
| website redesign Australia; website migration; improve an existing website | Commercial problem/solution | `/services/website-redesign` | ownership/hosting article, `/process` |
| Shopify developer Australia; Shopify web design; e-commerce website development | Platform-specific commercial | `/services/shopify-development` | future Shopify planning and migration articles |
| HubSpot website development Australia; HubSpot CMS/Content Hub developer; HubSpot landing pages | Platform-specific commercial | `/services/hubspot-websites` | future HubSpot redesign and module articles |
| web application development Australia; React/Next.js web app development; customer portal development | Product commercial | `/services/web-app-development` | `/process`, future build-vs-buy article |
| React Native app development Australia; cross-platform mobile app development | Product commercial | `/services/mobile-app-development` | future MVP and app-planning articles |
| website maintenance Australia; website support; ongoing website improvements | Ongoing-service commercial | `/services/website-maintenance` | ownership/hosting article |
| website cost Australia; what affects a website quote | Informational with commercial transition | `/insights/what-affects-the-cost-of-a-website` | web-design service, `/process` |
| website ownership; domains and hosting; avoiding website lock-in | Informational/trust | `/insights/website-ownership-and-hosting-explained` | maintenance service, `/about` |
| custom website vs WordPress vs Webflow | Comparative investigation | `/insights/custom-website-wordpress-or-webflow` | web-design service |

Landing-page design and WordPress/Webflow development are not separate service pages yet. They
can be addressed inside the broader website service until the studio has enough distinct offer,
proof and sustained demand to support a genuinely useful page. This avoids thin pages competing
with each other.

## Final information architecture

```text
Home
├── Services
│   ├── Web design & development
│   ├── Website redesign
│   ├── Shopify development
│   ├── HubSpot websites
│   ├── Web app development
│   ├── Mobile app development
│   └── Website maintenance
├── Work
│   └── UI Forge Studio website
├── Process
├── About
├── Insights
│   ├── Website cost
│   ├── Website ownership and hosting
│   └── Custom vs WordPress vs Webflow
├── Start a project
└── Legal
    ├── Privacy
    ├── Terms
    └── Disclaimer
```

Topic archives remain useful filters but are `noindex` and omitted from the sitemap while they are
thin. Thank-you, legal and conditional demo pages are also excluded or noindexed as appropriate.

## Page strategy

The Services index is a decision hub rather than another long sales page. Each dedicated service
page answers a different buyer question: fit, problems, deliverables, platform decisions, process,
reasons to choose the studio, FAQs and the next action. Shared structure creates usability, while
different content and decision frameworks prevent keyword-swapped duplicates.

The Work section uses only verified material. The internal case study connects the site's design,
content and implementation decisions to relevant services; it is labelled as internal work and
makes no invented commercial outcome claim.

Insights answer pre-sale questions and link into a relevant service journey. New articles should
only be published when the studio can add practical decision value, not to fill a calendar or make
a category appear larger.

## Internal-linking system

- The homepage routes each capability to its dedicated service page and retains Work and project
  enquiry as separate decision paths.
- The Services hub links to every service with descriptive anchor text.
- Every service links to the Process, only relevant Insights, and a context-specific enquiry CTA.
- Existing articles link to the service most closely connected to the reader's next decision.
- The internal case study links its proven capabilities back to related service pages.
- The footer exposes all service pages, core proof/information routes, contact and legal pages.
- Category archives link to articles but do not act as search landing pages until they have unique
  value and adequate depth.

Anchor wording should describe the destination; repeated generic “learn more” links are avoided.

## Technical search rules

- Canonicals use `https://uiforgestudio.com.au` as the safe repository fallback and can be
  overridden by the production environment variable.
- The sitemap contains indexable static routes, seven services, published Insights articles and
  eligible case studies—not legal, utility, thank-you or thin category pages.
- Non-production environments are protected by metadata, robots output and an `X-Robots-Tag`
  response header.
- Structured data is limited to visible, supportable entities: WebSite, WebPage, ProfessionalService,
  Service, BlogPosting, CreativeWork and BreadcrumbList. There are no fabricated reviews, ratings,
  addresses, opening hours or FAQs hidden solely for schema.
- Each indexable route has a distinct title and description; service pages use absolute titles to
  avoid mechanically repeated title suffixes.

## Local SEO recommendation

Keep the positioning Australia-wide until the owner verifies a public city or region and wants it
used. If that happens, update the About and contact context, organisation/service schema and
relevant page copy together. Do not create city pages unless the studio can provide distinct local
evidence, examples and useful content for each location.

## Future search opportunities

The highest-value next work is detailed in `content-roadmap.md`. Priorities are commercial planning
questions around redesigns, Shopify, HubSpot, maintenance and application scoping. Search demand
should be checked again before production because result pages and terminology change; the page
architecture should follow buyer intent rather than keyword volume alone.
