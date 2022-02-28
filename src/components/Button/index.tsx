import React, { ButtonHTMLAttributes } from 'react';

import * as S from './styles';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  loading?: boolean;
  colorStyle?: 'primary' | 'success' | 'danger';
}

export default function Button({
  title,
  loading,
  colorStyle = 'success',
  ...rest
}: IButtonProps) {
  return (
    <S.Button colorStyle={colorStyle} {...rest}>
      {title}
    </S.Button>
  );
}
