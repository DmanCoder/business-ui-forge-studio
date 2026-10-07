import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import LegalPage, { type LegalSection } from '@src/components/legal/LegalPage';
import { CONTACT_EMAIL, SITE_NAME } from '@src/config/site';
import { ALLOWED_LOCALES } from '@src/typescriptGlobals/constants';
import { breadcrumbSchema, buildMetadata, jsonLd, webPageSchema } from '@src/lib/seo';

import { PageTypes } from '@src/typescriptGlobals/types';

const TITLE = 'Website terms of use';
const DESCRIPTION = `Terms that apply when you access the ${SITE_NAME} website, read its content or send an enquiry.`;
const SEO_TITLE = 'Website Terms of Use | UI Forge Studio';
const PATH = '/terms';
const UPDATED = '6 October 2026';

const SECTIONS: LegalSection[] = [
  {
    heading: 'About these terms',
    paragraphs: [
      `These terms apply to your use of the ${SITE_NAME} website. By using the website, you agree to use it lawfully and consistently with these terms. If you do not agree, you should stop using the site.`,
      'These are website terms, not a client services agreement. Any design, development, maintenance or consulting engagement is governed by the written proposal and agreement accepted for that project.',
    ],
  },
  {
    heading: 'Website content and permitted use',
    paragraphs: [
      'You may read, link to and make ordinary personal or internal business use of the website. You must not use the site in a way that is unlawful, fraudulent, harmful, disruptive or intended to bypass security or access controls.',
    ],
    items: [
      'Do not probe, attack, overload or interfere with the website or its providers.',
      'Do not submit malicious code, spam, false identity information or material that infringes another person’s rights.',
      'Do not scrape or reproduce substantial website content for resale, training a competing service or creating a misleading association.',
      'Do not imply that the studio endorses you, your business or your service without written permission.',
    ],
  },
  {
    heading: 'Intellectual property',
    paragraphs: [
      'Unless stated otherwise, the website’s original text, visual design, graphics, code examples, brand elements and other studio-created material are owned by or licensed to UI Forge Studio and protected by applicable intellectual property laws.',
      'You may quote short portions with appropriate attribution and a link to the source. Any broader reproduction, adaptation, commercial use or removal of ownership notices requires written permission. Third-party names, products and trade marks remain the property of their respective owners.',
    ],
  },
  {
    heading: 'Information, accuracy and availability',
    paragraphs: [
      'The website provides general information about studio services, process, technology and digital projects. Reasonable care is taken with the content, but it may not be complete, current or suitable for your circumstances. Technology, platform features, prices and external requirements can change.',
      'The website may be changed, suspended or unavailable without notice. There is no promise that access will be uninterrupted, error-free or compatible with every device, browser or network.',
    ],
  },
  {
    heading: 'Enquiries, proposals and client relationships',
    paragraphs: [
      'Sending an enquiry does not create a client relationship, reserve capacity or require either party to proceed. Any early discussion, estimate or recommendation remains subject to discovery, availability, due diligence and a written proposal.',
      'A project begins only when the relevant written agreement has been accepted and any stated commencement requirements have been met. Scope, fees, timing, payment, ownership, warranties, third-party costs, support and cancellation are handled in that project-specific agreement.',
    ],
  },
  {
    heading: 'Third-party platforms and external links',
    paragraphs: [
      'The website discusses or links to platforms and services such as hosting providers, content systems, commerce tools and development frameworks. Those products are controlled by their providers and may change independently. A reference is not a guarantee, partnership claim or endorsement unless expressly stated.',
      'External links are provided for context or convenience. UI Forge Studio does not control external sites and is not responsible for their content, security, availability, privacy practices or terms.',
    ],
  },
  {
    heading: 'Liability and Australian Consumer Law',
    paragraphs: [
      'To the extent permitted by law, UI Forge Studio is not responsible for loss caused by relying on general website content without obtaining advice suited to your circumstances, by an external website or platform, or by events outside reasonable control.',
      'Nothing in these terms excludes, restricts or modifies a right, guarantee, remedy or liability that cannot lawfully be excluded or limited, including applicable rights under the Australian Consumer Law. Where liability can lawfully be limited, it is limited only to the extent permitted by law.',
    ],
  },
  {
    heading: 'Privacy',
    paragraphs: [
      <>
        Personal information connected with this website is handled as described in the{' '}
        <Link className='text-ink decoration-blue font-semibold underline' href='/privacy'>
          privacy policy
        </Link>
        . Do not send passwords, payment-card details or unnecessary sensitive information through
        the enquiry form.
      </>,
    ],
  },
  {
    heading: 'Changes, severability and applicable law',
    paragraphs: [
      'These terms may be updated when the website or applicable requirements change. The current version and updated date will appear on this page. Continued use after a change means the updated terms apply from that point.',
      'If a provision is found invalid or unenforceable, the remaining provisions continue as far as the law allows. These terms are governed by the laws that apply in Australia, and disputes are subject to the courts and tribunals that have jurisdiction in the circumstances.',
    ],
  },
  {
    heading: 'Contact',
    paragraphs: [
      <>
        Questions about these website terms can be sent to{' '}
        <a
          className='text-ink decoration-blue font-semibold underline'
          href={`mailto:${CONTACT_EMAIL}`}
        >
          {CONTACT_EMAIL}
        </a>
        . Questions about a client engagement should also refer to the accepted proposal and
        agreement for that project.
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

export default async function TermsPage(props: PageTypes) {
  const { locale } = await props.params;
  if (!ALLOWED_LOCALES.includes(locale)) notFound();

  return (
    <>
      <LegalPage
        title={TITLE}
        intro='These terms explain the rules for using this website. They deliberately do not invent project deposits, cancellation fees or commercial terms that belong in a client-specific agreement.'
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
