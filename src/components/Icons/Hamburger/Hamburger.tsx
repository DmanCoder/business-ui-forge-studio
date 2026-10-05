import React from 'react';

import { CommonPropTypes } from '../IconTypes';

const Hamburger: React.FC<CommonPropTypes> = ({ className }) => {
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
        d='M160-269.231v-40h640v40H160ZM160-460v-40h640v40H160Zm0-190.769v-40h640v40H160Z'
      />
    </svg>
  );
};

export default Hamburger;
