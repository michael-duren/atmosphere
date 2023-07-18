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
import { setToken } from '../slices/commonSlice.ts';

export function* login({ payload }: LoginAsync) {
  yield put(setIsUserLoading(true));
  try {
    const user: User = yield call(agent.Account.login, payload);
    yield put(setUser(user));
    yield put(setToken(user.token));
    // passed in as an array to call setItem in the correct context
    yield call([localStorage, 'setItem'], 'jwt', user.token);
    yield put(setIsUserLoading(false));
    yield call(router.navigate, '/app');
  } catch (e) {
    yield put(setIsUserLoading(false));
    throw e;
  }
}

export function* logout() {
  yield put(setToken(null));
  yield put(setUser(null));
  yield call(router.navigate, '/');
  yield call([localStorage, 'removeItem'], 'jwt');
}

export function* register({ payload }: RegisterAsync) {
  yield put(setIsUserLoading(true));
  try {
    const user: User = yield* call(agent.Account.register, payload);
    yield put(setUser(user));
    yield put(setToken(user.token));
    yield call([localStorage, 'setItem'], 'jwt', user.token);
    yield put(setIsUserLoading(false));
    yield call(router.navigate, '/app');
  } catch (e) {
    yield put(setIsUserLoading(false));
    throw e;
  }
}

export function* getLoggedInUser() {
  yield put(setIsUserLoading(true));
  try {
    const user: User = yield call(agent.Account.getCurrentUser);
    yield put(setUser(user));
    yield put(setIsUserLoading(false));
  } catch (e) {
    yield put(setIsUserLoading(false));
    throw e;
  }
}

export function* userSaga() {
  yield* takeEvery(USER_ACTIONS.LOGIN_ASYNC, login);
  yield* takeEvery(USER_ACTIONS.REGISTER_ASYNC, register);
  yield* takeEvery(USER_ACTIONS.GET_LOGGED_IN_USER_ASYNC, getLoggedInUser);
  yield* takeEvery(USER_ACTIONS.LOGOUT_ASYNC, logout);
}
