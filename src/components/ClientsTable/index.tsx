import React, { useEffect, useState } from 'react';

import { IoMdTrash } from 'react-icons/io';
import { IoPencil } from 'react-icons/io5';
import { useTheme } from 'styled-components';

import { api } from '../../services/api';
import * as S from './styles';

interface ClientsType {
  id: number;
  name: string;
  cpf: string;
  address: {
    zipcode: string;
    street: string;
    district: string;
    city: string;
    state: string;
    complement?: string;
  };
  phone: {
    type: string; // residencial, comercial e celular
    number: string;
  };
  email: string;
}

export default function ClientsTable() {
  const [clients, setClients] = useState<ClientsType[]>([]);
  const theme = useTheme();
  useEffect(() => {
    api.get('clients').then((res) => {
      setClients(res.data.clients);
    });
  }, []);

  return (
    <S.Container>
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
              <S.TableTbodyItem>{phone.number}</S.TableTbodyItem>
              <S.TableTbodyItem>
                {`${address.street} - ${address.district}, ${address.city}-${address.state}, ${address.zipcode}`}
                <br />
                {address.complement}
              </S.TableTbodyItem>
              <S.TableTbodyItem>
                <S.TableTbodyActions>
                  <S.TableActionButton onClick={() => {}}>
                    <IoPencil size={25} color={theme.colors.purpleLight} />
                  </S.TableActionButton>
                  <S.TableActionButton onClick={() => {}}>
                    <IoMdTrash size={25} color={theme.colors.error} />
                  </S.TableActionButton>
                </S.TableTbodyActions>
              </S.TableTbodyItem>
            </tr>
          ))}
        </tbody>
      </S.Table>
    </S.Container>
  );
}
