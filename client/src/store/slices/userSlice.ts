import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../models/user.ts';
import { AppState } from '../store.ts';

export interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string[] | null;
  refreshTokenId: any;
}

const initialUserState: UserState = {
  user: null,
  isLoading: false,
  error: null,
  refreshTokenId: null,
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
    setUserError: (
      state,
      action: { payload: string[] | null; type: string }
    ) => {
      state.error = action.payload;
    },
    resetUserError: (state) => {
      state.error = null;
    },
    setRefreshTokenId: (state, action: { payload: any; type: string }) => {
      state.refreshTokenId = action.payload;
    },
  },
});

export const selectUser = (state: AppState) => state.user;

export const {
  setUser,
  setRefreshTokenId,
  setUserError,
  resetUserError,
  setIsUserLoading,
} = userSlice.actions;

export default userSlice.reducer;
