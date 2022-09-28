import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Actions
import { createCustomer } from '../../services/createCustomer';

// Other resources
import { CustomerData } from '../../types/types';
import { STATUS } from '../../constants/statuses';

const initialState: NewCustomer = {
  status: '',
  error: '',
  selectedProducts: [],
  customer: {
    name: '',
    location: '',
    phone: '',
    receivables: 0,
    products: [{ product: '', price: '', id: '' }],
  },
};

export const createNewCustomer = createAsyncThunk('createNewCustomer/newCustomer', async (data: CustomerData) => {
  const result = await createCustomer(data);
  return result;
});

const newCustomerSlice = createSlice({
  name: 'newCustomer',
  initialState,
  reducers: {
    setCustomer: (state, action) => {
      state.customer = action.payload;
    },
    setName: (state, action) => {
      state.customer.name = action.payload;
    },
    setLocation: (state, action) => {
      state.customer.location = action.payload;
    },
    setPhone: (state, action) => {
      state.customer.phone = action.payload;
    },
    setReceivables: (state, action) => {
      state.customer.receivables = action.payload;
    },
    addProduct: state => {
      state.customer.products = [...state.customer.products, { product: '', price: '', id: '' }];
    },
    setSelectedProducts: (state, action) => {
      state.selectedProducts = action.payload;
    },
    removeProduct: (state, action) => {
      const list = [...state.customer.products];
      if (list.length === 1) return;
      list.splice(action.payload, 1);
      state.customer.products = list;
    },
    setProduct: (state, action) => {
      state.customer.products = action.payload;
    },
    setProductPrice: (state, action) => {
      state.customer.products[action.payload.i].price = action.payload.value;
    },
    setProductType: (state, action) => {
      state.customer.products[action.payload.i].product = action.payload.value;
    },
    setProductId: (state, action) => {
      state.customer.products[action.payload.i].id = action.payload.value;
    },
    discardData: state => {
      state.customer = initialState.customer;
      state.status = initialState.status;
      state.error = initialState.error;
      state.selectedProducts = initialState.selectedProducts;
    },
  },
  extraReducers: builder => {
    builder.addCase(createNewCustomer.pending, state => {
      state.status = STATUS.PENDING;
    });
    builder.addCase(createNewCustomer.fulfilled, state => {
      state.status = STATUS.FULFILLED;
    });
    builder.addCase(createNewCustomer.rejected, (state, { error }) => {
      state.error = error.message || 'Something went wrong';
      state.status = STATUS.FAILED;
    });
  },
});

export const {
  setCustomer,
  setName,
  setLocation,
  setPhone,
  setReceivables,
  setProduct,
  addProduct,
  setSelectedProducts,
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
  selectedProducts: string[];
  customer: CustomerData;
}
