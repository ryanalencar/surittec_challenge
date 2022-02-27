import React from 'react';

import { createServer, Model } from 'miragejs';

import { useLocalStorage } from './hooks/useLocalStorage';
import { api } from './services/api';

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

interface User {
  user: string;
}

function App() {
  const [user, setUser] = useLocalStorage<User>('user', {} as User);
  const handleButtonClick = async () => {
    const response = await api.post('sessions', {
      user: 'admin',
      password: '123456',
    });
    if (response) setUser(response.data.user.user);
  };

  return (
    <button type="button" onClick={handleButtonClick}>
      Surittect Challenge
    </button>
  );
}

export default App;
