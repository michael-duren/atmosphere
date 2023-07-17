import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../models/user.ts';

export interface UserState {
  user: User | null;
}

const initialUserState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setUser: (state, action: { payload: User | null; type: string }) => {
      state.user = action.payload;
    },
  },
});

export const selectUser = (state: UserState) => state.user;

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
