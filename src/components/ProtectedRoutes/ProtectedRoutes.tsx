import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

// Actions
import { checkAdmin } from '../../features/admin/slice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { STATUS } from '../../constants/statuses';
import { CircularProgress } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const ProtectedRoutes = () => {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const authToken = sessionStorage.getItem('authToken');
  const { isAdmin, status } = useAppSelector(state => state.admin);
  const isLoading = status === STATUS.PENDING;

  useEffect(() => {
    dispatch(checkAdmin(authToken));
  }, []);

  return isLoading ? (
    <CircularProgress className={classes.spinner} />
  ) : isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ form: location }} replace />
  );
};

const useStyles = makeStyles()(() => ({
  spinner: {
    zIndex: '10',
    position: 'absolute',
    bottom: 'calc(50vh - 20px)',
    right: 'calc(50vw - 20px)',
  },
}));
