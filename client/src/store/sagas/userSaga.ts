import agent from '../../api/agent.ts';
import {
  LoginAsync,
  RegisterAsync,
  USER_ACTIONS,
} from '../actions/userActions.ts';
import { setIsUserLoading, setUser } from '../slices/userSlice.ts';
import { User } from '../../models/user.ts';
import { call, put, takeEvery } from 'typed-redux-saga';
import { router } from '../../route/Routes.tsx';

export function* login({ payload }: LoginAsync) {
  yield put(setIsUserLoading(true));
  try {
    const user: User = yield call(agent.Account.login, payload);
    yield put(setUser(user));
    yield put(setIsUserLoading(false));
    yield call(router.navigate, '/app');
  } catch (error) {
    yield put(setIsUserLoading(false));
    throw error;
  }
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
