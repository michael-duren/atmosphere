import { all, call } from 'typed-redux-saga';
import { userSaga } from './sagas/userSaga.ts';
import { songSaga } from './sagas/songSaga.ts';

export function* rootSaga() {
  yield* all([call(userSaga), call(songSaga)]);
}
