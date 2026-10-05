import React from 'react';
import Link from 'next/link';

import DemoBadge from '@src/components/work/DemoBadge';

import type { Testimonial } from '@src/lib/caseStudies';

type TestimonialQuoteProps = {
  testimonial: Testimonial;
  /** Larger statement treatment for a featured/homepage quote. */
  size?: 'lg' | 'md';
  /** Lighter tones on an ink background. */
  onDark?: boolean;
  className?: string;
};

/**
 * A verified client quote as a static editorial statement: blockquote with
 * plain attribution. No carousel, avatar placeholder, stars, or decorative
 * quotation marks — the design works with text alone.
 */
const TestimonialQuote: React.FC<TestimonialQuoteProps> = ({
  testimonial,
  size = 'lg',
  onDark = false,
  className = '',
}) => {
  const quoteSize =
    size === 'lg'
      ? 'text-[clamp(2.4rem,3.6vw,4rem)] leading-[1.25]'
      : 'text-[clamp(2rem,2.6vw,2.8rem)] leading-[1.35]';

  const attribution = [testimonial.authorRole, testimonial.companyName].filter(Boolean).join(', ');

  return (
    <figure className={className}>
      {testimonial.isDemo && testimonial.demoLabel && (
        <DemoBadge label={testimonial.demoLabel} onDark={onDark} className='mb-[1.6rem]' />
      )}
      <blockquote>
        <p
          className={`font-display max-w-[28ch] tracking-[-0.01em] text-pretty ${quoteSize} ${
            onDark ? 'text-white' : 'text-ink'
          }`}
        >
          “{testimonial.quote}”
        </p>
      </blockquote>
      <figcaption
        className={`mt-[2.8rem] text-[1.45rem] leading-[1.6] ${onDark ? 'text-muted-dark' : 'text-muted'}`}
      >
        <span className={`font-semibold ${onDark ? 'text-white' : 'text-ink'}`}>
          {testimonial.authorName}
        </span>
        {attribution && <span> — {attribution}</span>}
        {testimonial.caseStudySlug && (
          <>
            {' · '}
            <Link
              href={`/work/${testimonial.caseStudySlug}`}
              className={`font-semibold underline decoration-2 underline-offset-[0.4rem] ${
                onDark ? 'hover:text-blue-soft text-white' : 'text-ink hover:text-blue'
              }`}
            >
              <cite className='not-italic'>View the project</cite>
            </Link>
          </>
        )}
      </figcaption>
    </figure>
  );
};

export default TestimonialQuote;
