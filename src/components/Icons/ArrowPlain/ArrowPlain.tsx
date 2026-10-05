import React from 'react';

import { CommonPropTypes } from '../IconTypes';

const ArrowPlain: React.FC<CommonPropTypes> = ({ className, svgRef }) => {
  return (
    <svg
      ref={svgRef}
      className={className}
      width='14'
      height='13'
      viewBox='0 0 14 13'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M13.75 7.5625L8.25 12.8125C7.9375 13.0938 7.46875 13.0938 7.1875 12.7812C6.90625 12.4688 6.90625 12 7.21875 11.7188L11.375 7.75H0.75C0.3125 7.75 0 7.4375 0 7C0 6.59375 0.3125 6.25 0.75 6.25H11.375L7.21875 2.3125C6.90625 2.03125 6.90625 1.53125 7.1875 1.25C7.46875 0.9375 7.96875 0.9375 8.25 1.21875L13.75 6.46875C13.9062 6.625 14 6.8125 14 7C14 7.21875 13.9062 7.40625 13.75 7.5625Z'
        fill='currentColor'
      />
    </svg>
  );
};

export default ArrowPlain;
