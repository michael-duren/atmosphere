import {
  setBassSynthAttack,
  setBassSynthDecay,
  setBassSynthFilterFrequency,
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

  const setStoreBassSynthWaveform = (waveform: KnobWaveType) =>
    dispatch(setBassSynthWaveform(waveform));

  const setStoreBassSynthFilterFrequency = (filterFrequency: number) =>
    dispatch(setBassSynthFilterFrequency(filterFrequency));

  return {
    setStoreBassSynthAttackChange,
    setStoreBassSynthDecayChange,
    setStoreBassSynthWaveform,
    setStoreBassSynthFilterFrequency,
  };
};

export default useBassSynthStoreChange;
