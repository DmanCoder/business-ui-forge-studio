import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import Eyebrow from '@src/components/ui/Eyebrow';
import Cta from '@src/components/ui/Cta';
import InsightBlocks from '@src/components/insights/InsightBlocks';
import CaseStudyMediaFigure from '@src/components/work/CaseStudyMediaFigure';
import TestimonialQuote from '@src/components/work/TestimonialQuote';
import RelatedWork from '@src/components/work/RelatedWork';
import DemoBadge from '@src/components/work/DemoBadge';
import DemoNotice from '@src/components/work/DemoNotice';

import { ALLOWED_LOCALES } from '@src/typescriptGlobals/constants';
import {
  buildMetadata,
  creativeWorkSchema,
  breadcrumbSchema,
  jsonLd,
  absoluteUrl,
} from '@src/lib/seo';
import {
  getPublishedCaseStudies,
  getCaseStudyBySlug,
  getRelatedCaseStudies,
  getNextCaseStudy,
  getTestimonialForCaseStudy,
  caseStudyStatusLabel,
} from '@src/lib/caseStudies';

import { PageTypes } from '@src/typescriptGlobals/types';

export async function generateStaticParams() {
  const studies = await getPublishedCaseStudies();
  return ALLOWED_LOCALES.flatMap((locale) =>
    studies.map((study) => ({ locale, slug: study.slug }))
  );
}

export async function generateMetadata(props: PageTypes): Promise<Metadata> {
  const { slug } = await props.params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) notFound();

  return buildMetadata({
    title: study.seoTitle,
    description: study.metaDescription,
    path: `/work/${study.slug}`,
    ogType: 'article',
    noIndex: study.noIndex ?? false,
    ogImage: study.heroMedia ? absoluteUrl(study.heroMedia.src) : undefined,
  });
}

export default async function CaseStudyPage(props: PageTypes) {
  const { locale, slug } = await props.params;
  if (!ALLOWED_LOCALES.includes(locale)) notFound();

  const study = await getCaseStudyBySlug(slug);
  if (!study) notFound();

  const [related, next, testimonial] = await Promise.all([
    getRelatedCaseStudies(study, 2),
    getNextCaseStudy(study),
    getTestimonialForCaseStudy(study),
  ]);

  // Real concept work never carries a testimonial, even if one is mislinked.
  // Demo studies may carry only a clearly-labelled demo sample — a real
  // (verified) quote can never be attached to demonstration content.
  const linkedTestimonial = study.isDemo
    ? testimonial?.isDemo
      ? testimonial
      : null
    : study.status === 'concept'
      ? null
      : testimonial;

  /** Hero credit ledger — only fields that truly exist. */
  const credits: { label: string; value: React.ReactNode }[] = [
    ...(study.clientName
      ? [
          {
            label: 'Client',
            value: study.clientUrl ? (
              <a
                href={study.clientUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-blue underline decoration-[color:var(--color-blue)] decoration-2 underline-offset-[0.4rem]'
              >
                {study.clientName}
              </a>
            ) : (
              study.clientName
            ),
          },
        ]
      : []),
    { label: 'Type', value: study.projectType },
    {
      label: 'Status',
      value: study.statusNote
        ? `${caseStudyStatusLabel(study.status)} — ${study.statusNote}`
        : caseStudyStatusLabel(study.status),
    },
    ...(study.industry ? [{ label: 'Industry', value: study.industry }] : []),
    { label: 'Services', value: study.services.join(', ') },
    ...(study.platforms?.length ? [{ label: 'Platform', value: study.platforms.join(', ') }] : []),
    ...(study.year ? [{ label: 'Year', value: study.year }] : []),
    ...(study.duration ? [{ label: 'Duration', value: study.duration }] : []),
  ];
  const creditGridColumns =
    credits.length <= 2
      ? 'md:grid-cols-2'
      : credits.length === 4
        ? 'md:grid-cols-4'
        : 'md:grid-cols-3';

  const outcomesHeading = study.isDemo
    ? 'Concept outcome'
    : study.status === 'in-progress'
      ? 'Current progress'
      : 'Outcomes';
  const verifiedMetrics = (study.verifiedMetrics ?? []).filter((metric) => metric.verified);

  /** Numbered editorial sections — only sections with real content render. */
  const sections: { key: string; label: string; content: React.ReactNode }[] = [];

  if (study.overview?.length) {
    sections.push({
      key: 'overview',
      label: 'Overview',
      content: <InsightBlocks blocks={study.overview} />,
    });
  }

  if (study.challenge?.length) {
    sections.push({
      key: 'challenge',
      label: 'The challenge',
      content: <InsightBlocks blocks={study.challenge} />,
    });
  }

  if (study.goals?.length) {
    sections.push({
      key: 'goals',
      label: 'Goals',
      content: (
        <ol className='flex list-none flex-col'>
          {study.goals.map((goal, index) => (
            <li
              key={goal}
              className='border-line flex gap-[2rem] border-t py-[2rem] first:border-t-0 first:pt-[0.6rem]'
            >
              <span className='tnum text-blue text-[1.4rem] font-semibold'>
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className='text-[1.65rem] leading-[1.6]'>{goal}</span>
            </li>
          ))}
        </ol>
      ),
    });
  }

  if (study.approach?.length) {
    sections.push({
      key: 'approach',
      label: 'Approach',
      content: (
        <div className='flex flex-col'>
          {study.approach.map((item, index) => (
            <article
              key={item.label}
              className={`border-line py-[2.4rem] ${index === 0 ? 'pt-[0.6rem]' : 'border-t'}`}
            >
              <h3 className='text-[1.8rem] font-semibold'>{item.label}</h3>
              <p className='text-muted mt-[0.8rem] max-w-[62ch] text-[1.55rem] leading-[1.65]'>
                {item.body}
              </p>
            </article>
          ))}
        </div>
      ),
    });
  }

  if (study.designAndBuild?.length || study.gallery?.length) {
    sections.push({
      key: 'design-and-build',
      label: 'Design & build',
      content: (
        <>
          {study.designAndBuild?.length ? <InsightBlocks blocks={study.designAndBuild} /> : null}
          {study.gallery?.length ? (
            <div className='mt-[3.2rem] flex flex-col gap-[3.2rem]'>
              {study.gallery.map((media) => (
                <CaseStudyMediaFigure key={media.src} media={media} />
              ))}
            </div>
          ) : null}
        </>
      ),
    });
  }

  if (study.outcomeLedger?.length || study.outcomes?.length || verifiedMetrics.length > 0) {
    sections.push({
      key: 'outcomes',
      label: study.outcomeLedger?.length ? 'What changed' : outcomesHeading,
      content: (
        <>
          {study.outcomeLedger?.length ? (
            <dl className='flex flex-col'>
              {study.outcomeLedger.map((item, index) => (
                <div
                  key={item.label}
                  className={`border-line grid gap-[0.6rem] py-[1.8rem] sm:grid-cols-[16rem_1fr] sm:gap-[2.4rem] ${
                    index === 0 ? 'pt-[0.6rem]' : 'border-t'
                  }`}
                >
                  <dt className='text-[1.6rem] font-semibold'>{item.label}</dt>
                  <dd className='text-muted max-w-[58ch] text-[1.55rem] leading-[1.65]'>
                    {item.body}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
          {study.outcomes?.length ? (
            <ul className='flex list-none flex-col'>
              {study.outcomes.map((outcome, index) => (
                <li
                  key={outcome}
                  className={`border-line py-[2rem] text-[1.65rem] leading-[1.6] ${
                    index === 0 ? 'pt-[0.6rem]' : 'border-t'
                  }`}
                >
                  {outcome}
                </li>
              ))}
            </ul>
          ) : null}
          {verifiedMetrics.length > 0 && (
            <dl className='border-edge mt-[3.2rem] grid gap-[2.4rem] border-t pt-[2.4rem] sm:grid-cols-2'>
              {verifiedMetrics.map((metric) => (
                <div key={metric.label}>
                  <dd className='tnum text-[clamp(2.8rem,3.6vw,4rem)] leading-[1.1] font-semibold'>
                    {metric.value}
                  </dd>
                  <dt className='mt-[0.8rem] text-[1.5rem] font-semibold'>{metric.label}</dt>
                  <p className='text-muted mt-[0.6rem] text-[1.4rem] leading-[1.55]'>
                    {metric.context}
                  </p>
                </div>
              ))}
            </dl>
          )}
        </>
      ),
    });
  }

  return (
    <>
      {/* Project hero */}
      <header className='container-site pt-[clamp(4.8rem,8vh,8rem)]'>
        <nav aria-label='Breadcrumb' className='text-muted text-[1.4rem]'>
          <Link href='/' className='hover:text-ink hover:underline'>
            Home
          </Link>
          <span aria-hidden='true'> / </span>
          <Link href='/work' className='hover:text-ink hover:underline'>
            Work
          </Link>
        </nav>

        <div className='mt-[3.2rem]'>
          <div className='flex flex-wrap items-center gap-[1.6rem]'>
            <Eyebrow>{caseStudyStatusLabel(study.status)}</Eyebrow>
            {study.isDemo && study.demoLabel && <DemoBadge label={study.demoLabel} />}
          </div>
          <h1 className='font-display mt-[2.4rem] max-w-[18ch] text-[clamp(3.6rem,6.4vw,7.6rem)] leading-[1.04] tracking-[-0.015em]'>
            {study.title}
          </h1>
          <p className='text-muted mt-[2.8rem] max-w-[56ch] text-[clamp(1.7rem,2vw,2rem)] leading-[1.6]'>
            {study.summary}
          </p>
          {study.isDemo && (
            <DemoNotice className='mt-[3.2rem]'>
              This is demonstration content created to preview UI Forge Studio’s case-study format.
              It does not represent a completed client engagement.
            </DemoNotice>
          )}
        </div>

        {/* Credits ledger */}
        <dl
          className={`border-edge mt-[5.6rem] grid grid-cols-2 gap-x-[3.2rem] gap-y-[2.4rem] border-t pt-[2.4rem] ${creditGridColumns}`}
        >
          {credits.map((credit) => (
            <div key={credit.label}>
              <dt className='meta-label'>{credit.label}</dt>
              <dd className='mt-[0.8rem] text-[1.5rem] leading-[1.5] font-medium'>
                {credit.value}
              </dd>
            </div>
          ))}
        </dl>

        {study.liveUrl && (
          <p className='mt-[2.4rem]'>
            <a
              href={study.liveUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='text-ink hover:text-blue text-[1.5rem] font-semibold underline decoration-[color:var(--color-blue)] decoration-2 underline-offset-[0.6rem]'
            >
              Visit the live site →
            </a>
          </p>
        )}

        {study.heroMedia && (
          <CaseStudyMediaFigure media={study.heroMedia} priority className='mt-[4.8rem]' />
        )}
      </header>

      {/* Numbered editorial sections */}
      <article className='mt-[clamp(5.6rem,9vh,9.6rem)]'>
        {sections.map((section, index) => (
          <section key={section.key} className='border-edge border-t'>
            <div className='container-site grid gap-[2.4rem] py-[clamp(4rem,6vh,6.4rem)] lg:grid-cols-12 lg:gap-[4rem]'>
              <div className='lg:col-span-4'>
                <Eyebrow index={String(index + 1).padStart(2, '0')}>{section.label}</Eyebrow>
              </div>
              <div className='max-w-[72rem] lg:col-span-8'>{section.content}</div>
            </div>
          </section>
        ))}
      </article>

      {/* Testimonial — verified client quote, or a labelled demo sample on
          demo studies only. Omitted entirely when none exists. */}
      {linkedTestimonial && (
        <section className='border-edge border-t'>
          <div className='container-site section-pad'>
            <p className='meta-label'>
              {linkedTestimonial.isDemo ? 'Sample feedback' : 'Client feedback'}
            </p>
            <TestimonialQuote testimonial={linkedTestimonial} size='lg' className='mt-[3.2rem]' />
          </div>
        </section>
      )}

      {/* Related work */}
      <RelatedWork studies={related} />

      {/* Closing CTA + next project (the footer carries the big statement) */}
      <section className='border-edge border-t'>
        <div className='container-site grid gap-[3.2rem] py-[clamp(4.8rem,7vh,7.2rem)] lg:grid-cols-12'>
          <div className='lg:col-span-7'>
            <p className='meta-label text-blue'>Start a project</p>
            <h2 className='mt-[1.6rem] max-w-[24ch] text-[clamp(2.4rem,3.2vw,3.6rem)] leading-[1.15] font-semibold'>
              Have a project that needs this kind of care?
            </h2>
            <p className='text-muted mt-[1.6rem] max-w-[54ch] text-[1.6rem] leading-[1.7]'>
              Tell us where your business is heading and what is in the way. You will get a
              considered reply from the person who would design and build the work.
            </p>
            <Cta href='/start-a-project' withArrow className='mt-[2.8rem]'>
              Start a project
            </Cta>
            <p className='mt-[2rem]'>
              <Link
                href='/services/web-design-development'
                className='text-ink decoration-blue hover:text-blue text-[1.45rem] font-semibold underline decoration-2 underline-offset-[0.5rem]'
              >
                Explore custom website design and development →
              </Link>
            </p>
          </div>
          {next && (
            <div className='self-end lg:col-span-4 lg:col-start-9'>
              <Link href={`/work/${next.slug}`} className='group block'>
                <span className='meta-label block'>Next project →</span>
                <span className='mt-[1rem] block text-[1.8rem] leading-[1.3] font-semibold group-hover:underline group-hover:decoration-2 group-hover:underline-offset-[0.6rem]'>
                  {next.title}
                </span>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Demo studies emit no CreativeWork schema — structured data must never
          imply a real commissioned engagement. */}
      {!study.isDemo && (
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: jsonLd(
              creativeWorkSchema({
                title: study.title,
                description: study.metaDescription,
                path: `/work/${study.slug}`,
                datePublished: study.publishedAt,
                dateModified: study.updatedAt,
                image: study.heroMedia ? absoluteUrl(study.heroMedia.src) : undefined,
              })
            ),
          }}
        />
      )}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Work', path: '/work' },
              { name: study.title, path: `/work/${study.slug}` },
            ])
          ),
        }}
      />
    </>
  );
}
