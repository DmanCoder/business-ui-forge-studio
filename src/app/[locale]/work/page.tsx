import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import Eyebrow from '@src/components/ui/Eyebrow';
import Cta from '@src/components/ui/Cta';
import CaseStudyRow from '@src/components/work/CaseStudyRow';

import { ALLOWED_LOCALES } from '@src/typescriptGlobals/constants';
import { buildMetadata, webPageSchema, breadcrumbSchema, jsonLd } from '@src/lib/seo';
import { WORK_HEADING, WORK_EMPTY_STATE } from '@src/content/work';
import { getPublishedCaseStudies } from '@src/lib/caseStudies';

import { PageTypes } from '@src/typescriptGlobals/types';

const PAGE_TITLE = 'Work';
const PAGE_DESCRIPTION =
  'Selected projects from UI Forge Studio — case studies covering the goals, the design and development approach, and the outcome.';
const PAGE_PATH = '/work';

/** What every future case study will document — shown while the index fills. */
const CASE_STUDY_ANATOMY = [
  { label: 'Situation', body: 'Where the business started and what was not working.' },
  { label: 'Goals', body: 'What the project needed to change, in plain language.' },
  { label: 'Approach', body: 'Platform choice, design decisions and how it was built.' },
  { label: 'Outcome', body: 'What shipped, and what it made possible.' },
];

export async function generateStaticParams() {
  return ALLOWED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path: PAGE_PATH,
  });
}

export default async function WorkPage(props: PageTypes) {
  const { locale } = await props.params;
  if (!ALLOWED_LOCALES.includes(locale)) notFound();

  const caseStudies = await getPublishedCaseStudies();
  const demoCount = caseStudies.filter((study) => study.isDemo).length;
  const realCount = caseStudies.length - demoCount;

  return (
    <>
      {/* Page header */}
      <section className='container-site pt-[clamp(6.4rem,10vh,11.2rem)] pb-[clamp(4rem,6vh,6.4rem)]'>
        <div className='flex flex-wrap items-end justify-between gap-[2rem]'>
          <div>
            <Eyebrow>Work</Eyebrow>
            <h1 className='font-display mt-[2.8rem] max-w-[16ch] text-[clamp(4rem,7vw,8.8rem)] leading-[1.03] font-normal tracking-[-0.015em]'>
              {WORK_HEADING}
            </h1>
          </div>
          <p className='tnum text-muted-dark pb-[1rem] text-[1.3rem] font-medium'>
            Index · {String(realCount).padStart(3, '0')} published
            {demoCount > 0 && <> · {String(demoCount).padStart(3, '0')} demo</>}
          </p>
        </div>
      </section>

      {caseStudies.length > 0 ? (
        /* Case studies — full-width editorial rows with credits metadata */
        <section className='pb-[clamp(6.4rem,10vh,11.2rem)]' aria-label='Case studies'>
          {caseStudies.map((study, index) => (
            <CaseStudyRow
              key={study.slug}
              study={study}
              index={String(index + 1).padStart(2, '0')}
              priority={index === 0}
            />
          ))}
        </section>
      ) : (
        /* Curated early state — honest, structured, no fake thumbnails */
        <>
          <section className='border-edge border-t'>
            <div className='container-site section-pad grid gap-[4rem] lg:grid-cols-12'>
              <div className='lg:col-span-7'>
                <p className='font-display max-w-[24ch] text-[clamp(2.6rem,3.8vw,4.4rem)] leading-[1.18]'>
                  {WORK_EMPTY_STATE.lead}
                </p>
                <p className='text-muted mt-[2.8rem] max-w-[54ch] text-[1.65rem] leading-[1.7]'>
                  {WORK_EMPTY_STATE.body}
                </p>
                <div className='mt-[4rem]'>
                  <Cta href={WORK_EMPTY_STATE.cta.href} withArrow>
                    {WORK_EMPTY_STATE.cta.label}
                  </Cta>
                </div>
              </div>

              <dl className='flex flex-col self-start lg:col-span-4 lg:col-start-9'>
                <div className='border-edge border-t py-[1.8rem]'>
                  <dt className='meta-label'>Status</dt>
                  <dd className='mt-[0.6rem] text-[1.5rem] font-medium'>
                    First client projects in production
                  </dd>
                </div>
                <div className='border-edge border-t py-[1.8rem]'>
                  <dt className='meta-label'>Published case studies</dt>
                  <dd className='tnum mt-[0.6rem] text-[1.5rem] font-medium'>000 — by design</dd>
                </div>
                <div className='border-edge border-t border-b py-[1.8rem]'>
                  <dt className='meta-label'>Policy</dt>
                  <dd className='mt-[0.6rem] text-[1.5rem] font-medium'>
                    Real projects only. No mockups presented as client work.
                  </dd>
                </div>
              </dl>
            </div>
          </section>

          {/* What each case study will cover */}
          <section className='border-edge border-t'>
            <div className='container-site section-pad'>
              <div className='grid gap-[2rem] lg:grid-cols-12'>
                <div className='lg:col-span-4'>
                  <Eyebrow>What each case study covers</Eyebrow>
                </div>
                <h2 className='max-w-[24ch] text-[clamp(2.4rem,3vw,3.4rem)] leading-[1.15] font-semibold lg:col-span-8'>
                  Written the way we run projects: plainly, and end to end
                </h2>
              </div>
              <ol className='mt-[4.8rem] grid list-none gap-x-[3.2rem] md:grid-cols-2 lg:grid-cols-4'>
                {CASE_STUDY_ANATOMY.map((item, index) => (
                  <li key={item.label} className='border-edge border-t py-[2rem]'>
                    <p className='tnum text-blue text-[1.3rem] font-medium'>
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <h3 className='mt-[1rem] text-[1.7rem] font-semibold'>{item.label}</h3>
                    <p className='text-muted mt-[0.8rem] text-[1.45rem] leading-[1.6]'>
                      {item.body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        </>
      )}

      {/* How work is published — honesty policy stays visible as the index grows */}
      {caseStudies.length > 0 && (
        <section className='border-edge border-t'>
          <div className='container-site grid gap-[2.4rem] py-[clamp(4rem,6vh,6.4rem)] lg:grid-cols-12'>
            <div className='lg:col-span-4'>
              <Eyebrow>How this index works</Eyebrow>
            </div>
            <p className='text-muted max-w-[64ch] text-[1.6rem] leading-[1.7] lg:col-span-8'>
              Every case study is labelled with its status — client work, internal projects and
              concepts are never mixed up, outcomes are only stated when they can be verified, and
              nothing here is presented as client work unless it is.
              {demoCount > 0 && (
                <>
                  {' '}
                  Entries marked “Demo case study” are clearly-labelled fictional concepts used to
                  preview this format while the first client projects are in production.
                </>
              )}
            </p>
          </div>
        </section>
      )}

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            webPageSchema({
              title: PAGE_TITLE,
              description: PAGE_DESCRIPTION,
              path: PAGE_PATH,
            })
          ),
        }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Work', path: PAGE_PATH },
            ])
          ),
        }}
      />
    </>
  );
}
