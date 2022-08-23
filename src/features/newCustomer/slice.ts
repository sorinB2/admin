import { createSlice } from '@reduxjs/toolkit';

const initialState: NewCustomer = {
  status: '',
  error: '',
  name: '',
  location: '',
  phone: '',
  receivables: 0,
  products: [{ product: '', price: '', id: '' }],
};

const newCustomerSlice = createSlice({
  name: 'newCustomer',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setReceivables: (state, action) => {
      state.receivables = action.payload;
    },
    addProduct: state => {
      state.products = [...state.products, { product: '', price: '', id: '' }];
    },
    removeProduct: (state, action) => {
      const list = [...state.products];
      list.splice(action.payload, 1);
      state.products = list;
    },
    setProduct: (state, action) => {
      state.products = action.payload;
    },
    setProductPrice: (state, action) => {
      state.products[action.payload.i].price = action.payload.value;
    },
    setProductType: (state, action) => {
      state.products[action.payload.i].product = action.payload.value;
    },
    setProductId: (state, action) => {
      state.products[action.payload.i].id = action.payload.value;
    },
    discardData: state => {
      state.status = '';
      state.error = '';
      state.name = '';
      state.location = '';
      state.phone = '';
      state.receivables = 0;
      state.products = [{ product: '', price: '', id: '' }];
    },
  },
});

export const {
  setName,
  setLocation,
  setPhone,
  setReceivables,
  setProduct,
  addProduct,
  removeProduct,
  setProductPrice,
  setProductType,
  setProductId,
  discardData,
} = newCustomerSlice.actions;
export const newCustomerReducer = newCustomerSlice.reducer;

interface NewCustomer {
  status: string;
  error: string;
  name: string;
  location: string;
  phone: string;
  receivables: number;
  products: { product: string; price: string; id: string }[];
}
