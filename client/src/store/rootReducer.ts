import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice.ts';
import commonReducer from './slices/commonSlice.ts';
import songReducer from './slices/songSlice.ts';
import transportReducer from './slices/transportSlice.ts';
import presetReducer from './slices/presetSlice.ts';

export const rootReducer = combineReducers({
  user: userReducer,
  common: commonReducer,
  song: songReducer,
  transport: transportReducer,
  preset: presetReducer,
});
