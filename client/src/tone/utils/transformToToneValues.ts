import {
  KnobWaveType,
  SimpleWaveType,
  WaveType,
} from '../../models/types/waveTypes.ts';

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
