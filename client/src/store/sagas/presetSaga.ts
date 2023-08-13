import { all, call, put, takeEvery } from 'typed-redux-saga';
import agent from '../../api/agent.ts';
import {
  EffectList,
  InstrumentList,
  PatternList,
} from '../../api/presetRequests.ts';
import { setEffects, setPatterns, setSynths } from '../slices/presetSlice.ts';
import {
  CreateBassSynth,
  CreateDelayEffect,
  CreateDistortionEffect,
  CreateKitPattern,
  CreateMelodicPattern,
  CreateMelodicSynth,
  CreateReverbEffect,
  DeleteBassSynth,
  DeleteDelayEffect,
  DeleteDistortionEffect,
  DeleteKitPattern,
  DeleteMelodicPattern,
  DeleteMelodicSynth,
  DeleteReverbEffect,
  LoadBassSynth,
  LoadDelayEffect,
  LoadDistortionEffect,
  LoadKitPattern,
  LoadMelodicPattern,
  LoadReverbEffect,
  PRESET_ACTIONS,
  UpdateBassSynth,
  UpdateDelayEffect,
  UpdateDistortionEffect,
  UpdateKitPattern,
  UpdateMelodicPattern,
  UpdateMelodicSynth,
  UpdateReverbEffect,
} from '../actions/presetActions.ts';
import {
  BassSynth,
  Delay,
  Distortion,
  KitPattern,
  MelodicPattern,
  MelodicSynth,
  Reverb,
} from '../../models/song.ts';
import {
  setBassSynth,
  setDelay,
  setDistortion,
  setKitPattern,
  setMelodicPattern,
  setMelodicSynth,
  setReverb,
} from '../slices/songSlice.ts';
import { setToneMelodicSynth } from '../../tone/setters/setToneMelodicSynthParams.ts';
import {
  setToneDelay,
  setToneDistortion,
  setToneReverb,
} from '../../tone/setters/setToneMixParams.ts';
import { setToneBassSynth } from '../../tone/setters/setToneBassSynthParams.ts';
import toast from 'react-hot-toast';

export function* getAllEffects() {
  const effects: EffectList = yield call(agent.Preset.Effects.list);
  yield put(setEffects(effects));
}

export function* getAllInstruments() {
  const instruments: InstrumentList = yield call(agent.Preset.Instruments.list);
  yield put(setSynths(instruments));
}

export function* getAllPatterns() {
  const patterns: PatternList = yield call(agent.Preset.Patterns.list);
  console.log(patterns);
  yield put(setPatterns(patterns));
}

export function* getAllPresets() {
  yield all([
    call(getAllEffects),
    call(getAllInstruments),
    call(getAllPatterns),
  ]);
}

// patterns
export function* loadMelodicPattern({ payload }: LoadMelodicPattern) {
  try {
    const pattern: MelodicPattern = yield call(
      agent.Preset.Patterns.getMelodicPatternById,
      +payload
    );
    yield put(setMelodicPattern(pattern));
    toast.success('Pattern loaded');
  } catch (e) {
    toast.error('Error loading pattern');
    console.error(e);
  }
}
export function* createMelodicPattern({ payload }: CreateMelodicPattern) {
  try {
    const pattern: MelodicPattern = yield call(
      agent.Preset.Patterns.createMelodicPattern,
      payload
    );
    yield put(setMelodicPattern(pattern));
    toast.success('Pattern created');
    yield put({ type: PRESET_ACTIONS.GET_ALL_PATTERNS_ASYNC });
  } catch (e) {
    toast.error('Error creating pattern');
  }
}

export function* updateMelodicPattern({ payload }: UpdateMelodicPattern) {
  try {
    yield call(agent.Preset.Patterns.updateMelodicPattern, payload);
    toast.success('Pattern updated');
    yield put({ type: PRESET_ACTIONS.GET_ALL_PATTERNS_ASYNC });
  } catch (e) {
    toast.error('Error updating pattern');
  }
}

export function* deleteMelodicPattern({ payload }: DeleteMelodicPattern) {
  try {
    yield call(agent.Preset.Patterns.deleteMelodicPattern, +payload);
    toast.success('Pattern deleted');
    yield put({ type: PRESET_ACTIONS.GET_ALL_PATTERNS_ASYNC });
  } catch (e) {
    toast.error('Error deleting pattern');
  }
}

export function* loadKitPattern({ payload }: LoadKitPattern) {
  try {
    const pattern: KitPattern = yield call(
      agent.Preset.Patterns.getKitPatternById,
      +payload
    );
    yield put(setKitPattern(pattern));
    toast.success('Pattern loaded');
  } catch (e) {
    console.error(e);
    toast.error('Error loading pattern');
  }
}

export function* createKitPattern({ payload }: CreateKitPattern) {
  try {
    const pattern: KitPattern = yield call(
      agent.Preset.Patterns.createKitPattern,
      payload
    );
    yield put(setKitPattern(pattern));
    toast.success('Pattern created');
    yield put({ type: PRESET_ACTIONS.GET_ALL_PATTERNS_ASYNC });
  } catch (e) {
    toast.error('Error creating pattern');
  }
}

export function* updateKitPattern({ payload }: UpdateKitPattern) {
  try {
    yield call(agent.Preset.Patterns.updateKitPattern, payload);
    toast.success('Pattern updated');
    yield put({ type: PRESET_ACTIONS.GET_ALL_PATTERNS_ASYNC });
  } catch (e) {
    toast.error('Error updating pattern');
  }
}

export function* deleteKitPattern({ payload }: DeleteKitPattern) {
  try {
    yield call(agent.Preset.Patterns.deleteKitPattern, +payload);
    toast.success('Pattern deleted');
    yield put({ type: PRESET_ACTIONS.GET_ALL_PATTERNS_ASYNC });
  } catch (e) {
    toast.error('Error deleting pattern');
  }
}

// instruments
export function* loadMelodicSynth({ payload }: LoadMelodicPattern) {
  try {
    const synth: MelodicSynth = yield call(
      agent.Preset.Instruments.getMelodicSynthById,
      +payload
    );
    yield put(setMelodicSynth(synth));
    yield call(setToneMelodicSynth, synth);
    toast.success('Synth loaded');
  } catch (e) {
    toast.error('Error loading synth');
    console.error(e);
  }
}

export function* createMelodicSynth({ payload }: CreateMelodicSynth) {
  try {
    const synth: MelodicSynth = yield call(
      agent.Preset.Instruments.createMelodicSynth,
      payload
    );
    yield put(setMelodicSynth(synth));
    toast.success('Synth created');
    yield put({ type: PRESET_ACTIONS.GET_ALL_INSTRUMENTS_ASYNC });
  } catch (e) {
    toast.error('Error creating synth');
  }
}

export function* updateMelodicSynth({ payload }: UpdateMelodicSynth) {
  try {
    yield call(agent.Preset.Instruments.updateMelodicSynth, payload);
    toast.success('Synth updated');
    yield put({ type: PRESET_ACTIONS.GET_ALL_INSTRUMENTS_ASYNC });
  } catch (e) {
    toast.error('Error updating pattern');
  }
}

export function* deleteMelodicSynth({ payload }: DeleteMelodicSynth) {
  try {
    yield call(agent.Preset.Instruments.deleteMelodicSynth, +payload);
    toast.success('Synth deleted');
    yield put({ type: PRESET_ACTIONS.GET_ALL_INSTRUMENTS_ASYNC });
  } catch (e) {
    toast.error('Error deleting pattern');
  }
}

export function* loadBassSynth({ payload }: LoadBassSynth) {
  try {
    const synth: BassSynth = yield call(
      agent.Preset.Instruments.getBassSynthById,
      +payload
    );
    yield put(setBassSynth(synth));
    yield call(setToneBassSynth, synth);
    toast.success('Bass Synth loaded');
  } catch (e) {
    toast.error('Error loading synth');
    console.error(e);
  }
}

export function* createBassSynth({ payload }: CreateBassSynth) {
  try {
    const synth: BassSynth = yield call(
      agent.Preset.Instruments.createBassSynth,
      payload
    );
    yield put(setBassSynth(synth));
    toast.success('Synth created');
    yield put({ type: PRESET_ACTIONS.GET_ALL_INSTRUMENTS_ASYNC });
  } catch (e) {
    toast.error('Error creating synth');
  }
}

export function* updateBassSynth({ payload }: UpdateBassSynth) {
  try {
    yield call(agent.Preset.Instruments.updateBassSynth, payload);
    toast.success('Synth updated');
    yield put({ type: PRESET_ACTIONS.GET_ALL_INSTRUMENTS_ASYNC });
  } catch (e) {
    toast.error('Error updating bass synth');
  }
}

export function* deleteBassSynth({ payload }: DeleteBassSynth) {
  try {
    yield call(agent.Preset.Instruments.deleteBassSynth, +payload);
    toast.success('Synth deleted');
    yield put({ type: PRESET_ACTIONS.GET_ALL_INSTRUMENTS_ASYNC });
  } catch (e) {
    toast.error('Error deleting bass synth');
  }
}

// effects
export function* loadDistortion({ payload }: LoadDistortionEffect) {
  const distortion: Distortion = yield call(
    agent.Preset.Effects.getDistortionById,
    +payload
  );
  yield put(setDistortion(distortion));
  yield call(setToneDistortion, distortion);
}

export function* createDistortion({ payload }: CreateDistortionEffect) {
  try {
    const distortion: Distortion = yield call(
      agent.Preset.Effects.createDistortion,
      payload
    );
    yield put(setDistortion(distortion));
    toast.success('Distortion created');
    yield put({ type: PRESET_ACTIONS.GET_ALL_PRESETS_ASYNC });
  } catch (e) {
    toast.error('Error creating distortion');
  }
}

export function* updateDistortion({ payload }: UpdateDistortionEffect) {
  try {
    yield call(agent.Preset.Effects.updateDistortion, payload);
    toast.success('Distortion updated');
    yield put({ type: PRESET_ACTIONS.GET_ALL_PRESETS_ASYNC });
  } catch (e) {
    toast.error('Error updating distortion');
  }
}

export function* deleteDistortion({ payload }: DeleteDistortionEffect) {
  try {
    yield call(agent.Preset.Effects.deleteDistortion, +payload);
    toast.success('Distortion deleted');
    yield put({ type: PRESET_ACTIONS.GET_ALL_PRESETS_ASYNC });
  } catch (e) {
    toast.error('Error deleting distortion');
  }
}

export function* loadReverb({ payload }: LoadReverbEffect) {
  const reverb: Reverb = yield call(
    agent.Preset.Effects.getReverbById,
    +payload
  );
  yield put(setReverb(reverb));
  yield call(setToneReverb, reverb);
}

export function* createReverb({ payload }: CreateReverbEffect) {
  try {
    const reverb: Reverb = yield call(
      agent.Preset.Effects.createReverb,
      payload
    );
    yield put(setReverb(reverb));
    toast.success('Reverb created');
    yield put({ type: PRESET_ACTIONS.GET_ALL_PRESETS_ASYNC });
  } catch (e) {
    toast.error('Error creating reverb');
  }
}

export function* updateReverb({ payload }: UpdateReverbEffect) {
  try {
    yield call(agent.Preset.Effects.updateReverb, payload);
    toast.success('Reverb updated');
    yield put({ type: PRESET_ACTIONS.GET_ALL_PRESETS_ASYNC });
  } catch (e) {
    toast.error('Error updating reverb');
  }
}

export function* deleteReverb({ payload }: DeleteReverbEffect) {
  try {
    yield call(agent.Preset.Effects.deleteReverb, +payload);
    toast.success('Reverb deleted');
    yield put({ type: PRESET_ACTIONS.GET_ALL_PRESETS_ASYNC });
  } catch (e) {
    toast.error('Error deleting reverb');
  }
}

export function* loadDelay({ payload }: LoadDelayEffect) {
  const delay: Delay = yield call(agent.Preset.Effects.getDelayById, +payload);
  yield put(setDelay(delay));
  yield call(setToneDelay, delay);
}

export function* createDelay({ payload }: CreateDelayEffect) {
  try {
    const reverb: Delay = yield call(agent.Preset.Effects.createDelay, payload);
    yield put(setDelay(reverb));
    toast.success('Delay created');
    yield put({ type: PRESET_ACTIONS.GET_ALL_PRESETS_ASYNC });
  } catch (e) {
    toast.error('Error creating reverb');
  }
}

export function* updateDelay({ payload }: UpdateDelayEffect) {
  try {
    yield call(agent.Preset.Effects.updateDelay, payload);
    toast.success('Delay updated');
    yield put({ type: PRESET_ACTIONS.GET_ALL_PRESETS_ASYNC });
  } catch (e) {
    toast.error('Error updating reverb');
  }
}

export function* deleteDelay({ payload }: DeleteDelayEffect) {
  try {
    yield call(agent.Preset.Effects.deleteDelay, +payload);
    toast.success('Delay deleted');
    yield put({ type: PRESET_ACTIONS.GET_ALL_PRESETS_ASYNC });
  } catch (e) {
    toast.error('Error deleting reverb');
  }
}

export function* presetSaga() {
  yield* takeEvery(PRESET_ACTIONS.GET_ALL_EFFECTS_ASYNC, getAllEffects);
  yield* takeEvery(PRESET_ACTIONS.GET_ALL_INSTRUMENTS_ASYNC, getAllInstruments);
  yield* takeEvery(PRESET_ACTIONS.GET_ALL_PATTERNS_ASYNC, getAllPatterns);
  yield* takeEvery(PRESET_ACTIONS.GET_ALL_PRESETS_ASYNC, getAllPresets);
  // patterns
  yield* takeEvery(
    PRESET_ACTIONS.LOAD_MELODIC_PATTERN_ASYNC,
    loadMelodicPattern
  );
  yield* takeEvery(
    PRESET_ACTIONS.CREATE_MELODIC_PATTERN_ASYNC,
    createMelodicPattern
  );
  yield* takeEvery(
    PRESET_ACTIONS.DELETE_MELODIC_PATTERN_ASYNC,
    deleteMelodicPattern
  );
  yield* takeEvery(
    PRESET_ACTIONS.UPDATE_MELODIC_PATTERN_ASYNC,
    updateMelodicPattern
  );
  yield* takeEvery(PRESET_ACTIONS.LOAD_KIT_PATTERN_ASYNC, loadKitPattern);
  yield* takeEvery(PRESET_ACTIONS.CREATE_KIT_PATTERN_ASYNC, createKitPattern);
  yield* takeEvery(PRESET_ACTIONS.UPDATE_KIT_PATTERN_ASYNC, updateKitPattern);
  yield* takeEvery(PRESET_ACTIONS.DELETE_KIT_PATTERN_ASYNC, deleteKitPattern);

  // instruments
  yield* takeEvery(PRESET_ACTIONS.LOAD_MELODIC_SYNTH_ASYNC, loadMelodicSynth);
  yield* takeEvery(
    PRESET_ACTIONS.CREATE_MELODIC_SYNTH_ASYNC,
    createMelodicSynth
  );
  yield* takeEvery(
    PRESET_ACTIONS.UPDATE_MELODIC_SYNTH_ASYNC,
    updateMelodicSynth
  );
  yield* takeEvery(
    PRESET_ACTIONS.DELETE_MELODIC_SYNTH_ASYNC,
    deleteMelodicSynth
  );
  yield* takeEvery(PRESET_ACTIONS.LOAD_BASS_SYNTH_ASYNC, loadBassSynth);
  yield* takeEvery(PRESET_ACTIONS.CREATE_BASS_SYNTH_ASYNC, createBassSynth);
  yield* takeEvery(PRESET_ACTIONS.UPDATE_BASS_SYNTH_ASYNC, updateBassSynth);
  yield* takeEvery(PRESET_ACTIONS.DELETE_BASS_SYNTH_ASYNC, deleteBassSynth);

  // effects
  yield* takeEvery(PRESET_ACTIONS.LOAD_DISTORTION_EFFECT_ASYNC, loadDistortion);
  yield* takeEvery(
    PRESET_ACTIONS.CREATE_DISTORTION_EFFECT_ASYNC,
    createDistortion
  );
  yield* takeEvery(
    PRESET_ACTIONS.UPDATE_DISTORTION_EFFECT_ASYNC,
    updateDistortion
  );
  yield* takeEvery(
    PRESET_ACTIONS.DELETE_DISTORTION_EFFECT_ASYNC,
    deleteDistortion
  );
  yield* takeEvery(PRESET_ACTIONS.LOAD_REVERB_EFFECT_ASYNC, loadReverb);
  yield* takeEvery(PRESET_ACTIONS.CREATE_REVERB_EFFECT_ASYNC, createReverb);
  yield* takeEvery(PRESET_ACTIONS.UPDATE_REVERB_EFFECT_ASYNC, updateReverb);
  yield* takeEvery(PRESET_ACTIONS.DELETE_REVERB_EFFECT_ASYNC, deleteReverb);
  yield* takeEvery(PRESET_ACTIONS.LOAD_DELAY_EFFECT_ASYNC, loadDelay);
  yield* takeEvery(PRESET_ACTIONS.CREATE_DELAY_EFFECT_ASYNC, createDelay);
  yield* takeEvery(PRESET_ACTIONS.UPDATE_DELAY_EFFECT_ASYNC, updateDelay);
  yield* takeEvery(PRESET_ACTIONS.DELETE_DELAY_EFFECT_ASYNC, deleteDelay);
}
