import { createSlice } from '@reduxjs/toolkit';
import { ServerError } from '../../models/serverError.ts';
import { DrumTrackSteps, Song } from '../../models/song.ts';
import { SongList } from '../../models/songList.ts';
import initialSongState from './initialState/initialSongState.ts';
import { AppState } from '../store.ts';
import { KnobWaveType } from '../../models/types/waveTypes.ts';
import {
  inputToSimpleToneWaveform,
  inputToToneWaveform,
} from '../../tone/utils/transformToToneValues.ts';
import { NoteType } from '../../models/types/noteType.ts';
import { FilterType } from '../../models/types/filterType.ts';

export interface SongState {
  error: ServerError | null;
  currentSong: Song;
  songList: SongList;
}

const songSlice = createSlice({
  name: 'song',
  initialState: initialSongState,
  reducers: {
    /*
     * Top Level reducers
     */
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
    /*
     * mix reducers
     */
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
    /*
     * Melodic Synth Reducers
     */
    setMelodicSynthAttack: (
      state,
      action: { payload: number; type: string }
    ) => {
      state.currentSong.melodicSynth.attack = action.payload;
    },
    setMelodicSynthDecay: (
      state,
      action: { payload: number; type: string }
    ) => {
      state.currentSong.melodicSynth.decay = action.payload;
    },
    setMelodicSynthSustain: (
      state,
      action: { payload: number; type: string }
    ) => {
      state.currentSong.melodicSynth.sustain = action.payload;
    },
    setMelodicSynthRelease: (
      state,
      action: { payload: number; type: string }
    ) => {
      state.currentSong.melodicSynth.release = action.payload;
    },
    setMelodicSynthWaveform: (
      state,
      action: { payload: KnobWaveType; type: string }
    ) => {
      state.currentSong.melodicSynth.waveform = inputToToneWaveform(
        action.payload
      );
    },
    setMelodicSynthChorus: (
      state,
      action: { payload: number; type: string }
    ) => {
      state.currentSong.melodicSynth.chorus = action.payload;
    },
    setMelodicSynthFilterFrequency: (
      state,
      action: { payload: number; type: string }
    ) => {
      state.currentSong.melodicSynth.filterFrequency = action.payload;
    },
    setMelodicSynthFilterType: (
      state,
      action: { payload: FilterType; type: string }
    ) => {
      state.currentSong.melodicSynth.filterType = action.payload;
    },
    setMelodicSynthMetal: (
      state,
      action: { payload: number; type: string }
    ) => {
      state.currentSong.melodicSynth.metal = action.payload;
    },
    setMelodicSynthLfoFreq: (
      state,
      action: { payload: NoteType; type: string }
    ) => {
      state.currentSong.melodicSynth.lfoFrequency = action.payload;
    },
    setMelodicSynthFilterMod: (
      state,
      action: { payload: number; type: string }
    ) => {
      state.currentSong.melodicSynth.filterMod = action.payload;
    },
    setMelodicSynthLfoWaveform: (
      state,
      action: { payload: KnobWaveType; type: string }
    ) => {
      state.currentSong.melodicSynth.lfoShape = inputToSimpleToneWaveform(
        action.payload
      );
    },

    /*
     * Pattern Reducers
     */
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
  setMelodicSynthAttack,
  setMelodicSynthDecay,
  setMelodicSynthSustain,
  setMelodicSynthRelease,
  setMelodicSynthWaveform,
  setMelodicSynthChorus,
  setMelodicSynthFilterFrequency,
  setMelodicSynthFilterType,
  setMelodicSynthMetal,
  setMelodicSynthLfoFreq,
  setMelodicSynthFilterMod,
  setMelodicSynthLfoWaveform,
} = songSlice.actions;

export default songSlice.reducer;
