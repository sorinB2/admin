import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Actions
import { updateSaleData } from '../../services/updateSaleData';

// Other resources
import { STATUS } from '../../constants/statuses';
import { SaleData } from '../../types/types';

const initialState = {
  status: '',
  error: '',
  saleId: '',
};

export const editSale = createAsyncThunk(
  'editSale/editSale',
  async ({ uid, data }: { uid: string; data: SaleData }) => {
    const result = updateSaleData(uid, data);
    return result;
  }
);

const editSaleSlice = createSlice({
  name: 'editSale',
  initialState,
  reducers: {
    setSaleId: (state, action) => {
      state.saleId = action.payload;
    },
    discardEditSaleData: state => {
      state.saleId = initialState.saleId;
      state.error = initialState.error;
      state.status = initialState.status;
    },
  },
  extraReducers: builder => {
    builder.addCase(editSale.pending, state => {
      state.status = STATUS.PENDING;
    });
    builder.addCase(editSale.fulfilled, state => {
      state.status = STATUS.FULFILLED;
    });
    builder.addCase(editSale.rejected, (state, { error }) => {
      state.error = error.message || 'Something went wrong';
      state.status = STATUS.FAILED;
    });
  },
});

export const { setSaleId, discardEditSaleData } = editSaleSlice.actions;
export const editSaleReducer = editSaleSlice.reducer;
