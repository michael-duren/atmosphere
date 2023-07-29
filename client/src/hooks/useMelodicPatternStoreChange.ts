import { useAppDispatch } from '../store/hooks/useAppDispatch.ts';
import { MusicalKey } from '../models/types/musicalKey.ts';
import { useAppSelector } from '../store/hooks/useAppSelector.ts';
import { setMelodicPatternKey } from '../store/slices/songSlice.ts';
import { useEffect } from 'react';
import { melodicPattern } from '../tone/singleton.ts';

export default function UseMelodicPatternStoreChange() {
  const melodicPatternStore = useAppSelector(
    (state) => state.song.currentSong.melodicPattern
  );
  const dispatch = useAppDispatch();

  // KEY
  const setStoreMelodicPatternKeyChange = (key: MusicalKey): void => {
    dispatch(setMelodicPatternKey(key));
  };

  useEffect(() => {
    melodicPattern.key = melodicPatternStore.key;
  }, [melodicPatternStore.key]);

  // TODO: add other melodic pattern store changes here

  return {
    setStoreMelodicPatternKeyChange,
  };
}
