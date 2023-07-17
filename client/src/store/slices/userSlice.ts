import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../models/user.ts';

export interface UserState {
  user: User | null;
  isLoading: boolean;
}

const initialUserState: UserState = {
  user: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setUser: (state, action: { payload: User | null; type: string }) => {
      state.user = action.payload;
    },
    setIsUserLoading: (state, action: { payload: boolean; type: string }) => {
      state.isLoading = action.payload;
    },
  },
});

export const selectUser = (state: UserState) => state.user;

export const { setUser, setIsUserLoading } = userSlice.actions;

export default userSlice.reducer;
