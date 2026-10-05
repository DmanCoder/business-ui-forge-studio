import React from 'react';
import Link from 'next/link';

import Eyebrow from '@src/components/ui/Eyebrow';
import TestimonialQuote from '@src/components/work/TestimonialQuote';

import { SHOW_TESTIMONIALS } from '@src/config/site';
import { isDemoContentEnabled } from '@src/config/flags';
import { getHomeTestimonials, shouldPublishTestimonialsPage } from '@src/lib/caseStudies';

type TestimonialsSectionProps = {
  /** Ledger index for the section eyebrow. */
  eyebrowIndex?: string;
};

/**
 * Homepage testimonial section: 1–3 verified client quotes as static
 * editorial statements. Renders nothing until real verified testimonials
 * exist — the SHOW_TESTIMONIALS gate and the verified filter both apply,
 * and no placeholder is ever shown (server component; async by design).
 * Exception: while demo mode is on, clearly-labelled sample quotes render so
 * the layout can be designed and tested — each carries its own visible badge.
 */
const TestimonialsSection = async ({ eyebrowIndex }: TestimonialsSectionProps) => {
  if (!SHOW_TESTIMONIALS && !isDemoContentEnabled()) return null;

  const [testimonials, hasTestimonialsPage] = await Promise.all([
    getHomeTestimonials(3),
    shouldPublishTestimonialsPage(),
  ]);

  if (testimonials.length === 0) return null;

  const [featured, ...rest] = testimonials;
  const hasDemo = testimonials.some((testimonial) => testimonial.isDemo);

  return (
    <section className='border-edge border-t'>
      <div className='container-site section-pad'>
        <Eyebrow index={eyebrowIndex}>{hasDemo ? 'Sample feedback' : 'What clients say'}</Eyebrow>

        <TestimonialQuote testimonial={featured} size='lg' className='mt-[4rem]' />

        {rest.length > 0 && (
          <div className='mt-[5.6rem] grid gap-[4rem] md:grid-cols-2'>
            {rest.map((testimonial) => (
              <div key={testimonial.id} className='border-edge border-t pt-[2.8rem]'>
                <TestimonialQuote testimonial={testimonial} size='md' />
              </div>
            ))}
          </div>
        )}

        {hasTestimonialsPage && (
          <p className='mt-[4rem]'>
            <Link
              href='/testimonials'
              className='text-ink hover:text-blue text-[1.5rem] font-semibold underline decoration-[color:var(--color-blue)] decoration-2 underline-offset-[0.6rem]'
            >
              Read more client feedback →
            </Link>
          </p>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
