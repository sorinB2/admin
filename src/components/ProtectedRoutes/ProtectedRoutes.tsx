import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

// Components
import { LoadingSpinner } from '../UI/LoadingSpinner';

// Actions
import { checkAdmin } from '../../features/admin/slice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

// Other resources
import { STATUS } from '../../constants/statuses';
import { ROUTES } from '../../constants/routes';

export const ProtectedRoutes = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const authToken = sessionStorage.getItem('authToken');
  const { isAdmin, status } = useAppSelector(state => state.admin);
  const isLoading = status === STATUS.PENDING;

  useEffect(() => {
    dispatch(checkAdmin(authToken));
  }, []);

  return isLoading ? (
    <LoadingSpinner />
  ) : isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to={ROUTES.LOGIN} state={{ form: location }} replace />
  );
};
