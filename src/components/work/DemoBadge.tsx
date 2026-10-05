import React from 'react';

type DemoBadgeProps = {
  /** Visible badge text, e.g. 'Demo case study' or 'Sample testimonial'. */
  label: string;
  /** Lighter treatment on an ink background. */
  onDark?: boolean;
  className?: string;
};

/**
 * Static labelled chip marking demonstration content. Always rendered in the
 * normal document flow — never behind hover, tooltip or metadata — so demo
 * case studies and sample testimonials can never be mistaken for real client
 * work. No animation; contrast meets the site's AA baseline.
 */
const DemoBadge: React.FC<DemoBadgeProps> = ({ label, onDark = false, className = '' }) => (
  <span
    className={`meta-label inline-block border px-[1rem] py-[0.5rem] ${
      onDark
        ? 'border-[color:var(--color-muted-dark)] text-white'
        : 'text-ink border-[color:var(--color-edge)] bg-white'
    } ${className}`}
  >
    {label}
  </span>
);

export default DemoBadge;
