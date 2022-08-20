import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Components
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { ProtectedRoutes } from './components/ProtectedRoutes/ProtectedRoutes';
import SnackBar from './components/UI/SnackBar';
import { MainLayout } from './layouts/MainLayout';

// Other resources
import { ROUTES } from './constants/routes';

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route element={<ProtectedRoutes />}>
            <Route element={<MainLayout />}>
              <Route path={ROUTES.HOME} element={<HomePage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <SnackBar />
    </>
  );
};
