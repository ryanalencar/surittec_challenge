import React from 'react';

import ClientsTable from '../../components/ClientsTable';
import * as S from './styles';

export default function Home() {
  return (
    <S.Container>
      <h1>Home Page</h1>
      <ClientsTable />
    </S.Container>
  );
}
