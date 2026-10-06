import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import LegalPage, { type LegalSection } from '@src/components/legal/LegalPage';
import { CONTACT_EMAIL, SITE_NAME } from '@src/config/site';
import { ALLOWED_LOCALES } from '@src/typescriptGlobals/constants';
import { breadcrumbSchema, buildMetadata, jsonLd, webPageSchema } from '@src/lib/seo';

import { PageTypes } from '@src/typescriptGlobals/types';

const TITLE = 'Privacy policy';
const DESCRIPTION =
  'How UI Forge Studio handles enquiry details, technical information and other personal information provided through this website.';
const PATH = '/privacy';
const UPDATED = '6 October 2026';

const SECTIONS: LegalSection[] = [
  {
    heading: 'Who this policy is about',
    paragraphs: [
      <>
        This policy explains how {SITE_NAME}, an independent Australian design and development
        studio, handles personal information connected with this website and project enquiries. For
        privacy questions, email{' '}
        <a
          className='text-ink decoration-blue font-semibold underline'
          href={`mailto:${CONTACT_EMAIL}`}
        >
          {CONTACT_EMAIL}
        </a>
        .
      </>,
      'A separate client agreement may describe additional information handling for an active project. If that agreement and this website policy cover different activities, the project-specific document applies to that work.',
    ],
  },
  {
    heading: 'Information you provide directly',
    paragraphs: [
      'The studio collects information you choose to provide when you send an enquiry, email the studio or continue a project conversation.',
    ],
    items: [
      'Your name, email address, business or organisation and existing website.',
      'The type of project, project brief, intended users, timing and approximate budget you choose to share.',
      'How you heard about the studio and any other details included in your message.',
      'Later correspondence, meeting notes, proposals and project material when you decide to continue the conversation.',
    ],
  },
  {
    heading: 'Technical information and spam protection',
    paragraphs: [
      'Like most hosted websites, the hosting and network services used to deliver the site may process technical request information such as an IP address, browser type, device information, requested URL, timestamps and security events. This information is used to deliver, secure and diagnose the website.',
      'When Google reCAPTCHA is configured and visible on the enquiry form, Google may process device, browser and interaction information to assess whether a submission is automated. Google’s own privacy terms apply to that processing. If reCAPTCHA is not shown, its script is not loaded by this site.',
    ],
  },
  {
    heading: 'Cookies and analytics',
    paragraphs: [
      'This codebase does not currently include advertising pixels, behavioural advertising or a general visitor analytics product. A decorative cookie banner is therefore not used.',
      'Security, hosting or reCAPTCHA services may still use strictly functional or security-related storage when those features are active. If analytics or marketing technology is added later, this policy and the consent approach will be reviewed before that change is treated as production-ready.',
    ],
  },
  {
    heading: 'How information is used',
    paragraphs: [
      'Personal information is used only for reasonable studio and website purposes, including to:',
    ],
    items: [
      'respond to an enquiry and decide whether the studio is a suitable fit;',
      'recommend an approach, prepare a proposal and discuss scope, timing and investment;',
      'deliver, administer and support work if you become a client;',
      'operate, secure, troubleshoot and improve the website and enquiry process;',
      'maintain business, tax and legal records where required; and',
      'prevent spam, fraud, misuse and security incidents.',
    ],
  },
  {
    heading: 'Service providers and disclosure',
    paragraphs: [
      'Information may be handled by service providers only where reasonably necessary to operate the website, receive and respond to enquiries, communicate, store business records or deliver an agreed project. The public website is hosted on Netlify, and enquiry submissions are handled through Netlify Forms. Google reCAPTCHA may be used for spam protection when configured.',
      'Personal information is not sold. It may be disclosed when required by law, to protect legal rights or security, or with your direction or consent. Project-specific platforms or collaborators are identified during the relevant engagement rather than assumed in this website policy.',
    ],
  },
  {
    heading: 'Processing outside Australia',
    paragraphs: [
      'Some technology providers operate global infrastructure and may store or process information outside Australia. The exact location can depend on the provider, account configuration and service in use. By submitting an enquiry, you acknowledge that the information may be processed through those services.',
      'Where a project requires additional platforms or overseas processing, those choices should be discussed as part of the project and reflected in the relevant configuration or agreement.',
    ],
  },
  {
    heading: 'Retention',
    paragraphs: [
      'Information is kept only for as long as it remains reasonably useful for the purpose it was collected, for an ongoing relationship, for security and backup continuity, or to meet legal, accounting and record-keeping obligations. Different records have different useful and required retention periods, so this policy does not promise an arbitrary fixed deletion date.',
      'Information that is no longer reasonably required is deleted, de-identified or allowed to expire through the normal retention controls of the relevant service, subject to lawful backup and record-keeping needs.',
    ],
  },
  {
    heading: 'Security',
    paragraphs: [
      'Reasonable technical and organisational steps are used to protect information, including limiting access to people and services that need it and using reputable hosted services. No internet transmission or storage system can be guaranteed completely secure, so sensitive credentials, payment-card details or unnecessary confidential information should not be sent through the enquiry form.',
    ],
  },
  {
    heading: 'Access, correction, deletion and complaints',
    paragraphs: [
      <>
        You can ask what personal information the studio holds about you, request a correction, ask
        for deletion where it can lawfully and reasonably be completed, or raise a privacy concern
        by emailing{' '}
        <a
          className='text-ink decoration-blue font-semibold underline'
          href={`mailto:${CONTACT_EMAIL}`}
        >
          {CONTACT_EMAIL}
        </a>
        . Enough information may be requested to verify your identity and locate the relevant
        record.
      </>,
      'The studio will consider the request and respond within a reasonable time. Some information may need to be retained where required by law, needed for a current agreement or necessary to establish, exercise or defend a legal claim.',
    ],
  },
  {
    heading: 'External links and policy changes',
    paragraphs: [
      'This website may link to third-party websites. Their privacy practices are controlled by them, and you should review their policies before providing information.',
      'This policy may be updated when the website, providers or information-handling practices change. The current version and updated date will be published on this page.',
    ],
  },
];

export async function generateStaticParams() {
  return ALLOWED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH, noIndex: true });
}

export default async function PrivacyPage(props: PageTypes) {
  const { locale } = await props.params;
  if (!ALLOWED_LOCALES.includes(locale)) notFound();

  return (
    <>
      <LegalPage
        title={TITLE}
        intro='This policy describes the website’s current information-handling practices in plain language. It does not claim tools or retention rules that the site does not actually use.'
        updated={UPDATED}
        sections={SECTIONS}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: jsonLd(webPageSchema({ title: TITLE, description: DESCRIPTION, path: PATH })),
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
