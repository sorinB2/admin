import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Actions
import { getAllProducts } from '../../services/getAllProducts';

// Other resources
import { STATUS } from '../../constants/statuses';
import { ProductFetchData } from '../../types/types';

const initialState: AllProducts = {
  status: '',
  error: '',
  allProducts: [],
};

export const getProducts = createAsyncThunk('getProducts/allProducts', async () => {
  const result = await getAllProducts();
  return result;
});

const allProductsSlice = createSlice({
  name: 'allProducts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getProducts.pending, state => {
      state.status = STATUS.PENDING;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.status = STATUS.FULFILLED;
      state.allProducts = action.payload.sort((a, b) => (a.brand > b.brand ? 1 : -1));
    });
    builder.addCase(getProducts.rejected, (state, { error }) => {
      state.error = error.message || 'Something went wrong';
      state.status = STATUS.FAILED;
    });
  },
});

export const allProductsReducer = allProductsSlice.reducer;

interface AllProducts {
  status: string;
  error: string;
  allProducts: ProductFetchData[];
}
