import React from 'react';

import { Routes, Route } from 'react-router-dom';

import App from './App';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="Home" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
