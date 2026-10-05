'use client';
import React from 'react';

import { FormFieldTextPropTypes } from './FormFieldText.types';

const FormFieldText: React.FC<FormFieldTextPropTypes> = ({
  className = '',
  name,
  placeholder,
  value,
  min,
  max,
  label,
  error,
  type,
  onChange,
  disabled,
  id,
  inputClass,
  labelClass,
}) => {
  return (
    <div className={`relative mb-[1.6rem] w-full ${className}`}>
      <label className={labelClass} htmlFor={id}>
        <span className={`mb-[0.6rem] block text-[1.4rem] leading-[2rem] font-medium`}>
          {label}
        </span>
        <input
          className={`hover:border-primary focus:outline-primary active:border-primary block w-full rounded-[0.8rem] border-[0.1rem] px-[1.8rem] py-[1.2rem] leading-[2.4rem] ${inputClass} ${
            error ? 'border-[red]' : 'border-border'
          } ${value ? 'font-[400] text-[#000]' : 'font-light italic'}`}
          id={id}
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          min={min}
          max={max}
          onChange={onChange}
          disabled={disabled}
        />
      </label>
      {error && <small className='mb-[-0.8rem] text-[1.3rem] text-[red]'>{error}</small>}
    </div>
  );
};

export default FormFieldText;
