import React from 'react';

import { Scope } from '@unform/core';
import { Form } from '@unform/web';

import { ClientInput, useClient } from '../../hooks/useClient';
import { useModal } from '../../hooks/useModal';
import Button from '../Button';
import Input from '../Input';
import Modal from '../Modal';

export default function ClientModal() {
  const { isModalOpen, toggleModal } = useModal();
  const { createClient } = useClient();

  const handleSubmit = async (
    data: ClientInput,
    { reset }: { reset: () => void },
  ) => {
    createClient(data);
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={toggleModal}
      title="Cadastrar Cliente">
      <Form onSubmit={handleSubmit}>
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
