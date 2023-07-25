import {
  setBassSynthAttack,
  setBassSynthDecay,
  setBassSynthFilterFrequency,
  setBassSynthRelease,
  setBassSynthSustain,
  setBassSynthWaveform,
} from '../store/slices/songSlice.ts';
import { useAppDispatch } from '../store/hooks/useAppDispatch.ts';
import { KnobWaveType } from '../models/types/waveTypes.ts';

const useBassSynthStoreChange = () => {
  const dispatch = useAppDispatch();

  const setStoreBassSynthAttackChange = (attack: number) =>
    dispatch(setBassSynthAttack(attack));

  const setStoreBassSynthDecayChange = (decay: number) =>
    dispatch(setBassSynthDecay(decay));

  const setStoreBassSynthSustainChange = (sustain: number) =>
    dispatch(setBassSynthSustain(sustain));

  const setStoreBassSynthReleaseChange = (release: number) =>
    dispatch(setBassSynthRelease(release));

  const setStoreBassSynthWaveform = (waveform: KnobWaveType) =>
    dispatch(setBassSynthWaveform(waveform));

  const setStoreBassSynthFilterFrequency = (filterFrequency: number) =>
    dispatch(setBassSynthFilterFrequency(filterFrequency));

  return {
    setStoreBassSynthAttackChange,
    setStoreBassSynthDecayChange,
    setStoreBassSynthWaveform,
    setStoreBassSynthFilterFrequency,
    setStoreBassSynthSustainChange,
    setStoreBassSynthReleaseChange,
  };
};

export default useBassSynthStoreChange;
