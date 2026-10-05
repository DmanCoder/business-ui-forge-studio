import React from 'react';

import BodyCopyRenderer from '../BodyCopyRenderer';

import { BlockquotePropTypes } from './Blockquote.types';

const Blockquote: React.FC<BlockquotePropTypes> = ({ data }) => {
  return (
    <blockquote className='border-border bg-background-secondary mb-[2.2rem] rounded-[1.2rem] border-l-[0.5rem] p-[2rem] text-[2rem] leading-[3.2rem] font-normal italic [&>p]:mb-[unset]'>
      <BodyCopyRenderer bodyCopy={data.bodyCopy} />
      {data.name && (
        <footer className='mt-[1.6rem] text-[1.45rem] leading-none'>— {data.name}</footer>
      )}
    </blockquote>
  );
};

export default Blockquote;
