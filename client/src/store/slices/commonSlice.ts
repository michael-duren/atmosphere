import { createSlice } from '@reduxjs/toolkit';
import { ServerError } from '../../models/serverError.ts';
import { AppState } from '../store.ts';
import { SongListItem } from '../../models/songList.ts';

export interface CommonState {
  error: ServerError | null;
  token: string | null;
  appLoaded: boolean;
  saveModalOpen: boolean;
  loadSongModalOpen: boolean;
  songToLoad: SongListItem | null;
  songToDelete: SongListItem | null;
  deleteSongModalOpen: boolean;
}

const initialCommonState: CommonState = {
  error: null,
  token: localStorage.getItem('jwt'),
  appLoaded: true,
  saveModalOpen: false,
  loadSongModalOpen: false,
  songToLoad: null,
  songToDelete: null,
  deleteSongModalOpen: false,
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
    setLoadSongModalOpen: (
      state,
      action: { payload: boolean; type: string }
    ) => {
      state.loadSongModalOpen = action.payload;
    },
    setSongToLoad: (state, action: { payload: SongListItem; type: string }) => {
      state.songToLoad = action.payload;
    },
    setDeleteSongModalOpen: (
      state,
      action: { payload: boolean; type: string }
    ) => {
      state.deleteSongModalOpen = action.payload;
    },
    setSongToDelete: (
      state,
      action: { payload: SongListItem; type: string }
    ) => {
      state.songToDelete = action.payload;
    },
  },
});

export const selectCommon = (state: AppState) => state.common;

export const {
  setToken,
  setError,
  setAppLoaded,
  setSaveModalOpen,
  setLoadSongModalOpen,
  setDeleteSongModalOpen,
  setSongToDelete,
  setSongToLoad,
} = commonSlice.actions;

export default commonSlice.reducer;
