import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import Cta from '@src/components/ui/Cta';
import Eyebrow from '@src/components/ui/Eyebrow';
import { ALLOWED_LOCALES } from '@src/typescriptGlobals/constants';
import { SERVICE_PAGES, getServicePage } from '@src/content/service-pages';
import {
  breadcrumbSchema,
  buildMetadata,
  jsonLd,
  serviceSchema,
  webPageSchema,
} from '@src/lib/seo';

type ServicePageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  return ALLOWED_LOCALES.flatMap((locale) =>
    SERVICE_PAGES.map((service) => ({ locale, slug: service.slug }))
  );
}

export async function generateMetadata(props: ServicePageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getServicePage(slug);
  if (!service) notFound();

  return {
    ...buildMetadata({
      title: service.seoTitle,
      description: service.metaDescription,
      path: `/services/${service.slug}`,
    }),
    title: { absolute: service.seoTitle },
  };
}

export default async function ServicePage(props: ServicePageProps) {
  const { locale, slug } = await props.params;
  if (!ALLOWED_LOCALES.includes(locale)) notFound();

  const service = getServicePage(slug);
  if (!service) notFound();

  const path = `/services/${service.slug}`;

  return (
    <>
      <header className='container-site pt-[clamp(5.6rem,9vh,10.4rem)] pb-[clamp(4.8rem,8vh,8rem)]'>
        <nav aria-label='Breadcrumb' className='text-muted text-[1.4rem]'>
          <Link href='/' className='hover:text-ink hover:underline'>
            Home
          </Link>
          <span aria-hidden='true'> / </span>
          <Link href='/services' className='hover:text-ink hover:underline'>
            Services
          </Link>
        </nav>

        <div className='mt-[3.2rem] grid gap-[4rem] lg:grid-cols-12'>
          <div className='lg:col-span-9'>
            <Eyebrow>{service.eyebrow}</Eyebrow>
            <h1 className='font-display mt-[2.8rem] max-w-[17ch] text-[clamp(4rem,7vw,8.8rem)] leading-[1.03] font-normal tracking-[-0.015em]'>
              {service.heading}
            </h1>
          </div>
          <div className='flex flex-col items-start justify-end lg:col-span-3'>
            <p className='meta-label'>Service note</p>
            <p className='text-muted border-edge mt-[1.2rem] border-t pt-[1.6rem] text-[1.45rem] leading-[1.65]'>
              Remote delivery across Australia. Platform and scope are recommended after discovery.
            </p>
          </div>
        </div>

        <div className='mt-[4.8rem] grid gap-[3.2rem] border-t border-[color:var(--color-edge)] pt-[3.2rem] lg:grid-cols-12'>
          <p className='text-muted max-w-[62ch] text-[clamp(1.75rem,2vw,2.1rem)] leading-[1.65] lg:col-span-8'>
            {service.lead}
          </p>
          <div className='flex items-start lg:col-span-4 lg:justify-end'>
            <Cta href='/start-a-project' withArrow>
              {service.cta.label}
            </Cta>
          </div>
        </div>
      </header>

      <section className='bg-ink text-white'>
        <div className='container-site grid gap-[4rem] py-[clamp(5.6rem,9vh,9.6rem)] lg:grid-cols-12'>
          <div className='lg:col-span-4'>
            <Eyebrow index='01' onDark>
              A useful fit when
            </Eyebrow>
            <h2 className='font-display mt-[2rem] max-w-[14ch] text-[clamp(3rem,4.6vw,5.4rem)] leading-[1.08] text-white'>
              The project has a clear business reason to exist
            </h2>
          </div>
          <ul className='lg:col-span-7 lg:col-start-6'>
            {service.idealFor.map((item, index) => (
              <li
                key={item}
                className='grid gap-[1.2rem] border-t border-white/15 py-[2rem] sm:grid-cols-[4.8rem_1fr]'
              >
                <span className='tnum text-blue-soft text-[1.3rem] font-semibold'>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className='text-[1.6rem] leading-[1.65] text-white'>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className='border-edge border-t'>
        <div className='container-site section-pad'>
          <div className='grid gap-[2rem] lg:grid-cols-12'>
            <div className='lg:col-span-4'>
              <Eyebrow index='02'>Problems this work should solve</Eyebrow>
            </div>
            <h2 className='max-w-[22ch] text-[clamp(2.8rem,3.8vw,4.2rem)] leading-[1.12] font-semibold lg:col-span-8'>
              Start with the friction, not a preferred technology
            </h2>
          </div>
          <div className='mt-[5.6rem] grid gap-x-[3.2rem] md:grid-cols-3'>
            {service.problems.map((problem, index) => (
              <article key={problem.title} className='border-edge border-t py-[2.4rem]'>
                <p className='tnum text-blue text-[1.3rem] font-semibold'>
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className='mt-[1.2rem] text-[1.9rem] leading-[1.3] font-semibold'>
                  {problem.title}
                </h3>
                <p className='text-muted mt-[1.2rem] text-[1.5rem] leading-[1.7]'>{problem.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className='border-edge border-t'>
        <div className='container-site grid gap-[4rem] py-[clamp(5.6rem,9vh,9.6rem)] lg:grid-cols-12'>
          <div className='lg:col-span-4'>
            <Eyebrow index='03'>What the engagement can include</Eyebrow>
            <h2 className='mt-[2rem] max-w-[15ch] text-[clamp(2.6rem,3.6vw,4rem)] leading-[1.12] font-semibold'>
              Scope shaped around the real job
            </h2>
            <p className='text-muted mt-[2rem] max-w-[40ch] text-[1.5rem] leading-[1.7]'>
              The proposal confirms the exact inclusions. This list shows the areas that can form a
              complete engagement, not a promise that every project needs all of them.
            </p>
          </div>
          <ol className='lg:col-span-7 lg:col-start-6'>
            {service.deliverables.map((item, index) => (
              <li
                key={item}
                className='border-line grid gap-[0.8rem] border-t py-[1.8rem] sm:grid-cols-[7rem_1fr]'
              >
                <span className='tnum text-muted-dark text-[1.2rem]'>03.{index + 1}</span>
                <span className='text-[1.6rem] font-medium'>{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className='border-edge border-t bg-white'>
        <div className='container-site section-pad'>
          <div className='grid gap-[3.2rem] lg:grid-cols-12'>
            <div className='lg:col-span-5'>
              <Eyebrow index='04'>A decision worth making well</Eyebrow>
              <h2 className='font-display mt-[2rem] max-w-[16ch] text-[clamp(3rem,4.4vw,5.2rem)] leading-[1.08]'>
                {service.decision.heading}
              </h2>
            </div>
            <p className='text-muted max-w-[56ch] self-end text-[1.65rem] leading-[1.7] lg:col-span-6 lg:col-start-7'>
              {service.decision.body}
            </p>
          </div>
          <div className='bg-edge mt-[5.6rem] grid gap-[1px] border border-[color:var(--color-edge)] md:grid-cols-2'>
            {service.decision.items.map((item, index) => (
              <article key={item.title} className='bg-paper p-[clamp(2.4rem,4vw,4rem)]'>
                <p className='tnum text-blue text-[1.3rem] font-semibold'>
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className='mt-[1.2rem] text-[1.9rem] font-semibold'>{item.title}</h3>
                <p className='text-muted mt-[1rem] max-w-[54ch] text-[1.5rem] leading-[1.7]'>
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className='border-edge border-t'>
        <div className='container-site section-pad grid gap-[4rem] lg:grid-cols-12'>
          <div className='lg:col-span-4'>
            <Eyebrow index='05'>How the work moves</Eyebrow>
            <h2 className='mt-[2rem] max-w-[15ch] text-[clamp(2.6rem,3.6vw,4rem)] leading-[1.12] font-semibold'>
              Decisions stay close to delivery
            </h2>
            <p className='mt-[2.4rem]'>
              <Link
                href='/process'
                className='text-ink decoration-blue hover:text-blue text-[1.5rem] font-semibold underline decoration-2 underline-offset-[0.6rem]'
              >
                Read the complete studio process →
              </Link>
            </p>
          </div>
          <ol className='lg:col-span-7 lg:col-start-6'>
            {service.approach.map((step, index) => (
              <li
                key={step.title}
                className='border-line grid gap-[1rem] border-t py-[2.4rem] sm:grid-cols-[7rem_1fr]'
              >
                <span className='font-display tnum text-blue text-[3.2rem] leading-none'>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className='text-[1.8rem] font-semibold'>{step.title}</h3>
                  <p className='text-muted mt-[0.8rem] max-w-[58ch] text-[1.5rem] leading-[1.7]'>
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className='bg-ink text-white'>
        <div className='container-site section-pad grid gap-[4rem] lg:grid-cols-12'>
          <div className='lg:col-span-5'>
            <Eyebrow index='06' onDark>
              Why UI Forge Studio
            </Eyebrow>
            <h2 className='font-display mt-[2rem] max-w-[15ch] text-[clamp(3rem,4.4vw,5.2rem)] leading-[1.08] text-white'>
              Founder-led does not mean improvised
            </h2>
          </div>
          <ul className='lg:col-span-6 lg:col-start-7'>
            {service.whyUs.map((item, index) => (
              <li key={item} className='flex gap-[1.8rem] border-t border-white/15 py-[2rem]'>
                <span className='tnum text-blue-soft text-[1.3rem] font-semibold'>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className='text-[1.6rem] leading-[1.65] text-white'>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className='border-edge border-t'>
        <div className='container-site section-pad grid gap-[4rem] lg:grid-cols-12'>
          <div className='lg:col-span-4'>
            <Eyebrow index='07'>Common questions</Eyebrow>
            <h2 className='mt-[2rem] max-w-[13ch] text-[clamp(2.6rem,3.6vw,4rem)] leading-[1.12] font-semibold'>
              Before a proposal
            </h2>
          </div>
          <div className='lg:col-span-7 lg:col-start-6'>
            {service.faqs.map((faq) => (
              <article
                key={faq.question}
                className='border-line border-t py-[2.4rem] first:border-t-0 first:pt-0'
              >
                <h3 className='text-[1.75rem] leading-[1.35] font-semibold'>{faq.question}</h3>
                <p className='text-muted mt-[1rem] max-w-[62ch] text-[1.5rem] leading-[1.75]'>
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className='border-edge border-t'>
        <div className='container-site grid gap-[3.2rem] py-[clamp(4.8rem,7vh,7.2rem)] lg:grid-cols-12'>
          <div className='lg:col-span-7'>
            <Eyebrow>Related guidance</Eyebrow>
            <h2 className='mt-[1.6rem] max-w-[22ch] text-[clamp(2.4rem,3.2vw,3.6rem)] leading-[1.15] font-semibold'>
              Useful context before you choose a provider or platform
            </h2>
          </div>
          <ul className='self-end lg:col-span-4 lg:col-start-9'>
            {service.relatedInsights.map((item) => (
              <li key={item.href} className='border-line border-t py-[1.4rem]'>
                <Link
                  href={item.href}
                  className='text-ink decoration-blue hover:text-blue text-[1.45rem] font-semibold underline decoration-2 underline-offset-[0.5rem]'
                >
                  {item.label} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className='border-edge border-t'>
        <div className='container-site section-pad grid items-end gap-[3.2rem] lg:grid-cols-12'>
          <div className='lg:col-span-8'>
            <Eyebrow>Next step</Eyebrow>
            <h2 className='font-display mt-[2rem] max-w-[18ch] text-[clamp(3rem,4.6vw,5.4rem)] leading-[1.08]'>
              {service.cta.heading}
            </h2>
            <p className='text-muted mt-[1.8rem] max-w-[56ch] text-[1.6rem] leading-[1.7]'>
              {service.cta.body}
            </p>
          </div>
          <div className='lg:col-span-4 lg:justify-self-end'>
            <Cta href='/start-a-project' withArrow>
              {service.cta.label}
            </Cta>
          </div>
        </div>
      </section>

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            webPageSchema({
              title: service.seoTitle,
              description: service.metaDescription,
              path,
            })
          ),
        }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            serviceSchema({
              name: service.shortName,
              description: service.metaDescription,
              path,
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
              { name: 'Services', path: '/services' },
              { name: service.shortName, path },
            ])
          ),
        }}
      />
    </>
  );
}
