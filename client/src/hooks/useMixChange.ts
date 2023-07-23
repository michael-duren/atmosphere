import { useAppDispatch } from '../store/hooks/useAppDispatch.ts';
import {
  setDistortionAmount,
  setDistortionFilter,
  setDistortionMix,
} from '../store/slices/songSlice.ts';

const useMixChange = () => {
  const dispatch = useAppDispatch();

  const handleDistortionMixChange = (num: number) =>
    dispatch(setDistortionMix(num));
  const handleDistortionAmountChange = (num: number) =>
    dispatch(setDistortionAmount(num));
  const handleDistortionFilterChange = (num: number) =>
    dispatch(setDistortionFilter(num));

  return {
    handleDistortionMixChange,
    handleDistortionAmountChange,
    handleDistortionFilterChange,
  };
};

export default useMixChange;
