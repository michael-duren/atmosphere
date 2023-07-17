import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { AppState } from '../store.ts';

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
