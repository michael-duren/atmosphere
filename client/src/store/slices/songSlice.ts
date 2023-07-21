import { createSlice } from '@reduxjs/toolkit';
import { ServerError } from '../../models/serverError.ts';
import { Song } from '../../models/song.ts';
import { SongList } from '../../models/songList.ts';
import initialSongState from './initialState/initialSongState.ts';
import { AppState } from '../store.ts';

export interface SongState {
  error: ServerError | null;
  currentSong: Song;
  songList: SongList;
}

const songSlice = createSlice({
  name: 'song',
  initialState: initialSongState,
  reducers: {
    setError: (state, action: { payload: ServerError; type: string }) => {
      state.error = action.payload;
    },
    setCurrentSong: (state, action: { payload: Song; type: string }) => {
      state.currentSong = action.payload;
    },
    setSongList: (state, action: { payload: SongList; type: string }) => {
      state.songList = action.payload;
    },
  },
});

export const selectSong = (state: AppState) => state.song;

export const { setError, setCurrentSong, setSongList } = songSlice.actions;

export default songSlice.reducer;
