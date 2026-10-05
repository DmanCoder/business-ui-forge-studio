'use client';
import React from 'react';

import { FormFieldTextPropTypes } from './FormFieldTextArea.types';

const FormFieldText: React.FC<FormFieldTextPropTypes> = ({
  name,
  placeholder,
  value,
  label,
  error,
  onChange,
  disabled,
  id,
  inputClass,
  labelClass,
}) => {
  return (
    <div className='relative mb-[1.6rem] w-full'>
      <label className={labelClass} htmlFor={id}>
        <span className={`mb-[0.6rem] block text-[1.4rem] leading-[2rem] font-medium`}>
          {label}
        </span>
        <textarea
          className={`hover:border-primary block h-[15.4rem] w-full resize-none rounded-[0.8rem] border-[0.1rem] p-[1rem] px-[1.6rem] outline-hidden ${inputClass} ${
            error ? 'border-[red]' : 'border-border'
          }`}
          id={id}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      </label>
      {error && <small className='mb-[-0.8rem] text-[1.3rem] text-[red]'>{error}</small>}
    </div>
  );
};

export default FormFieldText;
