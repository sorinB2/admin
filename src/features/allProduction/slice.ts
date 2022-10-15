import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Actions
import { getAllProduction } from '../../services/getAllProduction';

// Other resources
import { STATUS } from '../../constants/statuses';
import { ProductionFetchData } from '../../types/types';

const initialState: AllProduction = {
  status: '',
  error: '',
  allProduction: [],
};

export const getProduction = createAsyncThunk('getProduction/allProduction', async () => {
  const result = await getAllProduction();
  return result;
});

const allProductionSlice = createSlice({
  name: 'allProduction',
  initialState,
  reducers: {
    setProduction: (state, action) => {
      state.allProduction = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getProduction.pending, state => {
      state.status = STATUS.PENDING;
    });
    builder.addCase(getProduction.fulfilled, (state, action) => {
      state.status = STATUS.FULFILLED;
      state.allProduction = action.payload;
    });
    builder.addCase(getProduction.rejected, (state, { error }) => {
      state.error = error.message || 'Something went wrong';
      state.status = STATUS.FAILED;
    });
  },
});

export const { setProduction } = allProductionSlice.actions;
export const allProductionReducer = allProductionSlice.reducer;

interface AllProduction {
  status: string;
  error: string;
  allProduction: ProductionFetchData[];
}
