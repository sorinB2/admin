import { createSlice } from '@reduxjs/toolkit';

// Other resources
import { NewProduction } from '../../types/types';

const initialState: NewProduction = {
  status: '',
  error: '',
  selectedProducts: [],
  production: {
    date: new Date().toString(),
    products: [{ product: '', units: '', id: '' }],
  },
};

const newProductionSlice = createSlice({
  name: 'newProduction',
  initialState,
  reducers: {
    setDate: (state, action) => {
      state.production.date = action.payload;
    },
    setSelectedProducts: (state, action) => {
      state.selectedProducts = action.payload;
    },
    setProductType: (state, action) => {
      state.production.products[action.payload.i].product = action.payload.value;
    },
    setProductId: (state, action) => {
      state.production.products[action.payload.i].id = action.payload.value;
    },
    setProductUnits: (state, action) => {
      state.production.products[action.payload.i].units = action.payload.value;
    },
    addProduct: state => {
      state.production.products = [...state.production.products, { product: '', id: '', units: '' }];
    },
    removeProduct: (state, action) => {
      const list = [...state.production.products];
      if (list.length === 1) return;
      list.splice(action.payload, 1);
      state.production.products = list;
    },
  },
});

export const {
  setDate,
  setSelectedProducts,
  setProductType,
  setProductId,
  setProductUnits,
  addProduct,
  removeProduct,
} = newProductionSlice.actions;
export const newProductionReducer = newProductionSlice.reducer;
