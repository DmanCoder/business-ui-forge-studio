// =============================================
//                   BASE
// =============================================
export type FadeInDirectionTypes = 'left' | 'right' | 'top' | 'bottom';

export type FadeInConfigTypes = {
  id: string;
  fadeInFrom: FadeInDirectionTypes;
};

/* eslint-disable no-unused-vars */
export const enum BreakPointTypes {
  SM = 500,
  MD = 768,
  LG = 1024,
  XL = 1280,
  XLL = 1536,
}
/* eslint-enable no-unused-vars */

/* eslint-disable no-unused-vars */
export const enum APP_ROUTES {
  HOME = '/',
  MY_STORY = '/my-story',
  BLOGS = '/blogs',
  PRIVACY_POLICY = '/privacy-policy',
  CONTACT = '/contact',
}
/* eslint-enable no-unused-vars */

// =============================================
//                   CSS TYPES
// =============================================
export type ObjectFitTypes = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';

// =============================================
//              Local storage types
// =============================================
export type TabSessionKeyTypes = 'postTab';

export type NewsLetterTypes = {
  title?: string;
  subTitle?: string;
  btnText?: string;
};

export type PageTypes = {
  params: Promise<{ locale: string; slug: string; category?: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};
