import { createSlice } from '@reduxjs/toolkit';
import { ServerError } from '../../models/serverError.ts';
import {
  BassSynth,
  Delay,
  Distortion,
  DrumTrackSteps,
  KitPattern,
  MelodicPattern,
  MelodicSynth,
  Reverb,
  Song,
} from '../../models/song.ts';
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
import { MusicalKey } from '../../models/types/musicalKey.ts';
import { MusicalScale } from '../../models/types/musicalScale.ts';
import { PatternName } from 'tone/build/esm/event/PatternGenerator';
import { ServerValidationError } from '../../models/serverValidationError.ts';

export interface SongState {
  error: ServerError | ServerValidationError | null | unknown;
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
    setError: (
      state,
      action: {
        payload: ServerError | ServerValidationError | unknown;
        type: string;
      }
    ) => {
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
      state.currentSong.distortion.filterFrequency = action.payload;
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
    setMelodicSynth: (
      state,
      action: { payload: MelodicSynth; type: string }
    ) => {
      state.currentSong.melodicSynth.attack = action.payload.attack;
      state.currentSong.melodicSynth.decay = action.payload.decay;
      state.currentSong.melodicSynth.sustain = action.payload.sustain;
      state.currentSong.melodicSynth.release = action.payload.release;
      state.currentSong.melodicSynth.filterFrequency =
        action.payload.filterFrequency;
      state.currentSong.melodicSynth.filterMod = action.payload.filterMod;
      state.currentSong.melodicSynth.filterType = action.payload.filterType;
      state.currentSong.melodicSynth.metal = action.payload.metal;
      state.currentSong.melodicSynth.chorus = action.payload.chorus;
      state.currentSong.melodicSynth.lfoFrequency = action.payload.lfoFrequency;
      state.currentSong.melodicSynth.lfoShape = action.payload.lfoShape;
    },
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
     * Bass Synth Reducers
     */
    setBassSynthWaveform: (
      state,
      action: { payload: KnobWaveType; type: string }
    ) => {
      state.currentSong.bassSynth.waveform = inputToToneWaveform(
        action.payload
      );
    },
    setBassSynthFilterFrequency: (
      state,
      action: { payload: number; type: string }
    ) => {
      state.currentSong.bassSynth.filterFrequency = action.payload;
    },
    setBassSynthAttack: (state, action: { payload: number; type: string }) => {
      state.currentSong.bassSynth.attack = action.payload;
    },
    setBassSynthDecay: (state, action: { payload: number; type: string }) => {
      state.currentSong.bassSynth.decay = action.payload;
    },
    setBassSynthSustain: (state, action: { payload: number; type: string }) => {
      state.currentSong.bassSynth.sustain = action.payload;
    },
    setBassSynthRelease: (state, action: { payload: number; type: string }) => {
      state.currentSong.bassSynth.release = action.payload;
    },

    /*
     * Pattern Reducers
     */
    setMelodicPattern: (
      state,
      action: { payload: MelodicPattern; type: string }
    ) => {
      state.currentSong.melodicPattern.key = action.payload.key;
      state.currentSong.melodicPattern.scale = action.payload.scale;
      state.currentSong.melodicPattern.sequence = action.payload.sequence;
      state.currentSong.melodicPattern.patternType = action.payload.patternType;
      state.currentSong.melodicPattern.transpose = action.payload.transpose;
      state.currentSong.melodicPattern.timeInterval =
        action.payload.timeInterval;
      state.currentSong.melodicPattern.noteDuration =
        action.payload.noteDuration;
      state.currentSong.melodicPattern.length = action.payload.length;
    },
    setMelodicPatternKey: (
      state,
      action: { payload: MusicalKey; type: string }
    ) => {
      state.currentSong.melodicPattern.key = action.payload;
    },
    setMelodicPatternScale: (
      state,
      action: { payload: MusicalScale; type: string }
    ) => {
      state.currentSong.melodicPattern.scale = action.payload;
    },
    setMelodicPatternTranspose: (
      state,
      action: { payload: number; type: string }
    ) => {
      state.currentSong.melodicPattern.transpose = action.payload;
    },
    setMelodicPatternType: (
      state,
      action: { payload: PatternName; type: string }
    ) => {
      state.currentSong.melodicPattern.patternType = action.payload;
    },
    setMelodicPatternTime: (
      state,
      action: { payload: NoteType; type: string }
    ) => {
      state.currentSong.melodicPattern.timeInterval = action.payload;
    },
    setMelodicPatternNoteDuration: (
      state,
      action: { payload: NoteType; type: string }
    ) => {
      state.currentSong.melodicPattern.noteDuration = action.payload;
    },
    setMelodicPatternLength: (
      state,
      action: { payload: number; type: string }
    ) => {
      state.currentSong.melodicPattern.length = action.payload;
    },
    setMelodicPatternSequence: (
      state,
      action: { payload: number[]; type: string }
    ) => {
      state.currentSong.melodicPattern.sequence = action.payload;
    },
    setKitPattern: (state, action: { type: string; payload: KitPattern }) => {
      state.currentSong.kitPattern.patternLength = action.payload.patternLength;
      state.currentSong.kitPattern.bdSteps = action.payload.bdSteps;
      state.currentSong.kitPattern.sdSteps = action.payload.sdSteps;
      state.currentSong.kitPattern.clSteps = action.payload.clSteps;
      state.currentSong.kitPattern.chSteps = action.payload.chSteps;
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
    setDistortion: (state, action: { payload: Distortion; type: string }) => {
      state.currentSong.distortion.mix = action.payload.mix;
      state.currentSong.distortion.amount = action.payload.amount;
      state.currentSong.distortion.filterFrequency =
        action.payload.filterFrequency;
    },
    setReverb: (state, action: { payload: Reverb; type: string }) => {
      state.currentSong.reverb.mix = action.payload.mix;
      state.currentSong.reverb.decay = action.payload.decay;
      state.currentSong.reverb.preDelay = action.payload.preDelay;
    },
    setDelay: (state, action: { payload: Delay; type: string }) => {
      state.currentSong.delay.mix = action.payload.mix;
      state.currentSong.delay.time = action.payload.time;
      state.currentSong.delay.feedback = action.payload.feedback;
    },
    setBassSynth: (state, action: { payload: BassSynth; type: string }) => {
      state.currentSong.bassSynth.attack = action.payload.attack;
      state.currentSong.bassSynth.decay = action.payload.decay;
      state.currentSong.bassSynth.sustain = action.payload.sustain;
      state.currentSong.bassSynth.release = action.payload.release;
      state.currentSong.bassSynth.waveform = action.payload.waveform;
      state.currentSong.bassSynth.filterFrequency =
        action.payload.filterFrequency;
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
  setBassSynthWaveform,
  setBassSynthFilterFrequency,
  setBassSynthAttack,
  setBassSynthDecay,
  setBassSynthSustain,
  setBassSynthRelease,
  setMelodicPatternKey,
  setMelodicPatternScale,
  setMelodicPatternTranspose,
  setMelodicPatternType,
  setMelodicPatternTime,
  setMelodicPatternNoteDuration,
  setMelodicPatternLength,
  setMelodicPatternSequence,
  setMelodicPattern,
  setKitPattern,
  setMelodicSynth,
  setDistortion,
  setReverb,
  setDelay,
  setBassSynth,
} = songSlice.actions;

export default songSlice.reducer;
