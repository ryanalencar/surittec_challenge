import React from 'react';

import { createServer, Model } from 'miragejs';

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
  // const handleFormSubmit = async (e: FormEvent) => {
  //   e.preventDefault();
  //   const response = await api.post('sessions', {
  //     user: 'admin',
  //     password: '123456',
  //   });
  //   if (response) setUser(response.data.user.user);
  // };

  return (
    <>
      <h1>Login Page</h1>
      <form onSubmit={() => {}}>
        <input type="text" placeholder="Usuário" />
        <input type="password" placeholder="Senha" />
        <button type="submit">Entrar</button>
      </form>
    </>
  );
}

export default App;
