import React from 'react';
import Link from 'next/link';

import Spark from '@src/components/ui/Spark';
import Cta from '@src/components/ui/Cta';
import {
  NAV_ITEMS,
  CTA_ITEM,
  FOOTER_SERVICES,
  CONTACT_EMAIL,
  RESPONSE_TIME,
} from '@src/config/site';

const FooterHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className='text-muted-dark mb-[1.8rem] text-[1.2rem] font-semibold tracking-[0.16em] uppercase'>
    {children}
  </h2>
);

const footerLink =
  'text-[1.45rem] text-edge hover:text-white hover:underline inline-block py-[0.5rem]';

/**
 * The footer is the site's closing experience: an oversized editorial
 * statement with the single project CTA, then the link ledger beneath a
 * hairline. Every page ends here — no separate pre-footer CTA band.
 */
const Footer: React.FC = () => (
  <footer className='bg-ink text-white'>
    {/* Closing statement */}
    <div className='container-site border-b border-white/12 py-[clamp(4.8rem,7vh,7.2rem)]'>
      <div className='grid items-end gap-[3.2rem] lg:grid-cols-12'>
        <div className='lg:col-span-7'>
          <p className='meta-label text-muted-dark'>Project enquiries</p>
          <p className='font-display mt-[1.8rem] max-w-[20ch] text-[clamp(3rem,4.6vw,5.2rem)] leading-[1.06] text-white'>
            Bring the business problem. We will help shape the{' '}
            <span className='text-blue-soft italic'>right brief</span>.
          </p>
        </div>
        <div className='flex flex-col items-start gap-[1.8rem] lg:col-span-4 lg:col-start-9'>
          <p className='text-muted-dark max-w-[38ch] text-[1.5rem] leading-[1.65]'>
            Every enquiry is read by the founder and answered within {RESPONSE_TIME}.
          </p>
          <Cta href={CTA_ITEM.href} onDark withArrow>
            Tell us about the project
          </Cta>
        </div>
      </div>
    </div>

    {/* Link ledger */}
    <div className='container-site pt-[5.6rem] pb-[4rem]'>
      <div className='grid grid-cols-2 gap-x-[3.2rem] gap-y-[4rem] md:grid-cols-4'>
        <div className='col-span-2 max-w-[34rem] md:col-span-1'>
          <p className='flex items-center gap-[0.8rem] text-[1.7rem] font-semibold'>
            <Spark size={1.4} />
            <span>
              UI Forge <span className='font-display italic'>Studio</span>
            </span>
          </p>
          <p className='text-muted-dark mt-[1.6rem] text-[1.45rem] leading-[1.65]'>
            A founder-led Australian web design and development studio. Websites, commerce and
            digital products — designed and built by the same hands.
          </p>
        </div>

        <nav aria-label='Studio'>
          <FooterHeading>Studio</FooterHeading>
          <ul className='flex flex-col'>
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={footerLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label='Services'>
          <FooterHeading>Services</FooterHeading>
          <ul className='flex flex-col'>
            {FOOTER_SERVICES.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className={footerLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <FooterHeading>Contact</FooterHeading>
          <ul className='flex flex-col'>
            <li>
              <Link href={CTA_ITEM.href} className={footerLink}>
                {CTA_ITEM.label}
              </Link>
            </li>
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`} className={footerLink}>
                {CONTACT_EMAIL}
              </a>
            </li>
            <li className='text-muted-dark py-[0.5rem] text-[1.45rem]'>
              Replies within {RESPONSE_TIME}
            </li>
          </ul>
        </div>
      </div>

      <div className='mt-[5.6rem] flex flex-wrap items-center justify-between gap-x-[2rem] gap-y-[1rem] border-t border-white/12 pt-[2.4rem]'>
        <p className='text-muted-dark tnum text-[1.35rem]'>
          © {new Date().getFullYear()} UI Forge Studio · Australia
        </p>
        <nav aria-label='Legal' className='flex gap-[2.4rem]'>
          <Link href='/privacy' className='text-muted-dark text-[1.35rem] hover:text-white'>
            Privacy
          </Link>
          <Link href='/terms' className='text-muted-dark text-[1.35rem] hover:text-white'>
            Terms
          </Link>
          <Link href='/disclaimer' className='text-muted-dark text-[1.35rem] hover:text-white'>
            Disclaimer
          </Link>
        </nav>
      </div>
    </div>
  </footer>
);

export default Footer;
