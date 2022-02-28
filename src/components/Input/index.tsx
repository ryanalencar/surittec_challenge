import React, { InputHTMLAttributes, useEffect, useRef } from 'react';

import { useField } from '@unform/core';

import * as S from './styles';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

export default function Input({ name, label, ...rest }: IInputProps) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue = '', registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);
  return (
    <>
      {label && <S.InputLabel htmlFor={fieldName}>{label}</S.InputLabel>}

      <S.Input
        ref={inputRef}
        id={fieldName}
        defaultValue={defaultValue}
        autoComplete="off"
        {...rest}
      />

      {error && <span style={{ color: '#f00' }}>{error}</span>}
    </>
  );
}
