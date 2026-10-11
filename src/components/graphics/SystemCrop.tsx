import React from 'react';

import { TOKEN_COLORS, TYPE_SCALE, TOKEN_ROWS, BREAKPOINTS } from '@src/lib/designTokens';

type SystemCropProps = {
  /** Ledger label in the panel header, e.g. "02 · Build". */
  label?: string;
  /** Show the breakpoint ruler (desktop only). */
  ruler?: boolean;
  /** Tighter spacing for the hero specimen. */
  compact?: boolean;
  className?: string;
};

/**
 * The design system as a specimen: real type scale, real colour chips, real
 * token values (src/lib/designTokens.ts mirrors globals.css). Reused by the
 * hero, the studio case study and the About artefacts so the same facts are
 * printed everywhere. Static, no motion.
 */
const SystemCrop: React.FC<SystemCropProps> = ({
  label = 'System',
  ruler = false,
  compact = false,
  className = '',
}) => {
  const pad = compact ? 'px-[1.6rem] py-[1.4rem]' : 'px-[2rem] py-[1.8rem] md:px-[2.4rem]';

  return (
    <div className={`border-edge border bg-white ${className}`}>
      <div
        className={`border-line flex items-baseline justify-between border-b ${compact ? 'px-[1.6rem]' : 'px-[2rem] md:px-[2.4rem]'} py-[1.2rem]`}
      >
        <span className='meta-label'>{label}</span>
        <span className='text-muted-dark font-mono text-[1.1rem]'>globals.css</span>
      </div>

      <div className={pad}>
        {/* Type scale */}
        <ul className='flex flex-col'>
          {TYPE_SCALE.map((row, index) => (
            <li
              key={row.role}
              className={`border-line grid grid-cols-[5.2rem_1fr_auto] items-baseline gap-x-[1.2rem] py-[0.8rem] ${
                index === 0 ? '' : 'border-t'
              }`}
            >
              <span
                className={
                  row.role === 'Display'
                    ? 'font-display text-[3.4rem] leading-none'
                    : row.role === 'Heading'
                      ? 'text-[2.2rem] leading-none font-semibold'
                      : 'text-[1.6rem] leading-none'
                }
              >
                Ag
              </span>
              <span className='text-[1.25rem] leading-[1.3] font-medium'>
                {row.role}
                <span className='text-muted font-normal'> · {row.face}</span>
              </span>
              <span className='text-muted font-mono text-[1.1rem]'>{row.max}</span>
            </li>
          ))}
        </ul>

        {/* Colour chips */}
        <ul className='border-line mt-[1.2rem] flex gap-[1.6rem] border-t pt-[1.4rem]'>
          {TOKEN_COLORS.map((color) => (
            <li key={color.name} className='flex flex-col gap-[0.5rem]'>
              <span
                className={`border-line block h-[2.4rem] w-[2.4rem] border ${color.className}`}
              />
              <span className='text-muted font-mono text-[1.1rem]'>{color.hex}</span>
            </li>
          ))}
        </ul>

        {/* Tokens */}
        <ul className='border-line mt-[1.4rem] border-t pt-[0.4rem]'>
          {TOKEN_ROWS.map((token) => (
            <li
              key={token.name}
              className='border-line flex justify-between gap-[1.6rem] border-b py-[0.6rem] font-mono text-[1.15rem] last:border-b-0'
            >
              <span className='text-muted'>{token.name}</span>
              <span className='text-ink'>{token.value}</span>
            </li>
          ))}
        </ul>

        {/* Breakpoint ruler */}
        {ruler && (
          <div className='mt-[1.4rem] hidden xl:block'>
            <div className='border-edge relative border-t'>
              {BREAKPOINTS.map((bp, index) => (
                <span
                  key={bp}
                  className='bg-edge absolute top-0 h-[0.6rem] w-px'
                  style={{ left: `${(index / (BREAKPOINTS.length - 1)) * 100}%` }}
                />
              ))}
            </div>
            <div className='mt-[0.8rem] flex justify-between font-mono text-[1.1rem]'>
              {BREAKPOINTS.map((bp) => (
                <span key={bp} className='text-muted-dark'>
                  {bp}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemCrop;
