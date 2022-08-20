import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Components
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { ProtectedRoutes } from './components/ProtectedRoutes/ProtectedRoutes';
import SnackBar from './components/UI/SnackBar';

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <SnackBar />
    </>
  );
};
