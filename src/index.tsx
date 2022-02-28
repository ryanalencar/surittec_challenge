import React from 'react';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from './hooks/useAuth';
import { AppRoutes } from './routes';

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
