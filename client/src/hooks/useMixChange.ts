import { useAppDispatch } from '../store/hooks/useAppDispatch.ts';
import {
  setDelayFeedback,
  setDelayMix,
  setDelayTime,
  setDistortionAmount,
  setDistortionFilter,
  setDistortionMix,
  setReverbDecay,
  setReverbMix,
  setReverbPreDelay,
} from '../store/slices/songSlice.ts';
import { round } from '../utils/number.ts';

const useMixChange = () => {
  const dispatch = useAppDispatch();

  const handleDistortionMixChange = (num: number) =>
    dispatch(setDistortionMix(num));
  const handleDistortionAmountChange = (num: number) =>
    dispatch(setDistortionAmount(num));
  const handleDistortionFilterChange = (num: number) =>
    dispatch(setDistortionFilter(num));

  // REVERB HANDLERS
  const handleReverbMixChange = (num: number) => {
    dispatch(setReverbMix(round(num)));
  };
  const handleReverbDecayChange = (num: number) => {
    dispatch(setReverbDecay(round(num)));
  };
  const handleReverbPreDelayChange = (num: number) => {
    dispatch(setReverbPreDelay(round(num)));
  };

  // DELAY HANDLERS
  const handleDelayMixChange = (num: number) => {
    dispatch(setDelayMix(round(num)));
  };
  const handleDelayTimeChange = (num: number) => {
    dispatch(setDelayTime(round(num)));
  };
  const handleDelayFeedbackChange = (num: number) => {
    dispatch(setDelayFeedback(round(num)));
  };

  return {
    handleDistortionMixChange,
    handleDistortionAmountChange,
    handleDistortionFilterChange,
    handleReverbMixChange,
    handleReverbDecayChange,
    handleReverbPreDelayChange,
    handleDelayMixChange,
    handleDelayTimeChange,
    handleDelayFeedbackChange,
  };
};

export default useMixChange;
