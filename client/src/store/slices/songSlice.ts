import { createSlice } from '@reduxjs/toolkit';
import { ServerError } from '../../models/serverError.ts';
import { DrumTrackSteps, Song } from '../../models/song.ts';
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
    setBpm: (state, action: { payload: number; type: string }) => {
      state.currentSong.bpm = action.payload;
    },
    setKitPatternLength: (state, action: { payload: number; type: string }) => {
      state.currentSong.kitPattern.patternLength = action.payload;
    },
    setMasterVolume: (state, action: { payload: number; type: string }) => {
      state.currentSong.masterVolume = action.payload;
    },
    setDrumVolume: (state, action: { payload: number; type: string }) => {
      state.currentSong.drumVolume = action.payload;
    },
    setBassVolume: (state, action: { payload: number; type: string }) => {
      state.currentSong.bassVolume = action.payload;
    },
    setMelodicVolume: (state, action: { payload: number; type: string }) => {
      state.currentSong.melodicVolume = action.payload;
    },
    setDistortionMix: (state, action: { payload: number; type: string }) => {
      state.currentSong.distortion.mix = action.payload;
    },
    setDistortionAmount: (state, action: { payload: number; type: string }) => {
      state.currentSong.distortion.amount = action.payload;
    },
    setDistortionFilter: (state, action: { payload: number; type: string }) => {
      state.currentSong.distortion.filter = action.payload;
    },
    setReverbMix: (state, action: { payload: number; type: string }) => {
      state.currentSong.reverb.mix = action.payload;
    },
    setReverbDecay: (state, action: { payload: number; type: string }) => {
      state.currentSong.reverb.decay = action.payload;
    },
    setReverbPreDelay: (state, action: { payload: number; type: string }) => {
      state.currentSong.reverb.preDelay = action.payload;
    },
    setDelayMix: (state, action: { payload: number; type: string }) => {
      state.currentSong.delay.mix = action.payload;
    },
    setDelayTime: (state, action: { payload: number; type: string }) => {
      state.currentSong.delay.time = action.payload;
    },
    setDelayFeedback: (state, action: { payload: number; type: string }) => {
      state.currentSong.delay.feedback = action.payload;
    },
    toggleDrumStep: (
      state,
      action: {
        payload: { drumName: DrumTrackSteps; step: number };
        type: string;
      }
    ) => {
      const { drumName, step } = action.payload;
      state.currentSong.kitPattern[drumName][step] =
        !state.currentSong.kitPattern[drumName][step];
    },
  },
});

export const selectSong = (state: AppState) => state.song;

export const {
  setError,
  setCurrentSong,
  toggleDrumStep,
  setKitPatternLength,
  setSongList,
  setBpm,
  setMasterVolume,
  setMelodicVolume,
  setBassVolume,
  setDrumVolume,
  setDistortionMix,
  setDistortionAmount,
  setDistortionFilter,
  setReverbMix,
  setReverbDecay,
  setReverbPreDelay,
  setDelayMix,
  setDelayTime,
  setDelayFeedback,
} = songSlice.actions;

export default songSlice.reducer;
