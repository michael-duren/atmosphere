import { SimpleWaveType, WaveType } from '../../models/types/waveTypes.ts';
import { FilterType } from '../../models/types/filterType.ts';

export const toneWaveFormToInput = (toneWaveform: WaveType) => {
  switch (toneWaveform) {
    case 'fatsine1':
      return 0;
    case 'fattriangle':
      return 0.25;
    case 'fatsawtooth':
      return 0.5;
    case 'fatsquare':
      return 0.75;
    default:
      return 0;
  }
};

export const simpleToneWaveFormToInput = (
  simpleToneWaveform: SimpleWaveType
) => {
  switch (simpleToneWaveform) {
    case 'sine2':
      return 0;
    case 'triangle2':
      return 0.25;
    case 'sawtooth2':
      return 0.5;
    case 'square2':
      return 0.75;
    default:
      return 0;
  }
};

export const filterTypeToInput = (filterType: FilterType) => {
  switch (filterType) {
    case 'lowpass':
      return 0;
    case 'highpass':
      return 0.2;
    case 'bandpass':
      return 0.4;
    case 'peaking':
      return 0.6;
    case 'notch':
      return 0.8;
  }
};
