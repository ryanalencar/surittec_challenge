import React from 'react';

import Button from '../../components/Button';
import ClientsTable from '../../components/ClientsTable';
import * as S from './styles';

export default function Home() {
  return (
    <S.Container>
      <S.Header>
        <h1>Home Page</h1>
        <Button title="Cadastrar cliente" />
      </S.Header>
      <ClientsTable />
    </S.Container>
  );
}
