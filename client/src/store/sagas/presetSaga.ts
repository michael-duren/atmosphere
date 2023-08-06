import { all, call, put, takeEvery } from 'typed-redux-saga';
import agent from '../../api/agent.ts';
import {
  EffectList,
  InstrumentList,
  PatternList,
} from '../../api/presetRequests.ts';
import { setEffects, setPatterns, setSynths } from '../slices/presetSlice.ts';
import { PRESET_ACTIONS } from '../actions/presetActions.ts';

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

export function* presetSaga() {
  yield* takeEvery(PRESET_ACTIONS.GET_ALL_EFFECTS_ASYNC, getAllEffects);
  yield* takeEvery(PRESET_ACTIONS.GET_ALL_INSTRUMENTS_ASYNC, getAllInstruments);
  yield* takeEvery(PRESET_ACTIONS.GET_ALL_PATTERNS_ASYNC, getAllPatterns);
  yield* takeEvery(PRESET_ACTIONS.GET_ALL_PRESETS_ASYNC, getAllPresets);
}
