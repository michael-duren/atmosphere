import { all, call } from 'typed-redux-saga';
import { userSaga } from './sagas/userSaga.ts';
import { songSaga } from './sagas/songSaga.ts';
import { presetSaga } from './sagas/presetSaga.ts';

export function* rootSaga() {
  yield* all([call(userSaga), call(songSaga), call(presetSaga)]);
}
