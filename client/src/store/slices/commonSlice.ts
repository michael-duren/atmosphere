import { createSlice } from '@reduxjs/toolkit';
import { ServerError } from '../../models/serverError.ts';
import { AppState } from '../store.ts';

export interface CommonState {
  error: ServerError | null;
  token: string | null;
  appLoaded: boolean;
  saveModalOpen: boolean;
}

const initialCommonState: CommonState = {
  error: null,
  token: localStorage.getItem('jwt'),
  appLoaded: true,
  saveModalOpen: false,
};

const commonSlice = createSlice({
  name: 'common',
  initialState: initialCommonState,
  reducers: {
    setToken: (state, action: { payload: string | null; type: string }) => {
      state.token = action.payload;
    },
    setError: (state, action: { payload: ServerError; type: string }) => {
      state.error = action.payload;
    },
    setAppLoaded: (state, action: { payload: boolean; type: string }) => {
      state.appLoaded = action.payload;
    },
    setSaveModalOpen: (state, action: { payload: boolean; type: string }) => {
      state.saveModalOpen = action.payload;
    },
  },
});

export const selectCommon = (state: AppState) => state.common;

export const { setToken, setError, setAppLoaded, setSaveModalOpen } =
  commonSlice.actions;

export default commonSlice.reducer;
