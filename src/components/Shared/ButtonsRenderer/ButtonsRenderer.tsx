import React from 'react';

import getButtonStyleProps from '@src/utils/getButtonStyleProps';

import Button from '../Button/Button';

import { ButtonsRendererPropTypes } from './ButtonsRenderer.types';
import isEmpty from '@src/utils/isEmpty';

const ButtonsRenderer: React.FC<ButtonsRendererPropTypes> = ({
  style = {},
  className,
  buttons,
}) => {
  if (isEmpty({ value: buttons })) return null;

  return (
    <div
      style={style}
      className={`flex flex-col gap-[1rem] sm:flex-row md:inline-flex md:justify-center ${className}`}
    >
      {buttons?.map((button) => {
        return (
          <Button
            className='mx-[unset] w-full sm:w-[50%] md:w-[unset]'
            key={button?.sys?.id}
            HtmlTag='Link'
            href={button?.url}
            text={button?.text}
            align={button?.align}
            {...getButtonStyleProps(button?.type)}
          />
        );
      })}
    </div>
  );
};

export default ButtonsRenderer;
