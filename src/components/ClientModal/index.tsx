import React from 'react';

import { Scope } from '@unform/core';
import { Form } from '@unform/web';

import { UserSignInType } from '../../hooks/useAuth';
import { useModal } from '../../hooks/useModal';
import Button from '../Button';
import Input from '../Input';
import Modal from '../Modal';

export default function ClientModal() {
  const { isModalOpen, toggleModal } = useModal();

  const handleSubmit = async (
    data: UserSignInType,
    { reset }: { reset: () => void },
  ) => {};

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={toggleModal}
      title="Cadastrar Cliente">
      <Form>
        <Input label="Nome" name="name" />
        <Input label="CPF" name="cpf" />
        <Input type="email" label="Email" name="email" />
        <Scope path="address">
          <Input label="CEP" name="zipcode" />
          <Input label="Endereço" name="street" />
          <Input label="Bairro" name="district" />
          <Input label="Cidade" name="city" />
          <Input label="Estado" name="state" />
          <Input label="Complemento" name="complement" />
        </Scope>
        <Scope path="phone">
          <Input label="Tipo de telefone" name="type" />
          <Input label="Número de telefone" name="number" />
        </Scope>
        <Button title="Cadastrar" />
      </Form>
    </Modal>
  );
}
