import React from 'react';

import Button from '../../components/Button';
import ClientModal from '../../components/ClientModal';
import ClientsTable from '../../components/ClientsTable';
import { useAuth } from '../../hooks/useAuth';
import { useModal } from '../../hooks/useModal';
import * as S from './styles';

export default function Home() {
  const { toggleModal } = useModal();
  const { user, signOut } = useAuth();

  return (
    <S.Container>
      <S.Header>
        <h1>Home Page</h1>
        <S.UserInfo>
          <h3>Usuário: {user}</h3>
          <h6>
            {user === 'admin'
              ? 'Permissão para todas as ações'
              : 'Permissão apenas para visualização'}
          </h6>
        </S.UserInfo>
        <S.HeaderButtons>
          <Button
            title="Cadastrar cliente"
            disabled={user !== 'admin'}
            onClick={() => {
              toggleModal();
            }}
          />
          <Button title="Deslogar" colorStyle="danger" onClick={signOut} />
        </S.HeaderButtons>
      </S.Header>
      <ClientsTable />
      <ClientModal />
    </S.Container>
  );
}
