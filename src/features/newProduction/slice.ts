import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Actions
import { createProduction } from '../../services/createProduction';

// Other resources
import { STATUS } from '../../constants/statuses';
import { ProductionData } from '../../types/types';

const initialState: NewProduction = {
  status: '',
  error: '',
  selectedProducts: [],
  production: {
    date: '',
    products: [{ name: '', units: '', id: '' }],
  },
};

export const createNewProduction = createAsyncThunk(
  'createNewProduction/newProduction',
  async (data: ProductionData) => {
    const result = await createProduction(data);
    return result;
  }
);

const newProductionSlice = createSlice({
  name: 'newProduction',
  initialState,
  reducers: {
    setDate: (state, action) => {
      state.production.date = action.payload;
    },
    setSelectedProducts: (state, action) => {
      state.selectedProducts = action.payload;
    },
    setProductType: (state, action) => {
      state.production.products[action.payload.i].name = action.payload.value;
    },
    setProductId: (state, action) => {
      state.production.products[action.payload.i].id = action.payload.value;
    },
    setProductUnits: (state, action) => {
      state.production.products[action.payload.i].units = action.payload.value;
    },
    addProduct: state => {
      state.production.products = [...state.production.products, { name: '', id: '', units: '' }];
    },
    removeProduct: (state, action) => {
      const list = [...state.production.products];
      if (list.length === 1) return;
      list.splice(action.payload, 1);
      state.production.products = list;
    },
    discardData: state => {
      state.error = initialState.error;
      state.status = initialState.status;
      state.selectedProducts = initialState.selectedProducts;
      state.production = initialState.production;
    },
  },
  extraReducers: builder => {
    builder.addCase(createNewProduction.pending, state => {
      state.status = STATUS.PENDING;
    });
    builder.addCase(createNewProduction.fulfilled, state => {
      state.status = STATUS.FULFILLED;
    });
    builder.addCase(createNewProduction.rejected, (state, { error }) => {
      state.error = error.message || 'Something went wrong';
      state.status = STATUS.FAILED;
    });
  },
});

export const {
  setDate,
  setSelectedProducts,
  setProductType,
  setProductId,
  setProductUnits,
  addProduct,
  removeProduct,
  discardData,
} = newProductionSlice.actions;
export const newProductionReducer = newProductionSlice.reducer;

interface NewProduction {
  status: string;
  error: string;
  selectedProducts: string[];
  production: ProductionData;
}
