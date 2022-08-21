import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Actions
import { createProduct } from '../../services/createProduct';

// Other resources
import { STATUS } from '../../constants/statuses';
import { ProductData } from '../../types/types';

const initialState: NewProduct = {
  status: '',
  error: '',
  productData: {
    brand: '',
    name: '',
    wipes: 0,
    stock: 0,
    density: 0,
    width: 0,
    fragrance: '',
    material: '',
  },
};

export const createNewProduct = createAsyncThunk('createNewProduct/newProduct', async (data: ProductData) => {
  const result = await createProduct(data);
  return result.id;
});

const newProductSlice = createSlice({
  name: 'newProduct',
  initialState,
  reducers: {
    setBrand: (state, action) => {
      state.productData.brand = action.payload;
    },
    setName: (state, action) => {
      state.productData.name = action.payload;
    },
    setWipes: (state, action) => {
      state.productData.wipes = action.payload;
    },
    setStock: (state, action) => {
      state.productData.stock = action.payload;
    },
    setDensity: (state, action) => {
      state.productData.density = action.payload;
    },
    setWidth: (state, action) => {
      state.productData.width = action.payload;
    },
    setFragrance: (state, action) => {
      state.productData.fragrance = action.payload;
    },
    setMaterial: (state, action) => {
      state.productData.material = action.payload;
    },
    discard: state => {
      state.productData = initialState.productData;
      state.status = initialState.status;
      state.error = initialState.error;
    },
  },
  extraReducers: builder => {
    builder.addCase(createNewProduct.pending, state => {
      state.status = STATUS.PENDING;
    });
    builder.addCase(createNewProduct.fulfilled, state => {
      state.status = STATUS.FULFILLED;
    });
    builder.addCase(createNewProduct.rejected, (state, { error }) => {
      state.error = error.message || 'Something went wrong';
      state.status = STATUS.FAILED;
    });
  },
});

export const { setBrand, setDensity, setFragrance, setMaterial, setName, setStock, setWidth, setWipes, discard } =
  newProductSlice.actions;
export const newProductReducer = newProductSlice.reducer;

interface NewProduct {
  status: string;
  error: string;
  productData: ProductData;
}
