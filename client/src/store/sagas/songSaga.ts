import agent from '../../api/agent.ts';
import { call, put, takeEvery } from 'typed-redux-saga';
import {
  setBpm,
  setCurrentSong,
  setMasterVolume,
  setSongList,
} from '../slices/songSlice.ts';
import {
  LoadSongToCurrent,
  SetMasterVolumeAsync,
  SetSongBpmAsync,
  SONG_ACTIONS,
} from '../actions/songActions.ts';
import * as Tone from 'tone';
import { Song } from '../../models/song.ts';
import { songSchema } from '../../models/schemas/songSchema.ts';
import { setToneParamsOnLoad } from '../../tone/setters/setToneParamsOnLoad.ts';
import toast from 'react-hot-toast';

/*
 * HTTP Requests & Related Functions
 */
export function* getSongList() {
  try {
    const songList = yield* call(agent.Song.list);
    yield put(setSongList(songList));
  } catch (e: any) {
    console.log(e);
  }
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

/*
 * Local Functions
 */
export function* setMasterVolumeAsync(action: SetMasterVolumeAsync) {
  yield* put(setMasterVolume(action.payload));
}
export function* setSongBpmAsync(action: SetSongBpmAsync) {
  yield* put(setBpm(action.payload));
  Tone.Transport.bpm.value = action.payload;
}

/*
 * Watchers
 */
export function* songSaga() {
  yield* takeEvery(SONG_ACTIONS.GET_SONG_LIST_ASYNC, getSongList);
  yield takeEvery(SONG_ACTIONS.SET_SONG_BPM_ASYNC, setSongBpmAsync);
  yield takeEvery(SONG_ACTIONS.SET_MASTER_VOLUME_ASYNC, setMasterVolumeAsync);
  yield takeEvery(SONG_ACTIONS.LOAD_SONG_TO_CURRENT, loadSongToCurrentAsync);
}
