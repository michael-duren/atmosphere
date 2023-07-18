import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice.ts';

export const rootReducer = combineReducers({
  user: userReducer,
});
