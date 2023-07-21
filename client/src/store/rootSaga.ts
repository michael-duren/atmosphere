import { all, call } from 'typed-redux-saga';
import { userSaga } from './sagas/userSaga.ts';
import { songSaga } from './sagas/songSaga.ts';
import { currentSongSaga } from './sagas/currentSongSaga.ts';

export function* rootSaga() {
  yield* all([call(userSaga), call(songSaga), call(currentSongSaga)]);
}
