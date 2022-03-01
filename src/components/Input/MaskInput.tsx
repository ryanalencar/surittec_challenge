import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react';

import { useField } from '@unform/core';

import * as S from './styles';

interface IMaskInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  mask: string;
}

export default function MaskInput({
  name,
  label,
  mask,
  ...rest
}: IMaskInputProps) {
  const inputRef = useRef(null);
  const [hasError, setHasError] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const {
    fieldName,
    defaultValue = '',
    registerField,
    error,
    clearError,
  } = useField(name);

  useEffect(() => {
    if (error) setHasError(error?.length > 0);
    if (hasFocus) {
      clearError();
      setHasError(false);
    }
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField, error, hasFocus]);

  return (
    <>
      {label && <S.InputLabel htmlFor={fieldName}>{label}</S.InputLabel>}

      <S.InputWrapper>
        <S.InputMask
          hasError={hasError}
          mask={mask}
          ref={inputRef}
          id={fieldName}
          defaultValue={defaultValue}
          autoComplete="off"
          onFocus={() => setHasFocus(true)}
          onBlur={() => setHasFocus(false)}
          {...rest}
        />
      </S.InputWrapper>

      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
    </>
  );
}
