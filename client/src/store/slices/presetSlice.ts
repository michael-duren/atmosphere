import { ServerValidationError } from '../../models/serverValidationError.ts';
import { ServerError } from '../../models/serverError.ts';
import {
  BassSynth,
  Delay,
  Distortion,
  KitPattern,
  MelodicPattern,
  MelodicSynth,
  Reverb,
} from '../../models/song.ts';
import { createSlice } from '@reduxjs/toolkit';

interface CurrentPresets {
  effects: {
    distortionPresets: Distortion[];
    reverbPresets: Reverb[];
    delayPresets: Delay[];
  };
  synths: {
    bassSynths: BassSynth[] | null;
    melodicSynths: MelodicSynth[] | null;
  };
  patterns: {
    melodicPatterns: MelodicPattern[] | null;
    kitPatterns: KitPattern[] | null;
  };
}

export interface PresetState {
  error: ServerError | ServerValidationError | null | unknown;
  currentPresets: CurrentPresets;
}

const initialPresetState: PresetState = {
  error: null,
  currentPresets: {
    effects: {
      distortionPresets: [],
      reverbPresets: [],
      delayPresets: [],
    },
    synths: {
      bassSynths: null,
      melodicSynths: null,
    },
    patterns: {
      melodicPatterns: null,
      kitPatterns: null,
    },
  },
};

const presetSlice = createSlice({
  name: 'preset',
  initialState: initialPresetState,
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
    setEffects: (
      state,
      action: { payload: CurrentPresets['effects']; type: string }
    ) => {
      state.currentPresets.effects = action.payload;
    },
    setSynths: (
      state,
      action: { payload: CurrentPresets['synths']; type: string }
    ) => {
      state.currentPresets.synths = action.payload;
    },
    setPatterns: (
      state,
      action: { payload: CurrentPresets['patterns']; type: string }
    ) => {
      state.currentPresets.patterns = action.payload;
    },
  },
});

export const { setError, setEffects, setSynths, setPatterns } =
  presetSlice.actions;

export default presetSlice.reducer;
