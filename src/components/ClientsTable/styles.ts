import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 4rem;
`;

export const Table = styled.table`
  width: 100%;
  border-spacing: 0 0.5rem;
`;

export const TableTheadItem = styled.th`
  color: ${({ theme }) => theme.colors.purpleMid};
  font-weight: 400;
  padding: 1rem 2rem;
  text-align: left;
  line-height: 1.5rem;
`;

export const TableTbodyItem = styled.td`
  padding: 1rem 2rem;
  border: 0;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.grey600};
  border-radius: 1px;

  &:first-child {
    font-weight: bold;
  }
`;

export const TableTbodyActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TableActionButton = styled.button`
  border: 0;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const EmailInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;
