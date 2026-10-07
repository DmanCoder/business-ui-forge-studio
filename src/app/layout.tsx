import React from 'react';
import type { Metadata } from 'next';

import { displayFont, bodyFont } from './font';

import Header from '@src/components/layout/Header';
import Footer from '@src/components/layout/Footer';
import { SITE_NAME, SITE_TAGLINE, SITE_DESCRIPTION, BASE_URL } from '@src/config/site';
import { organizationSchema, webSiteSchema, jsonLd } from '@src/lib/seo';
import { IS_PREVIEW } from '@src/typescriptGlobals/constants';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  // Every route supplies an absolute title via buildMetadata; this default
  // only covers routes without their own metadata (e.g. the global 404).
  title: {
    default: `${SITE_TAGLINE} | ${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  ...(IS_PREVIEW ? { robots: { index: false, follow: false } } : {}),
};

const RootLayout = async (props: {
  params: Promise<{ locale?: string }>;
  children: React.ReactNode;
}) => {
  const params = await props.params;
  const locale = params.locale ?? 'en';

  return (
    <html lang={locale} className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className='flex min-h-screen flex-col'>
        <a
          href='#main-content'
          className='bg-blue sr-only z-70 rounded-[0.6rem] px-[1.6rem] py-[1rem] font-semibold text-white focus:not-sr-only focus:fixed focus:top-[1rem] focus:left-[1rem]'
        >
          Skip to content
        </a>

        <Header />

        <main id='main-content' className='flex-1'>
          {props.children}
        </main>

        <Footer />

        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: jsonLd(organizationSchema()) }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: jsonLd(webSiteSchema()) }}
        />
      </body>
    </html>
  );
};

export default RootLayout;
