import React, { useEffect, useRef, useState } from 'react';

import { FormHandles } from '@unform/core';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth, UserSignInType } from '../../hooks/useAuth';
import * as S from './styles';

export default function Login() {
  const { signIn, signOut } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
      setIsLoading(false);
      if (response) {
        reset();
        navigate('/home', { replace: true });
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages: any = {};
        err.inner.forEach((error) => {
          errorMessages[error.path!] = error.message;
        });
        formRef.current?.setErrors(errorMessages);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    signOut();
  }, []);

  return (
    <S.Form onSubmit={handleFormSubmit} ref={formRef}>
      <S.FormTitle>Login</S.FormTitle>
      <S.FormInputWrapper>
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
      </S.FormInputWrapper>
      <Button disabled={isLoading} type="submit" title="Entrar" />
    </S.Form>
  );
}
