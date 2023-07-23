import { useAppDispatch } from '../store/hooks/useAppDispatch.ts';
import {
  setMelodicSynthAttack,
  setMelodicSynthChorus,
  setMelodicSynthDecay,
  setMelodicSynthFilterFrequency,
  setMelodicSynthFilterMod,
  setMelodicSynthFilterType,
  setMelodicSynthLfoFreq,
  setMelodicSynthLfoWaveform,
  setMelodicSynthMetal,
  setMelodicSynthRelease,
  setMelodicSynthSustain,
  setMelodicSynthWaveform,
} from '../store/slices/songSlice.ts';
import { KnobWaveType } from '../models/types/waveTypes.ts';
import { NoteType } from '../models/types/noteType.ts';

export const useMelodicSynthChange = () => {
  const dispatch = useAppDispatch();

  const setStoreMelodicSynthAttackChange = (attack: number) => {
    dispatch(setMelodicSynthAttack(attack));
  };
  const setStoreMelodicSynthDecayChange = (decay: number) => {
    dispatch(setMelodicSynthDecay(decay));
  };
  const setStoreMelodicSynthSustainChange = (sustain: number) => {
    dispatch(setMelodicSynthSustain(sustain));
  };

  const setStoreMelodicSynthReleaseChange = (release: number) => {
    dispatch(setMelodicSynthRelease(release));
  };

  const setStoreMelodicSynthWaveformChange = (waveform: KnobWaveType) => {
    dispatch(setMelodicSynthWaveform(waveform));
  };

  const setStoreMelodicSynthChorusChange = (chorus: number) => {
    dispatch(setMelodicSynthChorus(chorus));
  };

  const setStoreMelodicSynthFilterFrequencyChange = (
    filterFrequency: number
  ) => {
    dispatch(setMelodicSynthFilterFrequency(filterFrequency));
  };

  const setStoreMelodicSynthFilterTypeChange = (
    filterType: BiquadFilterType
  ) => {
    dispatch(setMelodicSynthFilterType(filterType));
  };

  const setStoreMelodicSynthMetalChange = (metal: number) => {
    dispatch(setMelodicSynthMetal(metal));
  };

  const setStoreMelodicSynthLfoFreqChange = (lfoFreq: NoteType) => {
    dispatch(setMelodicSynthLfoFreq(lfoFreq));
  };

  const setStoreMelodicSynthLfoWaveformChange = (lfoType: KnobWaveType) => {
    dispatch(setMelodicSynthLfoWaveform(lfoType));
  };

  const setStoreMelodicSynthFilterModChange = (filterKnob: number) => {
    dispatch(setMelodicSynthFilterMod(filterKnob));
  };
  return {
    setStoreMelodicSynthWaveformChange,
    setStoreMelodicSynthAttackChange,
    setStoreMelodicSynthDecayChange,
    setStoreMelodicSynthSustainChange,
    setStoreMelodicSynthReleaseChange,
    setStoreMelodicSynthChorusChange,
    setStoreMelodicSynthFilterFrequencyChange,
    setStoreMelodicSynthFilterTypeChange,
    setStoreMelodicSynthMetalChange,
    setStoreMelodicSynthLfoFreqChange,
    setStoreMelodicSynthLfoWaveformChange,
    setStoreMelodicSynthFilterModChange,
  };
};
