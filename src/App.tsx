/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';

import { createServer, Model } from 'miragejs';
import Modal from 'react-modal';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { AuthProvider } from './hooks/useAuth';
import { ClientProvider } from './hooks/useClient';
import { ModalProvider } from './hooks/useModal';
import { AppRoutes } from './routes';
import { GlobalStyle } from './styles/global';
import { theme } from './styles/theme';

const clients = JSON.parse(window.localStorage.getItem('clients')!);

createServer({
  models: {
    user: Model,
    client: Model,
  },
  seeds(server) {
    server.db.loadData({
      users: [
        { id: 1, user: 'admin', password: '123456' },
        { id: 2, user: 'comum', password: '123456' },
      ],
      clients,
    });
  },
  routes() {
    this.namespace = 'api';
    this.post('/sessions', (schema: any, request) => {
      const { user, password } = JSON.parse(request.requestBody);
      const response = schema.users.findBy({ user, password });
      return response || null;
    });
    this.get('/clients', (schema: any) => schema.clients.all());
    this.post('/clients', (schema, request) => {
      const data = JSON.parse(request.requestBody);
      return schema.db.clients.insert(data);
    });
    this.put('/clients/:id', (schema: any, request) => {
      const data = JSON.parse(request.requestBody);
      const { id } = request.params;
      const client = schema.clients.find(id);
      return client.update(data);
    });
    this.delete('/clients/:id', (schema: any, request) => {
      const { id } = request.params;
      return schema.clients.find(id).destroy();
    });
  },
});

Modal.setAppElement('#root');

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ClientProvider>
          <ModalProvider>
            <AuthProvider>
              <AppRoutes />
            </AuthProvider>
            <GlobalStyle />
          </ModalProvider>
        </ClientProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
