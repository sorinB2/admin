import { configureStore } from '@reduxjs/toolkit';

// Other resources
import { loginReducer } from '../features/login/slice';
import { snackBarReducer } from '../features/snackBar/slice';
import { adminReducer } from '../features/admin/slice';
import { newProductReducer } from '../features/newProduct/slice';
import { allProductsReducer } from '../features/allProducts/slice';
import { newCustomerReducer } from '../features/newCustomer/slice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    snackBar: snackBarReducer,
    admin: adminReducer,
    newProduct: newProductReducer,
    allProducts: allProductsReducer,
    newCustomer: newCustomerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
