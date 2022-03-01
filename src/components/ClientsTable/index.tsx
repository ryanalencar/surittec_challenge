import React from 'react';

import { IoMdTrash } from 'react-icons/io';
import { IoPencil } from 'react-icons/io5';
import { useTheme } from 'styled-components';

import { useAuth } from '../../hooks/useAuth';
import { useClient } from '../../hooks/useClient';
import { useModal } from '../../hooks/useModal';
import * as S from './styles';

export default function ClientsTable() {
  const { clients } = useClient();
  const { toggleEditModal, toggleRemoveModal } = useModal();
  const { user } = useAuth();
  const theme = useTheme();

  return (
    <S.Container>
      {clients.length < 1 ? (
        <h1>Nenhum cliente registrado</h1>
      ) : (
        <S.Table>
          <thead>
            <tr>
              <S.TableTheadItem>Nome</S.TableTheadItem>
              <S.TableTheadItem>CPF</S.TableTheadItem>
              <S.TableTheadItem>Email</S.TableTheadItem>
              <S.TableTheadItem>Número</S.TableTheadItem>
              <S.TableTheadItem>Endereço</S.TableTheadItem>
              <S.TableTheadItem>Ações</S.TableTheadItem>
            </tr>
          </thead>
          <tbody>
            {clients?.map(({ id, name, cpf, email, phone, address }) => (
              <tr key={id}>
                <S.TableTbodyItem>{name}</S.TableTbodyItem>
                <S.TableTbodyItem>{cpf}</S.TableTbodyItem>
                <S.TableTbodyItem>{email}</S.TableTbodyItem>
                <S.TableTbodyItem>{phone?.number}</S.TableTbodyItem>
                <S.TableTbodyItem>
                  {`${address?.street} - ${address?.district}, ${address?.city}-${address?.state}, ${address?.zipcode}`}
                  <br />
                  {address?.complement}
                </S.TableTbodyItem>
                <S.TableTbodyItem>
                  <S.TableTbodyActions>
                    <S.TableActionButton
                      onClick={() => {
                        toggleEditModal({
                          id,
                          name,
                          cpf,
                          email,
                          phone,
                          address,
                        });
                      }}
                      disabled={user !== 'admin'}>
                      <IoPencil size={25} color={theme.colors.purpleLight} />
                    </S.TableActionButton>
                    <S.TableActionButton
                      onClick={() => {
                        toggleRemoveModal(id);
                      }}
                      disabled={user !== 'admin'}>
                      <IoMdTrash size={25} color={theme.colors.error} />
                    </S.TableActionButton>
                  </S.TableTbodyActions>
                </S.TableTbodyItem>
              </tr>
            ))}
          </tbody>
        </S.Table>
      )}
    </S.Container>
  );
}
