import {
  BassSynth,
  Delay,
  Distortion,
  KitPattern,
  MelodicPattern,
  MelodicSynth,
  Reverb,
} from '../../models/song.ts';

export const PRESET_ACTIONS = {
  GET_ALL_EFFECTS_ASYNC: 'GET_ALL_EFFECTS_ASYNC',
  GET_ALL_INSTRUMENTS_ASYNC: 'GET_ALL_INSTRUMENTS_ASYNC',
  GET_ALL_PATTERNS_ASYNC: 'GET_ALL_PATTERNS_ASYNC',
  GET_ALL_PRESETS_ASYNC: 'GET_ALL_PRESETS_ASYNC',

  // patterns
  LOAD_MELODIC_PATTERN_ASYNC: 'LOAD_MELODIC_PATTERN_ASYNC',
  CREATE_MELODIC_PATTERN_ASYNC: 'CREATE_MELODIC_PATTERN_ASYNC',
  UPDATE_MELODIC_PATTERN_ASYNC: 'UPDATE_MELODIC_PATTERN_ASYNC',
  DELETE_MELODIC_PATTERN_ASYNC: 'DELETE_MELODIC_PATTERN_ASYNC',
  LOAD_KIT_PATTERN_ASYNC: 'LOAD_KIT_PATTERN_ASYNC',
  CREATE_KIT_PATTERN_ASYNC: 'CREATE_KIT_PATTERN_ASYNC',
  UPDATE_KIT_PATTERN_ASYNC: 'UPDATE_KIT_PATTERN_ASYNC',
  DELETE_KIT_PATTERN_ASYNC: 'DELETE_KIT_PATTERN_ASYNC',

  // instruments
  LOAD_MELODIC_SYNTH_ASYNC: 'LOAD_MELODIC_SYNTH_ASYNC',
  CREATE_MELODIC_SYNTH_ASYNC: 'CREATE_MELODIC_SYNTH_ASYNC',
  UPDATE_MELODIC_SYNTH_ASYNC: 'UPDATE_MELODIC_SYNTH_ASYNC',
  DELETE_MELODIC_SYNTH_ASYNC: 'DELETE_MELODIC_SYNTH_ASYNC',
  LOAD_BASS_SYNTH_ASYNC: 'LOAD_BASS_SYNTH_ASYNC',
  CREATE_BASS_SYNTH_ASYNC: 'CREATE_BASS_SYNTH_ASYNC',
  UPDATE_BASS_SYNTH_ASYNC: 'UPDATE_BASS_SYNTH_ASYNC',
  DELETE_BASS_SYNTH_ASYNC: 'DELETE_BASS_SYNTH_ASYNC',

  // effects
  LOAD_DISTORTION_EFFECT_ASYNC: 'LOAD_DISTORTION_EFFECT_ASYNC',
  CREATE_DISTORTION_EFFECT_ASYNC: 'CREATE_DISTORTION_EFFECT_ASYNC',
  UPDATE_DISTORTION_EFFECT_ASYNC: 'UPDATE_DISTORTION_EFFECT_ASYNC',
  DELETE_DISTORTION_EFFECT_ASYNC: 'DELETE_DISTORTION_EFFECT_ASYNC',
  LOAD_REVERB_EFFECT_ASYNC: 'LOAD_REVERB_EFFECT_ASYNC',
  CREATE_REVERB_EFFECT_ASYNC: 'CREATE_REVERB_EFFECT_ASYNC',
  UPDATE_REVERB_EFFECT_ASYNC: 'UPDATE_REVERB_EFFECT_ASYNC',
  DELETE_REVERB_EFFECT_ASYNC: 'DELETE_REVERB_EFFECT_ASYNC',
  LOAD_DELAY_EFFECT_ASYNC: 'LOAD_DELAY_EFFECT_ASYNC',
  CREATE_DELAY_EFFECT_ASYNC: 'CREATE_DELAY_EFFECT_ASYNC',
  UPDATE_DELAY_EFFECT_ASYNC: 'UPDATE_DELAY_EFFECT_ASYNC',
  DELETE_DELAY_EFFECT_ASYNC: 'DELETE_DELAY_EFFECT_ASYNC',
};

// patterns
export interface LoadMelodicPattern {
  type: typeof PRESET_ACTIONS.LOAD_MELODIC_PATTERN_ASYNC;
  payload: MelodicPattern;
}

export interface CreateMelodicPattern {
  type: typeof PRESET_ACTIONS.CREATE_MELODIC_PATTERN_ASYNC;
  payload: MelodicPattern;
}

export interface UpdateMelodicPattern {
  type: typeof PRESET_ACTIONS.UPDATE_MELODIC_PATTERN_ASYNC;
  payload: MelodicPattern;
}

export interface DeleteMelodicPattern {
  type: typeof PRESET_ACTIONS.DELETE_MELODIC_PATTERN_ASYNC;
  payload: MelodicPattern;
}

export interface CreateKitPattern {
  type: typeof PRESET_ACTIONS.CREATE_KIT_PATTERN_ASYNC;
  payload: KitPattern;
}

export interface UpdateKitPattern {
  type: typeof PRESET_ACTIONS.UPDATE_KIT_PATTERN_ASYNC;
  payload: KitPattern;
}

export interface DeleteKitPattern {
  type: typeof PRESET_ACTIONS.DELETE_KIT_PATTERN_ASYNC;
  payload: KitPattern;
}

// instruments

export interface LoadMelodicSynth {
  type: typeof PRESET_ACTIONS.LOAD_MELODIC_SYNTH_ASYNC;
  payload: MelodicSynth;
}

export interface CreateMelodicSynth {
  type: typeof PRESET_ACTIONS.CREATE_MELODIC_SYNTH_ASYNC;
  payload: MelodicSynth;
}

export interface UpdateMelodicSynth {
  type: typeof PRESET_ACTIONS.UPDATE_MELODIC_SYNTH_ASYNC;
  payload: MelodicSynth;
}

export interface DeleteMelodicSynth {
  type: typeof PRESET_ACTIONS.DELETE_MELODIC_SYNTH_ASYNC;
  payload: MelodicSynth;
}

export interface LoadBassSynth {
  type: typeof PRESET_ACTIONS.LOAD_BASS_SYNTH_ASYNC;
  payload: BassSynth;
}

export interface CreateBassSynth {
  type: typeof PRESET_ACTIONS.CREATE_BASS_SYNTH_ASYNC;
  payload: BassSynth;
}

export interface UpdateBassSynth {
  type: typeof PRESET_ACTIONS.UPDATE_BASS_SYNTH_ASYNC;
  payload: BassSynth;
}

export interface DeleteBassSynth {
  type: typeof PRESET_ACTIONS.DELETE_BASS_SYNTH_ASYNC;
  payload: BassSynth;
}

// effects
export interface LoadDistortionEffect {
  type: typeof PRESET_ACTIONS.LOAD_DISTORTION_EFFECT_ASYNC;
  payload: Distortion;
}

export interface CreateDistortionEffect {
  type: typeof PRESET_ACTIONS.CREATE_DISTORTION_EFFECT_ASYNC;
  payload: Distortion;
}

export interface UpdateDistortionEffect {
  type: typeof PRESET_ACTIONS.UPDATE_DISTORTION_EFFECT_ASYNC;
  payload: Distortion;
}

export interface DeleteDistortionEffect {
  type: typeof PRESET_ACTIONS.DELETE_DISTORTION_EFFECT_ASYNC;
  payload: Distortion;
}

export interface LoadReverbEffect {
  type: typeof PRESET_ACTIONS.LOAD_REVERB_EFFECT_ASYNC;
  payload: Reverb;
}

export interface CreateReverbEffect {
  type: typeof PRESET_ACTIONS.CREATE_REVERB_EFFECT_ASYNC;
  payload: Reverb;
}

export interface UpdateReverbEffect {
  type: typeof PRESET_ACTIONS.UPDATE_REVERB_EFFECT_ASYNC;
  payload: Reverb;
}

export interface DeleteReverbEffect {
  type: typeof PRESET_ACTIONS.DELETE_REVERB_EFFECT_ASYNC;
  payload: Reverb;
}

export interface LoadDelayEffect {
  type: typeof PRESET_ACTIONS.LOAD_DELAY_EFFECT_ASYNC;
  payload: Delay;
}

export interface CreateDelayEffect {
  type: typeof PRESET_ACTIONS.CREATE_DELAY_EFFECT_ASYNC;
  payload: Delay;
}

export interface UpdateDelayEffect {
  type: typeof PRESET_ACTIONS.UPDATE_DELAY_EFFECT_ASYNC;
  payload: Delay;
}

export interface DeleteDelayEffect {
  type: typeof PRESET_ACTIONS.DELETE_DELAY_EFFECT_ASYNC;
  payload: Delay;
}
