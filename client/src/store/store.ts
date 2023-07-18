import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './rootSaga.ts';
import { rootReducer } from './rootReducer.ts';
import { persistReducer, persistStore, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const sagaMiddleware = createSagaMiddleware();

export type RootReducer = ReturnType<typeof rootReducer>;

const persistConfig: PersistConfig<RootReducer> = {
  key: 'root',
  storage,
  blacklist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const rootStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware, logger),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof rootStore.dispatch;
export type AppState = ReturnType<typeof rootStore.getState>;
export const persistor = persistStore(rootStore);
