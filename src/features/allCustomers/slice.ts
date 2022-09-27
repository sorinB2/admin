import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Actions
import { getAllCustomers } from '../../services/getAllCustomers';

// Other resources
import { STATUS } from '../../constants/statuses';
import { CustomerFetchData } from '../../types/types';

const initialState: AllCustomers = {
  status: '',
  error: '',
  allCustomers: [],
};

export const getCustomers = createAsyncThunk('getCustomers/allCustomers', async () => {
  const result = await getAllCustomers();
  return result;
});

const allCustomersSlice = createSlice({
  name: 'allCustomers',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCustomers.pending, state => {
      state.status = STATUS.PENDING;
    });
    builder.addCase(getCustomers.fulfilled, (state, action) => {
      state.status = STATUS.FULFILLED;
      state.allCustomers = action.payload;
    });
    builder.addCase(getCustomers.rejected, (state, { error }) => {
      state.error = error.message || 'Something went wrong';
      state.status = STATUS.FAILED;
    });
  },
});

export const allCustomersReducer = allCustomersSlice.reducer;

interface AllCustomers {
  status: string;
  error: string;
  allCustomers: CustomerFetchData[];
}
