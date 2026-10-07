// UI Forge Studio — process page content (source: new-design/ export).

export type ProcessPhase = {
  name: string;
  description: string;
  /** Rendered after a bold "You get:" prefix. */
  deliverable: string;
};

export const PROCESS_HEADING = 'Our website design and development process';

export const PROCESS_INTRO =
  'Seven clear phases from the first conversation to launch — with optional support afterwards. You always know what we are working on, what we need from you and what comes next.';

export const PROCESS_PHASES: ProcessPhase[] = [
  {
    name: 'Discover',
    description:
      'We start with your business, not the technology: what you do, who your customers are, what is working, what is not and what a successful project would change.',
    deliverable:
      'a shared understanding of goals, and honest advice on whether we are the right fit.',
  },
  {
    name: 'Define',
    description:
      'We turn the conversation into a concrete plan: recommended platform and approach, sitemap, functionality, timeline and investment.',
    deliverable:
      'a clear written proposal. Work begins once the scope is agreed and a deposit is received.',
  },
  {
    name: 'Design',
    description:
      'Layouts are designed around your actual content, customers and goals, with usability, responsiveness and real implementation in mind from the first sketch.',
    deliverable: 'designs to review at agreed checkpoints, with room for structured feedback.',
  },
  {
    name: 'Build',
    description:
      'The approved design is built with modern, reliable technology suited to your project, structured for speed, search visibility and easy content management.',
    deliverable:
      'a preview link so you can watch the site take shape and try it on your own devices.',
  },
  {
    name: 'Test',
    description:
      'Before launch we test across devices and browsers, check accessibility, tune performance and walk through every form and journey.',
    deliverable: 'a site that has been genuinely exercised, not just glanced at.',
  },
  {
    name: 'Launch',
    description:
      'Go-live is planned and managed: domain, hosting, redirects, analytics hookup and search-engine basics, handled carefully so nothing is lost in the switch.',
    deliverable: 'a smooth launch and a walkthrough of how to manage your new site.',
  },
  {
    name: 'Support',
    description:
      'After launch you choose: manage things yourself with our handover, or an ongoing care plan covering hosting, monitoring, updates and improvements.',
    deliverable: 'ongoing support if you want it, and a clear handover if you do not. No lock-in.',
  },
];

export const PROCESS_CLOSING = {
  heading: 'Ready when you are',
  body: 'The process starts with a short enquiry. No commitment, no jargon.',
  cta: { label: 'Start a project', href: '/start-a-project' },
};
