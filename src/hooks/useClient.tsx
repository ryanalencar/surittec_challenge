import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
} from 'react';

import { api } from '../services/api';
import { useLocalStorage } from './useLocalStorage';

interface ClientProviderProps {
  children: ReactNode;
}

interface ClientContextProps {
  clients: ClientType[];
  createClient: (data: ClientInput) => Promise<void>;
  editClient: (data: ClientType) => Promise<void>;
  removeClient: (id: number) => Promise<void>;
}

export interface ClientType {
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

export type ClientInput = Omit<ClientType, 'id'>;

const ClientContext = createContext<ClientContextProps>(
  {} as ClientContextProps,
);

export function ClientProvider({ children }: ClientProviderProps) {
  const [clients, setClients] = useLocalStorage<ClientType[]>('clients', []);

  useEffect(() => {
    api.get('clients').then((res) => setClients(res.data.clients));
  }, []);

  async function createClient(data: ClientInput) {
    const response = await api.post('clients', data);
    setClients([...clients, response.data.client]);
  }

  async function editClient(client: ClientType) {
    const response = await api.put(`/clients/${client.id}`, client);
    const newTransactions = clients.map((_client) =>
      _client.id === client.id
        ? { ..._client, ...response.data.client }
        : _client,
    );
    setClients(newTransactions);
  }

  async function removeClient(id: number) {
    const response = await api.delete(`/clients/${id}`);
    if (response) {
      const newTransactions = clients.filter((_client) => _client.id !== id);
      setClients(newTransactions);
    }
  }

  const providerValue = useMemo(
    () => ({ clients, createClient, editClient, removeClient }),
    [clients, createClient, editClient, removeClient],
  );

  return (
    <ClientContext.Provider value={providerValue}>
      {children}
    </ClientContext.Provider>
  );
}

export function useClient() {
  const context = useContext(ClientContext);
  return context;
}
