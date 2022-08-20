import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

// Components
import { LoginPage } from '../../pages/LoginPage';

// Actions
import { checkAdmin } from '../../features/admin/slice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

export const ProtectedRoutes = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authToken = sessionStorage.getItem('authToken');
  dispatch(checkAdmin(authToken));
  const isAdmin = useAppSelector(state => state.admin.isAdmin);

  useEffect(() => {
    if (!isAdmin) navigate('/login');
  }, [isAdmin]);

  return isAdmin ? <Outlet /> : <LoginPage />;
};
