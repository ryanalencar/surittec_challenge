import React, { ButtonHTMLAttributes } from 'react';

import * as S from './styles';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  loading?: boolean;
}

export default function Button({ title, loading, ...rest }: IButtonProps) {
  return (
    <S.Button disabled={loading} {...rest}>
      {title}
    </S.Button>
  );
}
