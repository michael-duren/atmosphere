import { all, call } from 'typed-redux-saga/macro';
import { userSaga } from './sagas/userSaga.ts';

export function* rootSaga() {
  yield* all([call(userSaga)]);
}
