import agent from '../../api/agent.ts';
import {
  LoginAsync,
  RegisterAsync,
  USER_ACTIONS,
} from '../actions/userActions.ts';
import {
  resetUserError,
  setIsUserLoading,
  setUser,
  setUserError,
} from '../slices/userSlice.ts';
import { User } from '../../models/user.ts';
import { call, put, takeEvery } from 'typed-redux-saga';
import { router } from '../../router/Routes.tsx';
import { setToken } from '../slices/commonSlice.ts';

export function* login({ payload }: LoginAsync) {
  yield put(setIsUserLoading(true)); // set user is loading to true
  try {
    const user: User = yield call(agent.Account.login, payload); // attempt to login user
    yield put(resetUserError()); // reset any errors that occured previously while logging in
    yield put(setUser(user)); // set user in redux store
    yield put(setToken(user.token)); // set token in common store
    yield call([localStorage, 'setItem'], 'jwt', user.token); // set token in local storage
    yield put(setIsUserLoading(false)); // set user is loading to false
    yield call(router.navigate, '/app'); // navigate to app
  } catch (e: any) {
    console.error(e);
    yield put(setIsUserLoading(false));
    yield put(setUserError(e));
  }
}

export function* logout() {
  yield put(setToken(null)); // set token in common store to null
  yield put(setUser(null)); // set user in redux store to null
  yield call(router.navigate, '/'); // navigate to login page
  yield call([localStorage, 'removeItem'], 'jwt'); // remove token from local storage
}

export function* register({ payload }: RegisterAsync) {
  yield put(setIsUserLoading(true));
  try {
    const user: User = yield* call(agent.Account.register, payload); // attempt to register user
    yield put(resetUserError()); // reset any errors that occured while registering
    yield put(setUser(user)); // set new user in redux store
    yield put(setToken(user.token)); // set user token in common store
    yield call([localStorage, 'setItem'], 'jwt', user.token); // set token in local storage
    yield put(setIsUserLoading(false)); // set user is loading to false
    yield call(router.navigate, '/app'); // navigate to app
  } catch (e: any) {
    yield put(setIsUserLoading(false));
    yield put(setUserError(e));
  }
}

export function* getLoggedInUser() {
  yield put(setIsUserLoading(true)); // set user is loading to true
  try {
    const user: User = yield call(agent.Account.getCurrentUser); // get current user
    if (!user) {
      yield put(setIsUserLoading(false)); // if unsuccessful return
      return;
    }
    yield put(setUser(user)); // set user in redux store
    yield put(setIsUserLoading(false)); // set user is loading to false
  } catch (e) {
    yield put(setIsUserLoading(false));
    yield call(router.navigate, '/'); // navigate to login page if error
    throw e;
  }
}

export function* refreshToken() {
  try {
    const user: User = yield call(agent.Account.refreshToken); // get new token
    yield put(setUser(user)); // set user in redux store
    yield put(setToken(user.token)); // set token in common store
  } catch (e) {
    console.error(e);
  }
}

export function* userSaga() {
  yield* takeEvery(USER_ACTIONS.LOGIN_ASYNC, login);
  yield* takeEvery(USER_ACTIONS.REGISTER_ASYNC, register);
  yield* takeEvery(USER_ACTIONS.GET_LOGGED_IN_USER_ASYNC, getLoggedInUser);
  yield* takeEvery(USER_ACTIONS.LOGOUT_ASYNC, logout);
  yield* takeEvery(USER_ACTIONS.REFRESH_TOKEN_ASYNC, refreshToken);
}
