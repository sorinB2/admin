import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Actions
import { createSale } from '../../services/createSale';
import { updateCustomerReceivables } from '../../services/updateCustomerReceivables';
import { updateProductStock } from '../../services/updateProductStock';

// Other resources
import { SaleData } from '../../types/types';
import { STATUS } from '../../constants/statuses';

const initialState: NewSale = {
  status: '',
  error: '',
  selectedProducts: [],
  sale: {
    customer: {
      name: '',
      location: '',
      phone: '',
      receivables: 0,
      products: [{ product: '', price: '', id: '' }],
      id: '',
    },
    date: new Date().toString(),
    order: [{ product: { product: '', price: '', id: '', stock: '' }, units: '', income: 0 }],
    totalIncome: 0,
    paid: false,
    status: '',
  },
};

export const createNewSale = createAsyncThunk('createNewSale/newSale', async (data: SaleData) => {
  const result = await createSale(data);
  return result;
});

export const addReceivables = createAsyncThunk(
  'addReceivables/newSale',
  async ({ uid, data }: { uid: string; data: string }) => {
    const result = updateCustomerReceivables(uid, data);
    return result;
  }
);

export const updateProduct = createAsyncThunk(
  'updateProductStock/newSale',
  async ({ uid, data }: { uid: string; data: string }) => {
    const result = updateProductStock(uid, data);
    return result;
  }
);

const newSaleSlice = createSlice({
  name: 'newSale',
  initialState,
  reducers: {
    setSale: (state, action) => {
      state.sale = action.payload;
    },
    setCustomer: (state, action) => {
      state.sale.customer = action.payload;
    },
    setDate: (state, action) => {
      state.sale.date = action.payload;
    },
    setProductType: (state, action) => {
      state.sale.order[action.payload.i].product = action.payload.value;
    },
    setProductUnits: (state, action) => {
      state.sale.order[action.payload.i].units = action.payload.value;
    },
    setStatus: (state, action) => {
      state.sale.status = action.payload;
    },
    setStock: (state, action) => {
      state.sale.order[action.payload.i].product.stock = action.payload.value;
    },
    setSelectedProducts: (state, action) => {
      state.selectedProducts = action.payload;
    },
    addOrderItem: state => {
      state.sale.order = [
        ...state.sale.order,
        { product: { product: '', price: '', id: '', stock: '' }, units: '', income: 0 },
      ];
    },
    removeOrderItem: (state, action) => {
      const list = [...state.sale.order];
      if (list.length === 1) return;
      list.splice(action.payload, 1);
      state.sale.order = list;
    },
    discardOrder: state => {
      state.sale.order = initialState.sale.order;
    },
    setIncome: (state, action) => {
      state.sale.order[action.payload].income =
        +state.sale.order[action.payload].units * +state.sale.order[action.payload].product.price;
    },
    setTotalIncome: state => {
      let sum = 0;
      state.sale.order.forEach(item => {
        sum += item.income;
      });
      state.sale.totalIncome = sum;
    },
    discardData: state => {
      state.sale = initialState.sale;
      state.status = initialState.status;
      state.error = initialState.error;
    },
  },
  extraReducers: builder => {
    builder.addCase(createNewSale.pending, state => {
      state.status = STATUS.PENDING;
    });
    builder.addCase(createNewSale.fulfilled, state => {
      state.status = STATUS.FULFILLED;
    });
    builder.addCase(createNewSale.rejected, (state, { error }) => {
      state.error = error.message || 'Something went wrong';
      state.status = STATUS.FAILED;
    });
  },
});

export const {
  setSale,
  setCustomer,
  setDate,
  setProductType,
  setProductUnits,
  setStatus,
  setStock,
  setSelectedProducts,
  discardOrder,
  addOrderItem,
  removeOrderItem,
  setIncome,
  setTotalIncome,
  discardData,
} = newSaleSlice.actions;
export const newSaleReducer = newSaleSlice.reducer;

interface NewSale {
  status: string;
  error: string;
  selectedProducts: string[];
  sale: SaleData;
}
