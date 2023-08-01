import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './rootSaga.ts';
import { rootReducer } from './rootReducer.ts';
// import { persistReducer, persistStore, PersistConfig } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

const sagaMiddleware = createSagaMiddleware();

export type RootReducer = ReturnType<typeof rootReducer>;

// const persistConfig: PersistConfig<RootReducer> = {
//   key: 'root',
//   storage,
//   blacklist: ['user'],
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware =
  import.meta.env.MODE === 'development'
    ? [sagaMiddleware, logger]
    : [sagaMiddleware];

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(middleware),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
// export const persistor = persistStore(store);
