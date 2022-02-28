import styled from 'styled-components';

export const Button = styled.button`
  height: 2.5rem;
  padding: 0 1.5rem;
  border: 1px solid transparent;
  outline: 0;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.purpleMid};
  color: ${({ theme }) => theme.colors.white};
  font-weight: bold;
  font-size: 0.875rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.purpleLight};
  }
`;
