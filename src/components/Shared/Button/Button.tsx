import React from 'react';

import NextLink from '@src/components/Shared/NextLink';

import ArrowPlain from '@src/components/Icons/ArrowPlain';

import { ButtonPropTypes } from './Button.types';

const Button: React.FC<ButtonPropTypes> = ({
  className = '',
  primary,
  secondary,
  tertiary,
  reversed = false,
  text,
  ariaLabel,
  align = 'center',
  onClick,
  HtmlTag = 'button',
  href,
  children,
}) => {
  const buttonColorClass = primary
    ? 'cursor-pointer bg-primary text-background-primary! font-semibold text-[1.6rem leading-[2.4rem] px-[3.2rem] py-[1.2rem] rounded-[0.8rem] block md:hover:brightness-[1.2]'
    : secondary
      ? 'cursor-pointer border-[0.1rem] border-border font-semibold text-[1.6rem leading-[2.4rem] px-[3.2rem] py-[1.2rem] rounded-[0.8rem] block md:hover:brightness-[1.05]! no-underline'
      : tertiary
        ? 'cursor-pointer font-semibold text-primary! inline-flex items-center md:hover:brightness-[1.2]'
        : '';

  const alignmentClass =
    align === 'center'
      ? 'mx-auto'
      : align === 'left'
        ? 'mr-auto'
        : align === 'right'
          ? 'ml-auto'
          : '';

  const buttonClass = `no-underline! ${buttonColorClass} ${alignmentClass} ${className}`;

  // The properties for the button or anchor element
  const commonProps = {
    'aria-label': text,
    className: buttonClass,
  };

  // Decide which component to render based on HtmlTag
  switch (HtmlTag) {
    case 'Link':
      // Ensure Link has the required 'href' prop
      return (
        <NextLink
          href={href!}
          ariaLabel={ariaLabel}
          className={`${buttonClass} ${reversed ? '[&>span]:order-1' : ''}`}
        >
          {text ? <span>{text}</span> : children}
          {text && tertiary && (
            <ArrowPlain
              className={`-rotate-45 stroke-3 ${
                reversed ? 'mr-[1rem] rotate-[-135deg]' : 'ml-[1rem]'
              }`}
            />
          )}
        </NextLink>
      );
    case 'button':
      // Ensure button has the required 'onClick' handler
      return (
        <button {...commonProps} onClick={onClick}>
          {text ? <span>{text}</span> : children}
          {text && tertiary && <ArrowPlain className='ml-[1rem] -rotate-45 stroke-3' />}
        </button>
      );
    default:
      return null; // Or handle this case as you see fit
  }
};

export default Button;
