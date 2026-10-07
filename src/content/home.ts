// UI Forge Studio — home page content (source: new-design/ export).

export const HERO = {
  eyebrow: 'Founder-led digital studio · Australia',
  heading: 'Custom websites and digital products, designed and built around your business.',
  lead: 'UI Forge Studio is an Australian web design and development studio for businesses that need a clearer website, a stronger online store or a digital product shaped around a real workflow.',
};

export const STATEMENT =
  "Design and development in the same hands. Nothing is lost between a designer's concept and a developer's build, so what you approve is what gets shipped, and it performs.";

export const PROBLEMS = [
  {
    title: 'Your website feels out of date',
    body: 'It no longer reflects the quality of your work, and you hesitate to send people there.',
  },
  {
    title: 'Enquiries are low or poorly matched',
    body: 'Visitors arrive, skim and leave without contacting you, or the wrong kind of client gets in touch.',
  },
  {
    title: 'Mobile feels slow or awkward',
    body: 'Most of your visitors are on a phone, and the experience is costing you their attention.',
  },
  {
    title: 'The template is dictating the business',
    body: 'The platform decided the design instead of the design following what your business does.',
  },
  {
    title: 'You need a product, not just a website',
    body: 'A portal, dashboard, booking system or mobile app, and no one to shape it properly.',
  },
  {
    title: 'Nobody owns ongoing website care',
    body: 'Updates pile up, things quietly break, and there is no one accountable for keeping it healthy.',
  },
];

export type HomeCapability = {
  title: string;
  href: string;
  /** Descriptive visible anchor text (the arrow is added by the template). */
  linkLabel: string;
  body: string;
  badge?: string;
};

export const BUILD_FEATURED: HomeCapability = {
  title: 'Custom websites',
  href: '/services/web-design-development',
  linkLabel: 'Explore custom website design',
  badge: 'Our recommended path for growth',
  body: 'For businesses that need more flexibility, performance and room to grow. Built with modern technology such as Next.js, your website is structured for speed, search visibility and a consistent experience across devices, with no restrictive templates.',
};

export const BUILD_CARDS: HomeCapability[] = [
  {
    title: 'Website redesign',
    href: '/services/website-redesign',
    linkLabel: 'Explore website redesign',
    body: 'Rework content, UX and technical foundations without losing the URLs, content and search value that already work.',
  },
  {
    title: 'E-commerce',
    href: '/services/shopify-development',
    linkLabel: 'Explore Shopify development',
    body: 'Shopify store development for most stores, and custom Shopify storefronts for established brands that have outgrown theme constraints.',
  },
  {
    title: 'HubSpot websites',
    href: '/services/hubspot-websites',
    linkLabel: 'Explore HubSpot website development',
    body: 'Websites and landing pages that live where your marketing does, with forms, contact data and reporting connected from day one.',
  },
  {
    title: 'Web applications',
    href: '/services/web-app-development',
    linkLabel: 'Explore web application development',
    body: 'Client portals, dashboards, booking systems and internal tools, where your team or customers get real work done.',
  },
  {
    title: 'Mobile applications',
    href: '/services/mobile-app-development',
    linkLabel: 'Explore React Native app development',
    body: 'One consistent app experience across iOS and Android with React Native, without running two separate projects.',
  },
  {
    title: 'Ongoing care',
    href: '/services/website-maintenance',
    linkLabel: 'Explore website maintenance',
    body: 'Maintenance, monitoring, content updates and improvements, so your site keeps performing after launch.',
  },
];

export const PLATFORM = {
  eyebrow: 'The right platform',
  heading: 'Tell us about the business. We will recommend the right platform.',
  body: 'You should never have to choose between WordPress, Webflow, Shopify, HubSpot or a custom build yourself. Tell us what your business does, what is not working and what you want to achieve. We will recommend the approach that fits your needs, workflow, budget and long-term plans, and explain the reasoning in plain language.',
  steps: [
    'You tell us about your business, goals and what needs to change.',
    'We recommend a platform and approach, and explain why it fits.',
    'You receive a clear written proposal with scope, timeline and investment.',
  ],
};

export const WORK_SECTION = {
  eyebrow: 'Selected work',
  heading: 'One project, documented in full',
  demoHeading: 'How we document projects, end to end',
  link: { label: 'View all work', href: '/work' },
};

/** The home-page process rail: six delivery stages in two groups, then support. */
export const PROCESS = {
  eyebrow: 'How we work',
  heading: 'A clear path from discovery to launch — with support when you need it.',
  body: 'Strategy, design and development stay connected throughout the project, with one accountable point of contact from the first conversation to go-live.',
  groups: [
    {
      label: 'Plan & design',
      stages: [
        {
          name: 'Discover',
          body: 'Business goals, users, constraints and what success needs to change.',
        },
        {
          name: 'Define',
          body: 'Scope, sitemap, platform, functionality, timeline and investment.',
        },
        {
          name: 'Design',
          body: 'Responsive layouts shaped around real content and customer journeys.',
        },
      ],
    },
    {
      label: 'Build & launch',
      stages: [
        {
          name: 'Build',
          body: 'Production-ready development using the platform agreed during discovery.',
        },
        {
          name: 'Test',
          body: 'Devices, browsers, accessibility, performance, forms and key journeys.',
        },
        {
          name: 'Launch',
          body: 'Managed go-live, redirects, analytics, search checks and handover.',
        },
      ],
    },
  ],
  support: {
    label: 'After launch',
    name: 'Support',
    body: 'Optional maintenance, monitoring, content updates and focused improvements — or a clean handover if you prefer to manage the site internally.',
    link: {
      label: 'See our full website design and development process',
      href: '/process',
    },
  },
};

export const WHY = {
  eyebrow: 'Why UI Forge Studio',
  heading: 'Direct, senior-level collaboration',
  body: 'UI Forge Studio is founder-led. You work directly with the person designing and building your project: one accountable point of contact, from the first conversation to launch and beyond.',
  points: [
    {
      title: 'Design and development together',
      body: 'The person designing your project is the person building it. Nothing is lost in handover.',
    },
    {
      title: 'The right platform, recommended',
      body: 'You never have to choose a technology. We recommend and explain the reasoning.',
    },
    {
      title: 'Built to perform',
      body: 'Fast loading, stable layouts and crawlable, well-structured pages are treated as requirements, not extras.',
    },
    {
      title: 'Honest about size',
      body: 'A founder-led studio, and clear about it. You always know who you are working with.',
    },
  ],
};

export const SCOPING = {
  eyebrow: 'Scoping and investment',
  heading: 'Every project is scoped around what your business actually needs',
  body: 'Rather than forcing different businesses into the same package, we begin with your goals, required functionality and long-term plans. After an initial discovery conversation you receive a clear proposal outlining the recommended approach, project scope, timeline and investment. What affects the investment: number of unique layouts, design complexity, content, functionality, e-commerce and application features, integrations and ongoing support.',
  link: {
    label: 'Read: Website cost in Australia — what actually affects the price?',
    href: '/insights/what-affects-the-cost-of-a-website',
  },
};
