import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Actions
import { getAllSales } from '../../services/getAllSales';

// Other resources
import { STATUS } from '../../constants/statuses';
import { SaleData } from '../../types/types';

const initialState: AllSales = {
  status: '',
  error: '',
  allSales: [],
};

export const getSales = createAsyncThunk('getSales/allSales', async () => {
  const result = await getAllSales();
  return result;
});

const allSalesSlice = createSlice({
  name: 'allSales',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getSales.pending, state => {
      state.status = STATUS.PENDING;
    });
    builder.addCase(getSales.fulfilled, (state, action) => {
      state.status = STATUS.FULFILLED;
      state.allSales = action.payload;
    });
    builder.addCase(getSales.rejected, (state, { error }) => {
      state.error = error.message || 'Something went wrong';
      state.status = STATUS.FAILED;
    });
  },
});

export const allSalesReducer = allSalesSlice.reducer;

interface AllSales {
  status: string;
  error: string;
  allSales: SaleData[];
}
