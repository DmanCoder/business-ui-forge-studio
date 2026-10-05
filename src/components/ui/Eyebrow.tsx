import React from 'react';

type EyebrowProps = {
  children: React.ReactNode;
  /** Ledger index rendered before the label, e.g. "01". */
  index?: string;
  /** Use lighter tones when placed on an ink background. */
  onDark?: boolean;
  className?: string;
};

/**
 * Section label in the ledger voice: optional tabular index numeral +
 * uppercase tracked micro label. No decoration.
 */
const Eyebrow: React.FC<EyebrowProps> = ({ children, index, onDark = false, className = '' }) => (
  <p className={`meta-label ${onDark ? 'text-muted-dark' : ''} ${className}`}>
    {index && <span className='tnum text-blue mr-[1.2rem]'>{index}</span>}
    {children}
  </p>
);

export default Eyebrow;
