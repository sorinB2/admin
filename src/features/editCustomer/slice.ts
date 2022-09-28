import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Actions
import { updateCustomerData } from '../../services/updateCustomerData';

// Other resources
import { STATUS } from '../../constants/statuses';
import { CustomerData } from '../../types/types';

const initialState = {
  status: '',
  error: '',
  customerId: '',
};

export const editCustomer = createAsyncThunk(
  'editCustomer/newCustomer',
  async ({ uid, data }: { uid: string; data: CustomerData }) => {
    const result = updateCustomerData(uid, data);
    return result;
  }
);

const editCustomerSlice = createSlice({
  name: 'editCustomer',
  initialState,
  reducers: {
    setCustomerId: (state, action) => {
      state.customerId = action.payload;
    },
    discardEditCustomerData: state => {
      state.customerId = initialState.customerId;
      state.error = initialState.error;
      state.status = initialState.status;
    },
  },
  extraReducers: builder => {
    builder.addCase(editCustomer.pending, state => {
      state.status = STATUS.PENDING;
    });
    builder.addCase(editCustomer.fulfilled, state => {
      state.status = STATUS.FULFILLED;
    });
    builder.addCase(editCustomer.rejected, (state, { error }) => {
      state.error = error.message || 'Something went wrong';
      state.status = STATUS.FAILED;
    });
  },
});

export const { setCustomerId, discardEditCustomerData } = editCustomerSlice.actions;
export const editCustomerReducer = editCustomerSlice.reducer;
