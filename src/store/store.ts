import { configureStore } from '@reduxjs/toolkit';

// Other resources
import { loginReducer } from '../features/login/slice';
import { snackBarReducer } from '../features/snackBar/slice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    snackBar: snackBarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
