import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Actions
import { getAdminCredentials } from '../../services/checkAdmin';

// Other resources
import { STATUS } from '../../constants/statuses';

const initialState: Admin = {
  status: '',
  error: '',
  isAdmin: false,
};

export const checkAdmin = createAsyncThunk('checkAdmin/login', async (uid: string | null) => {
  const result = await getAdminCredentials();
  if (result?.uid === uid) return true;
  return false;
});

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(checkAdmin.pending, state => {
      state.status = STATUS.PENDING;
    });
    builder.addCase(checkAdmin.fulfilled, (state, action) => {
      state.status = STATUS.FULFILLED;
      state.isAdmin = action.payload;
    });
    builder.addCase(checkAdmin.rejected, (state, { error }) => {
      state.error = error.message || 'Something went wrong';
      state.status = STATUS.FAILED;
    });
  },
});

export const adminReducer = adminSlice.reducer;

interface Admin {
  status: string;
  error: string;
  isAdmin: boolean;
}
