import React from 'react';

type SparkProps = {
  /** Size in rem units (1rem = 10px). */
  size?: number;
  className?: string;
  /** Fill color; defaults to brand blue. */
  fill?: string;
};

/**
 * The forge-spark: a single four-point spark.
 * Superseded in the header and footer by the logo lockup
 * (src/components/brand/Logo.tsx). Not rendered anywhere in the UI today;
 * kept because the static illustration set in public/static uses the same
 * spark. Never use it as a list bullet or filler.
 */
const Spark: React.FC<SparkProps> = ({
  size = 1.1,
  className = '',
  fill = 'var(--color-blue)',
}) => (
  <svg
    viewBox='0 0 24 24'
    aria-hidden='true'
    focusable='false'
    className={className}
    style={{ width: `${size}rem`, height: `${size}rem`, flexShrink: 0 }}
  >
    <path d='M12 0 L14.6 9.4 L24 12 L14.6 14.6 L12 24 L9.4 14.6 L0 12 L9.4 9.4 Z' fill={fill} />
  </svg>
);

export default Spark;
