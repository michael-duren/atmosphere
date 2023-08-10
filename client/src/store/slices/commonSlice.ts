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
  presetToLoad: any;
  presetToLoadModalOpen: boolean;
  presetToLoadType: string | null;
  presetToLoadDispatchType: string | null;
  presetModalOpen: boolean;
  presetModalData: any;
  presetModalDispatchType: string | null;
  presetModalType: string | null;
  presetDeleteModalOpen: boolean;
  presetToDelete: any;
  presetDeleteType: string | null;
  presetDeleteDispatchType: string | null;
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
  presetToLoad: null,
  presetToLoadType: null,
  presetToLoadDispatchType: null,
  presetToLoadModalOpen: false,
  presetModalOpen: false,
  presetModalData: null,
  presetModalDispatchType: null,
  presetModalType: null,
  presetDeleteModalOpen: false,
  presetToDelete: null,
  presetDeleteType: null,
  presetDeleteDispatchType: null,
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
    setPresetModalOpen: (state, action: { payload: boolean; type: string }) => {
      state.presetModalOpen = action.payload;
    },
    setPresetModalData: (state, action: { payload: any; type: string }) => {
      state.presetModalData = action.payload;
    },
    setPresetModalDispatchType: (
      state,
      action: { payload: string; type: string }
    ) => {
      state.presetModalDispatchType = action.payload;
    },
    setPresetModalType: (state, action: { payload: string; type: string }) => {
      state.presetModalType = action.payload;
    },
    setPresetDeleteModalOpen: (
      state,
      action: { payload: boolean; type: string }
    ) => {
      state.presetDeleteModalOpen = action.payload;
    },
    setPresetToDelete: (state, action: { payload: any; type: string }) => {
      state.presetToDelete = action.payload;
    },
    setPresetDeleteType: (state, action: { payload: string; type: string }) => {
      state.presetDeleteType = action.payload;
    },
    setPresetDeleteDispatchType: (
      state,
      action: { payload: string; type: string }
    ) => {
      state.presetDeleteDispatchType = action.payload;
    },
    setPresetToLoad: (state, action: { payload: any; type: string }) => {
      state.presetToLoad = action.payload;
    },
    setPresetToLoadModalOpen: (
      state,
      action: { payload: boolean; type: string }
    ) => {
      state.presetToLoadModalOpen = action.payload;
    },
    setPresetToLoadType: (state, action: { payload: string; type: string }) => {
      state.presetToLoadType = action.payload;
    },
    setPresetToLoadDispatchType: (
      state,
      action: { payload: string; type: string }
    ) => {
      state.presetToLoadDispatchType = action.payload;
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
  setPresetModalOpen,
  setPresetModalData,
  setPresetModalDispatchType,
  setPresetModalType,
  setPresetDeleteModalOpen,
  setPresetToDelete,
  setPresetDeleteType,
  setPresetDeleteDispatchType,
  setPresetToLoad,
  setPresetToLoadModalOpen,
  setPresetToLoadType,
  setPresetToLoadDispatchType,
} = commonSlice.actions;

export default commonSlice.reducer;
