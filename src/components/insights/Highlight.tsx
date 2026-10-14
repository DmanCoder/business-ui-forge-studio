import React from 'react';

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Wrap every occurrence of the search terms in `<mark>`. Built from React
 * nodes, never from HTML strings, so article text is always rendered as text.
 */
const Highlight: React.FC<{ text: string; terms: string[] }> = ({ text, terms }) => {
  if (terms.length === 0) return <>{text}</>;

  const pattern = new RegExp(`(${terms.map(escapeRegExp).join('|')})`, 'gi');
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <mark key={index} className='text-ink bg-[color:var(--color-primary--light)]'>
            {part}
          </mark>
        ) : (
          <React.Fragment key={index}>{part}</React.Fragment>
        )
      )}
    </>
  );
};

export default Highlight;
