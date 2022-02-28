import React, { createContext, ReactNode, useContext, useMemo } from 'react';

import { api } from '../services/api';
import { useLocalStorage } from './useLocalStorage';

interface AuthContextType {
  user: any;
  signIn: (
    user: { user: string; password: string },
    callback?: VoidFunction,
  ) => void;
  signOut: (callback?: VoidFunction) => void;
}

interface User {
  user: string;
}

interface UserSignInType {
  user: string;
  password: string;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useLocalStorage<User>('user', {} as User);

  const signIn = async (_user: UserSignInType, callback?: VoidFunction) => {
    const response = await api.post('sessions', _user);
    if (response) setUser(response.data.user.user);
    if (callback) callback();
  };

  const signOut = (callback?: VoidFunction) => {
    setUser({ user: '' });
    if (callback) callback();
  };

  const value = useMemo(
    () => ({ user, signIn, signOut }),
    [user, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
