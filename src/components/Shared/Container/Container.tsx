import React from 'react';

import Expander from '@src/components/Shared/Expander';

import { ContainerPropTypes } from './Container.types';

const Container: React.FC<ContainerPropTypes> = ({
  className = '',
  children,
  background,
  HtmlTag = 'section',
}) => {
  return (
    <HtmlTag
      className={`3xl:px-[0] relative z-1 mx-auto mb-[8rem] w-full max-w-[133.6rem] px-[2.4rem] md:px-[6.3rem] lg:mb-[8rem] lg:px-[6.4rem] xl:px-[12.8rem] ${className}`}
    >
      {children}
      {background && (
        <Expander className={`absolute top-[0] right-[0] z-[-1] ${background}`}></Expander>
      )}
    </HtmlTag>
  );
};

export default Container;
