import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { FormHandles, Scope } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { ClientInput, useClient } from '../../hooks/useClient';
import { useModal } from '../../hooks/useModal';
import { FormInputWrapper } from '../../pages/Login/styles';
import Button from '../Button';
import Input from '../Input';
import MaskInput from '../Input/MaskInput';
import Radio, { RadioOptions } from '../Input/Radio';
import Modal from '../Modal';

type PhoneMask = 'residencial' | 'comercial' | 'celular';

interface AddressData {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export default function ClientModal() {
  const { isModalOpen, toggleModal, modalData } = useModal();
  const { deleting, editing, data } = modalData;
  const { createClient, removeClient, editClient } = useClient();
  const [modalTitle, setModalTitle] = useState('');
  const [selectedMask, setSelectedMask] = useState('');
  const [addressData, setAddressData] = useState<AddressData>(
    {} as AddressData,
  );
  const { bairro, complemento, logradouro, uf, localidade } = addressData;
  const formRef = useRef<FormHandles>(null);
  const radioOptions: RadioOptions[] = [
    { id: 'residencial', value: 'residencial', label: 'Residencial' },
    { id: 'comercial', value: 'comercial', label: 'Comercial' },
    { id: 'celular', value: 'celular', label: 'Celular' },
  ];

  const handleSubmit = async (
    _data: ClientInput,
    { reset }: { reset: () => void },
  ) => {
    try {
      const formattedPhone = _data.phone.number.replace(/[^\d]/g, '');
      const formattedCpf = _data.cpf.replace(/[^\d]/g, '');
      const formattedEmail = _data.email.includes(';')
        ? String(_data.email).split(';')
        : _data.email;

      const schema = Yup.object().shape({
        name: Yup.string()
          .required('O usu??rio ?? obrigat??rio')
          .min(3, 'O nome precisa ter no m??nimo 3 caracteres')
          .max(100),
        cpf: Yup.string().required('O CPF ?? obrigat??rio'),
        email: Yup.string().required('O email ?? obrigat??ria'),

        address: Yup.object().shape({
          zipcode: Yup.string().required('O CEP ?? obrigat??rio'),
          street: Yup.string().required('O logradouro ?? obrigat??rio'),
          district: Yup.string().required('O bairro ?? obrigat??rio'),
          city: Yup.string().required('A cidade ?? obrigat??ria'),
          state: Yup.string().required('O estado ?? obrigat??rio'),
        }),

        phone: Yup.object().shape({
          type: Yup.string().required('O tipo de telefone ?? obrigat??rio'),
          number: Yup.string().required('O n??mero de telefone ?? obrigat??rio'),
        }),
      });

      await schema.validate(_data, { abortEarly: false });

      const formattedData: ClientInput = {
        ..._data,
        phone: { number: formattedPhone, type: _data.phone.type },
        cpf: formattedCpf,
        email: formattedEmail,
      };

      if (editing === true && deleting === false) {
        await editClient({ ...formattedData, id: data?.id || 0 });
      } else {
        await createClient(formattedData);
      }

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

  const handleDelete = (id: number) => {
    removeClient(id);
    toggleModal();
  };

  const handleSelectedMask = () => {
    const mask: PhoneMask = (
      document?.querySelector('input[name="type"]:checked') as HTMLInputElement
    )?.value as PhoneMask;
    if (mask === 'residencial') {
      setSelectedMask('9999-9999');
    } else if (mask === 'comercial') {
      setSelectedMask('(99)99999-9999');
    } else {
      setSelectedMask('(99)99999-9999');
    }
  };

  useEffect(() => {
    if (editing) {
      setModalTitle('Editar Cliente');
    }
    if (deleting) {
      setModalTitle('Remover Cliente');
    } else {
      setModalTitle('Cadastrar Cliente');
    }
  }, [editing, deleting]);

  const handleCepSearch = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const formattedCep = e.target.value.replace(/[^\d]/g, '');
      if (e.target.value.includes('_') === false) {
        fetch(`https://viacep.com.br/ws/${formattedCep}/json/`)
          .then((res) => res.json())
          .then((_data) => setAddressData(_data));
      } else {
        setAddressData({} as AddressData);
      }
    },
    [],
  );

  return (
    <Modal isOpen={isModalOpen} onRequestClose={toggleModal} title={modalTitle}>
      <Form initialData={data} onSubmit={handleSubmit} ref={formRef}>
        {deleting ? (
          <>
            <h1>Certeza que deseja remover a transa????o {data?.id} ?</h1>
            <Button
              title="Remover Cliente"
              colorStyle="danger"
              type="button"
              onClick={() => handleDelete(data?.id || 0)}
            />
          </>
        ) : (
          <>
            <FormInputWrapper>
              <Input label="Nome" name="name" />
              <MaskInput label="CPF" name="cpf" mask="999.999.999-99" />
              <Input
                type="text"
                label={'Email(se + de 1, separar com ";")'}
                name="email"
              />
              <Scope path="address">
                <MaskInput
                  label="CEP"
                  name="zipcode"
                  mask="99999-999"
                  onChange={(e) => {
                    handleCepSearch(e);
                  }}
                />
                <Input
                  label="Endere??o"
                  name="street"
                  defaultValue={logradouro}
                />
                <Input label="Bairro" name="district" defaultValue={bairro} />
                <Input label="Cidade" name="city" defaultValue={localidade} />
                <Input label="UF" name="state" defaultValue={uf} />
                <Input
                  label="Complemento"
                  name="complement"
                  defaultValue={complemento}
                />
              </Scope>
              <Scope path="phone">
                <h3>Tipo de telefone</h3>
                <Radio
                  onChange={handleSelectedMask}
                  options={radioOptions}
                  name="type"
                />
                <MaskInput
                  label="N??mero de telefone"
                  name="number"
                  mask={selectedMask}
                />
              </Scope>
            </FormInputWrapper>
            <Button title="Cadastrar" full />
          </>
        )}
      </Form>
    </Modal>
  );
}
