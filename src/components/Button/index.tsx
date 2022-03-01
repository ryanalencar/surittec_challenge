import React, { ButtonHTMLAttributes } from 'react';

import * as S from './styles';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  loading?: boolean;
  colorStyle?: 'primary' | 'success' | 'danger';
  full?: boolean;
}

export default function Button({
  title,
  loading,
  colorStyle = 'success',
  full = false,
  ...rest
}: IButtonProps) {
  return (
    <S.Button colorStyle={colorStyle} full={full} {...rest}>
      {title}
    </S.Button>
  );
}
