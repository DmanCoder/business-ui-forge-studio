import React from 'react';
import Link from 'next/link';

import Eyebrow from '@src/components/ui/Eyebrow';

export type LegalSection = {
  heading: string;
  paragraphs: React.ReactNode[];
  items?: React.ReactNode[];
};

type LegalPageProps = {
  title: string;
  intro: React.ReactNode;
  updated: string;
  sections: LegalSection[];
};

const LegalPage: React.FC<LegalPageProps> = ({ title, intro, updated, sections }) => (
  <article>
    <header className='container-prose pt-[clamp(6.4rem,10vh,11.2rem)] pb-[clamp(4rem,6vh,6.4rem)]'>
      <Eyebrow>Legal · website information</Eyebrow>
      <h1 className='font-display mt-[2.4rem] max-w-[16ch] text-[clamp(3.8rem,6vw,7.2rem)] leading-[1.06] tracking-[-0.015em]'>
        {title}
      </h1>
      <p className='text-muted mt-[2.8rem] max-w-[62ch] text-[1.7rem] leading-[1.75]'>{intro}</p>
      <dl className='border-edge mt-[3.2rem] grid gap-[2.4rem] border-t pt-[2rem] sm:grid-cols-2'>
        <div>
          <dt className='meta-label'>Applies to</dt>
          <dd className='mt-[0.6rem] text-[1.45rem]'>uiforgestudio.com.au and this website</dd>
        </div>
        <div>
          <dt className='meta-label'>Last updated</dt>
          <dd className='tnum mt-[0.6rem] text-[1.45rem]'>{updated}</dd>
        </div>
      </dl>
    </header>

    <div className='border-edge border-t'>
      {sections.map((section, index) => (
        <section key={section.heading} className='border-edge border-b'>
          <div className='container-prose grid gap-[1.6rem] py-[clamp(3.2rem,5vh,4.8rem)] sm:grid-cols-[5rem_1fr]'>
            <p className='font-display tnum text-blue text-[2.8rem] leading-none'>
              {String(index + 1).padStart(2, '0')}
            </p>
            <div>
              <h2 className='text-[clamp(2rem,2.8vw,2.6rem)] leading-[1.25] font-semibold'>
                {section.heading}
              </h2>
              {section.paragraphs.map((paragraph, paragraphIndex) => (
                <p
                  key={paragraphIndex}
                  className='text-muted mt-[1.6rem] max-w-[68ch] text-[1.6rem] leading-[1.75]'
                >
                  {paragraph}
                </p>
              ))}
              {section.items && (
                <ul className='marker:text-blue text-muted mt-[1.8rem] flex list-disc flex-col gap-[0.8rem] pl-[2rem] text-[1.55rem] leading-[1.7]'>
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      ))}
    </div>

    <footer className='container-prose py-[clamp(4rem,7vh,7.2rem)]'>
      <p className='text-muted max-w-[64ch] text-[1.5rem] leading-[1.7]'>
        These website policies are separate from the proposal and client agreement for any project.
        If you have a question, use the contact details above or{' '}
        <Link
          href='/start-a-project'
          className='text-ink decoration-blue hover:text-blue font-semibold underline decoration-2 underline-offset-[0.4rem]'
        >
          contact the studio
        </Link>
        .
      </p>
    </footer>
  </article>
);

export default LegalPage;
