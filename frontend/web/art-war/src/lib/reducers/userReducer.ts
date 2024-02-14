
// reducers/userReducer.ts

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface UserState {
  user: object | null;
}

const initialState: UserState = {
  user: null, 
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
