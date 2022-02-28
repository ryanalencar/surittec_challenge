import { darken } from 'polished';
import styled, { css } from 'styled-components';

interface IButtonProps {
  colorStyle?: 'primary' | 'success' | 'danger';
}

export const Button = styled.button<IButtonProps>`
  height: 2.5rem;
  padding: 0 1.5rem;
  border: 1px solid transparent;
  outline: 0;
  border-radius: 4px;

  font-weight: bold;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  color: ${({ theme }) => theme.colors.white};

  ${({ theme, colorStyle }) => {
    switch (colorStyle) {
      case 'primary':
        return css`
          background-color: ${theme.colors.purpleMid};
          &:hover {
            background-color: ${theme.colors.purpleDark};
          }
        `;
      case 'danger':
        return css`
          background-color: ${theme.colors.error};
          &:hover {
            background-color: ${darken(0.1, theme.colors.error)};
          }
        `;
      case 'success':
        return css`
          background-color: ${theme.colors.greenLight};
          &:hover {
            background-color: ${theme.colors.greenMid};
          }
        `;
      default:
        break;
    }
  }};
`;
