// -------------- UI FORGE STUDIO — SITE CONFIG --------------
// Single source of truth for brand, contact and navigation values.

export const SITE_NAME = 'UI Forge Studio';

export const SITE_TAGLINE = 'Websites and digital products forged around your business';

export const SITE_DESCRIPTION =
  'Founder-led Australian digital studio: websites, e-commerce, web applications and mobile apps, designed and built by the same hands.';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';

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
  { label: 'Custom websites', href: '/services' },
  { label: 'E-commerce', href: '/services' },
  { label: 'Web applications', href: '/services' },
  { label: 'Mobile applications', href: '/services' },
  { label: 'Ongoing care', href: '/services' },
] as const;

export const NETLIFY_FORM_NAME = 'project-inquiry';
