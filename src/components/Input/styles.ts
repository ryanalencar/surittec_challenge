/* eslint-disable @typescript-eslint/indent */
import styled from 'styled-components';

export const Input = styled.input<{ hasError: boolean }>`
  width: 100%;
  margin-bottom: 15px;
  padding: 12px 16px;
  outline: none;
  border: 2px solid
    ${({ theme, hasError }) => (hasError ? theme.colors.error : 'transparent')};
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.white};
  transition: border 0.3s ease;
  background-color: ${({ theme }) => theme.colors.grey900};

  &:focus {
    border-color: ${({ theme }) => theme.colors.purpleDark};
  }

  &:disabled {
    opacity: 0.5;
  }
`;

export const InputLabel = styled.label`
  color: ${({ theme }) => theme.colors.text};
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.error};
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
