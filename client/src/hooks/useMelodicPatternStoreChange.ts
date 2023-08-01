import { useAppDispatch } from '../store/hooks/useAppDispatch.ts';
import { MusicalKey } from '../models/types/musicalKey.ts';
import { useAppSelector } from '../store/hooks/useAppSelector.ts';
import {
  setMelodicPatternKey,
  setMelodicPatternLength,
  setMelodicPatternNoteDuration,
  setMelodicPatternScale,
  setMelodicPatternTime,
  setMelodicPatternTranspose,
  setMelodicPatternType,
} from '../store/slices/songSlice.ts';
import { useEffect } from 'react';
import { melodicPattern } from '../tone/singleton.ts';
import { MusicalScale } from '../models/types/musicalScale.ts';
import { PatternName } from 'tone/build/esm/event/PatternGenerator';
import { NoteType } from '../models/types/noteType.ts';

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

  // SCALES
  const setStoreMelodicPatternScaleChange = (scale: MusicalScale): void => {
    dispatch(setMelodicPatternScale(scale));
  };

  useEffect(() => {
    melodicPattern.scale = melodicPatternStore.scale;
  }, [melodicPatternStore.scale]);

  // PATTERN TYPE
  const setStoreMelodicPatternTypeChange = (patternType: PatternName): void => {
    dispatch(setMelodicPatternType(patternType));
  };

  useEffect(() => {
    melodicPattern.patternType = melodicPatternStore.patternType;
  }, [melodicPatternStore.patternType]);

  // TRANSPOSE
  const setStoreMelodicPatternTransposeChange = (transpose: number): void => {
    dispatch(setMelodicPatternTranspose(transpose));
  };

  useEffect(() => {
    melodicPattern.transpose = melodicPatternStore.transpose;
  }, [melodicPatternStore.transpose]);

  // TIME INTERVAL
  const setStoreMelodicPatternTimeIntervalChange = (
    timeInterval: NoteType
  ): void => {
    dispatch(setMelodicPatternTime(timeInterval));
  };

  useEffect(() => {
    melodicPattern.timeInterval = melodicPatternStore.timeInterval;
  }, [melodicPatternStore.timeInterval]);

  // NOTE DURATION
  const setStoreMelodicPatternNoteDurationChange = (
    noteDuration: NoteType
  ): void => {
    dispatch(setMelodicPatternNoteDuration(noteDuration));
  };

  useEffect(() => {
    melodicPattern.noteDuration = melodicPatternStore.noteDuration;
  }, [melodicPatternStore.noteDuration]);

  // LENGTH
  const setStoreMelodicPatternLengthChange = (length: number): void => {
    dispatch(setMelodicPatternLength(length));
  };

  useEffect(() => {
    melodicPattern.length = melodicPatternStore.length;
  }, [melodicPatternStore.length]);

  return {
    setStoreMelodicPatternKeyChange,
    setStoreMelodicPatternScaleChange,
    setStoreMelodicPatternTypeChange,
    setStoreMelodicPatternTransposeChange,
    setStoreMelodicPatternTimeIntervalChange,
    setStoreMelodicPatternNoteDurationChange,
    setStoreMelodicPatternLengthChange,
  };
}
