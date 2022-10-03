import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Actions
import { deleteSaleData } from '../../services/deleteSaleData';

// Other resources
import { STATUS } from '../../constants/statuses';

const initialState = {
  status: '',
  error: '',
  deletedSaleId: '',
};

export const deleteSale = createAsyncThunk('deleteSale/deleteSale', async (uid: string) => {
  const result = await deleteSaleData(uid);
  return result;
});

const deleteSaleSlice = createSlice({
  name: 'deleteSale',
  initialState,
  reducers: {
    setDeletedSaleId: (state, action) => {
      state.deletedSaleId = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(deleteSale.pending, state => {
      state.status = STATUS.PENDING;
    });
    builder.addCase(deleteSale.fulfilled, state => {
      state.status = STATUS.FULFILLED;
    });
    builder.addCase(deleteSale.rejected, (state, { error }) => {
      state.error = error.message || 'Something went wrong';
      state.status = STATUS.FAILED;
    });
  },
});

export const { setDeletedSaleId } = deleteSaleSlice.actions;
export const deleteSaleReducer = deleteSaleSlice.reducer;
