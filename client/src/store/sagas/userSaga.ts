import agent from '../../api/agent.ts';
import {
  LoginAsync,
  RegisterAsync,
  USER_ACTIONS,
} from '../actions/userActions.ts';
import { setIsUserLoading, setUser } from '../slices/userSlice.ts';
import { User } from '../../models/user.ts';
import { call, put, takeEvery } from 'typed-redux-saga';

export function* login({ payload }: LoginAsync) {
  yield put(setIsUserLoading(true));
  const user: User = yield* call(agent.Account.login, payload);
  if (user) {
    yield put(setUser(user));
  }
  yield put(setIsUserLoading(false));
}

export function* register({ payload }: RegisterAsync) {
  const user: User = yield* call(agent.Account.register, payload);
  if (user) {
    yield put(setUser(user));
  }
}

export function* userSaga() {
  yield* takeEvery(USER_ACTIONS.LOGIN_ASYNC, login);
  yield* takeEvery(USER_ACTIONS.REGISTER_ASYNC, register);
}
