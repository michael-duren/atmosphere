import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '../store';

export interface TransportState {
  isPlaying: boolean;
}

const initialTransportState: TransportState = {
  isPlaying: false,
};

const transportSlice = createSlice({
  name: 'transport',
  initialState: initialTransportState,
  reducers: {
    setIsPlaying: (state, action: { payload: boolean; type: string }) => {
      state.isPlaying = action.payload;
    },
  },
});

export const selectTransport = (state: AppState) => state.transport;

export const { setIsPlaying } = transportSlice.actions;

export default transportSlice.reducer;
