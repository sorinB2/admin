import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Components
import { CounterPage } from './pages/CounterPage';
import { HomePage } from './pages/HomePage';

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/counter" element={<CounterPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
