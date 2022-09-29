import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Actions
import { deleteCustomerData } from '../../services/deleteCustomerData';

// Other resources
import { STATUS } from '../../constants/statuses';

const initialState = {
  status: '',
  error: '',
  deletedCustomerId: '',
};

export const deleteCustomer = createAsyncThunk('deleteCustomer/deleteCustomer', async (uid: string) => {
  const result = await deleteCustomerData(uid);
  return result;
});

const deleteCustomerSlice = createSlice({
  name: 'deleteCustomer',
  initialState,
  reducers: {
    setDeletedCustomerId: (state, action) => {
      state.deletedCustomerId = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(deleteCustomer.pending, state => {
      state.status = STATUS.PENDING;
    });
    builder.addCase(deleteCustomer.fulfilled, state => {
      state.status = STATUS.FULFILLED;
    });
    builder.addCase(deleteCustomer.rejected, (state, { error }) => {
      state.error = error.message || 'Something went wrong';
      state.status = STATUS.FAILED;
    });
  },
});

export const { setDeletedCustomerId } = deleteCustomerSlice.actions;
export const deleteCustomerReducer = deleteCustomerSlice.reducer;
