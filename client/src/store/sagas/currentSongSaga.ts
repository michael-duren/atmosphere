import * as Tone from 'tone';
import { call, put, takeEvery } from 'typed-redux-saga';
import {
  setBpm,
  setCurrentSong,
  setMasterVolume,
} from '../slices/songSlice.ts';
import {
  CURRENT_SONG_ACTIONS,
  LoadSongToCurrent,
  SetMasterVolumeAsync,
  SetSongBpmAsync,
} from '../actions/currentSongActions.ts';
import agent from '../../api/agent.ts';
import { Song } from '../../models/song.ts';
import { setToneParamsOnLoad } from '../../tone/setters/setToneParamsOnLoad.ts';
import toast from 'react-hot-toast';
import { songSchema } from '../../models/schemas/songSchema.ts';

export function* setSongBpmAsync(action: SetSongBpmAsync) {
  yield* put(setBpm(action.payload));
  Tone.Transport.bpm.value = action.payload;
}

export function* loadSongToCurrentAsync(action: LoadSongToCurrent) {
  try {
    const songToLoad: Song = yield call(agent.Song.single, action.payload.id);
    yield songSchema.validate(songToLoad);
    yield put(setCurrentSong(songToLoad));
    yield setToneParamsOnLoad(songToLoad);
    console.log('SONG TO LOAD', songToLoad);
    toast.success(`${action.payload.songName} loaded`);
  } catch (e) {
    console.error(e);
    toast.error(`Error loading song`);
  }
}

export function* setMasterVolumeAsync(action: SetMasterVolumeAsync) {
  yield* put(setMasterVolume(action.payload));
}

export function* currentSongSaga() {
  yield* takeEvery(CURRENT_SONG_ACTIONS.SET_SONG_BPM_ASYNC, setSongBpmAsync);
  yield* takeEvery(
    CURRENT_SONG_ACTIONS.SET_MASTER_VOLUME_ASYNC,
    setMasterVolumeAsync
  );
  yield* takeEvery(
    CURRENT_SONG_ACTIONS.LOAD_SONG_TO_CURRENT,
    loadSongToCurrentAsync
  );
}
