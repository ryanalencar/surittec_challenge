/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';

import { createServer, Model } from 'miragejs';
import Modal from 'react-modal';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { AuthProvider } from './hooks/useAuth';
import { ModalProvider } from './hooks/useModal';
import { AppRoutes } from './routes';
import { GlobalStyle } from './styles/global';
import { theme } from './styles/theme';

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
      clients: [
        {
          id: 1,
          name: 'ryan',
          cpf: '12345678901',
          address: {
            street: 'Rua Tibúrcio Cavalcante 2570',
            zipcode: '60125101',
            district: 'Dionísio Torres',
            city: 'Fortaleza',
            state: 'CE',
            complement: 'Apto 302',
          },
          phone: {
            type: 'residencial', // residencial, comercial e celular
            number: '123456',
          },
          email: 'ryan@gmail.com',
        },
      ],
    });
  },
  routes() {
    this.namespace = 'api';
    this.post('/sessions', (schema: any, request) => {
      const { user, password } = JSON.parse(request.requestBody);
      const response = schema.users.findBy({ user, password });
      return response || null;
    });
    this.get('clients', () => this.schema.all('client'));
  },
});

Modal.setAppElement('#root');

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ModalProvider>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
          <GlobalStyle />
        </ModalProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
