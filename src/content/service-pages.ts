export type ServiceSectionHeading = {
  /** Small ledger label above the heading. */
  eyebrow: string;
  /** Visible, page-specific H2. */
  heading: string;
};

/**
 * Page-specific section headings. The template structure is shared across
 * services, but the visible H2 copy must describe this service, not the
 * template (see docs/site-upgrade/seo-strategy.md).
 */
export type ServiceSections = {
  fit: ServiceSectionHeading;
  problems: ServiceSectionHeading;
  includes: ServiceSectionHeading;
  /** Eyebrow only — the decision heading lives in `decision.heading`. */
  decision: { eyebrow: string };
  process: ServiceSectionHeading;
  whyUs: ServiceSectionHeading;
  faqs: ServiceSectionHeading;
};

export type ServiceLink = { label: string; href: string };

export type ServicePage = {
  slug: string;
  shortName: string;
  eyebrow: string;
  seoTitle: string;
  metaDescription: string;
  heading: string;
  lead: string;
  /** One line shown in the header's "Service note" slot. */
  serviceNote: string;
  sections: ServiceSections;
  idealFor: string[];
  problems: { title: string; body: string }[];
  deliverables: string[];
  decision: {
    heading: string;
    body: string;
    items: { title: string; body: string }[];
  };
  approach: { title: string; body: string }[];
  whyUs: string[];
  faqs: { question: string; answer: string }[];
  /** Contextual links to sibling services (descriptive anchor text). */
  relatedServices: ServiceLink[];
  /** Related Insights articles — labels are rendered as "Read: …". */
  relatedInsights: ServiceLink[];
  cta: { heading: string; body: string; label: string };
};

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: 'web-design-development',
    shortName: 'Web design & development',
    eyebrow: 'Custom websites · Australia',
    seoTitle: 'Custom Website Design & Development Australia | UI Forge Studio',
    metaDescription:
      'Custom website design and development for Australian businesses, including Next.js, WordPress, Webflow and HubSpot with SEO and accessibility built in.',
    heading: 'Custom website design and development for Australian businesses',
    lead: 'UI Forge Studio plans the structure, designs the interface and builds the finished website as one system, so content, usability, performance and search visibility support the same business goal.',
    serviceNote:
      'Remote delivery across Australia. Next.js, WordPress, Webflow or HubSpot — recommended after discovery, not before.',
    sections: {
      fit: { eyebrow: 'Who it is for', heading: 'Who custom website design is for' },
      problems: { eyebrow: 'Problems we solve', heading: 'Website problems we help solve' },
      includes: { eyebrow: 'Scope', heading: 'What a website project can include' },
      decision: { eyebrow: 'Choosing the right website platform' },
      process: { eyebrow: 'How it runs', heading: 'How a custom website project moves' },
      whyUs: { eyebrow: 'Why UI Forge Studio', heading: 'Why work with a founder-led studio' },
      faqs: { eyebrow: 'Common questions', heading: 'Custom website design FAQs' },
    },
    idealFor: [
      'Established businesses whose website no longer reflects the quality of their work',
      'Marketing teams that need a flexible site and a sensible content workflow',
      'New ventures with a clear offer that need a credible foundation',
      'Businesses choosing between Next.js, WordPress, Webflow or HubSpot',
    ],
    problems: [
      {
        title: 'The website explains too much and says too little',
        body: 'We organise the offer around the questions a prospective client needs answered, then give every page a clear role and next step.',
      },
      {
        title: 'Design and development keep drifting apart',
        body: 'The same person designs and builds the work, so responsive behaviour, content constraints and technical feasibility are considered from the first layout.',
      },
      {
        title: 'The current platform is fighting the business',
        body: 'Platform selection follows your editing needs, integrations, growth plans and budget. A custom build is recommended only when it creates real value.',
      },
    ],
    deliverables: [
      'Discovery, goals and audience definition',
      'Sitemap, page purpose and conversion path',
      'Content guidance and on-page SEO structure',
      'Responsive interface design and reusable design system',
      'Frontend development and CMS integration where required',
      'Accessibility, browser, device and performance testing',
      'Redirects, metadata, sitemap and launch support',
      'Documentation and a clear ownership handover',
    ],
    decision: {
      heading: 'Choosing the right website platform',
      body: 'There is no universal “best” website platform. The useful question is which option gives your team the right balance of editing control, flexibility, performance and running cost.',
      items: [
        {
          title: 'Next.js and a headless CMS',
          body: 'Best when design, speed, structured content or future functionality justify a custom front end.',
        },
        {
          title: 'WordPress',
          body: 'A practical fit for content-heavy sites with frequent publishing and a team already comfortable with the editor.',
        },
        {
          title: 'Webflow',
          body: 'Well suited to focused, design-led marketing sites that value visual editing and managed hosting.',
        },
        {
          title: 'HubSpot Content Hub',
          body: 'Useful when the marketing team already works in HubSpot and website activity needs to connect directly to CRM and campaign workflows.',
        },
      ],
    },
    approach: [
      {
        title: 'Define',
        body: 'Clarify the audience, offer, content, project constraints and what success needs to look like.',
      },
      {
        title: 'Structure',
        body: 'Plan the sitemap, page jobs, journeys and content model before visual design begins.',
      },
      {
        title: 'Design and build',
        body: 'Create and implement the system together, reviewing the real responsive website rather than disconnected mock-ups.',
      },
      {
        title: 'Test and launch',
        body: 'Exercise content, forms, accessibility, performance, metadata and redirects before a managed go-live.',
      },
    ],
    whyUs: [
      'Direct access to the person making both design and technical decisions',
      'Platform recommendations explained without steering every project towards one stack',
      'Search, accessibility and performance treated as build requirements',
      'Business-owned domains, accounts and data, with no forced care plan',
    ],
    faqs: [
      {
        question: 'Do you only build custom Next.js websites?',
        answer:
          'No. Next.js is useful when a project needs a highly tailored, fast front end, but WordPress, Webflow and HubSpot can be better fits. The recommendation is based on your content workflow, functionality, budget and long-term plans.',
      },
      {
        question: 'Can you help with website copy and structure?',
        answer:
          'Yes. Content structure, page purpose and on-page search intent are part of the planning work. The proposal will make clear whether you are supplying final copy, collaborating on it, or engaging specialist copy support.',
      },
      {
        question: 'Will we be able to update the site ourselves?',
        answer:
          'Where regular editing is required, the build includes an appropriate content management approach and a handover. The amount of editing control depends on the platform and is agreed before development begins.',
      },
      {
        question: 'Do we own the finished website?',
        answer:
          'The proposal sets out ownership for the specific platform and engagement. Business accounts, domains, content and data should remain under your control, with project-specific intellectual property terms documented in the client agreement.',
      },
    ],
    relatedServices: [
      { label: 'Explore website redesign', href: '/services/website-redesign' },
      { label: 'Explore HubSpot website development', href: '/services/hubspot-websites' },
    ],
    relatedInsights: [
      {
        label: 'WordPress vs Webflow vs a custom website: how to choose',
        href: '/insights/custom-website-wordpress-or-webflow',
      },
      {
        label: 'Website cost in Australia: what actually affects the price?',
        href: '/insights/what-affects-the-cost-of-a-website',
      },
      {
        label: 'Website ownership and hosting: what should your business own?',
        href: '/insights/website-ownership-and-hosting-explained',
      },
    ],
    cta: {
      heading: 'Need a website recommendation grounded in your business?',
      body: 'Describe what is changing, what the current site gets wrong and what the next version needs to make possible.',
      label: 'Discuss a website project',
    },
  },
  {
    slug: 'website-redesign',
    shortName: 'Website redesign',
    eyebrow: 'Website redesign · Australia',
    seoTitle: 'Website Redesign Services Australia | UI Forge Studio',
    metaDescription:
      'Redesign an existing website without losing valuable content, URLs or search equity. Improve UX, mobile performance, structure and maintainability.',
    heading: 'Website redesigns that improve clarity without losing what works',
    lead: 'A website redesign should do more than replace the visual layer. We review content, UX, mobile behaviour, platform constraints and technical SEO, then keep, improve, combine or replace what the evidence supports.',
    serviceNote:
      'Remote delivery across Australia. Existing URLs, content and search value are inventoried before anything is replaced.',
    sections: {
      fit: { eyebrow: 'Who it is for', heading: 'When a website redesign makes sense' },
      problems: { eyebrow: 'Problems we solve', heading: 'Website problems a redesign should fix' },
      includes: { eyebrow: 'Scope', heading: 'What a website redesign can include' },
      decision: { eyebrow: 'What to keep, improve, combine or replace' },
      process: { eyebrow: 'How it runs', heading: 'Our website redesign process' },
      whyUs: { eyebrow: 'Why UI Forge Studio', heading: 'Why UI Forge Studio for a redesign' },
      faqs: { eyebrow: 'Common questions', heading: 'Website redesign FAQs' },
    },
    idealFor: [
      'Businesses that have outgrown a first-generation or template website',
      'Teams preparing for a repositioning, new offer or broader market',
      'Sites that are difficult to update, slow on mobile or inconsistent',
      'Businesses planning a CMS, host or platform migration',
    ],
    problems: [
      {
        title: 'The site looks dated because the system is inconsistent',
        body: 'A reusable visual and content system replaces one-off page styling, making the redesign more coherent now and easier to extend later.',
      },
      {
        title: 'Visitors cannot tell what changed in the business',
        body: 'We revisit positioning, page hierarchy and calls to action so the new website represents the business you are running now.',
      },
      {
        title: 'A rebuild risks broken links and lost rankings',
        body: 'Existing URLs, metadata, content value and inbound links are inventoried early. Redirects and post-launch checks are part of the migration plan.',
      },
    ],
    deliverables: [
      'Current-site content, UX and technical audit',
      'Keep, improve, combine and remove recommendations',
      'Search-intent and redirect mapping',
      'Revised sitemap and page-level content direction',
      'Responsive design system and high-priority page designs',
      'Development on the agreed current or replacement platform',
      'Content migration and form/integration testing',
      'Launch checklist and post-launch review',
    ],
    decision: {
      heading: 'What should stay, and what should change?',
      body: 'A credible redesign begins by separating age from actual failure. Familiar URLs, useful content and working integrations may deserve to stay even when the interface does not.',
      items: [
        {
          title: 'Keep',
          body: 'Content, URLs and functionality that remain useful and supported by evidence.',
        },
        {
          title: 'Improve',
          body: 'Pages with clear value but weak structure, outdated copy or poor mobile presentation.',
        },
        {
          title: 'Combine',
          body: 'Thin or overlapping pages that compete with each other and make the site harder to navigate.',
        },
        {
          title: 'Replace',
          body: 'Platform or design decisions that prevent the site meeting current business, accessibility or performance needs.',
        },
      ],
    },
    approach: [
      {
        title: 'Audit before aesthetics',
        body: 'Inventory routes, content, analytics supplied by you, technical constraints and search-sensitive pages.',
      },
      {
        title: 'Set the migration rules',
        body: 'Agree what stays, what moves and how important URLs and functions will be protected.',
      },
      {
        title: 'Prototype the new system',
        body: 'Test the direction on the pages and components that carry the most commercial or technical risk.',
      },
      {
        title: 'Launch in control',
        body: 'Validate redirects, forms, metadata, crawlability and responsive behaviour before and after go-live.',
      },
    ],
    whyUs: [
      'One person can trace a problem from content and interface through to implementation',
      'The redesign can stay on your current platform when a migration is not justified',
      'Existing search value is treated as an asset, not discarded for a cleaner build',
      'Recommendations are documented so stakeholders can understand the trade-offs',
    ],
    faqs: [
      {
        question: 'Can you redesign our site without changing platform?',
        answer:
          'Often, yes. If the current platform can support the required content, accessibility, performance and editing workflow, improving it may be the lower-risk choice. A migration is recommended only when the constraints justify it.',
      },
      {
        question: 'How do you protect existing SEO during a redesign?',
        answer:
          'The work starts with a route and content inventory. Valuable URLs and on-page topics are preserved where possible; changed URLs receive deliberate redirects; canonicals, metadata, internal links and the sitemap are tested around launch.',
      },
      {
        question: 'Can the redesign happen in stages?',
        answer:
          'Yes, when the architecture allows it. A staged plan can prioritise the highest-value templates or journeys first, but the underlying design and content system still needs to be defined early so the stages fit together.',
      },
      {
        question: 'Do you need access to our analytics?',
        answer:
          'Analytics are useful when they are available and reliable, but they are not the only evidence. Search performance, support questions, sales feedback, content quality and direct usability review can also guide priorities.',
      },
    ],
    relatedServices: [
      {
        label: 'Explore custom website design and development',
        href: '/services/web-design-development',
      },
      { label: 'Explore website maintenance', href: '/services/website-maintenance' },
    ],
    relatedInsights: [
      {
        label: 'Website ownership and hosting: what should your business own?',
        href: '/insights/website-ownership-and-hosting-explained',
      },
      {
        label: 'WordPress vs Webflow vs a custom website: how to choose',
        href: '/insights/custom-website-wordpress-or-webflow',
      },
    ],
    cta: {
      heading: 'Know the current site needs to change?',
      body: 'Share the URL and the business reason behind the redesign. We will start by working out what is worth keeping.',
      label: 'Discuss a redesign',
    },
  },
  {
    slug: 'shopify-development',
    shortName: 'Shopify development',
    eyebrow: 'Shopify design & development · Australia',
    seoTitle: 'Shopify Development Australia | UI Forge Studio',
    metaDescription:
      'Shopify design and development for Australian brands, from custom theme work and subscriptions to integrations and Hydrogen storefronts where justified.',
    heading: 'Shopify design and development for growing stores',
    lead: 'From a focused theme build to a custom Hydrogen storefront, the right Shopify approach depends on how customers buy, how the team operates and whether custom development creates a genuine commercial advantage.',
    serviceNote:
      'Remote delivery across Australia. Theme-led work serves most stores; Hydrogen only where the business case is proven.',
    sections: {
      fit: { eyebrow: 'Who it is for', heading: 'When Shopify development is a good fit' },
      problems: { eyebrow: 'Problems we solve', heading: 'Shopify problems we help solve' },
      includes: { eyebrow: 'Scope', heading: 'What Shopify development can include' },
      decision: { eyebrow: 'Shopify theme customisation vs Hydrogen' },
      process: { eyebrow: 'How it runs', heading: 'Our Shopify development process' },
      whyUs: {
        eyebrow: 'Why UI Forge Studio',
        heading: 'Why work with UI Forge Studio on Shopify',
      },
      faqs: { eyebrow: 'Common questions', heading: 'Shopify development FAQs' },
    },
    idealFor: [
      'Retailers launching a considered first Shopify store',
      'Established stores that have outgrown a generic theme experience',
      'Teams improving product discovery, merchandising or mobile purchase journeys',
      'Brands connecting Shopify with subscriptions, fulfilment or marketing systems',
    ],
    problems: [
      {
        title: 'The theme looks like everyone else',
        body: 'Custom sections, templates and a disciplined design system can create a distinctive store without replacing Shopify’s reliable commerce foundation.',
      },
      {
        title: 'Apps have become the architecture',
        body: 'We review which apps are essential, where native Shopify features are enough and where a focused integration or custom component is more maintainable.',
      },
      {
        title: 'The mobile store is hard to shop',
        body: 'Navigation, product information, variant selection, cart feedback and content density are designed around the smaller screen first.',
      },
    ],
    deliverables: [
      'Store and customer-journey review',
      'Information architecture and collection structure',
      'Theme selection or custom storefront recommendation',
      'Custom sections, product templates and editorial modules',
      'App and integration planning',
      'Responsive implementation and accessibility review',
      'Catalogue, redirect and migration support where scoped',
      'Quality assurance across product, cart and checkout hand-offs',
    ],
    decision: {
      heading: 'Theme customisation or a Hydrogen storefront?',
      body: 'Most stores are better served by a carefully customised Shopify theme. Headless commerce adds freedom, but also development, hosting and integration responsibility.',
      items: [
        {
          title: 'Choose a theme-led build when',
          body: 'Shopify’s standard catalogue and checkout model fit, the team values native editing, and distinctive design can be achieved through custom sections and templates.',
        },
        {
          title: 'Consider Hydrogen when',
          body: 'A proven business case requires unusually tailored browsing, content, performance or integration behaviour that the theme layer cannot support cleanly.',
        },
        {
          title: 'Avoid headless as a status symbol',
          body: 'A custom storefront is not automatically faster, easier or more profitable. The additional operational cost must solve a real constraint.',
        },
        {
          title: 'Keep Shopify where it is strongest',
          body: 'Products, inventory, customer records, checkout and payments should usually remain in Shopify even when the front end is custom.',
        },
      ],
    },
    approach: [
      {
        title: 'Map the buying journey',
        body: 'Understand how customers find, compare and choose products, including catalogue and content requirements.',
      },
      {
        title: 'Choose the lightest capable architecture',
        body: 'Recommend native features, apps, theme customisation or Hydrogen based on fit and ongoing cost.',
      },
      {
        title: 'Build the storefront system',
        body: 'Create reusable merchandising sections and consistent product, collection and campaign patterns.',
      },
      {
        title: 'Exercise the commerce details',
        body: 'Test variants, discounts, shipping information, cart states, account hand-offs and key integrations before launch.',
      },
    ],
    whyUs: [
      'Design and frontend implementation stay connected across the store',
      'Theme-led and headless options are both available, so the recommendation is not predetermined',
      'The work includes the operational experience for the team, not only the customer-facing pages',
      'Customisation is documented to reduce dependence on one developer',
    ],
    faqs: [
      {
        question: 'Do you build new Shopify stores and improve existing ones?',
        answer:
          'Yes. Engagements can cover a new store, a redesign, a theme rebuild, focused conversion and UX improvements, custom sections, integrations or ongoing development.',
      },
      {
        question: 'Will you recommend Shopify Hydrogen for our store?',
        answer:
          'Only when the business case justifies the additional complexity. Most retailers receive better value from a strong theme implementation. Hydrogen is considered when important experience or integration requirements genuinely exceed the theme layer.',
      },
      {
        question: 'Can you migrate products and content?',
        answer:
          'Migration can be included once the source platform, catalogue size, data quality, URL history and integration requirements are understood. The proposal identifies what can be automated and what needs manual review.',
      },
      {
        question: 'Do you guarantee a conversion-rate increase?',
        answer:
          'No. Design and development can remove friction and improve clarity, but conversion also depends on the offer, pricing, traffic, product-market fit and operations. Any measurement plan should use your real baseline data.',
      },
    ],
    relatedServices: [
      {
        label: 'Explore website maintenance for ongoing store development',
        href: '/services/website-maintenance',
      },
    ],
    relatedInsights: [
      {
        label: 'Website cost in Australia: what actually affects the price?',
        href: '/insights/what-affects-the-cost-of-a-website',
      },
      {
        label: 'Website ownership and hosting: what should your business own?',
        href: '/insights/website-ownership-and-hosting-explained',
      },
    ],
    cta: {
      heading: 'Planning a Shopify build or a more useful storefront?',
      body: 'Tell us where the store is today, what is getting in the way and which systems it needs to work with.',
      label: 'Discuss a Shopify project',
    },
  },
  {
    slug: 'hubspot-websites',
    shortName: 'HubSpot websites',
    eyebrow: 'HubSpot website development · Australia',
    seoTitle: 'HubSpot Website Development Australia | UI Forge Studio',
    metaDescription:
      'HubSpot Content Hub website design and frontend development, including themes, reusable modules, landing pages, forms and content migration.',
    heading: 'HubSpot website design and development for marketing teams',
    lead: 'For businesses already invested in HubSpot, the website should work as part of the marketing system. We design and build reusable Content Hub experiences around publishing, campaigns, forms and the way enquiries move into the CRM.',
    serviceNote:
      'Remote delivery across Australia. Website and frontend work inside HubSpot; CRM architecture is scoped separately.',
    sections: {
      fit: { eyebrow: 'Who it is for', heading: 'When HubSpot Content Hub is a good fit' },
      problems: { eyebrow: 'Problems we solve', heading: 'HubSpot website problems we help solve' },
      includes: { eyebrow: 'Scope', heading: 'What HubSpot website development can include' },
      decision: { eyebrow: 'When Content Hub is — and is not — the right platform' },
      process: { eyebrow: 'How it runs', heading: 'Our HubSpot website development process' },
      whyUs: {
        eyebrow: 'Why UI Forge Studio',
        heading: 'Why work with UI Forge Studio on HubSpot',
      },
      faqs: { eyebrow: 'Common questions', heading: 'HubSpot website development FAQs' },
    },
    idealFor: [
      'B2B teams already using HubSpot CRM or Marketing Hub',
      'Businesses migrating a marketing website into Content Hub',
      'Teams that need reusable campaign pages without brand drift',
      'Existing HubSpot sites with rigid modules or inconsistent templates',
    ],
    problems: [
      {
        title: 'Every campaign page becomes a developer request',
        body: 'Reusable, governed modules give marketers meaningful control while protecting layout, accessibility and brand consistency.',
      },
      {
        title: 'Forms collect leads but context gets lost',
        body: 'Pages, forms, properties and hand-off expectations are considered together so the website supports the CRM process already in use.',
      },
      {
        title: 'The site is in HubSpot, but not designed as a system',
        body: 'A theme, template and module architecture replaces duplicated pages and local styling decisions.',
      },
    ],
    deliverables: [
      'Content Hub website or redesign planning',
      'Theme, global styles and template architecture',
      'Reusable drag-and-drop modules with editor guardrails',
      'Landing pages and campaign systems',
      'Form and CRM property coordination',
      'Responsive, accessible frontend development',
      'Content migration support where scoped',
      'Editor guidance and ongoing development options',
    ],
    decision: {
      heading: 'When HubSpot Content Hub is the right fit',
      body: 'HubSpot creates the most value when the marketing site, forms, contact records, campaigns and reporting need to work as one operating system. It is less compelling when the business only needs a simple brochure site.',
      items: [
        {
          title: 'Strong fit',
          body: 'The team already uses HubSpot, publishes campaigns regularly and benefits from connected contact and content workflows.',
        },
        {
          title: 'Needs scrutiny',
          body: 'Complex application behaviour, unusual content models or strict infrastructure requirements may sit more comfortably outside HubSpot.',
        },
        {
          title: 'Editor freedom with guardrails',
          body: 'The goal is not limitless page building. It is a useful set of approved options that keeps output consistent.',
        },
        {
          title: 'Integration is part of scope',
          body: 'CRM logic, automation and advanced reporting are not assumed; the proposal identifies which HubSpot work is included and where specialist support may be needed.',
        },
      ],
    },
    approach: [
      {
        title: 'Understand the portal',
        body: 'Review the current HubSpot setup, website goals, editor roles, forms and the lifecycle around an enquiry.',
      },
      {
        title: 'Model the publishing system',
        body: 'Define templates, flexible modules, fixed brand rules and the content marketers need to control.',
      },
      {
        title: 'Build and test with real content',
        body: 'Use representative pages and campaigns so the module system is proven before broad migration.',
      },
      {
        title: 'Enable the team',
        body: 'Document the intended patterns and show editors how to create pages without reconstructing the design each time.',
      },
    ],
    whyUs: [
      'The website is designed around both the visitor and the marketing team using it',
      'Frontend craft and technical implementation are handled by the same person',
      'HubSpot is recommended when it fits the operating model, not simply because it is available',
      'Scope boundaries around CRM, automation and integrations are made explicit',
    ],
    faqs: [
      {
        question: 'Can you improve an existing HubSpot website?',
        answer:
          'Yes. Work can focus on template and module improvements, a new design system, campaign pages, performance, accessibility or a broader redesign. The first step is understanding the current theme and how the team uses it.',
      },
      {
        question: 'Do you implement the whole HubSpot CRM?',
        answer:
          'The core service here is website and frontend work inside HubSpot. Form, property and website-related workflow coordination can be scoped, while full CRM strategy, migration or complex automation may require a dedicated HubSpot operations specialist.',
      },
      {
        question: 'Will marketers be able to create pages?',
        answer:
          'That is usually the aim. Reusable modules and templates expose the choices editors need while keeping typography, spacing, responsive behaviour and accessibility within the approved system.',
      },
      {
        question: 'Can you migrate our current website into HubSpot?',
        answer:
          'Yes, after the current content, URL structure, forms, integrations and HubSpot subscription are reviewed. Migration scope should include redirects and content quality, not only copying pages.',
      },
    ],
    relatedServices: [
      {
        label: 'Explore custom website design and development',
        href: '/services/web-design-development',
      },
      { label: 'Explore website redesign', href: '/services/website-redesign' },
      { label: 'Explore website maintenance', href: '/services/website-maintenance' },
    ],
    relatedInsights: [
      {
        label: 'Website ownership and hosting: what should your business own?',
        href: '/insights/website-ownership-and-hosting-explained',
      },
      {
        label: 'Website cost in Australia: what actually affects the price?',
        href: '/insights/what-affects-the-cost-of-a-website',
      },
    ],
    cta: {
      heading: 'Need the website to work properly with your HubSpot portal?',
      body: 'Share what the marketing team is trying to publish, capture or connect—and where the current setup gets in the way.',
      label: 'Discuss a HubSpot website',
    },
  },
  {
    slug: 'web-app-development',
    shortName: 'Web application development',
    eyebrow: 'Web application design & development · Australia',
    seoTitle: 'Web Application Development Australia | UI Forge Studio',
    metaDescription:
      'Design and development for portals, dashboards, booking systems and internal tools, with product UX, React/Next.js frontend work and integrations.',
    heading: 'Web application design and development for real business workflows',
    lead: 'UI Forge Studio turns defined workflows into focused web applications — from client portals and dashboards to booking systems and internal tools — with product design and frontend implementation planned together.',
    serviceNote:
      'Remote delivery across Australia. Product UX and React or Next.js frontend delivery; backend responsibility is agreed in scoping.',
    sections: {
      fit: {
        eyebrow: 'Who it is for',
        heading: 'When custom web application development makes sense',
      },
      problems: { eyebrow: 'Problems we solve', heading: 'Workflow problems we help solve' },
      includes: { eyebrow: 'Scope', heading: 'What web application development can include' },
      decision: { eyebrow: 'How we define a useful first release' },
      process: { eyebrow: 'How it runs', heading: 'Our web application development process' },
      whyUs: { eyebrow: 'Why UI Forge Studio', heading: 'Why a founder-led product team can fit' },
      faqs: { eyebrow: 'Common questions', heading: 'Web application development FAQs' },
    },
    idealFor: [
      'Businesses replacing spreadsheets, email chains or manual client updates',
      'Founders shaping a focused first release of a web product',
      'Teams that have backend capability but need product UX and frontend delivery',
      'Organisations improving an existing portal, dashboard or booking flow',
    ],
    problems: [
      {
        title: 'The workflow is understood only by the team doing it',
        body: 'Discovery makes states, roles, decisions and exceptions visible before they turn into interface debt.',
      },
      {
        title: 'The feature list has no release boundary',
        body: 'We identify the smallest useful release and record what is deliberately deferred, so scope remains testable and decisions stay reversible.',
      },
      {
        title: 'The interface and implementation are planned separately',
        body: 'Interaction details, data needs, component behaviour and responsive constraints are considered together instead of being handed over as static screens.',
      },
    ],
    deliverables: [
      'Workflow mapping and product-scope definition',
      'User roles, states and critical journey planning',
      'Wireframes and interactive interface prototypes',
      'Reusable product design system',
      'React or Next.js frontend development',
      'API integration against agreed contracts',
      'Responsive and accessible interaction states',
      'QA, documentation and handover',
    ],
    decision: {
      heading: 'A useful first release does one coherent job',
      body: 'A useful first release does one coherent job. The product becomes easier to estimate and test when every feature can be traced to a user, a decision and an outcome.',
      items: [
        {
          title: 'Users and permissions',
          body: 'Who can see, create, change or approve each thing?',
        },
        {
          title: 'States and exceptions',
          body: 'What can happen, what can fail and what does the user need to know next?',
        },
        {
          title: 'Data and integrations',
          body: 'Which system owns each record and how current does the information need to be?',
        },
        {
          title: 'Release boundary',
          body: 'What must work on day one, and what is safer to add after real use?',
        },
      ],
    },
    approach: [
      {
        title: 'Frame the product',
        body: 'Clarify users, the current process, constraints, risks and the first useful outcome.',
      },
      {
        title: 'Prototype risky journeys',
        body: 'Resolve information hierarchy and interaction questions before investing in full production code.',
      },
      {
        title: 'Build in reviewable slices',
        body: 'Implement the component system and journeys in increments that can be exercised against real data contracts.',
      },
      {
        title: 'Harden the release',
        body: 'Test permissions, empty and error states, responsive behaviour, accessibility and failure recovery.',
      },
    ],
    whyUs: [
      'Product design decisions are grounded in frontend implementation detail',
      'A founder-led structure suits focused products that need senior continuity',
      'The engagement can complement an existing backend or technical team',
      'Scope is made explicit rather than hidden behind an open-ended “app build” promise',
    ],
    faqs: [
      {
        question: 'What kinds of web applications do you build?',
        answer:
          'Focused portals, dashboards, booking and membership journeys, reporting interfaces and internal workflow tools. Fit depends on scope, backend requirements, security needs and the systems involved.',
      },
      {
        question: 'Can you build the backend as well?',
        answer:
          'Some projects can include full-stack Next.js work and integrations. Others are better delivered with an existing backend team or specialist. Architecture and responsibility boundaries are agreed during scoping rather than assumed.',
      },
      {
        question: 'Can you help define an MVP?',
        answer:
          'Yes. The useful exercise is defining the smallest coherent release that solves a real workflow—not simply removing features until a list is shorter.',
      },
      {
        question: 'Do you work with an existing development team?',
        answer:
          'Yes. UI Forge Studio can own product interface design and frontend delivery while collaborating through agreed API contracts, repositories and review practices.',
      },
    ],
    relatedServices: [
      {
        label: 'Explore React Native app development',
        href: '/services/mobile-app-development',
      },
    ],
    relatedInsights: [
      {
        label: 'Website cost in Australia: what actually affects the price?',
        href: '/insights/what-affects-the-cost-of-a-website',
      },
      {
        label: 'Website ownership and hosting: what should your business own?',
        href: '/insights/website-ownership-and-hosting-explained',
      },
    ],
    cta: {
      heading: 'Have a workflow that should be a clearer product?',
      body: 'Describe who uses it, what they are trying to do and how the process works today. That is enough to start.',
      label: 'Discuss a web application',
    },
  },
  {
    slug: 'mobile-app-development',
    shortName: 'React Native app development',
    eyebrow: 'React Native app development · Australia',
    seoTitle: 'React Native App Development Australia | UI Forge Studio',
    metaDescription:
      'React Native app design and development for iOS and Android, including product UX, APIs, authentication, testing and release support.',
    heading: 'React Native app development for iOS and Android',
    lead: 'React Native can give many products one coherent cross-platform codebase without treating iOS and Android as separate projects. We first confirm that an installed app is genuinely the right product surface, then design and build the core experience.',
    serviceNote:
      'Remote delivery across Australia. If a better mobile website is the honest answer, that is the recommendation you will get.',
    sections: {
      fit: { eyebrow: 'Who it is for', heading: 'When a mobile app is worth building' },
      problems: { eyebrow: 'Problems we solve', heading: 'Mobile product problems we help solve' },
      includes: { eyebrow: 'Scope', heading: 'What React Native app development can include' },
      decision: { eyebrow: 'App vs responsive website vs progressive web app' },
      process: { eyebrow: 'How it runs', heading: 'Our React Native development process' },
      whyUs: {
        eyebrow: 'Why UI Forge Studio',
        heading: 'Why work with UI Forge Studio on a mobile product',
      },
      faqs: { eyebrow: 'Common questions', heading: 'React Native app development FAQs' },
    },
    idealFor: [
      'Businesses extending an existing service into a regular mobile workflow',
      'Founders validating a focused cross-platform product',
      'Teams with APIs or web systems that need a companion app',
      'Existing React Native products needing interface or frontend improvement',
    ],
    problems: [
      {
        title: 'The idea is described as screens, not a product',
        body: 'We define the recurring user job, navigation model, state and platform behaviour before estimating a full application.',
      },
      {
        title: 'A mobile website may already be enough',
        body: 'Installability, notifications, camera access, offline behaviour and repeat use need to justify the extra distribution and maintenance of an app.',
      },
      {
        title: 'Cross-platform is mistaken for identical',
        body: 'Shared architecture still respects platform conventions where they materially affect usability and trust.',
      },
    ],
    deliverables: [
      'Product and platform-fit workshop',
      'Core journeys, navigation and state mapping',
      'iOS and Android interface design',
      'React Native component system and implementation',
      'API, authentication and service integration as scoped',
      'Device, accessibility and failure-state testing',
      'Build configuration and release support',
      'Technical handover and next-release recommendations',
    ],
    decision: {
      heading: 'App, responsive website or progressive web app?',
      body: 'An app should earn its place on a customer’s device. The choice depends on frequency, required device capabilities, offline needs, distribution and the cost of maintaining another product surface.',
      items: [
        {
          title: 'Responsive website',
          body: 'Best when access is occasional, search discovery matters and device capabilities are limited.',
        },
        {
          title: 'Progressive web app',
          body: 'Useful when a browser-based experience needs some installable or offline behaviour without full store distribution.',
        },
        {
          title: 'React Native app',
          body: 'A strong fit for repeated signed-in use, notifications, deeper device integration or a product expected to live on the home screen.',
        },
        {
          title: 'Separate native apps',
          body: 'Worth considering when deep platform-specific capability or performance makes shared implementation a constraint.',
        },
      ],
    },
    approach: [
      {
        title: 'Prove the mobile case',
        body: 'Clarify why an installed product is useful and what must be true for people to return.',
      },
      {
        title: 'Design the core loop',
        body: 'Prototype the few journeys that define the product, including loading, permission and offline states.',
      },
      {
        title: 'Build across real devices',
        body: 'Implement shared components and integrations while checking platform behaviour continuously.',
      },
      {
        title: 'Prepare for release',
        body: 'Exercise production configuration, store assets supplied by the client, privacy details and operational handover.',
      },
    ],
    whyUs: [
      'Product interface design and React Native implementation stay in the same hands',
      'The first recommendation may be a better mobile website when an app is not justified',
      'Cross-platform efficiency is balanced with platform-appropriate behaviour',
      'Release scope includes the unglamorous states that determine whether an app feels dependable',
    ],
    faqs: [
      {
        question: 'Why React Native?',
        answer:
          'For many products it supports a shared TypeScript codebase and consistent product system across iOS and Android while retaining access to native capabilities. It is not mandatory; the product requirements decide the approach.',
      },
      {
        question: 'Do you submit apps to the App Store and Google Play?',
        answer:
          'Release preparation and submission support can be included in the proposal. The client owns the store accounts and supplies the verified legal, business and listing information required by each platform.',
      },
      {
        question: 'Can the app connect to our existing website or system?',
        answer:
          'Usually, if that system exposes a suitable and secure API. Integration feasibility, authentication, data ownership and responsibility for backend changes are assessed during scoping.',
      },
      {
        question: 'Can we launch with only the essential features?',
        answer:
          'Yes. A focused first release is often the safest approach, provided it completes one valuable user loop rather than shipping a collection of partial features.',
      },
    ],
    relatedServices: [
      { label: 'Explore web application development', href: '/services/web-app-development' },
      {
        label: 'Explore custom website design for a responsive web alternative',
        href: '/services/web-design-development',
      },
    ],
    relatedInsights: [
      {
        label: 'Website cost in Australia: what actually affects the price?',
        href: '/insights/what-affects-the-cost-of-a-website',
      },
      {
        label: 'Website ownership and hosting: what should your business own?',
        href: '/insights/website-ownership-and-hosting-explained',
      },
    ],
    cta: {
      heading: 'Working out whether an app is the right next step?',
      body: 'Tell us who would use it, how often and what they cannot do well today. We will help frame the right product surface.',
      label: 'Discuss a mobile product',
    },
  },
  {
    slug: 'website-maintenance',
    shortName: 'Website maintenance',
    eyebrow: 'Website maintenance & support · Australia',
    seoTitle: 'Website Maintenance & Support Australia | UI Forge Studio',
    metaDescription:
      'Website maintenance and support for Australian businesses, including technical checks, content updates, performance monitoring and planned improvements.',
    heading: 'Website maintenance and support with a clear owner and plan',
    lead: 'A useful website care plan does more than install updates. It protects important forms and journeys, keeps content accurate, catches deterioration and creates a practical path for ongoing improvements.',
    serviceNote:
      'Remote support across Australia. Care plans are optional, documented and never a condition of working together.',
    sections: {
      fit: { eyebrow: 'Who it is for', heading: 'When website maintenance support makes sense' },
      problems: {
        eyebrow: 'Problems we solve',
        heading: 'Website maintenance problems we help solve',
      },
      includes: { eyebrow: 'Scope', heading: 'What a website care plan can include' },
      decision: { eyebrow: 'Maintenance, support, content changes and improvements' },
      process: { eyebrow: 'How it runs', heading: 'How ongoing website care works' },
      whyUs: {
        eyebrow: 'Why UI Forge Studio',
        heading: 'Why work with UI Forge Studio for ongoing support',
      },
      faqs: { eyebrow: 'Common questions', heading: 'Website maintenance FAQs' },
    },
    idealFor: [
      'Existing UI Forge Studio clients who want continuity after launch',
      'Businesses with a neglected site and no accountable technical contact',
      'Teams that need regular content and interface improvements',
      'Sites preparing for an audit, transition or larger redesign',
    ],
    problems: [
      {
        title: 'Updates happen only when something breaks',
        body: 'A defined review rhythm turns maintenance into prevention, with priorities and responsibilities understood before an urgent issue appears.',
      },
      {
        title: 'Nobody knows whether forms still work',
        body: 'Critical journeys need deliberate checks. A green hosting dashboard does not prove that enquiries, payments or integrations are completing.',
      },
      {
        title: 'Small improvements stay permanently “on the list”',
        body: 'A care plan can reserve space for sensible content, UX and performance work instead of consuming every hour with reactive support.',
      },
    ],
    deliverables: [
      'Initial technical and ownership review',
      'CMS, dependency and platform updates as appropriate',
      'Critical form and journey checks',
      'Uptime, error or performance monitoring where scoped',
      'Content and interface changes within an agreed allowance',
      'Accessibility and performance spot checks',
      'Prioritised improvement recommendations',
      'Documented access and handover on exit',
    ],
    decision: {
      heading: 'Maintenance, support and improvement are different jobs',
      body: 'A clear agreement says which of these are included, how requests are prioritised and what requires a separate scope. That protects both the business and the quality of the site.',
      items: [
        {
          title: 'Maintenance',
          body: 'Routine platform, dependency and technical housekeeping intended to reduce avoidable risk.',
        },
        {
          title: 'Support',
          body: 'Investigation and response when a site feature, integration or publishing workflow is not behaving as expected.',
        },
        {
          title: 'Content changes',
          body: 'Publishing or updating supplied text, images and structured content within the existing system.',
        },
        {
          title: 'Improvements',
          body: 'Planned UX, performance, accessibility or feature work that changes how the site operates.',
        },
      ],
    },
    approach: [
      {
        title: 'Take stock',
        body: 'Confirm ownership, hosting, platform, access, current issues and the parts of the site that matter most.',
      },
      {
        title: 'Stabilise',
        body: 'Resolve urgent risks and establish an appropriate update, backup and checking approach for the stack.',
      },
      {
        title: 'Set the rhythm',
        body: 'Agree how requests arrive, what is included, response expectations and how work is reported.',
      },
      {
        title: 'Improve deliberately',
        body: 'Use what is learned from real operation to prioritise small changes or identify when a redesign is the honest answer.',
      },
    ],
    whyUs: [
      'The same design-and-development perspective can assess both technical and customer-facing issues',
      'Care is optional and the handover path remains clear',
      'Support scope and response expectations are documented rather than implied',
      'A maintenance engagement will not disguise a site that genuinely needs replacement',
    ],
    faqs: [
      {
        question: 'Do you maintain websites you did not build?',
        answer:
          'Sometimes. The first step is a paid or scoped review of the platform, code quality, hosting, access and current risks. Support is offered only when the site can be responsibly maintained.',
      },
      {
        question: 'Is hosting included?',
        answer:
          'Managed hosting may be included where appropriate, but it is not required. The business can retain its own hosting account and grant the access needed for support.',
      },
      {
        question: 'Do you offer emergency support?',
        answer:
          'Availability and response expectations depend on the care agreement. The website does not promise 24/7 or instant response; any urgent-support arrangement must be set out explicitly in writing.',
      },
      {
        question: 'Can we cancel and take the site elsewhere?',
        answer:
          'Yes. Care should not be a form of lock-in. Account ownership, access, notice and handover details are set out in the specific agreement, with business assets kept under client control wherever practical.',
      },
    ],
    relatedServices: [
      {
        label: 'Explore website redesign when replacement is the honest answer',
        href: '/services/website-redesign',
      },
      {
        label: 'Explore custom website design and development',
        href: '/services/web-design-development',
      },
    ],
    relatedInsights: [
      {
        label: 'Website ownership and hosting: what should your business own?',
        href: '/insights/website-ownership-and-hosting-explained',
      },
      {
        label: 'Website cost in Australia: what actually affects the price?',
        href: '/insights/what-affects-the-cost-of-a-website',
      },
    ],
    cta: {
      heading: 'Need someone to take responsible ownership of the website backlog?',
      body: 'Share the site, platform and the issues you already know about. We will first work out whether ongoing care is a responsible fit.',
      label: 'Discuss website support',
    },
  },
];

export const SERVICE_SLUGS = SERVICE_PAGES.map((service) => service.slug);

export const getServicePage = (slug: string) =>
  SERVICE_PAGES.find((service) => service.slug === slug) ?? null;
