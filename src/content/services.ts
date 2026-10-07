// UI Forge Studio — services page content (source: new-design/ export).

export type ServiceCategory = {
  name: string;
  href: string;
  linkLabel: string;
  /** One-line descriptor for the service index — what this service covers. */
  descriptor: string;
  tag?: string;
  description: string;
  note?: string;
  items: string[];
};

export const SERVICES_HEADING = 'Web design, e-commerce and application development services';

export const SERVICES_INTRO =
  'UI Forge Studio designs and builds websites, online stores and digital products for Australian businesses. You do not need to choose the technology first: describe the problem, users and workflow, and we will recommend the approach that fits your budget and long-term plans.';

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    name: 'Web design & development',
    href: '/services/web-design-development',
    linkLabel: 'Explore custom website design and development',
    descriptor: 'Custom websites built for clarity, performance and search visibility.',
    tag: 'Most projects start here',
    description:
      'From a streamlined site that presents your business clearly, to a fully custom build. For growth-focused businesses we usually recommend a custom website: built with modern technology such as Next.js, structured for speed, search visibility and a consistent experience across devices, with no restrictive templates.',
    note: 'Prefer a familiar editor? WordPress suits content-heavy sites with regular publishing; Webflow suits polished marketing sites with visual editing. And if your business runs on HubSpot, your website can live where your marketing does — with forms, contact data and campaign reporting connected from day one. We recommend based on your needs, workflow, budget and long-term plans.',
    items: [
      'Custom websites (Next.js)',
      'Marketing and campaign websites',
      'WordPress websites',
      'Webflow websites',
      'HubSpot CMS websites',
      'Streamlined brochure websites',
    ],
  },
  {
    name: 'Website redesign',
    href: '/services/website-redesign',
    linkLabel: 'Explore website redesign',
    descriptor: 'Rework content, UX and technical foundations without losing what already works.',
    description:
      'For sites that look dated, explain the wrong version of the business, underperform on mobile or have become difficult to maintain. The work starts with what should be kept, improved, combined or replaced — not a blank-canvas redesign for its own sake.',
    note: 'A redesign can remain on the current platform when it still fits. When a migration is justified, valuable content, URLs, metadata and integrations are mapped before the new build replaces them.',
    items: [
      'Current-site UX and content audit',
      'Search-intent and redirect planning',
      'Revised information architecture',
      'Responsive redesign and development',
      'Migration and launch checks',
    ],
  },
  {
    name: 'Shopify development',
    href: '/services/shopify-development',
    linkLabel: 'Explore Shopify development',
    descriptor: 'Theme-led or custom storefronts shaped around how customers actually buy.',
    description:
      'Two clear paths, recommended by where your store is today. Shopify store development is right for most stores: theme customisation, landing and product pages, conversion-focused improvements, subscriptions, international storefronts, integrations and ongoing development.',
    note: "Outgrown theme constraints? For established brands we build custom Shopify storefronts with Hydrogen, Shopify's React-based storefront framework: a fully custom shopping experience with unique design, speed and flexibility, while Shopify keeps handling the products, checkout and payments you already trust. We recommend it only where the budget and business case justify it — well-executed theme work serves most stores better.",
    items: [
      'Shopify store development',
      'Theme customisation and conversion improvements',
      'Subscriptions and international storefronts',
      'Custom Shopify storefronts (Hydrogen)',
      'Integrations and ongoing store development',
    ],
  },
  {
    name: 'HubSpot websites',
    href: '/services/hubspot-websites',
    linkLabel: 'Explore HubSpot website development',
    descriptor:
      'Content Hub websites, reusable modules and campaign systems connected to marketing.',
    description:
      'HubSpot Content Hub websites and campaign systems for teams that need content, forms, contact records and marketing activity to work together. Reusable modules give editors useful control without letting every page drift away from the design system.',
    note: 'The core service is website design and frontend development in HubSpot. CRM architecture, complex automation and data migration are scoped explicitly and may involve a dedicated operations specialist.',
    items: [
      'Content Hub websites and redesigns',
      'Theme and template architecture',
      'Reusable modules and landing pages',
      'Forms and CRM-connected journeys',
      'Content migration and editor guidance',
    ],
  },
  {
    name: 'Web applications',
    href: '/services/web-app-development',
    linkLabel: 'Explore web application development',
    descriptor: 'Portals, dashboards, booking systems and internal workflow tools.',
    description:
      'A website communicates and markets; a web application lets people get work done. We design and build the tools your customers or team use every day.',
    items: [
      'Client portals',
      'Dashboards and reporting interfaces',
      'Booking and membership systems',
      'Internal tools and workflow apps',
    ],
  },
  {
    name: 'Mobile applications',
    href: '/services/mobile-app-development',
    linkLabel: 'Explore React Native app development',
    descriptor: 'React Native products for iOS and Android built from one coherent product system.',
    description:
      'Launch a consistent experience across iOS and Android without managing two separate application projects, using React Native. An efficient choice for most products, and when your requirements demand a different approach, we will say so.',
    items: [
      'React Native apps for iOS and Android',
      'App interface design',
      'Integration with your website or systems',
    ],
  },
  {
    name: 'Website maintenance',
    href: '/services/website-maintenance',
    linkLabel: 'Explore website maintenance and support',
    descriptor: 'Ongoing technical care, content updates, monitoring and focused improvements.',
    description:
      'Websites need looking after. Care plans cover the practical work of keeping your site healthy, fast and up to date, with one accountable point of contact.',
    note: 'Care plans are optional and never a condition of working together. You can take everything in-house at any time with a clear handover.',
    items: [
      'Maintenance and technical support',
      'Performance monitoring',
      'Content updates',
      'Feature improvements',
      'Managed hosting where appropriate',
    ],
  },
];

export const SERVICES_INDEX_PROMPT = {
  heading: 'Not sure which service fits?',
  body: 'Describe the problem and we will recommend the path.',
  cta: { label: 'Get a recommendation', href: '/start-a-project' },
};

export const SERVICES_CTA_CARD = {
  heading: 'Not sure where your project fits?',
  body: 'Describe the business problem, the current setup and what needs to change. We will recommend the most sensible service and platform path.',
  cta: { label: 'Get a project recommendation', href: '/start-a-project' },
};
