import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

// Components
import { LoginPage } from './pages/LoginPage';
import { Dashboard } from './pages/Dashboard';
import { Customers } from './pages/Customers';
import { Products } from './pages/Products';
import { Sales } from './pages/Sales';
import { ProtectedRoutes } from './components/ProtectedRoutes/ProtectedRoutes';
import { SnackBar } from './components/UI/SnackBar';
import { MainLayout } from './layouts/MainLayout';
import { AddNewProduct } from './pages/AddNewProduct';
import { Production } from './pages/Production';
import { AddNewCustomer } from './pages/AddNewCustomer';
import { AddNewSale } from './pages/AddNewSale';
import { EditCustomer } from './pages/EditCustomer';

// Actions
import { useAppDispatch } from './hooks/reduxHooks';
import { errorSnackBar } from './features/snackBar/slice';

// Other resources
import { ROUTES } from './constants/routes';

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!navigator.onLine) dispatch(errorSnackBar('Network request failed'));
  }, [navigator.onLine]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route element={<ProtectedRoutes />}>
            <Route element={<MainLayout />}>
              <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.DASHBOARD} />} />
              <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
              <Route path={ROUTES.CUSTOMERS} element={<Customers />} />
              <Route path={ROUTES.ADD_NEW_CUSTOMER} element={<AddNewCustomer />} />
              <Route path={ROUTES.EDIT_CUSTOMER} element={<EditCustomer />} />
              <Route path={ROUTES.PRODUCTS} element={<Products />} />
              <Route path={ROUTES.ADD_NEW_PRODUCT} element={<AddNewProduct />} />
              <Route path={ROUTES.SALES} element={<Sales />} />
              <Route path={ROUTES.ADD_NEW_SALE} element={<AddNewSale />} />
              <Route path={ROUTES.PRODUCTION} element={<Production />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <SnackBar />
    </>
  );
};
