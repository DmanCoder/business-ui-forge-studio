import React from 'react';

import { CommonPropTypes } from '../IconTypes';

const Close: React.FC<CommonPropTypes> = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      height='24'
      viewBox='0 -960 960 960'
      width='24'
    >
      <path
        fill='currentColor'
        d='M256-227.692 227.692-256l224-224-224-224L256-732.308l224 224 224-224L732.308-704l-224 224 224 224L704-227.692l-224-224-224 224Z'
      />
    </svg>
  );
};

export default Close;
