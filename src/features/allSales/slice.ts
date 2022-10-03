import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Actions
import { getAllSales } from '../../services/getAllSales';
import { updateSaleStatus } from '../../services/updateSaleStatus';

// Other resources
import { STATUS } from '../../constants/statuses';
import { SaleFetchData } from '../../types/types';

const initialState: AllSales = {
  status: '',
  error: '',
  allSales: [],
};

export const getSales = createAsyncThunk('getSales/allSales', async () => {
  const result = await getAllSales();
  return result;
});

export const updateDeliveryStatus = createAsyncThunk(
  'updateSaleStatus/allSales',
  async ({ uid, data }: { uid: string; data: string }) => {
    const result = updateSaleStatus(uid, data);
    return result;
  }
);

const allSalesSlice = createSlice({
  name: 'allSales',
  initialState,
  reducers: {
    updateStatus: (state, action) => {
      state.allSales[action.payload.index].status = action.payload.value;
    },
    setSales: (state, action) => {
      state.allSales = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getSales.pending, state => {
      state.status = STATUS.PENDING;
    });
    builder.addCase(getSales.fulfilled, (state, action) => {
      state.status = STATUS.FULFILLED;
      state.allSales = action.payload.sort((a, b) => +new Date(b.date) - +new Date(a.date));
    });
    builder.addCase(getSales.rejected, (state, { error }) => {
      state.error = error.message || 'Something went wrong';
      state.status = STATUS.FAILED;
    });
    builder.addCase(updateDeliveryStatus.pending, state => {
      state.status = STATUS.PENDING;
    });
    builder.addCase(updateDeliveryStatus.fulfilled, state => {
      state.status = STATUS.FULFILLED;
    });
    builder.addCase(updateDeliveryStatus.rejected, (state, { error }) => {
      state.error = error.message || 'Something went wrong';
      state.status = STATUS.FAILED;
    });
  },
});

export const { updateStatus, setSales } = allSalesSlice.actions;
export const allSalesReducer = allSalesSlice.reducer;

interface AllSales {
  status: string;
  error: string;
  allSales: SaleFetchData[];
}
