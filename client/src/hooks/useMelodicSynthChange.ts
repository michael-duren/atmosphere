import { useAppDispatch } from '../store/hooks/useAppDispatch.ts';
import { setMelodicSynthWaveform } from '../store/slices/songSlice.ts';
import { KnobWaveType } from '../models/types/waveTypes.ts';

export const useMelodicSynthChange = () => {
  const dispatch = useAppDispatch();

  const handleMelodicSynthWaveformChange = (waveform: KnobWaveType) => {
    dispatch(setMelodicSynthWaveform(waveform));
  };

  return {
    handleMelodicSynthWaveformChange,
  };
};
