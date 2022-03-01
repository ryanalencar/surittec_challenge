import React, { useRef } from 'react';

import { FormHandles, Scope } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { ClientInput, useClient } from '../../hooks/useClient';
import { useModal } from '../../hooks/useModal';
import { FormInputWrapper } from '../../pages/Login/styles';
import Button from '../Button';
import Input from '../Input';
import Modal from '../Modal';

export default function ClientModal() {
  const { isModalOpen, toggleModal } = useModal();
  const { createClient } = useClient();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = async (
    data: ClientInput,
    { reset }: { reset: () => void },
  ) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string()
          .required('O usuário é obrigatório')
          .min(3, 'O nome precisa ter no mínimo 3 caracteres')
          .max(100),
        cpf: Yup.string().required('O CPF é obrigatório'),
        email: Yup.string()
          .required('A senha é obrigatória')
          .email('O email deve estar no formato correto.'),

        address: Yup.object().shape({
          zipcode: Yup.string().required('O CEP é obrigatório'),
          street: Yup.string().required('O logradouro é obrigatório'),
          district: Yup.string().required('O bairro é obrigatório'),
          city: Yup.string().required('A cidade é obrigatória'),
          state: Yup.string().required('O estado é obrigatório'),
        }),

        phone: Yup.object().shape({
          type: Yup.string().required('A senha é obrigatória'),
          number: Yup.string().required('A senha é obrigatória'),
        }),
      });

      await schema.validate(data, { abortEarly: false });

      createClient(data);
      toggleModal();
      reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages: any = {};
        err.inner.forEach((error) => {
          errorMessages[error.path!] = error.message;
        });
        formRef.current?.setErrors(errorMessages);
      }
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={toggleModal}
      title="Cadastrar Cliente">
      <Form onSubmit={handleSubmit} ref={formRef}>
        <FormInputWrapper>
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
        </FormInputWrapper>
        <Button title="Cadastrar" full />
      </Form>
    </Modal>
  );
}
