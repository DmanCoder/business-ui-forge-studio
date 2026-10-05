// UI Forge Studio — services page content (source: new-design/ export).

export type ServiceCategory = {
  name: string;
  tag?: string;
  description: string;
  note?: string;
  items: string[];
};

export const SERVICES_HEADING = 'Organised around what your business needs';

export const SERVICES_INTRO =
  'Not sure which of these you need? That is normal, and it is our job to work out. Describe your situation through the enquiry form and we will recommend the right approach.';

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    name: 'Websites',
    tag: 'Most projects start here',
    description:
      'From a streamlined site that presents your business clearly, to a fully custom build. For growth-focused businesses we usually recommend a custom website: built with modern technology such as Next.js, structured for speed, search visibility and a seamless experience across devices, with no restrictive templates.',
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
    name: 'Landing pages and campaigns',
    description:
      'Focused pages built to support a campaign, offer or launch — designed to convert, and connected to the marketing tools you already use. Built in Webflow or HubSpot, depending on where your marketing lives.',
    note: 'Already running on HubSpot? We build campaign and lead-generation landing pages, custom themes and modules, and improve existing HubSpot sites. We recommend HubSpot only when your business is genuinely invested in it.',
    items: [
      'Campaign and lead-generation landing pages',
      'HubSpot landing pages and modules',
      'Webflow landing pages',
      'Improvements to existing HubSpot sites',
    ],
  },
  {
    name: 'E-commerce',
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
    name: 'Digital products',
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
    description:
      'Launch a consistent experience across iOS and Android without managing two separate application projects, using React Native. An efficient choice for most products, and when your requirements demand a different approach, we will say so.',
    items: [
      'React Native apps for iOS and Android',
      'App interface design',
      'Integration with your website or systems',
    ],
  },
  {
    name: 'Ongoing care',
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

export const SERVICES_CTA_CARD = {
  heading: 'Not sure where your project fits?',
  body: 'Describe it in plain language. We will recommend the right approach.',
  cta: { label: 'Start a project', href: '/start-a-project' },
};
