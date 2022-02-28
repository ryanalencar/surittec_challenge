import React, { ReactNode } from 'react';

import closeImg from '../../assets/close.svg';
import * as S from './styles';

interface IModalProps {
  title: string;
  isOpen: boolean;
  onRequestClose: () => void;
  children: ReactNode;
}

export default function Modal({
  isOpen,
  onRequestClose,
  title,
  children,
  ...rest
}: IModalProps) {
  const CLOSE_TIMEOUT_MODAL = 300;
  return (
    <S.Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      closeTimeoutMS={CLOSE_TIMEOUT_MODAL}
      {...rest}>
      <S.ModalCloseButton onClick={onRequestClose}>
        <img src={closeImg} alt="Close Modal" />
      </S.ModalCloseButton>
      <S.ModalTitle>{title}</S.ModalTitle>
      {children}
    </S.Modal>
  );
}
