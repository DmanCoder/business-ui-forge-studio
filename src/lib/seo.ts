import type { Metadata } from 'next';

import {
  BASE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  CONTACT_EMAIL,
  STUDIO_REGION,
  AUTHOR_NAME,
} from '@src/config/site';

type BuildMetadataArgs = {
  title: string;
  description: string;
  /** Clean path without locale prefix, e.g. '/services'. '/' for home. */
  path: string;
  ogType?: 'website' | 'article';
  noIndex?: boolean;
  ogImage?: string;
};

/** Absolute URL for a clean (locale-free) path. */
export const absoluteUrl = (path: string) => new URL(path, BASE_URL).toString();

/**
 * Shared metadata builder: title, description, canonical + hreflang,
 * Open Graph and Twitter cards. Canonicals use clean locale-free URLs —
 * `/` serves `en` via rewrite, so `/en/...` pages canonicalise to `/...`.
 */
export const buildMetadata = ({
  title,
  description,
  path,
  ogType = 'website',
  noIndex = false,
  ogImage,
}: BuildMetadataArgs): Metadata => {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: url,
      languages: {
        en: url,
        'x-default': url,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: ogType,
      locale: 'en_AU',
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      card: ogImage ? 'summary_large_image' : 'summary',
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
};

/**
 * Site-wide ProfessionalService schema. Remote-first studio — street address
 * intentionally omitted (never fabricate one); areaServed per brief.
 */
export const professionalServiceSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${BASE_URL}/#organization`,
  name: SITE_NAME,
  url: BASE_URL,
  description: SITE_DESCRIPTION,
  email: CONTACT_EMAIL,
  areaServed: STUDIO_REGION ? ['Australia', STUDIO_REGION] : 'Australia',
});

export const webSiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  url: BASE_URL,
  name: SITE_NAME,
  publisher: { '@id': `${BASE_URL}/#organization` },
});

export const webPageSchema = ({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${absoluteUrl(path)}#webpage`,
  url: absoluteUrl(path),
  name: title,
  description,
  isPartOf: { '@id': `${BASE_URL}/#website` },
});

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

export const articleSchema = ({
  title,
  description,
  path,
  datePublished,
  dateModified,
  image,
}: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  '@id': `${absoluteUrl(path)}#article`,
  mainEntityOfPage: absoluteUrl(path),
  headline: title,
  description,
  datePublished,
  dateModified: dateModified ?? datePublished,
  ...(image ? { image } : {}),
  author: { '@type': 'Person', name: AUTHOR_NAME },
  publisher: { '@id': `${BASE_URL}/#organization` },
});

/** Case-study pages: the project as a CreativeWork by the studio. */
export const creativeWorkSchema = ({
  title,
  description,
  path,
  datePublished,
  dateModified,
  image,
}: {
  title: string;
  description: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  '@id': `${absoluteUrl(path)}#creativework`,
  mainEntityOfPage: absoluteUrl(path),
  name: title,
  description,
  ...(datePublished ? { datePublished } : {}),
  ...(dateModified || datePublished ? { dateModified: dateModified ?? datePublished } : {}),
  ...(image ? { image } : {}),
  creator: { '@id': `${BASE_URL}/#organization` },
  publisher: { '@id': `${BASE_URL}/#organization` },
});

/** Serialise a schema object for a JSON-LD script tag. */
export const jsonLd = (schema: object) => JSON.stringify(schema);
