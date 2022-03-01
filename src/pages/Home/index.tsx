import React from 'react';

import Button from '../../components/Button';
import ClientModal from '../../components/ClientModal';
import ClientsTable from '../../components/ClientsTable';
import { useModal } from '../../hooks/useModal';
import * as S from './styles';

export default function Home() {
  const { toggleModal } = useModal();

  return (
    <S.Container>
      <S.Header>
        <h1>Home Page</h1>
        <Button title="Cadastrar cliente" onClick={toggleModal} />
      </S.Header>
      <ClientsTable />
      <ClientModal />
    </S.Container>
  );
}
