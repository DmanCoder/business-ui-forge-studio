import React from 'react';

import { ExpanderPropTypes } from './Expander.types';

const Expander: React.FC<ExpanderPropTypes> = ({ className = '', children }) => {
  return (
    <div
      className={`mx-auto mr-[calc((-100vw+100%)/2)] ml-[-2.4rem] h-full w-screen md:ml-[-6.3rem] lg:ml-[calc((-100vw+100%)/2)] ${className}`}
    >
      {children}
    </div>
  );
};

export default Expander;
