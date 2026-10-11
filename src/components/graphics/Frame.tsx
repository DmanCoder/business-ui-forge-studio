import React from 'react';

/**
 * Graphic primitives for the in-page visual system. Everything here is
 * static HTML/CSS using the site's own tokens: 1px hairlines, no depth, no
 * motion. Used by the hero specimen, service diagrams and case-study figures
 * so every graphic shares one frame language.
 */

type FrameProps = {
  children: React.ReactNode;
  className?: string;
};

/** Neutral browser chrome: three dots, one address pill, one hairline. */
export const BrowserFrame: React.FC<FrameProps> = ({ children, className = '' }) => (
  <div className={`border-edge border bg-white ${className}`}>
    <div className='border-line bg-paper flex h-[2.8rem] items-center gap-[0.5rem] border-b px-[1rem]'>
      <span className='bg-edge h-[0.6rem] w-[0.6rem] rounded-full' />
      <span className='bg-edge h-[0.6rem] w-[0.6rem] rounded-full' />
      <span className='bg-edge h-[0.6rem] w-[0.6rem] rounded-full' />
      <span className='bg-line ml-[0.8rem] h-[0.8rem] w-[38%] rounded-[0.4rem]' />
    </div>
    {children}
  </div>
);

/** Phone frame: hairline, 16px radius, a status notch. No bezel shading. */
export const PhoneFrame: React.FC<FrameProps> = ({ children, className = '' }) => (
  <div className={`border-edge rounded-[1.6rem] border bg-white ${className}`}>
    <div className='flex h-[2.4rem] items-end justify-center pb-[0.6rem]'>
      <span className='bg-line h-[0.4rem] w-[3.2rem] rounded-full' />
    </div>
    {children}
  </div>
);

/** Plain hairline card on paper or white. */
export const Panel: React.FC<FrameProps & { tone?: 'paper' | 'white' }> = ({
  children,
  className = '',
  tone = 'white',
}) => (
  <div className={`border-edge border ${tone === 'paper' ? 'bg-paper' : 'bg-white'} ${className}`}>
    {children}
  </div>
);

/** A labelled ledger cell. `active` carries the one blue state of a diagram. */
export const Cell: React.FC<{
  children: React.ReactNode;
  active?: boolean;
  muted?: boolean;
  className?: string;
}> = ({ children, active = false, muted = false, className = '' }) => (
  <span
    className={`inline-flex min-h-[3.2rem] items-center justify-center border px-[1.2rem] py-[0.6rem] text-center text-[1.25rem] leading-[1.3] font-medium ${
      active
        ? 'border-blue text-blue bg-white'
        : muted
          ? 'border-line text-muted bg-white'
          : 'border-ink text-ink bg-white'
    } ${className}`}
  >
    {children}
  </span>
);

/** Stand-in text lines for body copy inside an interface specimen. */
export const TextBars: React.FC<{ widths?: string[]; className?: string }> = ({
  widths = ['86%', '62%'],
  className = '',
}) => (
  <span className={`flex flex-col gap-[0.5rem] ${className}`}>
    {widths.map((width, index) => (
      <span key={index} className='bg-line block h-[0.6rem] rounded-[0.3rem]' style={{ width }} />
    ))}
  </span>
);

/** Directional connector: a 1px edge line with an open arrowhead. */
export const Arrow: React.FC<{
  direction?: 'right' | 'down';
  className?: string;
  active?: boolean;
}> = ({ direction = 'right', className = '', active = false }) => {
  const color = active ? 'var(--color-blue)' : 'var(--color-edge)';
  return direction === 'right' ? (
    <svg
      aria-hidden='true'
      focusable='false'
      viewBox='0 0 40 12'
      className={`h-[1.2rem] w-[4rem] shrink-0 ${className}`}
      fill='none'
      stroke={color}
      strokeWidth='1.25'
    >
      <path d='M0 6H38' />
      <path d='M33 1L38 6L33 11' />
    </svg>
  ) : (
    <svg
      aria-hidden='true'
      focusable='false'
      viewBox='0 0 12 32'
      className={`h-[3.2rem] w-[1.2rem] shrink-0 ${className}`}
      fill='none'
      stroke={color}
      strokeWidth='1.25'
    >
      <path d='M6 0V30' />
      <path d='M1 25L6 30L11 25' />
    </svg>
  );
};

/** Faux CTA for specimens — the exact look of `Cta`, as a non-interactive span. */
export const FauxCta: React.FC<{ children: React.ReactNode; secondary?: boolean }> = ({
  children,
  secondary = false,
}) => (
  <span
    className={`inline-flex min-h-[3.2rem] items-center justify-center gap-[0.6rem] rounded-[0.2rem] px-[1.4rem] py-[0.6rem] text-[1.2rem] font-semibold tracking-[0.01em] ${
      secondary ? 'border-ink text-ink border bg-white' : 'bg-blue text-white'
    }`}
  >
    {children}
  </span>
);
