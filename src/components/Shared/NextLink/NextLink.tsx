'use client';
import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import isFullUrl from '@src/utils/isFullUrl';
import checkTrustedDomain from '@src/utils/checkTrustedDomain';
import { ALLOWED_LOCALES } from '@src/typescriptGlobals/constants';
import { NextLinkPropTypes } from './NextLink.types';

const LOCALES = ALLOWED_LOCALES;

function normalizeInternalHref(raw: string, locale: string) {
  // ensure string
  let href = String(raw || '/');

  // pass through hash-only or bang links (handled elsewhere)
  if (href.startsWith('#') || href.startsWith('!')) return href;

  // ensure leading slash so it's never relative to current path
  if (!href.startsWith('/')) href = `/${href}`;

  // collapse duplicate slashes
  href = href.replace(/\/{2,}/g, '/');

  // if path already has a locale prefix, respect it
  if (LOCALES.some((l) => href === `/${l}` || href.startsWith(`/${l}/`))) {
    // if EN should live at the root, strip /en
    if (href === '/en') return '/';
    if (href.startsWith('/en/')) return href.slice(3) || '/';
    return href;
  }

  // add locale prefix for non-EN; EN stays root
  return locale === 'en' ? href : `/${locale}${href}`;
}

const NextLink: React.FC<NextLinkPropTypes> = ({
  className = '',
  href = '#',
  title,
  scroll,
  ariaLabel,
  replace,
  children,
  locale,
  prefetch = false,
  // you can add rel/target overrides if needed
}) => {
  const params = useParams<{ locale?: string }>();
  const currentLocale = locale || params?.locale || 'en';

  // External URL (http/https/mailto/tel/etc.)
  if (isFullUrl({ url: href })) {
    const rel = checkTrustedDomain({ href }); // make sure this at least adds noopener noreferrer for _blank
    return (
      <a
        href={href}
        target='_blank'
        rel={rel}
        className={`text-primary underline ${className}`}
        title={title}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  // In-page hash: keep it a real <a> for accessibility & native scroll
  if (href?.startsWith('#')) {
    return (
      <a
        href={href}
        className={`text-primary underline ${className}`}
        title={title}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  // Internal link: normalize to absolute, add/strip locale safely
  const finalHref = normalizeInternalHref(href, currentLocale);

  return (
    <Link
      href={finalHref}
      scroll={scroll}
      replace={replace}
      prefetch={prefetch}
      className={`text-primary underline ${className}`}
      title={title}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
};

export default NextLink;
