// reducers/authReducer.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) {
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    refreshSuccess(state, action: PayloadAction<{ accessToken: string }>) {
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
    },
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { loginSuccess, refreshSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;