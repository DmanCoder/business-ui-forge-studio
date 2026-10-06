// -------------- UI FORGE STUDIO — SITE CONFIG --------------
// Single source of truth for brand, contact and navigation values.

export const SITE_NAME = 'UI Forge Studio';

export const SITE_TAGLINE = 'Web design and development for Australian businesses';

export const SITE_DESCRIPTION =
  'Founder-led Australian web design and development studio for custom websites, Shopify, HubSpot, web applications, mobile apps and ongoing support.';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://uiforgestudio.com.au';

export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'hello@uiforgestudio.com.au';

/** Enquiry response-time promise, used in the CTA band, footer and form. */
export const RESPONSE_TIME = 'two business days';

/**
 * Set the founder's real name before launch — bylines fall back to 'The founder'.
 * (Kept intentionally empty until confirmed; never guess.)
 */
export const FOUNDER_NAME = '';

export const AUTHOR_NAME = FOUNDER_NAME || 'The founder';

/**
 * City/region for local search — leave empty until the founder confirms exact
 * wording; never guess.
 */
export const STUDIO_REGION = '';

/** Only ever show testimonials when real ones exist. */
export const SHOW_TESTIMONIALS = false;

export const NAV_ITEMS = [
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'Process', href: '/process' },
  { label: 'About', href: '/about' },
  { label: 'Insights', href: '/insights' },
] as const;

export const CTA_ITEM = { label: 'Start a project', href: '/start-a-project' } as const;

export const FOOTER_SERVICES = [
  { label: 'Web design & development', href: '/services/web-design-development' },
  { label: 'Website redesign', href: '/services/website-redesign' },
  { label: 'Shopify development', href: '/services/shopify-development' },
  { label: 'HubSpot websites', href: '/services/hubspot-websites' },
  { label: 'Web applications', href: '/services/web-app-development' },
  { label: 'Mobile applications', href: '/services/mobile-app-development' },
  { label: 'Website maintenance', href: '/services/website-maintenance' },
] as const;

export const NETLIFY_FORM_NAME = 'project-inquiry';
