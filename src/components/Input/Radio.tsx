import React, { InputHTMLAttributes, useEffect, useRef } from 'react';

import { useField } from '@unform/core';

type RadioOptions = {
  id: string;
  value: string;
  label: string;
};

interface IRadioProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  options: RadioOptions[];
}

export default function Radio({ name, options, ...rest }: IRadioProps) {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const { fieldName, registerField, defaultValue } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs.current,
      getValue: (refs: HTMLInputElement[]) =>
        refs.find((ref) => ref.checked)?.value || '',
      setValue: (refs: HTMLInputElement[], id: string) => {
        const inputRef = refs.find((ref) => ref.id === id);
        if (inputRef) inputRef.checked = true;
      },
      clearValue: (refs: HTMLInputElement[]) => {
        const inputRef = refs.find((ref) => ref.checked === true);
        if (inputRef) inputRef.checked = false;
      },
    });
  }, [defaultValue, fieldName, registerField]);

  return (
    <>
      {options.map((option, index) => (
        <label htmlFor={option.id} key={option.id}>
          <input
            ref={(ref) => {
              if (ref) inputRefs.current[index] = ref;
            }}
            id={option.id}
            type="radio"
            name={name}
            defaultChecked={defaultValue.includes(option.id)}
            value={option.value}
            {...rest}
          />
          {option.label}
        </label>
      ))}
    </>
  );
}
