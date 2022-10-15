import { configureStore } from '@reduxjs/toolkit';

// Other resources
import { loginReducer } from '../features/login/slice';
import { snackBarReducer } from '../features/snackBar/slice';
import { adminReducer } from '../features/admin/slice';
import { newProductReducer } from '../features/newProduct/slice';
import { allProductsReducer } from '../features/allProducts/slice';
import { newCustomerReducer } from '../features/newCustomer/slice';
import { allCustomersReducer } from '../features/allCustomers/slice';
import { newSaleReducer } from '../features/newSale/slice';
import { allSalesReducer } from '../features/allSales/slice';
import { editCustomerReducer } from '../features/editCustomer/slice';
import { deleteCustomerReducer } from '../features/deleteCustomer/slice';
import { deleteSaleReducer } from '../features/deleteSale/slice';
import { newProductionReducer } from '../features/newProduction/slice';
import { allProductionReducer } from '../features/allProduction/slice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    snackBar: snackBarReducer,
    admin: adminReducer,
    newProduct: newProductReducer,
    allProducts: allProductsReducer,
    newCustomer: newCustomerReducer,
    allCustomers: allCustomersReducer,
    editCustomer: editCustomerReducer,
    deleteCustomer: deleteCustomerReducer,
    newSale: newSaleReducer,
    allSales: allSalesReducer,
    deleteSale: deleteSaleReducer,
    newProduction: newProductionReducer,
    allProduction: allProductionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
