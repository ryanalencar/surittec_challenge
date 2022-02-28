import React, { useEffect, useRef, useState } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Button from '../components/Button';
import Input from '../components/Input';
import { useAuth, UserSignInType } from '../hooks/useAuth';

export default function Login() {
  const { signIn, signOut } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (
    data: UserSignInType,
    { reset }: { reset: () => void },
  ) => {
    try {
      setIsLoading(true);

      const schema = Yup.object().shape({
        user: Yup.string().required('O usuário é obrigatório'),
        password: Yup.string().required('A senha é obrigatória'),
      });

      await schema.validate(data, { abortEarly: false });

      const response = await signIn(data);
      if (response) reset();
      else {
        formRef?.current?.setErrors({
          user: 'aaaaa',
        });
      }
      setIsLoading(false);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages: any = {};
        err.inner.forEach((error) => {
          console.log(error.path);
          errorMessages[error.path!] = error.message;
        });
        formRef.current?.setErrors(errorMessages);
      }
    }
  };

  useEffect(() => {
    signOut();
  }, []);

  return (
    <Form onSubmit={handleFormSubmit} ref={formRef}>
      <h1>Login</h1>
      <Input
        type="text"
        name="user"
        label="Usuário"
        placeholder="Usuário"
        disabled={isLoading}
      />
      <Input
        type="password"
        name="password"
        label="Senha"
        placeholder="Senha"
        disabled={isLoading}
      />
      <Button loading={isLoading} type="submit" title="Entrar" />
    </Form>
  );
}
