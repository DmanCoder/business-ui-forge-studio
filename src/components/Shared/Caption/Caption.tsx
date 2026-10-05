import React from 'react';

import BodyCopyRenderer from '../BodyCopyRenderer';

import { CaptionPropTypes } from './Caption.types';

const Caption: React.FC<CaptionPropTypes> = ({ data }) => {
  return (
    <BodyCopyRenderer
      className='mt-[1rem] text-center text-[1.45rem] italic'
      bodyCopy={data.bodyCopy}
    />
  );
};

export default Caption;
