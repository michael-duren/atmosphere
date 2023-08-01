import agent from '../../api/agent.ts';
import { call, put, takeEvery } from 'typed-redux-saga';
import {
  setBpm,
  setCurrentSong,
  setError,
  setMasterVolume,
  setSongList,
} from '../slices/songSlice.ts';
import {
  CreateNewSongAsync,
  DeleteSongAsync,
  LoadSongToCurrentAsync,
  SetMasterVolumeAsync,
  SetSongBpmAsync,
  SONG_ACTIONS,
  UpdateSongAsync,
} from '../actions/songActions.ts';
import * as Tone from 'tone';
import { Song } from '../../models/song.ts';
import { songSchema } from '../../models/schemas/songSchema.ts';
import { setToneParamsOnLoad } from '../../tone/setters/setToneParamsOnLoad.ts';
import toast from 'react-hot-toast';
import initialSongState from '../slices/initialState/initialSongState.ts';
import {
  setDeleteSongModalOpen,
  setSaveModalOpen,
} from '../slices/commonSlice.ts';

/*
 * HTTP Requests & Related Functions
 */
export function* getSongList() {
  try {
    const songList = yield* call(agent.Song.list);
    yield put(setSongList(songList));
  } catch (e: any) {
    console.error(e);
  }
}
export function* loadSongToCurrentAsync(action: LoadSongToCurrentAsync) {
  try {
    const songToLoad: Song = yield call(agent.Song.single, action.payload.id);
    yield songSchema.validate(songToLoad);
    yield put(setCurrentSong(songToLoad));
    yield setToneParamsOnLoad(songToLoad);
    toast.success(`${action.payload.songName} loaded`);
  } catch (e) {
    console.error(e);
    toast.error(`Error loading song`);
  }
}

export function* createNewSongAsync({ payload }: CreateNewSongAsync) {
  try {
    yield songSchema.isValid(payload); // validate song before sending to server
    const createdSong: Song = yield call(agent.Song.create, payload); // send to server and get response with song id
    yield put(setCurrentSong(createdSong)); // set current song in redux store
    yield* put({ type: SONG_ACTIONS.GET_SONG_LIST_ASYNC }); // get updated song list
    toast.success(`${payload.songName} was saved`); // notify user
    yield put(setSaveModalOpen(false));
  } catch (e) {
    console.error(e);
    yield put(setError(e));
    toast.error(`Error saving ${payload.songName} song`);
  }
}

export function* updateSongAsync({ payload }: UpdateSongAsync) {
  try {
    yield songSchema.isValid(payload); // validate song before sending to server
    yield call(agent.Song.update, payload); // send to server and get response with song id
    toast.success(`${payload.songName} was saved`); // notify user
    yield put(setSaveModalOpen(false));
  } catch (e) {
    console.error(e);
    yield put(setError(e));
    toast.error(`Error saving ${payload.songName} song`);
  }
}

export function* deleteSongAsync({ payload }: DeleteSongAsync) {
  try {
    yield songSchema.validate(payload); // validate song before sending to server
    yield call(agent.Song.delete, payload); // send to server and get response with song id
    toast.success(`${payload.songName} was deleted`); // notify user
    yield put(setDeleteSongModalOpen(false)); // close delete modal
    yield* put({ type: SONG_ACTIONS.GET_SONG_LIST_ASYNC }); // get updated song list
  } catch (e) {
    console.error(e);
    toast.error(`Error deleting ${payload.songName} song`);
  }
}

/*
 * Local Functions
 */
export function* setNewSongAsync() {
  try {
    yield put(setCurrentSong(initialSongState.currentSong));
    yield setToneParamsOnLoad(initialSongState.currentSong);
    toast.success(`New song created`);
  } catch (e) {
    console.error(e);
    toast.error(`Error creating new song`);
  }
}

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
  yield* takeEvery(SONG_ACTIONS.SET_SONG_BPM_ASYNC, setSongBpmAsync);
  yield* takeEvery(SONG_ACTIONS.SET_MASTER_VOLUME_ASYNC, setMasterVolumeAsync);
  yield* takeEvery(
    SONG_ACTIONS.LOAD_SONG_TO_CURRENT_ASYNC,
    loadSongToCurrentAsync
  );
  yield* takeEvery(SONG_ACTIONS.SET_NEW_SONG_ASYNC, setNewSongAsync);
  yield* takeEvery(SONG_ACTIONS.CREATE_NEW_SONG_ASYNC, createNewSongAsync);
  yield* takeEvery(SONG_ACTIONS.UPDATE_SONG_ASYNC, updateSongAsync);
  yield* takeEvery(SONG_ACTIONS.DELETE_SONG_ASYNC, deleteSongAsync);
}
