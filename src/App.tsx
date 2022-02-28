/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';

import { createServer, Model } from 'miragejs';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { AuthProvider } from './hooks/useAuth';
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

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
        <GlobalStyle />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
