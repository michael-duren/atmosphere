import agent from '../../api/agent.ts';
import { call, put, takeEvery } from 'typed-redux-saga';
import { setSongList } from '../slices/songSlice.ts';
import { SONG_ACTIONS } from '../actions/songActions.ts';

export function* getSongList() {
  try {
    const songList = yield* call(agent.Song.list);
    yield put(setSongList(songList));
  } catch (e: any) {
    console.log(e);
  }
}

export function* songSaga() {
  yield* takeEvery(SONG_ACTIONS.GET_SONG_LIST_ASYNC, getSongList);
}
