import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice.ts';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './rootSaga.ts';

const sagaMiddleware = createSagaMiddleware();

export const rootStore = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger, sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof rootStore.dispatch;
export type AppState = ReturnType<typeof rootStore.getState>;
