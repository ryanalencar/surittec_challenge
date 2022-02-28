import ReactModal from 'react-modal';
import styled from 'styled-components';

export const Modal = styled(ReactModal).attrs(({ theme }) => ({
  style: {
    overlay: {
      backgroundColor: theme.colors.background,
      position: 'fixed',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,

      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      width: '100%',
      maxWidth: '567px',
      backgroundColor: theme.colors.background,
      padding: '3rem',
      position: 'relative',
      borderRadius: 4,
    },
  },
}))``;

export const ModalTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

export const ModalCloseButton = styled.button`
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;

  border: 0;
  background: transparent;

  transition: all ease 0.3s;

  &:hover {
    filter: brightness(0.7);
    transform: scale(1.02);
  }
`;
