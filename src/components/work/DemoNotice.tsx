import React from 'react';

type DemoNoticeProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Page-level notice for demonstration content: a static, bordered editorial
 * note in the ledger voice. Visible without interaction, part of the reading
 * order, and styled to sit inside the premium layout rather than as an alert.
 */
const DemoNotice: React.FC<DemoNoticeProps> = ({ children, className = '' }) => (
  <aside
    aria-label='Demonstration content notice'
    className={`border-edge border bg-white px-[2rem] py-[1.8rem] ${className}`}
  >
    <p className='meta-label text-ink'>Demonstration content</p>
    <p className='text-muted mt-[0.8rem] max-w-[72ch] text-[1.5rem] leading-[1.65]'>{children}</p>
  </aside>
);

export default DemoNotice;
