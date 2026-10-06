import React from 'react';
import Link from 'next/link';

type CtaVariant = 'primary' | 'secondary';
type CtaSize = 'sm' | 'md' | 'lg' | 'nav';

type CtaProps = {
  href?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  variant?: CtaVariant;
  size?: CtaSize;
  /** Adjusts hover/border colors when placed on an ink background. */
  onDark?: boolean;
  /** Append a static arrow glyph after the label. */
  withArrow?: boolean;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
};

const SIZES: Record<CtaSize, string> = {
  nav: 'px-[1.8rem] py-[1rem] text-[1.4rem]',
  sm: 'px-[2.2rem] py-[1.2rem] text-[1.45rem]',
  md: 'px-[2.8rem] py-[1.5rem] text-[1.5rem]',
  lg: 'px-[3.2rem] py-[1.7rem] text-[1.55rem]',
};

/**
 * Button / link CTA. Renders a Next link when `href` is given.
 * State changes are immediate — no transitions, no movement, no scaling.
 */
const Cta: React.FC<CtaProps> = ({
  href,
  type = 'button',
  onClick,
  variant = 'primary',
  size = 'md',
  onDark = false,
  withArrow = false,
  disabled = false,
  className = '',
  children,
}) => {
  const base =
    'inline-flex min-h-[4.4rem] items-center justify-center gap-[1rem] rounded-[0.2rem] font-semibold tracking-[0.01em] cursor-pointer';

  const look =
    variant === 'primary'
      ? onDark
        ? 'bg-blue text-white hover:bg-white hover:text-ink'
        : 'bg-blue text-white hover:bg-ink hover:text-white'
      : onDark
        ? 'border border-white/40 text-white hover:border-white hover:bg-white hover:text-ink'
        : 'border border-ink text-ink hover:bg-ink hover:text-white';

  const classes = `${base} ${SIZES[size]} ${look} ${
    disabled ? 'cursor-not-allowed opacity-60' : ''
  } ${className}`;

  const content = (
    <>
      {children}
      {withArrow && <span aria-hidden='true'>→</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {content}
    </button>
  );
};

export default Cta;
