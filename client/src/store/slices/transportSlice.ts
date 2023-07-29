import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '../store';
import { MusicalKey } from '../../models/types/musicalKey.ts';

export interface TransportState {
  isPlaying: boolean;
  isToneLoaded: boolean;
  currentMelodicNote: MusicalKey | null;
}

const initialTransportState: TransportState = {
  isPlaying: false,
  isToneLoaded: false,
  currentMelodicNote: null,
};

const transportSlice = createSlice({
  name: 'transport',
  initialState: initialTransportState,
  reducers: {
    setIsPlaying: (state, action: { payload: boolean; type: string }) => {
      state.isPlaying = action.payload;
    },
    setIsToneLoaded: (state, action: { payload: boolean; type: string }) => {
      state.isToneLoaded = action.payload;
    },
    setCurrentMelodicNote: (
      state,
      action: { payload: MusicalKey | null; type: string }
    ) => {
      state.currentMelodicNote = action.payload;
    },
  },
});

export const selectTransport = (state: AppState) => state.transport;

export const { setIsPlaying, setIsToneLoaded, setCurrentMelodicNote } =
  transportSlice.actions;

export default transportSlice.reducer;
