import { configureStore } from '@reduxjs/toolkit';

// Other resources
import { loginReducer } from '../features/login/slice';
import { snackBarReducer } from '../features/snackBar/slice';
import { adminReducer } from '../features/admin/slice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    snackBar: snackBarReducer,
    admin: adminReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
