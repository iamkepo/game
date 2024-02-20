
// reducers/userReducer.ts

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface UserState {
  user: object;
}

export const initialState: UserState = {
  user: {}, 
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: { 
    setUser(state, action: PayloadAction<{ user: object }>) {
      state.user = action.payload.user;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
