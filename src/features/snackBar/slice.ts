import { createSlice } from '@reduxjs/toolkit';
import { AlertColor } from '@mui/material';

const initialState = {
  snackBarOpen: false,
  snackBarSeverity: 'error' as AlertColor,
  snackBarText: '',
};

export const snackBarSlice = createSlice({
  name: 'snackBar',
  initialState,
  reducers: {
    errorSnackBar: (state, action) => {
      state.snackBarOpen = true;
      state.snackBarSeverity = 'error';
      state.snackBarText = action.payload;
    },
    successSnackBar: (state, action) => {
      state.snackBarOpen = true;
      state.snackBarSeverity = 'success';
      state.snackBarText = action.payload;
    },
    warningSnackBar: (state, action) => {
      state.snackBarOpen = true;
      state.snackBarSeverity = 'warning';
      state.snackBarText = action.payload;
    },
    infoSnackBar: (state, action) => {
      state.snackBarOpen = true;
      state.snackBarSeverity = 'info';
      state.snackBarText = action.payload;
    },
    closeSnackBar: state => {
      state.snackBarOpen = false;
    },
  },
});

export const { errorSnackBar, successSnackBar, warningSnackBar, infoSnackBar, closeSnackBar } = snackBarSlice.actions;

export const snackBarReducer = snackBarSlice.reducer;
