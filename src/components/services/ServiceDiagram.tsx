import React from 'react';

import {
  BrowserFrame,
  PhoneFrame,
  Panel,
  Cell,
  TextBars,
  Arrow,
  FauxCta,
} from '@src/components/graphics/Frame';

/**
 * One diagram per service, keyed by the service page slug. The same component
 * renders on the services index and on each service detail page so the
 * visitor recognises the diagram they already saw. HTML/CSS with the site's
 * tokens; reflows below 500px instead of shrinking. Each diagram is
 * decorative (aria-hidden) with an sr-only description outside it and a
 * factual caption. No fabricated data, no motion.
 */

export type ServiceDiagramSlug =
  | 'web-design-development'
  | 'website-redesign'
  | 'shopify-development'
  | 'hubspot-websites'
  | 'web-app-development'
  | 'mobile-app-development'
  | 'website-maintenance';

const STAGE = 'bg-paper p-[clamp(1.6rem,3vw,3.2rem)]';
const LABEL = 'meta-label text-[1.1rem]';

/* ---------- 01 Web design & development — responsive site anatomy -------- */

const Websites = () => (
  <div className={`${STAGE} grid gap-[2rem] sm:grid-cols-[7fr_2fr_3fr] sm:items-start`}>
    <div>
      <BrowserFrame>
        <div className='px-[1.6rem] py-[1.4rem]'>
          <div className='flex items-center justify-between'>
            <span className='bg-ink block h-[0.6rem] w-[22%] rounded-[0.3rem]' />
            <span className='bg-blue block h-[1.2rem] w-[18%] rounded-[0.2rem]' />
          </div>
          <div className='mt-[1.6rem] grid grid-cols-[3fr_2fr] gap-[1.2rem]'>
            <div>
              <p className='font-display text-[1.9rem] leading-[1.05]'>Clear, fast, found.</p>
              <TextBars className='mt-[0.8rem]' widths={['90%', '70%']} />
              <span className='mt-[1rem] block'>
                <FauxCta>Enquire</FauxCta>
              </span>
            </div>
            <span className='block min-h-[6.4rem] bg-[color:var(--color-primary--light)]' />
          </div>
          <div className='mt-[1.4rem] grid grid-cols-3 gap-[0.8rem]'>
            {['Services', 'Work', 'Insights'].map((item) => (
              <span
                key={item}
                className='border-line text-muted block border px-[0.8rem] py-[0.6rem] text-[1.1rem]'
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </BrowserFrame>
      <div className='mt-[0.8rem] flex justify-between font-mono text-[1.1rem]'>
        <span className='text-muted-dark'>375</span>
        <span className='text-muted-dark'>768</span>
        <span className='text-muted-dark'>1280 · breakpoints</span>
      </div>
    </div>
    <PhoneFrame className='mx-auto w-full max-w-[12rem]'>
      <div className='px-[1rem] pb-[1.2rem]'>
        <div className='flex items-center justify-between'>
          <span className='bg-ink block h-[0.5rem] w-[40%] rounded-[0.25rem]' />
          <span className='bg-blue block h-[0.9rem] w-[1.8rem] rounded-[0.2rem]' />
        </div>
        <span className='mt-[1rem] block h-[4.4rem] bg-[color:var(--color-primary--light)]' />
        <TextBars className='mt-[1rem]' widths={['80%', '100%', '60%']} />
      </div>
    </PhoneFrame>
    <div>
      <span className={LABEL}>Structure</span>
      <ul className='mt-[0.8rem]'>
        <li>
          <Cell active className='w-full'>
            Home
          </Cell>
          <ul className='border-edge mt-[0.6rem] ml-[1rem] border-l pl-[1.2rem]'>
            {['Services', 'Work', 'Insights', 'Contact'].map((item) => (
              <li key={item} className='relative py-[0.3rem]'>
                <span className='bg-edge absolute top-[1.6rem] left-[-1.2rem] h-px w-[0.8rem]' />
                <Cell muted className='w-full'>
                  {item}
                </Cell>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  </div>
);

/* ---------- 02 Website redesign — keep / improve / replace --------------- */

const REDESIGN_COLUMNS = [
  {
    label: 'Keep',
    items: ['URLs that rank', 'Content that works', 'Integrations in use'],
    active: false,
  },
  { label: 'Improve', items: ['Mobile layout', 'Enquiry path', 'Page speed'], active: true },
  { label: 'Replace', items: ['Template', 'Dated sections', 'Unused plugins'], active: false },
];

const Redesign = () => (
  <div className={`${STAGE} grid gap-[2rem] lg:grid-cols-[3fr_2fr] lg:items-start`}>
    <div>
      <span className={LABEL}>Current site · audit</span>
      <div className='mt-[0.8rem] grid grid-cols-3 gap-[0.8rem]'>
        {REDESIGN_COLUMNS.map((column) => (
          <Panel key={column.label} className='p-[1.2rem]'>
            <span
              className={`block text-[1.25rem] font-semibold ${column.active ? 'text-blue' : ''}`}
            >
              {column.label}
            </span>
            <ul className='mt-[0.8rem]'>
              {column.items.map((item) => (
                <li
                  key={item}
                  className='border-line text-muted border-t py-[0.5rem] text-[1.1rem] leading-[1.3]'
                >
                  {item}
                </li>
              ))}
            </ul>
          </Panel>
        ))}
      </div>
    </div>
    <div className='flex items-center gap-[1.2rem] lg:flex-col lg:items-stretch lg:gap-[0.8rem]'>
      <Arrow direction='right' className='hidden lg:hidden' />
      <Cell muted className='flex-1'>
        Redirect map
      </Cell>
      <Arrow direction='right' className='lg:hidden' />
      <Arrow direction='down' className='mx-auto hidden lg:block' />
      <Cell active className='flex-1'>
        New build
      </Cell>
      <Arrow direction='right' className='lg:hidden' />
      <Arrow direction='down' className='mx-auto hidden lg:block' />
      <Cell className='flex-1'>Launch checks</Cell>
    </div>
  </div>
);

/* ---------- 03 Shopify — product → cart → checkout, two paths ------------ */

const StoreScreen: React.FC<{ title: string; kind: 'product' | 'cart' | 'checkout' }> = ({
  title,
  kind,
}) => (
  <div>
    <span className={LABEL}>{title}</span>
    <BrowserFrame className='mt-[0.6rem]'>
      <div className='flex min-h-[13.2rem] flex-col px-[1.2rem] py-[1.2rem]'>
        {kind === 'product' && (
          <>
            <span className='block h-[5.6rem] bg-[color:var(--color-primary--light)]' />
            <TextBars className='mt-[1rem]' widths={['70%', '40%']} />
          </>
        )}
        {kind === 'cart' && (
          <ul className='flex flex-col gap-[0.8rem]'>
            {[0, 1].map((row) => (
              <li key={row} className='flex items-center gap-[0.8rem]'>
                <span className='block h-[2.4rem] w-[2.4rem] bg-[color:var(--color-primary--light)]' />
                <TextBars className='flex-1' widths={['80%', '50%']} />
              </li>
            ))}
          </ul>
        )}
        {kind === 'checkout' && (
          <ul className='flex flex-col gap-[0.6rem]'>
            {['Email', 'Delivery', 'Payment'].map((field) => (
              <li
                key={field}
                className='border-line text-muted-dark border px-[0.8rem] py-[0.5rem] text-[1.1rem]'
              >
                {field}
              </li>
            ))}
          </ul>
        )}
        <span className='bg-blue mt-auto block h-[2.2rem] w-full rounded-[0.2rem]' />
      </div>
    </BrowserFrame>
  </div>
);

const Shopify = () => (
  <div className={`${STAGE} grid gap-[2rem] lg:grid-cols-[2fr_7fr] lg:items-center`}>
    <div className='flex flex-col gap-[0.8rem]'>
      <span className={LABEL}>Two paths</span>
      <Cell active className='w-full'>
        Theme build · most stores
      </Cell>
      <Cell className='w-full'>Hydrogen storefront · established brands</Cell>
      <span className='text-muted text-[1.15rem] leading-[1.4]'>
        Either way, Shopify keeps products, checkout and payments.
      </span>
    </div>
    <div className='grid gap-[1.2rem] sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center'>
      <StoreScreen title='Product' kind='product' />
      <Arrow direction='right' className='hidden sm:block' />
      <Arrow direction='down' className='mx-auto sm:hidden' />
      <StoreScreen title='Cart' kind='cart' />
      <Arrow direction='right' className='hidden sm:block' />
      <Arrow direction='down' className='mx-auto sm:hidden' />
      <StoreScreen title='Checkout' kind='checkout' />
    </div>
  </div>
);

/* ---------- 04 HubSpot — modules → page → form → contact → report -------- */

const HubSpot = () => (
  <div className={`${STAGE} grid gap-[2rem] lg:grid-cols-[2fr_3fr_4fr] lg:items-start`}>
    <div>
      <span className={LABEL}>Modules</span>
      <ul className='mt-[0.8rem] grid grid-cols-2 gap-[0.8rem]'>
        {['Hero', 'Feature', 'Form', 'CTA'].map((module, index) => (
          <li key={module}>
            <Cell muted={index !== 2} active={index === 2} className='w-full'>
              {module}
            </Cell>
          </li>
        ))}
      </ul>
    </div>
    <div>
      <span className={LABEL}>Composed page</span>
      <BrowserFrame className='mt-[0.6rem]'>
        <ul className='flex flex-col gap-[0.6rem] px-[1.2rem] py-[1.2rem]'>
          {['Hero', 'Feature', 'Form', 'CTA'].map((zone) => (
            <li
              key={zone}
              className={`border px-[0.8rem] py-[0.7rem] text-[1.1rem] ${
                zone === 'Form' ? 'border-blue text-blue' : 'border-line text-muted'
              }`}
            >
              {zone}
            </li>
          ))}
        </ul>
      </BrowserFrame>
    </div>
    <div>
      <span className={LABEL}>Connected to marketing</span>
      <div className='mt-[0.8rem] flex flex-col items-stretch gap-[0.4rem] sm:flex-row sm:items-center sm:gap-[0.6rem]'>
        <Cell active className='flex-1'>
          Form submitted
        </Cell>
        <Arrow direction='right' className='hidden sm:block' />
        <Arrow direction='down' className='mx-auto sm:hidden' />
        <Cell className='flex-1'>Contact record</Cell>
        <Arrow direction='right' className='hidden sm:block' />
        <Arrow direction='down' className='mx-auto sm:hidden' />
        <Cell className='flex-1'>Campaign report</Cell>
      </div>
      <span className='text-muted mt-[1.2rem] block text-[1.15rem] leading-[1.4]'>
        Content Hub pages, with every enquiry landing in the CRM you already use.
      </span>
    </div>
  </div>
);

/* ---------- 05 Web applications — shell + workflow + components ---------- */

const WebApp = () => (
  <div className={`${STAGE} grid gap-[2rem] lg:grid-cols-[3fr_2fr] lg:items-start`}>
    <div>
      <span className={LABEL}>Application shell</span>
      <Panel className='mt-[0.6rem] grid grid-cols-[7.2rem_1fr]'>
        <div className='border-line bg-paper border-r px-[1rem] py-[1.2rem]'>
          <ul className='flex flex-col gap-[0.8rem]'>
            {['Overview', 'Bookings', 'Clients', 'Reports'].map((item, index) => (
              <li
                key={item}
                className={`text-[1.1rem] ${index === 1 ? 'text-blue font-semibold' : 'text-muted'}`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className='px-[1.4rem] py-[1.2rem]'>
          <div className='flex items-center gap-[0.6rem]'>
            <Cell active>Draft</Cell>
            <Arrow direction='right' className='w-[2.4rem]' />
            <Cell muted>Review</Cell>
            <Arrow direction='right' className='w-[2.4rem]' />
            <Cell muted>Done</Cell>
          </div>
          <ul className='mt-[1.2rem] flex flex-col gap-[0.6rem]'>
            {[0, 1, 2].map((row) => (
              <li
                key={row}
                className='border-line flex items-center justify-between border px-[0.8rem] py-[0.6rem]'
              >
                <TextBars className='w-[55%]' widths={['100%']} />
                <span className='border-line block h-[1.2rem] w-[3.2rem] border' />
              </li>
            ))}
          </ul>
        </div>
      </Panel>
    </div>
    <div>
      <span className={LABEL}>Component system</span>
      <ul className='mt-[0.8rem] grid grid-cols-3 gap-[0.8rem] sm:grid-cols-3'>
        {['Button', 'Field', 'Table', 'Dialog', 'Nav', 'Card'].map((component) => (
          <li key={component} className='border-line border bg-white px-[0.8rem] py-[0.8rem]'>
            <span className='block font-mono text-[1.1rem]'>{component}</span>
            <span className='bg-line mt-[0.6rem] block h-[0.5rem] w-[70%] rounded-[0.25rem]' />
          </li>
        ))}
      </ul>
      <span className='text-muted mt-[1.2rem] block text-[1.15rem] leading-[1.4]'>
        Portals, dashboards and booking tools built from one set of parts.
      </span>
    </div>
  </div>
);

/* ---------- 06 Mobile — one shared system, three different screens ------- */

const MobileScreen: React.FC<{ kind: 'list' | 'detail' | 'form' }> = ({ kind }) => (
  <PhoneFrame className='w-full'>
    <div className='flex min-h-[15.2rem] flex-col px-[1rem] pb-[1rem]'>
      {kind === 'list' && (
        <ul className='flex flex-col gap-[0.6rem]'>
          {[0, 1, 2, 3].map((row) => (
            <li
              key={row}
              className='border-line flex items-center gap-[0.6rem] border-b pb-[0.5rem]'
            >
              <span className='bg-line block h-[1.6rem] w-[1.6rem] rounded-full' />
              <TextBars className='flex-1' widths={['70%']} />
            </li>
          ))}
        </ul>
      )}
      {kind === 'detail' && (
        <>
          <span className='block h-[4.8rem] bg-[color:var(--color-primary--light)]' />
          <span className='bg-ink mt-[0.8rem] block h-[0.6rem] w-[60%] rounded-[0.3rem]' />
          <TextBars className='mt-[0.6rem]' widths={['100%', '85%']} />
          <span className='bg-blue mt-[1rem] block h-[2.2rem] rounded-[0.2rem]' />
        </>
      )}
      {kind === 'form' && (
        <ul className='flex flex-col gap-[0.5rem]'>
          {['Name', 'Date', 'Notes'].map((field) => (
            <li
              key={field}
              className='border-line text-muted-dark border px-[0.6rem] py-[0.5rem] text-[1.1rem]'
            >
              {field}
            </li>
          ))}
          <li className='bg-blue mt-[0.4rem] block h-[2.2rem] rounded-[0.2rem]' />
        </ul>
      )}
      <div className='border-line mt-auto flex justify-around border-t pt-[0.6rem]'>
        <span className='bg-blue block h-[0.5rem] w-[0.5rem] rounded-full' />
        <span className='bg-edge block h-[0.5rem] w-[0.5rem] rounded-full' />
        <span className='bg-edge block h-[0.5rem] w-[0.5rem] rounded-full' />
      </div>
    </div>
  </PhoneFrame>
);

const Mobile = () => (
  <div className={`${STAGE} grid gap-[2rem] lg:grid-cols-[2fr_5fr] lg:items-start`}>
    <div>
      <span className={LABEL}>One shared system</span>
      <ul className='mt-[0.8rem] flex flex-col gap-[0.6rem]'>
        {['Components', 'Navigation', 'Data & auth'].map((item, index) => (
          <li key={item}>
            <Cell active={index === 0} muted={index !== 0} className='w-full'>
              {item}
            </Cell>
          </li>
        ))}
      </ul>
      <span className='text-muted mt-[1.2rem] block text-[1.15rem] leading-[1.4]'>
        React Native — one codebase, native apps on both platforms.
      </span>
    </div>
    <div>
      <div className='border-edge mb-[0.8rem] flex items-end justify-between border-b pb-[0.6rem]'>
        <span className={LABEL}>iOS</span>
        <span className={LABEL}>Android</span>
      </div>
      <div className='grid grid-cols-3 gap-[1.2rem]'>
        {(['list', 'detail', 'form'] as const).map((kind) => (
          <div key={kind}>
            <MobileScreen kind={kind} />
            <span className='meta-label mt-[0.6rem] block text-center text-[1.1rem]'>{kind}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ---------- 07 Maintenance — checks, monitoring, handover ---------------- */

const CARE_CHECKS = [
  'Dependency and security updates',
  'Backups verified',
  'Performance review',
  'Content changes',
];

const Maintenance = () => (
  <div className={`${STAGE} grid gap-[2rem] lg:grid-cols-[4fr_3fr_3fr] lg:items-start`}>
    <div>
      <span className={LABEL}>Monthly checks</span>
      <ul className='mt-[0.8rem]'>
        {CARE_CHECKS.map((check) => (
          <li
            key={check}
            className='border-line flex items-center gap-[1rem] border-t py-[0.7rem] text-[1.2rem]'
          >
            <span className='border-ink block h-[1rem] w-[1rem] shrink-0 border' />
            {check}
          </li>
        ))}
      </ul>
      <div className='mt-[1.2rem] grid grid-cols-12 gap-[0.3rem]'>
        {Array.from({ length: 12 }).map((_, month) => (
          <span key={month} className='border-edge block h-[1.2rem] border-t' />
        ))}
      </div>
      <span className='text-muted-dark mt-[0.4rem] block font-mono text-[1.1rem]'>
        12 months · same person each time
      </span>
    </div>
    <div>
      <span className={LABEL}>Monitoring</span>
      <ul className='mt-[0.8rem] flex flex-col gap-[0.6rem]'>
        {['Uptime', 'Errors', 'Forms & journeys'].map((item) => (
          <li key={item}>
            <Cell muted className='w-full'>
              {item}
            </Cell>
          </li>
        ))}
      </ul>
      <span className='text-muted mt-[1.2rem] block text-[1.15rem] leading-[1.4]'>
        Problems are noticed by us, not reported by your customers.
      </span>
    </div>
    <div>
      <span className={LABEL}>Handover · any time</span>
      <Panel className='mt-[0.8rem] p-[1.2rem]'>
        <ul className='flex flex-col gap-[0.5rem] text-[1.15rem]'>
          <li>Accounts in your name</li>
          <li>Documentation included</li>
          <li className='text-blue font-semibold'>No lock-in</li>
        </ul>
      </Panel>
    </div>
  </div>
);

/* ---------- registry ------------------------------------------------------ */

const DIAGRAMS: Record<
  ServiceDiagramSlug,
  { caption: string; description: string; render: () => React.ReactElement }
> = {
  'web-design-development': {
    caption: 'Responsive site anatomy — desktop and mobile layouts from one structure.',
    description:
      'Diagram: a desktop page and a mobile page built from the same site structure of Home, Services, Work, Insights and Contact, with breakpoints at 375, 768 and 1280 pixels.',
    render: Websites,
  },
  'website-redesign': {
    caption: 'Keep, improve or replace — then a redirect map, the new build and launch checks.',
    description:
      'Diagram: the current site is audited into keep, improve and replace columns, then a redirect map leads to the new build and launch checks.',
    render: Redesign,
  },
  'shopify-development': {
    caption: 'Product, cart and checkout as one path — on a theme build or a Hydrogen storefront.',
    description:
      'Diagram: two paths, a theme build for most stores or a Hydrogen storefront for established brands, both leading through product, cart and checkout screens with Shopify handling checkout and payments.',
    render: Shopify,
  },
  'hubspot-websites': {
    caption: 'Reusable modules compose pages; every form lands in the CRM and campaign reporting.',
    description:
      'Diagram: hero, feature, form and CTA modules compose a page; a submitted form becomes a contact record and appears in campaign reporting.',
    render: HubSpot,
  },
  'web-app-development': {
    caption:
      'An application shell with a draft → review → done workflow, built from one component system.',
    description:
      'Diagram: an application shell with sidebar navigation, a draft to review to done workflow and record rows, beside a component system of button, field, table, dialog, nav and card.',
    render: WebApp,
  },
  'mobile-app-development': {
    caption: 'One React Native system; list, detail and form screens on iOS and Android.',
    description:
      'Diagram: one shared system of components, navigation and data produces list, detail and form screens that run on both iOS and Android.',
    render: Mobile,
  },
  'website-maintenance': {
    caption: 'Monthly checks, monitoring and a handover available at any time — no lock-in.',
    description:
      'Diagram: monthly checks for updates, backups, performance and content; monitoring of uptime, errors and forms; and a handover with accounts in your name and documentation included.',
    render: Maintenance,
  },
};

export const isServiceDiagramSlug = (slug: string): slug is ServiceDiagramSlug => slug in DIAGRAMS;

type ServiceDiagramProps = {
  slug: ServiceDiagramSlug;
  /** Hide the caption when the surrounding layout provides its own. */
  caption?: boolean;
  className?: string;
};

const ServiceDiagram: React.FC<ServiceDiagramProps> = ({
  slug,
  caption = true,
  className = '',
}) => {
  const diagram = DIAGRAMS[slug];
  const Render = diagram.render;

  return (
    <figure className={className}>
      <p className='sr-only'>{diagram.description}</p>
      <div aria-hidden='true' className='border-edge border'>
        <Render />
      </div>
      {caption && <figcaption className='meta-label mt-[1.2rem]'>{diagram.caption}</figcaption>}
    </figure>
  );
};

export default ServiceDiagram;
