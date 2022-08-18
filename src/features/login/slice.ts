import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { STATUS } from '../../constants/statuses';
import { loginFetch } from '../../services/login/loginFetch';

const initialState: LogIn = {
  status: '',
  error: '',
  uid: '',
  email: '',
  password: '',
};

export const login = createAsyncThunk(
  'login/login',
  async ({ email, password }: { email: string; password: string }) => {
    const result = await loginFetch({ email, password });
    sessionStorage.setItem('authToken', result.user.uid);
    return result.user.uid;
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    resetFields: state => {
      state.email = '';
      state.password = '';
    },
  },
  extraReducers: builder => {
    builder.addCase(login.pending, state => {
      state.status = STATUS.PENDING;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = STATUS.FULFILLED;
      state.uid = action.payload;
    });
    builder.addCase(login.rejected, (state, { error }) => {
      state.error = error.message || 'Something went wrong';
      state.status = STATUS.FAILED;
    });
  },
});

export const { setEmail, setPassword, resetFields } = loginSlice.actions;
export const loginReducer = loginSlice.reducer;

interface LogIn {
  status: string;
  error: string;
  uid: string;
  email: string;
  password: string;
}
