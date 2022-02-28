import React from 'react';

import { Routes, Route } from 'react-router-dom';

import RequireAuth from './components/common/RequireAuth';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="Home"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
