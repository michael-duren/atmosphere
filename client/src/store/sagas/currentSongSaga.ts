import * as Tone from 'tone';
import { put, takeEvery } from 'typed-redux-saga';
import { setBpm } from '../slices/songSlice.ts';
import {
  CURRENT_SONG_ACTIONS,
  SetSongBpmAsync,
} from '../actions/currentSongActions.ts';

export function* setSongBpmAsync(action: SetSongBpmAsync) {
  yield* put(setBpm(action.payload));
  Tone.Transport.bpm.value = action.payload;
}

export function* currentSongSaga() {
  yield* takeEvery(CURRENT_SONG_ACTIONS.SET_SONG_BPM_ASYNC, setSongBpmAsync);
}
