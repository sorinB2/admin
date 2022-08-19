import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SnackBar from './components/UI/SnackBar';

// Components
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
      <SnackBar />
    </>
  );
};
