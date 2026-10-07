import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import LegalPage, { type LegalSection } from '@src/components/legal/LegalPage';
import { CONTACT_EMAIL } from '@src/config/site';
import { ALLOWED_LOCALES } from '@src/typescriptGlobals/constants';
import { breadcrumbSchema, buildMetadata, jsonLd, webPageSchema } from '@src/lib/seo';

import { PageTypes } from '@src/typescriptGlobals/types';

const TITLE = 'Website disclaimer';
const DESCRIPTION =
  'Important context for general website, technology, project and outcome information published by UI Forge Studio.';
const SEO_TITLE = 'Website Disclaimer | UI Forge Studio';
const PATH = '/disclaimer';
const UPDATED = '6 October 2026';

const SECTIONS: LegalSection[] = [
  {
    heading: 'General information only',
    paragraphs: [
      'Content on this website is general information about website design, development, digital products and the way UI Forge Studio approaches potential work. It is not a substitute for advice based on your business, users, systems, budget and legal obligations.',
      'Nothing on the site is legal, financial, tax, accounting, cybersecurity or other regulated professional advice. Obtain appropriate independent advice where a decision depends on those matters.',
    ],
  },
  {
    heading: 'Technology and platform information changes',
    paragraphs: [
      'Software, frameworks, hosting services, commerce platforms, content systems, search-engine guidance, app-store requirements and third-party prices can change after content is published. Examples and comparisons are contextual, not permanent statements about a product.',
      'A platform recommendation for one project may be unsuitable for another. Current requirements are checked during a scoped engagement rather than assumed from an article or service page.',
    ],
  },
  {
    heading: 'No guaranteed business or search outcome',
    paragraphs: [
      'Good design and development can improve clarity, usability, accessibility, performance and the technical foundation for discovery. They cannot guarantee search rankings, traffic, enquiries, sales, revenue, funding, user adoption or another business result.',
      'Those outcomes are affected by factors outside the studio’s control, including the offer, market, competition, content, traffic quality, operations, pricing, reputation, product-market fit and changes made by third-party platforms.',
    ],
  },
  {
    heading: 'Work examples and case studies',
    paragraphs: [
      'Published work is labelled to distinguish client work, internal projects and concepts. A case study describes its own context and is not a promise that another project will produce the same result. Metrics are not published as outcomes unless they can be supported.',
      'Screenshots and descriptions can become dated as websites and products continue to change after publication.',
    ],
  },
  {
    heading: 'External links and third-party services',
    paragraphs: [
      'Links to external websites are provided for reference or convenience. Their content, claims, availability, security and privacy practices are controlled by their owners. A link does not create an endorsement, partnership or responsibility for that site.',
    ],
  },
  {
    heading: 'Service scope and availability',
    paragraphs: [
      'Descriptions on this site are examples of capabilities, not standing offers to perform every listed service. Availability, fit, responsibilities, exclusions, timing and fees depend on discovery and a written proposal.',
      'No client relationship or duty to act is created by visiting the website, reading content, sending an enquiry or receiving an initial reply.',
    ],
  },
  {
    heading: 'Website availability and errors',
    paragraphs: [
      'Reasonable efforts are made to keep the site useful and accurate, but it may contain errors or become unavailable. Content can be corrected, changed or removed without notice. You are responsible for checking information that materially affects a decision.',
    ],
  },
  {
    heading: 'Consumer rights and contact',
    paragraphs: [
      <>
        Nothing in this disclaimer excludes or limits rights or remedies that cannot lawfully be
        excluded, including applicable rights under the Australian Consumer Law. To report an error
        or ask a question, email{' '}
        <a
          className='text-ink decoration-blue font-semibold underline'
          href={`mailto:${CONTACT_EMAIL}`}
        >
          {CONTACT_EMAIL}
        </a>
        .
      </>,
    ],
  },
];

export async function generateStaticParams() {
  return ALLOWED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({ title: SEO_TITLE, description: DESCRIPTION, path: PATH });
}

export default async function DisclaimerPage(props: PageTypes) {
  const { locale } = await props.params;
  if (!ALLOWED_LOCALES.includes(locale)) notFound();

  return (
    <>
      <LegalPage
        title={TITLE}
        intro='This disclaimer sets realistic boundaries around general information, platform commentary, case studies and potential project outcomes.'
        updated={UPDATED}
        sections={SECTIONS}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: jsonLd(webPageSchema({ title: SEO_TITLE, description: DESCRIPTION, path: PATH })),
        }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: TITLE, path: PATH },
            ])
          ),
        }}
      />
    </>
  );
}
