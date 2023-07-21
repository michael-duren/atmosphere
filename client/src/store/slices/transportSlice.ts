import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '../store';

export interface TransportState {
  isPlaying: boolean;
  isToneLoaded: boolean;
}

const initialTransportState: TransportState = {
  isPlaying: false,
  isToneLoaded: false,
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
  },
});

export const selectTransport = (state: AppState) => state.transport;

export const { setIsPlaying, setIsToneLoaded } = transportSlice.actions;

export default transportSlice.reducer;
