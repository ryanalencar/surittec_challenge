import React, { createContext, ReactNode, useContext, useMemo } from 'react';

import { api } from '../services/api';
import { useLocalStorage } from './useLocalStorage';

interface AuthContextType {
  user: any;
  signIn: (user: string, callback: VoidFunction) => void;
  signOut: (callback: VoidFunction) => void;
}

interface User {
  user: string;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useLocalStorage<User>('user', {} as User);

  const signIn = async (_user: string, callback: VoidFunction) => {
    const response = await api.post('sessions', _user);
    if (response) setUser(response.data.user.user);
    callback();
  };

  const signOut = (callback: VoidFunction) => {
    setUser({ user: '' });
    callback();
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
