import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice.ts';
import commonReducer from './slices/commonSlice.ts';

export const rootReducer = combineReducers({
  user: userReducer,
  common: commonReducer,
});
