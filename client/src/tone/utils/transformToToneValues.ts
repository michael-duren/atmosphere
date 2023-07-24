import {
  KnobWaveType,
  SimpleWaveType,
  WaveType,
} from '../../models/types/waveTypes.ts';
import { FilterType } from '../../models/types/filterType.ts';

export const inputToToneWaveform = (input: KnobWaveType): WaveType => {
  switch (input) {
    case 'sine':
      return 'fatsine1';
    case 'triangle':
      return 'fattriangle';
    case 'sawtooth':
      return 'fatsawtooth';
    case 'square':
      return 'fatsquare';
    default:
      return 'fatsine1';
  }
};

export const inputToSimpleToneWaveform = (
  input: KnobWaveType
): SimpleWaveType => {
  switch (input) {
    case 'sine':
      return 'sine2';
    case 'triangle':
      return 'triangle2';
    case 'sawtooth':
      return 'sawtooth2';
    case 'square':
      return 'square2';
    default:
      return 'sine2';
  }
};

export const inputToFilterType = (input: number): FilterType => {
  if (input <= 0 && input > 0.2) return 'lowpass';

  if (input >= 0.2 && input < 0.4) return 'highpass';

  if (input >= 0.4 && input < 0.6) return 'bandpass';

  if (input >= 0.6 && input < 0.8) return 'peaking';

  if (input >= 0.8 && input < 1) return 'notch';

  return 'lowpass';
};
