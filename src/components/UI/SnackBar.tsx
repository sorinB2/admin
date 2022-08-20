import React from 'react';
import { Snackbar, Alert } from '@mui/material';

// Actions
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { closeSnackBar } from '../../features/snackBar/slice';

export const SnackBar = () => {
  const dispatch = useAppDispatch();
  const { snackBarOpen, snackBarSeverity, snackBarText } = useAppSelector(state => state.snackBar);
  const hideSnackBar = () => dispatch(closeSnackBar());

  return (
    <Snackbar open={snackBarOpen} autoHideDuration={3000} onClose={hideSnackBar}>
      <Alert severity={snackBarSeverity}>{snackBarText}</Alert>
    </Snackbar>
  );
};
